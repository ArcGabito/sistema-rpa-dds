"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";
import { sileo } from "sileo";
import { AUTH_BUTTON, AUTH_FIELD, AuthShell, authFieldState } from "@/components/auth/auth-shell";

// "¿Olvidaste tu contraseña?": asks for the e-mail and has the API send a
// one-time link. The answer is the same whether or not the account exists.
export default function RecuperarPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState<string | null>(null);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Ingresa un correo válido.");
      return;
    }
    setError(null);
    setEnviando(true);
    try {
      const response = await fetch("/api/auth/recuperar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        sileo.error({ title: "No se pudo enviar el enlace", description: data?.message ?? "Intenta de nuevo." });
        return;
      }
      setEnviado(data?.message ?? "Revisa tu correo.");
    } catch {
      sileo.error({ title: "No se pudo enviar el enlace", description: "Ocurrió un error de conexión. Intenta de nuevo." });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <AuthShell title="Recupera tu acceso" description="Te enviaremos un enlace para elegir una nueva contraseña.">
      {enviado ? (
        <div className="mt-8">
          <p role="status" className="flex items-start gap-3 rounded-xl bg-brand-50 px-4 py-4 text-sm text-ink-700">
            <MailCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
            <span>
              {enviado} El enlace vence en 30 minutos y sirve una sola vez. Si no llega, revisa la carpeta de spam.
            </span>
          </p>
          <button type="button" onClick={() => setEnviado(null)} className="mt-4 text-sm text-ink-500 hover:text-ink-950">
            Usar otro correo
          </button>
        </div>
      ) : (
        <form onSubmit={enviar} noValidate className="mt-8 flex flex-col gap-5">
          <div>
            <label htmlFor="email" className="text-sm text-ink-950">
              Correo
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="tu@dds.pe"
              value={email}
              maxLength={256}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "email-error" : undefined}
              className={`mt-2 ${AUTH_FIELD} ${authFieldState(!!error)}`}
            />
            {error && (
              <p id="email-error" className="mt-1.5 text-xs text-red-500">
                {error}
              </p>
            )}
          </div>
          <button type="submit" disabled={enviando} className={`mt-2 ${AUTH_BUTTON}`}>
            {enviando && <Loader2 className="h-4 w-4 animate-spin" />}
            {enviando ? "Enviando..." : "Enviar enlace"}
          </button>
        </form>
      )}

      <Link href="/ingresar" className="mt-8 inline-flex items-center gap-1.5 text-sm text-ink-500 transition-colors hover:text-ink-950">
        <ArrowLeft className="h-4 w-4" />
        Volver a ingresar
      </Link>
    </AuthShell>
  );
}
