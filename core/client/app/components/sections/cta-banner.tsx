import { Band, H3, MonoLabel } from "@/components/ui/band";
import { LineLink } from "@/components/ui/site-buttons";
import { SITE } from "@/lib/site-config";

// Closing call to action on a grey band: a short heading, a note on the
// right and the underlined link.
export function CtaBanner({
  heading,
  buttonLabel,
  href = SITE.contactUrl,
  note = "DDS trabaja con empresas de todo el Perú.",
}: {
  heading: string;
  buttonLabel: string;
  href?: string;
  note?: string;
}) {
  return (
    <Band tone="mist">
      <div className="flex flex-col gap-8 px-5 py-16 sm:px-10 sm:py-20 lg:flex-row lg:items-start lg:justify-between lg:px-12">
        <div className="max-w-xl">
          <h2 className={`text-balance ${H3}`}>{heading}</h2>
          <LineLink href={href} className="mt-10">
            {buttonLabel}
          </LineLink>
        </div>
        <MonoLabel className="max-w-[15rem] leading-relaxed lg:text-right">{note}</MonoLabel>
      </div>
    </Band>
  );
}
