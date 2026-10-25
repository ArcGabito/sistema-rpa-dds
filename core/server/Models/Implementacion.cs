namespace Server.Models;

public static class ItemPaseEstado
{
    public const string Pendiente = "pendiente";
    public const string Hecho = "hecho";
    // Doesn't apply to this bot (no licenses for a Python script, say).
    public const string NoAplica = "no_aplica";

    public static readonly string[] All = [Pendiente, Hecho, NoAplica];
}

// One item of a process's go-live checklist (Services/PaseProduccion.cs
// lists them). A row exists once someone has marked it; until then it's
// pending.
public class ItemPase
{
    public int Id { get; set; }
    public int ProcesoProyectoId { get; set; }
    public ProcesoProyecto? ProcesoProyecto { get; set; }

    public required string Clave { get; set; }
    public required string Estado { get; set; }
    // Who approved it, where it's kept, why it doesn't apply.
    public string? Nota { get; set; }

    public int? ActualizadoPorId { get; set; }
    public AdminUser? ActualizadoPor { get; set; }
    public DateTime ActualizadoAtUtc { get; set; } = DateTime.UtcNow;
}
