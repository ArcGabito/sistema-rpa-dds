import { Band, H2, HAIRLINE, Mark, MonoLabel, lead } from "@/components/ui/band";
import { ContactForm } from "@/components/sections/contact-form";
import { SITE } from "@/lib/site-config";

const CHANNELS = [
  { label: "WhatsApp", value: SITE.phone, href: SITE.whatsapp },
  { label: "Correo", value: SITE.email, href: `mailto:${SITE.email}` },
  { label: "Horario", value: SITE.hours },
];

// The contact page: how to reach DDS on the left, the form on the right.
export function ContactPanel({ defaultEmail }: { defaultEmail?: string }) {
  return (
    <Band tone="paper">
      <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
        <div className="px-5 py-16 sm:px-10 sm:py-20 lg:px-12">
          <h2 className={H2}>¡Colaboremos!</h2>
          <p className={`mt-5 max-w-sm ${lead("paper")}`}>
            Siempre estamos listos para ayudarte. Cuéntanos qué proceso quieres mejorar y te respondemos en menos de 24 horas.
          </p>
          <ul className={`relative mt-10 border-b ${HAIRLINE.paper}`}>
            {CHANNELS.map((channel) => (
              <li key={channel.label} className={`flex items-baseline justify-between gap-6 border-t py-4 ${HAIRLINE.paper}`}>
                <MonoLabel className="!text-[10px]">{channel.label}</MonoLabel>
                {channel.href ? (
                  <a href={channel.href} target={channel.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-right text-[14px] font-medium hover:underline">
                    {channel.value}
                  </a>
                ) : (
                  <span className="text-right text-[14px] font-medium">{channel.value}</span>
                )}
              </li>
            ))}
            <Mark tone="paper" className="-bottom-[5px] -left-[5px]" />
          </ul>
        </div>

        <div className={`border-t px-5 py-14 sm:px-10 lg:border-t-0 lg:border-l lg:px-10 lg:py-20 ${HAIRLINE.paper}`}>
          <MonoLabel>Solicita tu diagnóstico gratuito</MonoLabel>
          <div className="mt-6">
            <ContactForm defaultEmail={defaultEmail} />
          </div>
        </div>
      </div>
    </Band>
  );
}
