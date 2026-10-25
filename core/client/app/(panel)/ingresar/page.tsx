"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Loader2, ShieldAlert } from "lucide-react";
import { GlowBackdrop } from "@/components/layout/glow-backdrop";
import { useAuth } from "@/hooks/use-auth";
import { CLIENTS } from "@/lib/clients";
import { SITE } from "@/lib/site-config";

const FIELD_BASE =
  "h-12 w-full rounded-xl border bg-brand-50 px-4 text-sm text-ink-950 outline-none transition-colors placeholder:text-ink-400 focus:bg-white";

// A white card floating on grey: on the left a dark panel lit by a column
// of blue light with the tagline, on the right the sign-in form.
export default function IngresarPage() {
  const { register, errors, isSubmitting, locked, secondsLeft, onSubmit } = useAuth();
  const countdown = `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, "0")}`;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#e4e4e7] p-3 sm:p-6 lg:p-10">
      <div className="flex w-full max-w-6xl flex-col gap-3 rounded-[2rem] bg-white p-3 shadow-[0_30px_80px_-30px_rgb(10_10_11/0.35)] lg:min-h-[44rem] lg:flex-row">
        <div className="relative flex min-h-56 flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-8 lg:flex-[1.05] lg:p-10">
          <GlowBackdrop glow="beam" />

          <div className="relative flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/assets/icon.png" alt="" width={28} height={28} className="h-7 w-7" />
              <span className="whitespace-nowrap font-display text-[15px] font-semibold text-white">
                <span className="sm:hidden">{SITE.shortName}</span>
                <span className="hidden sm:inline">{SITE.name}</span>
              </span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-1.5 whitespace-nowrap text-sm text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al sitio
            </Link>
          </div>

          <div className="relative mt-16 hidden lg:block">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 py-1 pr-3 pl-1 text-xs text-white/85 backdrop-blur">
              <span className="flex -space-x-1.5">
                {["BCP", "AFP", "SCP"].map((sigla) => (
                  <span
                    key={sigla}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[8px] font-semibold text-ink-950 ring-2 ring-ink-950"
                  >
                    {sigla}
                  </span>
                ))}
              </span>
              Más de 30 empresas confían en DDS
            </span>
            <h1 className="mt-5 max-w-lg font-display text-5xl leading-[1.05] font-medium tracking-[-0.03em] text-white xl:text-6xl">
              {SITE.tagline}
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
              Gestiona el ciclo completo de tus clientes, de la oportunidad al
              bot en producción, desde un solo panel.
            </p>
          </div>
        </div>

        <main className="flex flex-1 flex-col justify-center px-4 py-10 sm:px-10 lg:px-14">
          <div className="w-full max-w-[26rem]">
            <Image src="/assets/icon.png" alt="" width={32} height={32} className="h-8 w-8" />
            <h2 className="mt-6 font-display text-3xl font-medium tracking-[-0.02em] text-ink-950 sm:text-4xl">
              Bienvenido de nuevo
            </h2>
            <p className="mt-2 text-sm text-ink-500">
              Ingresa para acceder al panel de administración.
            </p>
            <form onSubmit={onSubmit} noValidate className="mt-8 flex flex-col gap-5">
              <div>
                <label htmlFor="email" className="text-sm text-ink-950">
                  Correo
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@dds.pe"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`mt-2 ${FIELD_BASE} ${
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
                    placeholder="Ingresa tu contraseña"
                    aria-invalid={errors.password ? true : undefined}
                    aria-describedby={errors.password ? "password-error" : undefined}
                    className={`${FIELD_BASE} pr-11 ${
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
                <a
                  href={`mailto:${SITE.email}?subject=${encodeURIComponent(
                    "Restablecer contraseña del panel",
                  )}`}
                  className="text-sm text-ink-500 transition-colors hover:text-ink-950"
                >
                  ¿Olvidaste tu contraseña?
                </a>
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
              <ul className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-2">
                {CLIENTS.slice(0, 4).map((name) => (
                  <li key={name} className="font-display text-lg font-semibold tracking-tight text-ink-950">
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
