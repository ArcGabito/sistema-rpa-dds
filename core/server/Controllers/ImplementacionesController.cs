using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos;
using Server.Models;
using Server.Services;

namespace Server.Controllers;

// Implementations: each project process on its way from an approved PDD to
// production. Its stage moves under the rules of Services/PaseProduccion,
// its go-live checklist is marked item by item, and going live registers
// its bot once everything is ready.
[ApiController]
[Route("api/implementaciones")]
[Authorize]
[Modulo(Modulo.Implementaciones)]
public class ImplementacionesController(AppDbContext db) : ControllerBase
{
    // "activas" (the default): in development or testing. Or one stage.
    [HttpGet]
    public async Task<ActionResult<PagedResponse<ImplementacionListItem>>> GetAll(
        [FromQuery] string? q,
        [FromQuery] string? etapa,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 25,
        CancellationToken ct = default)
    {
        page = Math.Max(page, 1);
        pageSize = Math.Clamp(pageSize, 1, 100);

        var query = db.ProcesosProyecto.AsNoTracking().Where(p => p.Proyecto!.Estado != ProyectoEstado.Cancelado);
        if (string.IsNullOrWhiteSpace(etapa) || etapa == "activas")
            query = query.Where(p => p.Etapa == EtapaDesarrollo.Desarrollo || p.Etapa == EtapaDesarrollo.Pruebas);
        else query = query.Where(p => p.Etapa == etapa);
        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim();
            query = query.Where(p => p.Nombre.Contains(term) || p.Proyecto!.Nombre.Contains(term) || p.Proyecto.Empresa!.NombreComercial.Contains(term));
        }

        var totalCount = await query.CountAsync(ct);
        var procesos = await query
            .Include(p => p.Proyecto).ThenInclude(x => x!.Empresa)
            .Include(p => p.Pase)
            .OrderBy(p => p.Etapa == EtapaDesarrollo.Pruebas ? 0 : 1)
            .ThenBy(p => p.Proyecto!.FechaFinPlan)
            .ThenBy(p => p.Orden)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .AsSplitQuery()
            .ToListAsync(ct);

