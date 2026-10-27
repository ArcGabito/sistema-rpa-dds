import { CARD } from "@/components/ui/panel-styles";

// Shown inside the panel's shell while a page fetches its data from the API,
// so signing in or moving between sections doesn't wait on a blank screen.
export default function DashboardLoading() {
  return (
    <div aria-busy="true" aria-label="Cargando">
      <div className="h-8 w-64 animate-pulse rounded-[6px] bg-ink-950/5" />
      <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded-[4px] bg-ink-950/5" />
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`${CARD} h-28 animate-pulse`} />
        ))}
      </div>
      <div className={`${CARD} mt-4 h-64 animate-pulse`} />
    </div>
  );
}
