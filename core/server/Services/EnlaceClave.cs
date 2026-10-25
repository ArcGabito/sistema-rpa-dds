using System.Net;
using System.Security.Cryptography;
using System.Text;

namespace Server.Services;

// The one-time links for resetting a password: a random token that goes in
// the e-mail and only its hash in the database. Each link lasts 30 minutes,
// works once, and an account gets at most 3 a hour (more requests are
// answered the same but send nothing, so the form can't flood an inbox).
public static class EnlaceClave
{
    public static readonly TimeSpan Vigencia = TimeSpan.FromMinutes(30);
    public const int MaximoPorHora = 3;

    // 32 random bytes, base64url: unguessable and safe in a URL.
    public static string NuevoToken() =>
        Convert.ToBase64String(RandomNumberGenerator.GetBytes(32)).TrimEnd('=').Replace('+', '-').Replace('/', '_');

    public static string Hash(string token) =>
        Convert.ToHexStringLower(SHA256.HashData(Encoding.UTF8.GetBytes(token)));

    // The panel's address comes from App:SiteUrl (the website that hosts
    // /restablecer), never from the request, so a forged Host header can't
    // make the e-mail point somewhere else.
    public static Correo.Mensaje Mensaje(string para, string nombre, string siteUrl, string token)
    {
        var enlace = $"{siteUrl.TrimEnd('/')}/restablecer?token={Uri.EscapeDataString(token)}";
        var minutos = (int)Vigencia.TotalMinutes;
        var texto =
            $"Hola, {nombre}:\n\n" +
            "Recibimos una solicitud para restablecer tu contraseña del panel de Data Discovery Solutions. " +
            $"Abre este enlace para elegir una nueva (vence en {minutos} minutos y sirve una sola vez):\n\n{enlace}\n\n" +
            "Si no lo pediste tú, ignora este correo: tu contraseña sigue igual.\n";
        var html =
            $"<p>Hola, {WebUtility.HtmlEncode(nombre)}:</p>" +
            "<p>Recibimos una solicitud para restablecer tu contraseña del panel de Data Discovery Solutions.</p>" +
            $"<p><a href=\"{WebUtility.HtmlEncode(enlace)}\" style=\"display:inline-block;padding:10px 18px;background:#0a0a0b;color:#fff;border-radius:8px;text-decoration:none\">Elegir una nueva contraseña</a></p>" +
            $"<p style=\"color:#71717a;font-size:13px\">El enlace vence en {minutos} minutos y sirve una sola vez. Si no lo pediste tú, ignora este correo: tu contraseña sigue igual.</p>";
        return new Correo.Mensaje(para, "Restablece tu contraseña", texto, html);
    }
}
