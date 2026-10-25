"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CircleCheck, Eye, EyeOff, Link2Off, Loader2 } from "lucide-react";
import { sileo } from "sileo";
import { AUTH_BUTTON, AUTH_FIELD, authFieldState } from "@/components/auth/auth-shell";

type Estado = "verificando" | "invalido" | "listo" | "hecho";

async function post(path: string, body: unknown) {
  const response = await fetch(`/api/auth/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = response.status === 204 ? null : await response.json().catch(() => null);
  return { ok: response.ok, status: response.status, message: (data?.message as string | undefined) ?? null };
}

// Checks the link first (it may have expired or been used), then sets the
// new password with it.
export function RestablecerForm({ token }: { token: string }) {
  const [estado, setEstado] = useState<Estado>(token ? "verificando" : "invalido");
  const [motivo, setMotivo] = useState<string | null>(null);
  const [nueva, setNueva] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [ver, setVer] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (!token) return;
    let vigente = true;
    post("restablecer/verificar", { token })
      .then((r) => {
        if (!vigente) return;
        if (r.ok) setEstado("listo");
        else {
          setMotivo(r.status === 429 ? r.message : null);
          setEstado("invalido");
        }
      })
      .catch(() => vigente && setEstado("invalido"));
    return () => {
      vigente = false;
    };
  }, [token]);

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    if (nueva.length < 8) return setError("La nueva contraseña debe tener al menos 8 caracteres.");
    if (nueva !== confirmar) return setError("Las contraseñas no coinciden.");
    setError(null);
    setGuardando(true);
    try {
      const r = await post("restablecer", { token, nueva });
      if (r.ok) {
        setEstado("hecho");
        return;
      }
      if (r.status === 400 && r.message?.startsWith("El enlace")) {
        setEstado("invalido");
        return;
      }
      sileo.error({ title: "No se pudo guardar la contraseña", description: r.message ?? "Intenta de nuevo." });
    } catch {
      sileo.error({ title: "No se pudo guardar la contraseña", description: "Ocurrió un error de conexión. Intenta de nuevo." });
    } finally {
      setGuardando(false);
    }
  }

  if (estado === "verificando")
    return (
      <p className="mt-8 flex items-center gap-2 text-sm text-ink-500">
        <Loader2 className="h-4 w-4 animate-spin" />
        Revisando el enlace...
      </p>
    );

  if (estado === "invalido")
    return (
      <div className="mt-8">
        <p role="alert" className="flex items-start gap-3 rounded-xl bg-brand-50 px-4 py-4 text-sm text-ink-700">
          <Link2Off className="mt-0.5 h-5 w-5 shrink-0 text-ink-500" />
          <span>{motivo ?? "Este enlace venció o ya se usó. Los enlaces duran 30 minutos y sirven una sola vez."}</span>
        </p>
        <Link href="/recuperar" className={`mt-6 ${AUTH_BUTTON}`}>
          Pedir un enlace nuevo
        </Link>
      </div>
    );

  if (estado === "hecho")
    return (
      <div className="mt-8">
        <p role="status" className="flex items-start gap-3 rounded-xl bg-brand-50 px-4 py-4 text-sm text-ink-700">
          <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
          <span>Listo: tu contraseña cambió y cerramos las sesiones que tenías abiertas. Ya puedes ingresar con la nueva.</span>
        </p>
        <Link href="/ingresar" className={`mt-6 ${AUTH_BUTTON}`}>
          Ir a ingresar
        </Link>
      </div>
    );

  return (
    <form onSubmit={guardar} noValidate className="mt-8 flex flex-col gap-5">
      <div>
        <label htmlFor="nueva" className="text-sm text-ink-950">
          Nueva contraseña
        </label>
        <div className="relative mt-2">
          <input
            id="nueva"
            type={ver ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Mínimo 8 caracteres"
            value={nueva}
            maxLength={128}
            onChange={(e) => setNueva(e.target.value)}
            className={`${AUTH_FIELD} pr-11 ${authFieldState(!!error)}`}
          />
          <button
            type="button"
            onClick={() => setVer((v) => !v)}
            aria-label={ver ? "Ocultar contraseña" : "Mostrar contraseña"}
            className="absolute top-1/2 right-3.5 -translate-y-1/2 text-ink-400 hover:text-ink-950"
          >
            {ver ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <div>
        <label htmlFor="confirmar" className="text-sm text-ink-950">
          Repite la nueva contraseña
        </label>
        <input
          id="confirmar"
          type={ver ? "text" : "password"}
          autoComplete="new-password"
          value={confirmar}
          maxLength={128}
          onChange={(e) => setConfirmar(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "clave-error" : undefined}
          className={`mt-2 ${AUTH_FIELD} ${authFieldState(!!error)}`}
        />
        {error && (
          <p id="clave-error" className="mt-1.5 text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
      <button type="submit" disabled={guardando} className={`mt-2 ${AUTH_BUTTON}`}>
        {guardando && <Loader2 className="h-4 w-4 animate-spin" />}
        {guardando ? "Guardando..." : "Guardar contraseña"}
      </button>
      <Link href="/ingresar" className="inline-flex items-center gap-1.5 text-sm text-ink-500 transition-colors hover:text-ink-950">
        <ArrowLeft className="h-4 w-4" />
        Volver a ingresar
      </Link>
    </form>
  );
}
