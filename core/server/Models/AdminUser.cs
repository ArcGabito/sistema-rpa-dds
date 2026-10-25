namespace Server.Models;

public class AdminUser
{
    public int Id { get; set; }
    public required string Email { get; set; }
    public required string PasswordHash { get; set; }
    public required string FullName { get; set; }
    public required string Role { get; set; }

    // A deactivated user can't sign in, and their open sessions stop
    // working; their name stays on everything they did.
    public bool Activo { get; set; } = true;

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime? LastLoginAtUtc { get; set; }

    // Sessions started before this stop working: set when the password is
    // reset from an e-mailed link, in case someone else had the old one.
    public DateTime? SesionesDesdeUtc { get; set; }

    // Where this user differs from their role's preset.
    public List<PermisoUsuario> Permisos { get; set; } = [];
}
