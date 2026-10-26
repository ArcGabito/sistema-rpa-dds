import { Band, HAIRLINE, MonoLabel } from "@/components/ui/band";
import { CORE_VALUES } from "@/lib/core-values";

// The mission as a statement, then the core values in a hairline grid.
export function MissionStatement() {
  return (
    <Band tone="paper">
      <div className="grid gap-6 px-5 py-16 sm:px-10 sm:py-20 lg:grid-cols-[14rem_1fr] lg:px-12">
        <MonoLabel>Nuestra misión</MonoLabel>
        <p className="max-w-3xl font-display text-[1.45rem] leading-[1.3] font-semibold tracking-[-0.03em] sm:text-[1.8rem]">
          Estar en el negocio de las personas implica conversaciones difíciles y decisiones importantes. En DDS enfrentamos
          cada reunión con autenticidad, empatía y apertura: <span className="text-ink-400">todos podemos cometer errores; lo
          importante es corregir, aprender y avanzar juntos.</span>
        </p>
      </div>
      <MonoLabel className={`border-t px-5 py-3 sm:px-10 lg:px-12 ${HAIRLINE.paper}`}>Nuestros valores</MonoLabel>
      <div className={`grid border-t sm:grid-cols-2 lg:grid-cols-3 ${HAIRLINE.paper}`}>
        {CORE_VALUES.map((value, index) => (
          <div
            key={value.title}
            className={`border-b px-5 pt-5 pb-10 sm:px-6 ${HAIRLINE.paper} ${index % 2 ? "sm:border-l" : ""} ${index % 3 ? "lg:border-l" : "lg:border-l-0"}`}
          >
            <span className="font-mono text-[13px] text-ink-400">/{String(index + 1).padStart(2, "0")}</span>
            <p className="mt-6 text-[15px] font-semibold tracking-[-0.01em]">{value.title}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-500">{value.description}</p>
          </div>
        ))}
      </div>
      <div className="h-16 sm:h-20" />
    </Band>
  );
}
