import Image from "next/image";
import Link from "next/link";
import { GlowBackdrop } from "@/components/layout/glow-backdrop";
import { Container } from "@/components/ui/container";
import { SERVICES } from "@/lib/services-data";
import { SITE } from "@/lib/site-config";

const COMPANY_LINKS = [
  { label: "Sobre DDS", href: SITE.aboutUrl },
  { label: "Nuestro Proceso", href: "/#proceso" },
  { label: "Visión, Misión y Valores", href: SITE.visionMisionUrl },
];

const LINK = "text-sm text-white/60 transition-colors hover:text-white";
const HEADING = "font-mono text-[11px] font-medium tracking-[0.12em] text-white/40 uppercase";

// Dark footer over a faint glow: the newsletter on a glass card, link
// columns with monospace headings, and the legal row below.
export function Footer() {
  return (
    <footer className="relative overflow-hidden pt-14 pb-8">
      <GlowBackdrop glow="low" />
      <Container className="relative">
        <div className="flex flex-col gap-6 rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="font-display text-xl font-medium tracking-[-0.01em] text-white">
              Ideas que transforman con IA, RPA y Analítica
            </h2>
            <p className="mt-2 max-w-md text-sm text-white/60">
              Nuestro newsletter mensual en LinkedIn te conecta con casos de
              éxito, estrategias y herramientas que están revolucionando
              empresas en Perú.
            </p>
          </div>
          <a
            href={SITE.linkedinNewsletter}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 shrink-0 items-center justify-center rounded-md bg-white px-5 text-sm font-medium text-ink-950 transition-colors hover:bg-white/85"
          >
            Suscribirte en LinkedIn
          </a>
        </div>

        <div className="grid gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image src="/assets/icon.png" alt="" width={28} height={28} className="h-7 w-7" />
              <span className="font-display text-[15px] font-semibold text-white">{SITE.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Sabemos que gestionar un negocio puede ser caótico. Ahí es
              donde entramos nosotros: claridad, eficiencia y control con
              soluciones inteligentes.
            </p>
            <div className="mt-5 flex gap-4">
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className={LINK}>
                LinkedIn
              </a>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={LINK}>
                Instagram
              </a>
              <Link href="/ingresar" className={LINK}>
                Panel
              </Link>
            </div>
          </div>

          <div>
            <p className={HEADING}>Soluciones</p>
            <ul className="mt-4 flex flex-col gap-3">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link href={`/${service.slug}`} className={LINK}>
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={SITE.faqUrl} className={LINK}>
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className={HEADING}>Empresa</p>
            <ul className="mt-4 flex flex-col gap-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={LINK}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={HEADING}>Contacto</p>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              <li>
                <a href={`mailto:${SITE.email}`} className={LINK}>
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className={LINK}>
                  WhatsApp: {SITE.phoneDisplay}
                </a>
              </li>
              <li>{SITE.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] tracking-[0.06em] text-white/40 uppercase">
            © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
          </p>
          <Link href={SITE.privacyUrl} className="font-mono text-[11px] tracking-[0.06em] text-white/40 uppercase hover:text-white">
            Política de Privacidad
          </Link>
        </div>
      </Container>
    </footer>
  );
}
