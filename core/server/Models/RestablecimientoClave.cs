namespace Server.Models;

// A password reset requested from the sign-in page: a one-time link e-mailed
// to the user. Only the SHA-256 of the link's token is stored, so a copy of
// the database can't be used to reset anyone's password.
public class RestablecimientoClave
{
    public int Id { get; set; }
    public int UsuarioId { get; set; }
    public AdminUser? Usuario { get; set; }

    // Hex SHA-256 of the token sent in the link.
    public required string TokenHash { get; set; }
    public DateTime ExpiraAtUtc { get; set; }
    // Set once it's used, or when a newer link or a reset replaces it.
    public DateTime? UsadoAtUtc { get; set; }

    // Where it was requested from, for the record.
    public string? Ip { get; set; }
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
}
