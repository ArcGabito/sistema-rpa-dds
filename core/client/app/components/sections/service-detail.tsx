import { PageHero } from "@/components/sections/page-hero";
import { ServiceIntro } from "@/components/sections/service-intro";
import { ServicePillars } from "@/components/sections/service-pillars";
import { ServiceUseCase } from "@/components/sections/service-use-case";
import { ServiceProcess } from "@/components/sections/service-process";
import { CtaBanner } from "@/components/sections/cta-banner";
import type { Service } from "@/lib/services-data";
import { SITE } from "@/lib/site-config";

export function ServiceDetail({ service }: { service: Service }) {
  const useCases = service.useCases.map((useCase) => ({
    ...useCase,
    icon: <useCase.icon className="h-5 w-5" strokeWidth={1.75} />,
  }));

  return (
    <>
      <PageHero heading={service.title} intro={service.heroSubtitle} action={{ href: SITE.contactUrl, label: "Solicita una demo gratuita" }} />
      <ServiceIntro service={service} />
      <ServicePillars service={service} />
      <ServiceUseCase heading={service.useCasesHeading} intro={service.useCasesIntro} useCases={useCases} />
      <ServiceProcess service={service} />
      <CtaBanner heading="¿Conversamos sobre tu proyecto? Tu primera sesión de exploración es gratuita." buttonLabel="Solicita tu asesoría" />
    </>
  );
}
