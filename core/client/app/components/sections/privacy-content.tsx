import { Band, HAIRLINE, MonoLabel, lead } from "@/components/ui/band";
import { PRIVACY_INTRO, PRIVACY_SECTIONS } from "@/lib/privacy-data";
import { SITE } from "@/lib/site-config";

function linkifyEmail(text: string) {
  const parts = text.split(SITE.email);
  return parts.flatMap((part, index) =>
    index === parts.length - 1
      ? [part]
      : [
          part,
          <a key={index} href={`mailto:${SITE.email}`} className="text-ink-950 underline underline-offset-2">
            {SITE.email}
          </a>,
        ],
  );
}

// The policy: the introduction on the left, the numbered sections in
// hairline rows on the right.
export function PrivacyContent() {
  return (
    <Band tone="paper">
      <div className="grid lg:grid-cols-[0.75fr_1.25fr]">
        <div className="px-5 pt-16 pb-8 sm:px-10 sm:pt-20 lg:px-12">
          <div className="lg:sticky lg:top-8">
            <MonoLabel>Ley N.° 29733 · Protección de datos personales</MonoLabel>
            <p className={`mt-5 max-w-sm ${lead("paper")}`}>{linkifyEmail(PRIVACY_INTRO)}</p>
          </div>
        </div>
        <ol className={`pb-16 lg:border-l lg:pt-20 lg:pb-24 ${HAIRLINE.paper}`}>
          {PRIVACY_SECTIONS.map((section, index) => (
            <li key={section.title} className={`border-t px-5 py-6 sm:px-6 ${HAIRLINE.paper} ${index === PRIVACY_SECTIONS.length - 1 ? "border-b" : ""}`}>
              <p className="flex gap-5 text-[15px] font-semibold tracking-[-0.01em]">
                <span className="font-mono text-[13px] font-normal text-ink-400">/{String(index + 1).padStart(2, "0")}</span>
                {section.title}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-500 sm:pl-12">{linkifyEmail(section.body)}</p>
            </li>
          ))}
        </ol>
      </div>
    </Band>
  );
}
