using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos;
using Server.Models;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(
    AppDbContext db,
    PasswordHasher<AdminUser> passwordHasher,
    TokenService tokenService,
    LoginThrottle throttle,
    PermisosService permisos,
    Correo correo,
    IConfiguration config,
    ILogger<AuthController> logger
) : ControllerBase
{
    private const string RespuestaRecuperar =
        "Si el correo pertenece a un usuario activo, en unos minutos recibirás un enlace para elegir una nueva contraseña.";
    [HttpPost("login")]
    [EnableRateLimiting(RateLimiting.Login)]
    public async Task<ActionResult<LoginResponse>> Login(LoginRequest request)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        if (throttle.Bloqueo(email) is { } espera)
        {
            logger.LogWarning("Inicio de sesión bloqueado para {Email} por intentos fallidos", email);
            await RateLimiting.WriteTooManyAsync(HttpContext, espera);
            return new EmptyResult();
        }

        var user = await db.AdminUsers.SingleOrDefaultAsync(u => u.Email == email);
        if (user is null || passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password) == PasswordVerificationResult.Failed)
        {
            throttle.Fallo(email);
            logger.LogWarning("Intento de inicio de sesión fallido para {Email}", email);
            return Unauthorized(new { message = "Correo o contraseña incorrectos." });
        }
        throttle.Exito(email);
        // Checked after the password, so it doesn't reveal which accounts exist.
        if (!user.Activo)
            return Unauthorized(new { message = "Tu usuario está desactivado. Pide a un administrador que lo reactive." });

        user.LastLoginAtUtc = DateTime.UtcNow;
        await db.SaveChangesAsync();

        var (token, expiresIn) = tokenService.CreateToken(user, request.RememberMe);

        return Ok(new LoginResponse
        {
            Token = token,
            ExpiresInSeconds = expiresIn,
            User = new AdminUserResponse
            {
                Id = user.Id,
                Email = user.Email,
                FullName = user.FullName,
                Role = user.Role,
            },
        });
    }

    // The signed-in user and their effective permissions (PermisosFilter has
    // already checked they exist and are active).
    [HttpGet("me")]
    [Authorize]
    public async Task<ActionResult<MeResponse>> Me(CancellationToken ct)
    {
        var p = HttpContext.Permisos();
        var user = await db.AdminUsers.AsNoTracking().FirstAsync(u => u.Id == p.UsuarioId, ct);
        return Ok(new MeResponse
        {
            Id = user.Id,
            Email = user.Email,
            FullName = user.FullName,
            Role = user.Role,
            RoleLabel = AdminRole.Label(user.Role),
            EsAdmin = p.EsAdmin,
            Permisos = Modulo.All.ToDictionary(m => m, p.Nivel),
        });
    }

    // Changing one's own password needs the current one. Limited like the
    // login, since it also tells whether a password is right.
    [HttpPost("clave")]
    [Authorize]
    [EnableRateLimiting(RateLimiting.Login)]
    public async Task<IActionResult> CambiarClave(CambiarClaveRequest request, CancellationToken ct)
    {
        var user = await db.AdminUsers.FirstAsync(u => u.Id == HttpContext.Permisos().UsuarioId, ct);
        if (passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Actual) == PasswordVerificationResult.Failed)
            return BadRequest(new { message = "La contraseña actual no es correcta." });
        if (request.Actual == request.Nueva)
            return BadRequest(new { message = "La nueva contraseña debe ser distinta de la actual." });

        user.PasswordHash = passwordHasher.HashPassword(user, request.Nueva);
        await db.SaveChangesAsync(ct);
        permisos.Invalidar(user.Id);
        logger.LogInformation("{Email} cambió su contraseña", user.Email);
        return NoContent();
    }

    // --- Forgotten password --------------------------------------------------

    // E-mails a one-time link (Services/EnlaceClave.cs). The answer is the
    // same whether or not the account exists, is active or got a mail, and
    // sending happens in the background, so it doesn't reveal any of that.
    [HttpPost("recuperar")]
    [EnableRateLimiting(RateLimiting.Recuperar)]
    public async Task<IActionResult> Recuperar(RecuperarClaveRequest request, CancellationToken ct)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var user = await db.AdminUsers.SingleOrDefaultAsync(u => u.Email == email && u.Activo, ct);
        if (user is null)
        {
            logger.LogInformation("Recuperación de contraseña pedida para un correo sin usuario activo");
            return Ok(new { message = RespuestaRecuperar });
        }

        var ahora = DateTime.UtcNow;
        var recientes = await db.RestablecimientosClave.CountAsync(r => r.UsuarioId == user.Id && r.CreatedAtUtc > ahora.AddHours(-1), ct);
        if (recientes >= EnlaceClave.MaximoPorHora)
        {
            logger.LogWarning("{Email} ya pidió {Cantidad} enlaces en la última hora: no se envía otro", email, recientes);
            return Ok(new { message = RespuestaRecuperar });
        }
        if (config["App:SiteUrl"] is not { Length: > 0 } siteUrl)
        {
            logger.LogError("Falta App:SiteUrl: no se puede armar el enlace de recuperación para {Email}", email);
            return Ok(new { message = RespuestaRecuperar });
        }

        // Only the newest link works.
        await db.RestablecimientosClave
            .Where(r => r.UsuarioId == user.Id && r.UsadoAtUtc == null)
            .ExecuteUpdateAsync(set => set.SetProperty(r => r.UsadoAtUtc, ahora), ct);

        var token = EnlaceClave.NuevoToken();
        db.RestablecimientosClave.Add(new RestablecimientoClave
        {
            UsuarioId = user.Id,
            TokenHash = EnlaceClave.Hash(token),
            ExpiraAtUtc = ahora + EnlaceClave.Vigencia,
            Ip = ClientIp.Resolve(HttpContext),
        });
        await db.SaveChangesAsync(ct);
        correo.Encolar(EnlaceClave.Mensaje(user.Email, user.FullName, siteUrl, token));
        logger.LogInformation("Enlace de recuperación de contraseña generado para {Email}", email);
        return Ok(new { message = RespuestaRecuperar });
    }

    // Whether a link still works, so the page can say so before asking for
    // a password.
    [HttpPost("restablecer/verificar")]
    [EnableRateLimiting(RateLimiting.Recuperar)]
    public async Task<IActionResult> VerificarEnlace(VerificarEnlaceRequest request, CancellationToken ct) =>
        await BuscarEnlaceAsync(request.Token, ct) is null ? EnlaceInvalido() : NoContent();

    // Sets the new password, uses up the link and ends every open session of
    // the account (someone else may have had the old password).
    [HttpPost("restablecer")]
    [EnableRateLimiting(RateLimiting.Recuperar)]
    public async Task<IActionResult> Restablecer(RestablecerClaveRequest request, CancellationToken ct)
    {
        if (await BuscarEnlaceAsync(request.Token, ct) is not { } enlace) return EnlaceInvalido();
        var user = enlace.Usuario!;
        var ahora = DateTime.UtcNow;

        user.PasswordHash = passwordHasher.HashPassword(user, request.Nueva);
        user.SesionesDesdeUtc = ahora;
        enlace.UsadoAtUtc = ahora;
        await db.SaveChangesAsync(ct);
        await db.RestablecimientosClave
            .Where(r => r.UsuarioId == user.Id && r.UsadoAtUtc == null)
            .ExecuteUpdateAsync(set => set.SetProperty(r => r.UsadoAtUtc, ahora), ct);

        permisos.Invalidar(user.Id);
        throttle.Exito(user.Email);
        logger.LogInformation("{Email} restableció su contraseña con un enlace por correo", user.Email);
        return NoContent();
    }

    private async Task<RestablecimientoClave?> BuscarEnlaceAsync(string token, CancellationToken ct)
    {
        var hash = EnlaceClave.Hash(token.Trim());
        var enlace = await db.RestablecimientosClave.Include(r => r.Usuario).FirstOrDefaultAsync(r => r.TokenHash == hash, ct);
        return enlace is { UsadoAtUtc: null, Usuario.Activo: true } && enlace.ExpiraAtUtc > DateTime.UtcNow ? enlace : null;
    }

    private BadRequestObjectResult EnlaceInvalido() =>
        BadRequest(new { message = "El enlace venció o ya se usó. Pide uno nuevo desde «¿Olvidaste tu contraseña?»." });
}
