using System.ComponentModel.DataAnnotations;

namespace Server.Dtos;

public class EtapaRequest
{
    [Required] public required string Etapa { get; set; }
}

public class ItemPaseRequest
{
    [Required] public required string Estado { get; set; }
    [MaxLength(500)] public string? Nota { get; set; }
}

public class ImplementacionListItem
{
    public int Id { get; set; }
    public string Nombre { get; set; } = "";
    public string Servicio { get; set; } = "";
    public string Etapa { get; set; } = "";
    public string PddEstado { get; set; } = "";
    public int PddVersion { get; set; }
    public int ProyectoId { get; set; }
    public string ProyectoNombre { get; set; } = "";
    public int EmpresaId { get; set; }
    public string EmpresaNombre { get; set; } = "";
    // The checklist, the PDD's approval included.
    public int ItemsListos { get; set; }
    public int ItemsTotal { get; set; }
    public bool Listo { get; set; }
    public int? BotId { get; set; }
}

public class ItemPaseResponse
{
    public required string Clave { get; set; }
    public required string Titulo { get; set; }
    public required string Ayuda { get; set; }
    // Follows something else (the PDD); can't be marked by hand.
    public bool Automatico { get; set; }
    public bool PuedeNoAplicar { get; set; }
    public string? NotaLabel { get; set; }
    public bool NotaObligatoria { get; set; }
    public required string Estado { get; set; }
    public string? Nota { get; set; }
    public string? ActualizadoPor { get; set; }
    public DateTime? ActualizadoAtUtc { get; set; }
}

public class ImplementacionResponse : ImplementacionListItem
{
    public string? Area { get; set; }
    public string? PddAprobadoPor { get; set; }
    public DateTime? PddAprobadoAtUtc { get; set; }
    public required string ProyectoEstado { get; set; }
    public required List<ItemPaseResponse> Items { get; set; }
    public required List<string> Faltantes { get; set; }
    // What the vault and licenses hold for the company, to check against.
    public int SecretosCliente { get; set; }
    public int LicenciasCliente { get; set; }
    public required BorradorBotResponse Borrador { get; set; }
}
