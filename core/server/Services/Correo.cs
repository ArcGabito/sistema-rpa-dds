using System.Threading.Channels;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace Server.Services;

// Outgoing mail over SMTP, configured under "Correo" (Host, Puerto, Usuario,
// Clave, Remitente). Messages are queued and sent in the background, so a
// request that sends one (a password reset) answers at once and takes the
// same time whether or not it actually sent anything. Without a host,
// nothing is sent and each message is logged as dropped (never its content,
// which may hold a reset link).
public sealed class Correo(IConfiguration config, ILogger<Correo> logger) : BackgroundService
{
    public sealed record Mensaje(string Para, string Asunto, string Texto, string Html);

    private readonly Channel<Mensaje> cola = Channel.CreateBounded<Mensaje>(new BoundedChannelOptions(500)
    {
        FullMode = BoundedChannelFullMode.DropWrite,
    });

    private string? Host => config["Correo:Host"] is { Length: > 0 } h ? h : null;

    public bool Configurado => Host is not null && config["Correo:Remitente"] is { Length: > 0 };

    public void Encolar(Mensaje mensaje)
    {
        if (!Configurado)
        {
            logger.LogError("Correo sin configurar (Correo:Host y Correo:Remitente): no se envió «{Asunto}» a {Para}", mensaje.Asunto, mensaje.Para);
            return;
        }
        if (!cola.Writer.TryWrite(mensaje))
            logger.LogError("Cola de correo llena: no se envió «{Asunto}» a {Para}", mensaje.Asunto, mensaje.Para);
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await foreach (var mensaje in cola.Reader.ReadAllAsync(stoppingToken))
        {
            try
            {
                await EnviarAsync(mensaje, stoppingToken);
                logger.LogInformation("Correo «{Asunto}» enviado a {Para}", mensaje.Asunto, mensaje.Para);
            }
            catch (Exception e) when (e is not OperationCanceledException)
            {
                logger.LogError(e, "No se pudo enviar «{Asunto}» a {Para}", mensaje.Asunto, mensaje.Para);
            }
        }
    }

    private async Task EnviarAsync(Mensaje mensaje, CancellationToken ct)
    {
        var email = new MimeMessage();
        email.From.Add(MailboxAddress.Parse(config["Correo:Remitente"]!));
        email.To.Add(MailboxAddress.Parse(mensaje.Para));
        email.Subject = mensaje.Asunto;
        email.Body = new BodyBuilder { TextBody = mensaje.Texto, HtmlBody = mensaje.Html }.ToMessageBody();

        var puerto = int.TryParse(config["Correo:Puerto"], out var p) ? p : 587;
        // 465 is TLS from the first byte; anything else upgrades with
        // STARTTLS when the server offers it (required on 587).
        var seguridad = puerto == 465 ? SecureSocketOptions.SslOnConnect : SecureSocketOptions.StartTlsWhenAvailable;

        using var smtp = new SmtpClient { Timeout = 30_000 };
        await smtp.ConnectAsync(Host!, puerto, seguridad, ct);
        if (config["Correo:Usuario"] is { Length: > 0 } usuario)
            await smtp.AuthenticateAsync(usuario, config["Correo:Clave"] ?? "", ct);
        await smtp.SendAsync(email, ct);
        await smtp.DisconnectAsync(true, ct);
    }
}
