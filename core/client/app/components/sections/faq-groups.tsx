import { Accordion } from "@/components/ui/accordion";
import { Band, H3, HAIRLINE, lead } from "@/components/ui/band";
import { FAQ_GROUPS } from "@/lib/faq-data";

// Each group of questions on its own band: the heading and intro on the
// left, the accordion in the right-hand column.
// Numbering runs on across groups: where each one starts.
const STARTS = FAQ_GROUPS.map((_, index) => 1 + FAQ_GROUPS.slice(0, index).reduce((sum, group) => sum + group.items.length, 0));

export function FaqGroups() {
  return (
    <>
      {FAQ_GROUPS.map((group, groupIndex) => {
        const first = STARTS[groupIndex];
        return (
          <Band key={group.heading} tone="paper">
            <div className="grid lg:grid-cols-[0.75fr_1.25fr]">
              <div className="px-5 pt-16 pb-8 sm:px-10 sm:pt-20 lg:px-12 lg:pb-20">
                <h2 className={H3}>{group.heading}</h2>
                <p className={`mt-4 max-w-xs ${lead("paper")}`}>{group.intro}</p>
              </div>
              <div className={`pb-16 lg:border-l lg:pt-20 lg:pb-20 ${HAIRLINE.paper}`}>
                <Accordion items={group.items} defaultOpen={groupIndex === 0 ? 0 : null} start={first} />
              </div>
            </div>
          </Band>
        );
      })}
    </>
  );
}
