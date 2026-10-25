using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos;
using Server.Models;

namespace Server.Services;

// The road from an approved PDD to a bot in production: which stage a
// process can move to, what must be ready before it goes live, and the
// go-live itself (its bot, its stage and its project task).
public static class PaseProduccion
{
    public sealed record Item(string Clave, string Titulo, string Ayuda, bool PuedeNoAplicar, string? Nota = null, bool NotaObligatoria = false);

    // Not stored: it follows the PDD.
    public const string PddAprobado = "pdd_aprobado";
    public const string Pruebas = "pruebas";

    public static readonly Item[] Items =
    [
        new(Pruebas, "Pruebas con el usuario aprobadas", "El cliente probó el bot con casos reales, excepciones incluidas, y dio su conformidad.", false, "Quién del cliente las aprobó", true),
        new("credenciales", "Credenciales de producción en la Bóveda", "Las cuentas con que corre el bot, guardadas en la Bóveda del cliente; no en el código ni en un correo.", true),
        new("licencias", "Licencias de producción asignadas", "Robot, orquestador u otra licencia que necesita, registrada en Vencimientos para que no venza sin aviso.", true),
        new("horario", "Horario y volumen acordados", "Cuándo corre y cuántos casos se esperan, confirmado con el cliente.", false),
        new("monitoreo", "Monitoreo y alertas configurados", "Si una ejecución falla, a Soporte le llega una alerta.", false),
        new("manual", "Manual de operación entregado a Soporte", "Cómo se ejecuta, cómo se reinicia y qué hacer con cada excepción del PDD.", false),
        new("reversion", "Plan de vuelta al proceso manual", "Si el bot se detiene, quién del cliente retoma el proceso a mano y cómo.", false),
    ];

    public static Item? Buscar(string clave) => Items.FirstOrDefault(i => i.Clave == clave);

    private static int Orden(string etapa) => Array.IndexOf(EtapaDesarrollo.All, etapa);

    // Why a process can't move from one stage to another, or null if it can.
    // Production is reached only by going live (with its bot), and a process
    // with its bot running doesn't leave it.
    public static string? ErrorEtapa(string actual, string nueva, string pddEstado, bool tieneBot)
    {
        if (nueva == actual) return null;
        if (nueva == EtapaDesarrollo.Produccion)
            return "Un proceso pasa a producción desde Implementaciones, con su checklist completo y su bot registrado.";
        if (actual == EtapaDesarrollo.Produccion && tieneBot)
            return "Este proceso ya tiene su bot en producción. Retíralo en Operación si hay que rehacerlo.";
        if (Orden(nueva) > Orden(actual) && pddEstado != PddEstado.Aprobado)
            return "El desarrollo empieza con el PDD aprobado por el cliente.";
        return null;
    }

    // What's still missing to go live, by title (the PDD first).
    public static List<string> Faltantes(ProcesoProyecto p)
    {
        var faltan = new List<string>();
        if (p.PddEstado != PddEstado.Aprobado) faltan.Add("PDD aprobado por el cliente");
        foreach (var item in Items)
        {
            var estado = p.Pase.FirstOrDefault(x => x.Clave == item.Clave)?.Estado;
            if (estado is not (ItemPaseEstado.Hecho or ItemPaseEstado.NoAplica)) faltan.Add(item.Titulo);
        }
        return faltan;
    }

    // What the go-live form starts from: the process's company, and the
    // figures of the diagnosis it came from. Expects Proyecto.Empresa loaded.
    public static async Task<BorradorBotResponse> BorradorAsync(AppDbContext db, ProcesoProyecto p, CancellationToken ct)
    {
        var borrador = new BorradorBotResponse
        {
            Nombre = p.Nombre,
            EmpresaId = p.Proyecto!.EmpresaId,
            EmpresaNombre = p.Proyecto.Empresa?.NombreComercial ?? "—",
            ProyectoId = p.ProyectoId,
            ProyectoNombre = p.Proyecto.Nombre,
            ProcesoProyectoId = p.Id,
            Servicio = p.Servicio,
            DesdeDiagnostico = false,
            BotExistenteId = await db.Bots.Where(b => b.ProcesoProyectoId == p.Id).Select(b => (int?)b.Id).FirstOrDefaultAsync(ct),
        };
        if (p.ProcesoOrigenId is { } oid && await db.ProcesosEvaluados.AsNoTracking().Include(x => x.Diagnostico).FirstOrDefaultAsync(x => x.Id == oid, ct) is { } origen)
        {
            borrador.HorasMesEstimadas = Roi.Calcular(origen, origen.Diagnostico!.CostoHora).HorasLiberadasMes;
            borrador.CostoHora = origen.CostoHora ?? origen.Diagnostico.CostoHora;
            borrador.MinutosPorCaso = origen.MinutosPorEjecucion;
            borrador.DesdeDiagnostico = true;
        }
        return borrador;
    }

    // Ticks off "Puesta en producción: …", the process's last task.
    public static async Task MarcarTareaAsync(AppDbContext db, ProcesoProyecto p, CancellationToken ct)
    {
        var titulo = $"Puesta en producción: {p.Nombre}";
        var proyecto = await db.Proyectos.Include(x => x.Tareas).Include(x => x.Hitos).AsSplitQuery().FirstAsync(x => x.Id == p.ProyectoId, ct);
        foreach (var tarea in proyecto.Tareas.Where(t => t.Titulo == titulo && t.Estado != TareaEstado.Hecha))
        {
            tarea.Estado = TareaEstado.Hecha;
            tarea.CompletadaAtUtc = DateTime.UtcNow;
            tarea.Bloqueo = null;
            ProyectoPlan.Sincronizar(proyecto, proyecto.Hitos.FirstOrDefault(h => h.Id == tarea.HitoId));
        }
        proyecto.UpdatedAtUtc = DateTime.UtcNow;
    }
}
