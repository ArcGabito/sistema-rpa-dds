using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

namespace Server.Services;

// The public demo's account (Demo:Email / Demo:Password; without both there's
// none). The sign-in page shows its credentials, so it has a limited role —
// Comercial by default: no vault, users or deletions — and nobody can lock the
// other visitors out with it: every startup restores it, it can't change its
// password and the per-account lockout doesn't apply to it (the per-IP login
// limit still does).
public static class CuentaDemo
{
    public static string? Email(IConfiguration config)
    {
        var email = config["Demo:Email"]?.Trim().ToLowerInvariant();
        return string.IsNullOrEmpty(email) || string.IsNullOrEmpty(config["Demo:Password"]) ? null : email;
    }

    public static bool Es(IConfiguration config, string? email) =>
        Email(config) is { } demo && demo == email?.Trim().ToLowerInvariant();
}

public static class DemoSeeder
{
    public static async Task SeedAsync(AppDbContext db, IConfiguration config, ILogger logger)
    {
        if (CuentaDemo.Email(config) is not { } email) return;

        var password = config["Demo:Password"]!;
        var fullName = config["Demo:FullName"] ?? "Usuario Demo";
        var role = config["Demo:Role"] ?? AdminRole.Comercial;
        if (!AdminRole.All.Contains(role) || role == AdminRole.Admin)
        {
            logger.LogError(
                "Demo:Role '{Role}' no sirve para la cuenta demo (usa Comercial, Consultor o Soporte); no se crea.", role);
            return;
        }

        var hasher = new PasswordHasher<AdminUser>();
        var user = await db.AdminUsers.SingleOrDefaultAsync(u => u.Email == email);
        if (user is null)
        {
            user = new AdminUser { Email = email, FullName = fullName, PasswordHash = string.Empty, Role = role };
            user.PasswordHash = hasher.HashPassword(user, password);
            db.AdminUsers.Add(user);
            await db.SaveChangesAsync();
            logger.LogInformation("Cuenta demo creada: {Email} ({Role})", email, role);
            return;
        }

        // A misconfigured e-mail must never demote a real admin.
        if (user.Role == AdminRole.Admin)
        {
            logger.LogError("Demo:Email ({Email}) es de un administrador; no se usa como cuenta demo.", email);
            return;
        }

        // Only rewrites what drifted: rehashing on every startup isn't needed.
        if (hasher.VerifyHashedPassword(user, user.PasswordHash, password) == PasswordVerificationResult.Failed)
            user.PasswordHash = hasher.HashPassword(user, password);
        user.FullName = fullName;
        user.Role = role;
        user.Activo = true;
        await db.SaveChangesAsync();
    }
}
