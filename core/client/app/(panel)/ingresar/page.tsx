"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2, ShieldAlert } from "lucide-react";
import { AUTH_FIELD, AuthShell } from "@/components/auth/auth-shell";
import { ClientLogo } from "@/components/ui/client-logo";
import { useAuth } from "@/hooks/use-auth";
import { CLIENTS } from "@/lib/clients";
import { SITE } from "@/lib/site-config";

// This is a public demo with fictitious data: the fields show the demo
// admin's credentials so visitors know how to get in.
const DEMO = { email: "admin@dds.pe", password: "Admin123!" };

export default function IngresarPage() {
  const { register, errors, isSubmitting, locked, secondsLeft, onSubmit } = useAuth();
  const countdown = `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, "0")}`;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthShell title="Bienvenido de nuevo" description="Ingresa para acceder al panel de administración.">
      <form onSubmit={onSubmit} noValidate className="mt-8 flex flex-col gap-5">
        <div>
          <label htmlFor="email" className="text-sm text-ink-950">
            Correo
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder={DEMO.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`mt-2 ${AUTH_FIELD} ${
              errors.email ? "border-red-400 focus:border-red-500" : "border-transparent focus:border-ink-400"
            }`}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="text-sm text-ink-950">
            Contraseña
          </label>
          <div className="relative mt-2">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder={DEMO.password}
              aria-invalid={errors.password ? true : undefined}
              aria-describedby={errors.password ? "password-error" : undefined}
              className={`${AUTH_FIELD} pr-11 ${
                errors.password ? "border-red-400 focus:border-red-500" : "border-transparent focus:border-ink-400"
              }`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-950"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="mt-1.5 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 text-sm text-ink-500">
            <input
              type="checkbox"
              className="h-4 w-4 rounded-[4px] border-line accent-ink-950"
              {...register("rememberMe")}
            />
            Recordarme
          </label>
          <Link href="/recuperar" className="text-sm text-ink-500 transition-colors hover:text-ink-950">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {locked && (
          <p
            role="status"
            className="flex items-start gap-2.5 rounded-xl bg-brand-50 px-4 py-3 text-sm text-ink-700"
          >
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
            <span>
              Por seguridad pausamos el ingreso tras varios intentos. Podrás intentarlo de nuevo en{" "}
              <span className="font-semibold text-ink-950 tabular-nums">{countdown}</span>.
            </span>
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || locked}
          className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(to_bottom,var(--color-ink-800),var(--color-ink-950))] text-base font-medium text-white shadow-button transition-[filter,opacity] hover:brightness-125 disabled:opacity-60"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting ? "Ingresando..." : locked ? `Espera ${countdown}` : "Ingresar"}
        </button>
      </form>

      <p className="mt-8 text-sm text-ink-500">
        ¿No tienes cuenta?{" "}
        <a
          href={`mailto:${SITE.email}?subject=${encodeURIComponent(
            "Solicitud de acceso al panel",
          )}`}
          className="font-medium text-ink-950 hover:underline"
        >
          Solicita acceso
        </a>
      </p>

      <div className="mt-14">
        <p className="text-sm text-ink-950">Trabajan con nosotros</p>
        <ul className="mt-4 grid grid-cols-3 items-center gap-x-4 gap-y-3">
          {CLIENTS.slice(0, 6).map((client) => (
            <li key={client.name}>
              <ClientLogo client={client} />
            </li>
          ))}
        </ul>
      </div>
    </AuthShell>
  );
}
