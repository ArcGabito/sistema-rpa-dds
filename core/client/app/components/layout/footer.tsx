import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Mark } from "@/components/ui/band";
import { SERVICES } from "@/lib/services-data";
import { SITE } from "@/lib/site-config";

const LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Sobre DDS", href: SITE.aboutUrl },
  ...SERVICES.map((service) => ({ label: service.title, href: `/${service.slug}` })),
  { label: "Preguntas frecuentes", href: SITE.faqUrl },
  { label: "Contáctenos", href: SITE.contactUrl },
  { label: "Panel", href: "/ingresar" },
];

const SOCIAL = [
  { label: "LinkedIn", href: SITE.linkedin },
  { label: "Instagram", href: SITE.instagram },
  { label: "WhatsApp", href: SITE.whatsapp },
];

const GLOW = [
  "radial-gradient(60% 75% at 50% 100%, #9cc3ff 0%, #4f8cf5 30%, rgb(37 99 235 / 0.65) 55%, rgb(29 78 216 / 0) 80%)",
  "linear-gradient(to bottom, rgb(19 19 21 / 0) 30%, rgb(30 64 175 / 0.35) 75%, rgb(59 130 246 / 0.8) 100%)",
].join(", ");

const MONO = "font-mono text-[11px] tracking-[0.12em] uppercase";

// Dark footer inside the page frame: the links on the left, "Conversemos"
// with an e-mail field on the right (it opens the contact form with the
// address filled in), and a large faded wordmark over the glow.
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night-950 text-white">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72" style={{ backgroundImage: GLOW }} aria-hidden="true" />
      <div className="grain pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

      <Container className="relative">
        <div className="relative border-x border-t border-white/[0.08]">
          <Mark tone="night" className="-top-[5px] -left-[5px]" />
          <Mark tone="night" className="-top-[5px] -right-[5px]" />

          <div className="grid lg:grid-cols-[0.75fr_1.25fr]">
            <div className="px-5 pt-14 pb-10 sm:px-10 lg:px-4 lg:pb-16">
              <Link href="/" className="flex items-center gap-2.5">
                <Image src="/assets/icon.png" alt="" width={28} height={28} className="h-7 w-7" />
                <span className="font-display text-[15px] font-semibold tracking-[-0.02em]">{SITE.name}</span>
              </Link>
              <ul className="mt-10 flex flex-col gap-4">
                {LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={`${MONO} text-white/55 transition-colors hover:text-white`}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="mt-10 flex gap-5">
                {SOCIAL.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className={`${MONO} text-white/40 transition-colors hover:text-white`}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/[0.08] px-5 pt-14 pb-16 sm:px-10 lg:border-t-0 lg:border-l lg:px-8">
              <h2 className="font-display text-5xl leading-none font-medium tracking-[-0.045em] uppercase sm:text-6xl">Conversemos</h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60">
                Si estás explorando la automatización o quieres claridad sobre por dónde empezar, estamos para ayudarte.
                También en{" "}
                <a href={`mailto:${SITE.email}`} className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                  {SITE.email}
                </a>
                .
              </p>
              <form action={SITE.contactUrl} method="get" className="mt-12 max-w-xl">
                <label htmlFor="footer-email" className="text-[13px] text-white/80">
                  Correo electrónico
                </label>
                <div className="flex items-center border-b border-brand-600">
                  <input
                    id="footer-email"
                    name="email"
                    type="email"
                    required
                    placeholder="Tu correo aquí"
                    className="h-11 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                  />
                  <button type="submit" aria-label="Continuar al formulario de contacto" className="p-2 text-white/80 hover:text-white">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-4 max-w-xs text-xs leading-relaxed text-white/40">
                  Al contactarnos aceptas nuestra{" "}
                  <Link href={SITE.privacyUrl} className="underline underline-offset-2 hover:text-white">
                    política de privacidad
                  </Link>
                  .
                </p>
              </form>
            </div>
          </div>

          <div className="flex flex-col gap-3 px-5 pt-6 sm:flex-row sm:items-center sm:justify-between sm:px-4">
            <a href="#" className={`${MONO} text-white underline underline-offset-4`}>
              Volver arriba
            </a>
            <p className={`${MONO} text-white/70`}>
              © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
            </p>
          </div>

          <p
            className="pointer-events-none mt-8 translate-y-[22%] bg-[linear-gradient(to_bottom,rgb(255_255_255/0.6),rgb(255_255_255/0.15))] bg-clip-text text-center font-display text-[clamp(2.75rem,11vw,9.5rem)] leading-[0.85] font-semibold tracking-[-0.05em] whitespace-nowrap text-transparent uppercase select-none"
            aria-hidden="true"
          >
            Data Discovery
          </p>
        </div>
      </Container>
    </footer>
  );
}