        var bots = await BotsAsync(procesos.Select(p => p.Id).ToList(), ct);
        return Ok(PagedResponse<ImplementacionListItem>.Create(procesos.Select(p => Llenar(new ImplementacionListItem(), p, bots)).ToList(), page, pageSize, totalCount));
    }

    [HttpGet("{pid:int}")]
    public async Task<ActionResult<ImplementacionResponse>> GetById(int pid, CancellationToken ct)
    {
        var p = await db.ProcesosProyecto.AsNoTracking()
            .Include(x => x.Proyecto).ThenInclude(y => y!.Empresa)
            .Include(x => x.Pase).ThenInclude(i => i.ActualizadoPor)
            .AsSplitQuery()
            .FirstOrDefaultAsync(x => x.Id == pid, ct);
        if (p is null) return NotFound();

        var bots = await BotsAsync([p.Id], ct);
        var empresaId = p.Proyecto!.EmpresaId;
        var items = new List<ItemPaseResponse>
        {
            new()
            {
                Clave = PaseProduccion.PddAprobado,
                Titulo = "PDD aprobado por el cliente",
                Ayuda = "Sigue al PDD del proceso: cambiar uno aprobado crea una versión nueva que debe aprobarse otra vez.",
                Automatico = true,
                Estado = p.PddEstado == PddEstado.Aprobado ? ItemPaseEstado.Hecho : ItemPaseEstado.Pendiente,
                Nota = p.PddEstado == PddEstado.Aprobado ? $"v{p.PddVersion}, aprobado por {p.PddAprobadoPor}" : null,
                ActualizadoAtUtc = p.PddAprobadoAtUtc,
            },
        };
        foreach (var item in PaseProduccion.Items)
        {
            var fila = p.Pase.FirstOrDefault(x => x.Clave == item.Clave);
            items.Add(new ItemPaseResponse
            {
                Clave = item.Clave,
                Titulo = item.Titulo,
                Ayuda = item.Ayuda,
                PuedeNoAplicar = item.PuedeNoAplicar,
                NotaLabel = item.Nota,
                NotaObligatoria = item.NotaObligatoria,
                Estado = fila?.Estado ?? ItemPaseEstado.Pendiente,
                Nota = fila?.Nota,
                ActualizadoPor = fila?.ActualizadoPor?.FullName,
                ActualizadoAtUtc = fila?.ActualizadoAtUtc,
            });
        }

        var r = Llenar(new ImplementacionResponse
        {
            ProyectoEstado = p.Proyecto.Estado,
            Items = items,
            Faltantes = PaseProduccion.Faltantes(p),
            SecretosCliente = await db.Secretos.CountAsync(s => s.EmpresaId == empresaId, ct),
            LicenciasCliente = await db.Licencias.CountAsync(l => l.EmpresaId == empresaId, ct),
            Borrador = await PaseProduccion.BorradorAsync(db, p, ct),
        }, p, bots);
        r.Area = p.Area;
        r.PddAprobadoPor = p.PddAprobadoPor;
        r.PddAprobadoAtUtc = p.PddAprobadoAtUtc;
        return Ok(r);
    }

    [HttpPut("{pid:int}/etapa")]
    public async Task<IActionResult> SetEtapa(int pid, EtapaRequest request, CancellationToken ct)
    {
        if (!EtapaDesarrollo.All.Contains(request.Etapa)) return BadRequest(new { message = "Etapa inválida." });
        var p = await db.ProcesosProyecto.FirstOrDefaultAsync(x => x.Id == pid, ct);
        if (p is null) return NotFound();

        var tieneBot = await db.Bots.AnyAsync(b => b.ProcesoProyectoId == pid, ct);
        if (PaseProduccion.ErrorEtapa(p.Etapa, request.Etapa, p.PddEstado, tieneBot) is { } error) return BadRequest(new { message = error });

        p.Etapa = request.Etapa;
        p.UpdatedAtUtc = DateTime.UtcNow;
        await db.SaveChangesAsync(ct);
        return NoContent();
    }

    [HttpPut("{pid:int}/pase/{clave}")]
    public async Task<IActionResult> SetItem(int pid, string clave, ItemPaseRequest request, CancellationToken ct)
    {
        if (PaseProduccion.Buscar(clave) is not { } item) return NotFound();
        if (!ItemPaseEstado.All.Contains(request.Estado)) return BadRequest(new { message = "Estado inválido." });
        if (request.Estado == ItemPaseEstado.NoAplica && !item.PuedeNoAplicar)
            return BadRequest(new { message = $"«{item.Titulo}» aplica a todo bot en producción." });
        var nota = string.IsNullOrWhiteSpace(request.Nota) ? null : request.Nota.Trim();
        if (request.Estado == ItemPaseEstado.Hecho && item.NotaObligatoria && nota is null)
            return BadRequest(new { message = $"Indica {item.Nota!.ToLowerInvariant()}." });

        var autorId = await db.GetCurrentUserIdAsync(User, ct);
        if (autorId is null) return Unauthorized();
        if (!await db.ProcesosProyecto.AnyAsync(x => x.Id == pid, ct)) return NotFound();

        var fila = await db.ItemsPase.FirstOrDefaultAsync(x => x.ProcesoProyectoId == pid && x.Clave == clave, ct);
        if (fila is null)
        {
            fila = new ItemPase { ProcesoProyectoId = pid, Clave = clave, Estado = request.Estado };
            db.ItemsPase.Add(fila);
        }
        fila.Estado = request.Estado;
        fila.Nota = nota;
        fila.ActualizadoPorId = autorId;
        fila.ActualizadoAtUtc = DateTime.UtcNow;
        await db.SaveChangesAsync(ct);
        return NoContent();
    }

    // Going live: with the process in testing and its checklist complete,
    // registers its bot, moves it to production and ticks off its task.
    [HttpPost("{pid:int}/produccion")]
    public async Task<IActionResult> PonerEnProduccion(int pid, BotRequest request, CancellationToken ct)
    {
        var autorId = await db.GetCurrentUserIdAsync(User, ct);
        if (autorId is null) return Unauthorized();

        var p = await db.ProcesosProyecto.Include(x => x.Proyecto).Include(x => x.Pase).FirstOrDefaultAsync(x => x.Id == pid, ct);
        if (p is null) return NotFound();
        if (await db.Bots.Where(b => b.ProcesoProyectoId == pid).Select(b => (int?)b.Id).FirstOrDefaultAsync(ct) is { } existente)
            return Conflict(new { message = "Este proceso ya tiene su bot.", botId = existente });
        if (p.Etapa != EtapaDesarrollo.Pruebas)
            return BadRequest(new { message = "Pasa el proceso a pruebas antes de ponerlo en producción." });
        if (PaseProduccion.Faltantes(p) is { Count: > 0 } faltan)
            return BadRequest(new { message = $"Falta completar: {string.Join(", ", faltan)}." });
        if (await BotsController.ErrorAsync(db, request, ct) is { } error) return BadRequest(new { message = error });

        var bot = new Bot
        {
            Nombre = "", Servicio = request.Servicio, Estado = BotEstado.Activo,
            EmpresaId = p.Proyecto!.EmpresaId, ProyectoId = p.ProyectoId, ProcesoProyectoId = p.Id,
        };
        BotsController.Aplicar(bot, request);
        bot.ResponsableId ??= autorId;
        p.Etapa = EtapaDesarrollo.Produccion;
        p.UpdatedAtUtc = DateTime.UtcNow;
        await PaseProduccion.MarcarTareaAsync(db, p, ct);

        db.Bots.Add(bot);
        db.Actividades.Add(new Actividad
        {
            EmpresaId = bot.EmpresaId,
            OportunidadId = p.Proyecto.OportunidadId,
            Tipo = ActividadTipo.Nota,
            Descripcion = $"Bot «{bot.Nombre}» en producción desde el {bot.EnProduccionDesde:dd/MM/yyyy}.",
            AutorId = autorId,
        });
        await db.SaveChangesAsync(ct);
        return Created($"/api/bots/{bot.Id}", new { id = bot.Id });
    }

    // --- Helpers -------------------------------------------------------------

    private Task<Dictionary<int, int>> BotsAsync(List<int> procesoIds, CancellationToken ct) =>
        db.Bots.AsNoTracking()
            .Where(b => b.ProcesoProyectoId != null && procesoIds.Contains(b.ProcesoProyectoId.Value))
            .ToDictionaryAsync(b => b.ProcesoProyectoId!.Value, b => b.Id, ct);

    private static T Llenar<T>(T r, ProcesoProyecto p, IReadOnlyDictionary<int, int> bots) where T : ImplementacionListItem
    {
        var faltan = PaseProduccion.Faltantes(p).Count;
        r.Id = p.Id;
        r.Nombre = p.Nombre;
        r.Servicio = p.Servicio;
        r.Etapa = p.Etapa;
        r.PddEstado = p.PddEstado;
        r.PddVersion = p.PddVersion;
        r.ProyectoId = p.ProyectoId;
        r.ProyectoNombre = p.Proyecto?.Nombre ?? "—";
        r.EmpresaId = p.Proyecto?.EmpresaId ?? 0;
        r.EmpresaNombre = p.Proyecto?.Empresa?.NombreComercial ?? "—";
        r.ItemsTotal = PaseProduccion.Items.Length + 1;
        r.ItemsListos = r.ItemsTotal - faltan;
        r.Listo = faltan == 0;
        r.BotId = bots.TryGetValue(p.Id, out var botId) ? botId : null;
        return r;
    }
}
