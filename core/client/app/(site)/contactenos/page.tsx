import { PageHero } from "@/components/sections/page-hero";
import { ContactPanel } from "@/components/sections/contact-panel";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contáctenos | Data Discovery Solutions",
  description: "No solo implementamos tecnología, construimos confianza y resultados. Escríbenos y conversemos sobre tu proyecto.",
  path: "/contactenos",
});

// ?email= comes from the footer's "Conversemos" field.
export default async function ContactenosPage({ searchParams }: { searchParams: Promise<{ email?: string }> }) {
  const { email } = await searchParams;
  const defaultEmail = typeof email === "string" && email.length <= 256 ? email.trim() : undefined;

  return (
    <>
      <PageHero
        heading="Contáctenos"
        intro="No solo implementamos tecnología, construimos confianza y resultados. Nuestro compromiso es ayudarte a crecer con soluciones inteligentes y accesibles."
      />
      <ContactPanel defaultEmail={defaultEmail} />
    </>
  );
}
