import { Hero } from "@/components/sections/hero";
import { Approach } from "@/components/sections/approach";
import { WhyUs } from "@/components/sections/why-us";
import { Expertise } from "@/components/sections/expertise";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Ecosystem } from "@/components/sections/ecosystem";
import { Faq } from "@/components/sections/faq";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <Approach />
      <WhyUs />
      <Expertise />
      <CtaBanner heading="Sin intermediarios. Habla directo con quienes lo construyen." buttonLabel="Solicita tu diagnóstico" />
      <Ecosystem />
      <Faq />
    </>
  );
}
