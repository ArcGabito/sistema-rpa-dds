import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GlowBackdrop } from "@/components/layout/glow-backdrop";
import { SITE } from "@/lib/site-config";

export const AUTH_FIELD =
  "h-12 w-full rounded-xl border bg-brand-50 px-4 text-sm text-ink-950 outline-none transition-colors placeholder:text-ink-400 focus:bg-white";

export const AUTH_BUTTON =
  "inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(to_bottom,var(--color-ink-800),var(--color-ink-950))] text-base font-medium text-white shadow-button transition-[filter,opacity] hover:brightness-125 disabled:opacity-60";

export function authFieldState(hasError: boolean) {
  return hasError ? "border-red-400 focus:border-red-500" : "border-transparent focus:border-ink-400";
}

// The sign-in pages (/ingresar, /recuperar, /restablecer): full screen,
// split in two — on the left a dark panel lit by a column of blue light with
// the tagline, on the right the page's own form under its title.
export function AuthShell({ title, description, children }: { title: string; description: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white lg:flex-row">
      <div className="relative flex min-h-56 flex-col justify-between overflow-hidden p-6 sm:p-8 lg:min-h-screen lg:flex-[1.05] lg:p-12 xl:p-16">
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

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-10 lg:px-14">
        <div className="w-full max-w-[26rem]">
          <Image src="/assets/icon.png" alt="" width={32} height={32} className="h-8 w-8" />
          <h2 className="mt-6 font-display text-3xl font-medium tracking-[-0.02em] text-ink-950 sm:text-4xl">{title}</h2>
          <p className="mt-2 text-sm text-ink-500">{description}</p>
          {children}
        </div>
      </main>
    </div>
  );
}
