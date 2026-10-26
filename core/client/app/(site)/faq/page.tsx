import { PageHero } from "@/components/sections/page-hero";
import { FaqGroups } from "@/components/sections/faq-groups";
import { CtaBanner } from "@/components/sections/cta-banner";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "Preguntas Frecuentes sobre Automatización, Analítica y Transformación Digital | DDS",
  description: "Conoce cómo trabajamos y cómo podemos ayudarte a transformar tu negocio con automatización, analítica e inteligencia artificial.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHero
        heading="Preguntas frecuentes sobre automatización, analítica y transformación digital"
        label="Preguntas frecuentes"
        intro="Conoce cómo trabajamos y cómo podemos ayudarte a transformar tu negocio."
      />
      <FaqGroups />
      <CtaBanner
        heading="¿Aún tienes dudas? Revisamos tu caso sin compromiso."
        buttonLabel="Contáctanos ahora"
        note={`WhatsApp ${SITE.phone} · ${SITE.email}`}
      />
    </>
  );
}
