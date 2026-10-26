import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CLIENTS, logoBlanco } from "@/lib/clients";
import { SITE } from "@/lib/site-config";

export const AUTH_FIELD =
  "h-11 w-full rounded-[6px] border bg-white px-4 text-sm text-ink-950 outline-none transition-colors placeholder:text-ink-400";

export const AUTH_BUTTON =
  "group inline-flex h-11 w-full items-center justify-between gap-3 rounded-[7px] bg-night-950 pr-1.5 pl-4 text-[13px] font-medium tracking-[-0.01em] text-white transition-colors hover:bg-night-800 disabled:opacity-60";

export const AUTH_LABEL = "font-mono text-[10px] font-medium tracking-[0.14em] text-ink-500 uppercase sm:text-[11px]";

export function authFieldState(hasError: boolean) {
  return hasError ? "border-red-400 focus:border-red-500" : "border-ink-950/10 focus:border-ink-950/40";
}

// The white square with an arrow at the end of the site's dark buttons.
export function ArrowSquare({ children }: { children?: React.ReactNode }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[5px] bg-white text-ink-950">
      {children ?? <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />}
    </span>
  );
}

const GLOW = [
  "radial-gradient(85% 60% at 50% 100%, #a9cbff 0%, #5b95f7 24%, rgb(37 99 235 / 0.75) 48%, rgb(29 78 216 / 0) 80%)",
  "linear-gradient(to bottom, rgb(19 19 21 / 0) 0%, rgb(30 64 175 / 0.3) 62%, rgb(59 130 246 / 0.9) 100%)",
].join(", ");

// The sign-in pages (/ingresar, /recuperar, /restablecer), in the public
// site's style: on the left a dark panel lit by the blue horizon, with the
// tagline and the clients' logos; on the right the page's own form.
export function AuthShell({ title, description, children }: { title: string; description: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-brand-50 lg:flex-row">
      <div className="relative flex min-h-64 flex-col overflow-hidden bg-night-950 lg:min-h-screen lg:flex-[1.05]">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]" style={{ backgroundImage: GLOW }} aria-hidden="true" />
        <div className="grain pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

        <div className="relative flex items-center justify-between gap-4 border-b border-white/[0.08] px-6 py-5 sm:px-10">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/assets/icon.png" alt="" width={28} height={28} className="h-7 w-7" />
            <span className="whitespace-nowrap font-display text-[15px] font-semibold tracking-[-0.02em] text-white">
              <span className="sm:hidden">{SITE.shortName}</span>
              <span className="hidden sm:inline">{SITE.name}</span>
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] whitespace-nowrap text-white/70 uppercase transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al sitio
          </Link>
        </div>

        <div className="relative hidden flex-1 flex-col justify-center px-10 lg:flex xl:px-16">
          <span className="inline-flex self-start rounded-full bg-white px-3 py-1 font-mono text-[10px] font-medium tracking-[0.14em] text-ink-950 uppercase">
            Panel de administración
          </span>
          <h1 className="mt-7 max-w-lg font-display text-5xl leading-[1.04] font-medium tracking-[-0.04em] text-white xl:text-6xl">
            {SITE.tagline}
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/60">
            Gestiona el ciclo completo de tus clientes, de la oportunidad al bot en producción, desde un solo panel.
          </p>
        </div>

        <div className="relative mt-auto hidden grid-cols-[1.2fr_repeat(3,1fr)] border-t border-white/15 lg:grid">
          <p className="px-10 py-6 text-[13px] leading-snug text-white">
            Más de 30 empresas
            <br /> confían en DDS
          </p>
          {CLIENTS.slice(0, 3).map((client) => (
            <div key={client.name} className="flex items-center justify-center border-l border-white/15 px-3 py-6">
              <Image src={logoBlanco(client)} alt={client.name} width={150} height={50} className="h-8 w-auto" />
            </div>
          ))}
        </div>
      </div>

      <main className="flex flex-1 flex-col items-center justify-center px-5 py-12 sm:px-10 lg:px-14">
        <div className="w-full max-w-[26rem]">
          <Image src="/assets/icon.png" alt="" width={32} height={32} className="h-8 w-8" />
          <h2 className="mt-6 font-display text-[2rem] leading-[1.08] font-semibold tracking-[-0.04em] text-ink-950 sm:text-[2.4rem]">{title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-500">{description}</p>
          {children}
        </div>
      </main>
    </div>
  );
}
