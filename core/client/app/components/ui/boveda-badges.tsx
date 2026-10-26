import { LockKeyhole } from "lucide-react";
import { SECRETO_TIPO_LABELS } from "@/lib/boveda";
import { BADGE_BASE } from "@/components/ui/panel-styles";

export function SecretoTipoBadge({ tipo }: { tipo: string }) {
  return (
    <span className={`${BADGE_BASE} bg-brand-50 text-ink-700 ring-1 ring-inset ring-line`}>
      {SECRETO_TIPO_LABELS[tipo] ?? tipo}
    </span>
  );
}

export function RestringidaBadge() {
  return (
    <span className={`${BADGE_BASE} bg-ink-950 text-white`}>
      <LockKeyhole className="h-3 w-3" />
      Restringida
    </span>
  );
}
