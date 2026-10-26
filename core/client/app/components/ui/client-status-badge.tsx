import { BADGE_BASE } from "@/components/ui/panel-styles";

// Scale by urgency: a new lead (still to contact) is the one that stands
// out in the deep brand blue; closed ones recede.
const STATUS_STYLES: Record<string, string> = {
  nuevo: "bg-brand-700 text-white",
  contactado: "bg-brand-100 text-ink-700",
  cerrado: "border border-line text-ink-400",
};

const STATUS_LABELS: Record<string, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  cerrado: "Cerrado",
};

export function ClientStatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? "bg-brand-100 text-ink-700";
  const label = STATUS_LABELS[status] ?? status;

  return (
    <span className={`${BADGE_BASE} ${style}`}>
      {label}
    </span>
  );
}
