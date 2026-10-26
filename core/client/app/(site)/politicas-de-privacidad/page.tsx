import { PageHero } from "@/components/sections/page-hero";
import { PrivacyContent } from "@/components/sections/privacy-content";
import { pageMetadata } from "@/lib/metadata";
import { PRIVACY_LAST_UPDATED } from "@/lib/privacy-data";

export const metadata = pageMetadata({
  title: "Políticas de Privacidad | Data Discovery Solutions",
  description: "Política de privacidad de Data Discovery Solutions S.A.C., alineada con la Ley N.° 29733 de Protección de Datos Personales del Perú.",
  path: "/politicas-de-privacidad",
});

export default function PoliticasDePrivacidadPage() {
  return (
    <>
      <PageHero heading="Políticas de Privacidad" label={`Actualizado el ${PRIVACY_LAST_UPDATED}`} />
      <PrivacyContent />
    </>
  );
}
