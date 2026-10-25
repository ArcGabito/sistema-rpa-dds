import Link from "next/link";
import { Bot, CircleCheck, Search } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Pagination } from "@/components/ui/pagination";
import { CARD, INPUT_BASE, inputState } from "@/components/ui/panel-styles";
import { EtapaDesarrolloBadge, PddEstadoBadge } from "@/components/ui/proyecto-badges";
import { apiGet } from "@/lib/api";
import type { Paged } from "@/lib/comercial";
import type { ImplementacionItem } from "@/lib/implementacion";

const FILTROS = [
  { value: "activas", label: "En curso" },
  { value: "pruebas", label: "En pruebas" },
  { value: "desarrollo", label: "En desarrollo" },
  { value: "produccion", label: "En producción" },
];

export default async function ImplementacionesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; etapa?: string; page?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const etapa = FILTROS.some((f) => f.value === params.etapa) ? params.etapa! : "activas";
  const page = Math.max(1, Math.floor(Number(params.page)) || 1);
  const query = new URLSearchParams({ page: String(page), pageSize: "25", etapa, ...(q && { q }) });
  const data = await apiGet<Paged<ImplementacionItem>>(`implementaciones?${query}`);

  const linkTo = (nextEtapa: string) => `/dashboard/implementaciones?${new URLSearchParams({ ...(q && { q }), etapa: nextEtapa })}`;

  return (
    <div>
      <PageHeader
        title="Implementaciones"
        description="Cada proceso desde su PDD aprobado hasta su bot en producción: el checklist de pase y la puesta en marcha."
      />

      <div className="mt-6 flex flex-col gap-3 border-b border-line lg:flex-row lg:items-end lg:justify-between">
        <nav className="-mb-px flex gap-1 overflow-x-auto" aria-label="Etapa">
          {FILTROS.map((option) => {
            const active = option.value === etapa;
            return (
              <Link
                key={option.value}
                href={linkTo(option.value)}
                aria-current={active ? "page" : undefined}
                className={`border-b-2 px-3 pb-2.5 text-sm whitespace-nowrap transition-colors ${
                  active ? "border-brand-700 font-semibold text-brand-700" : "border-transparent text-ink-500 hover:text-ink-950"
                }`}
              >
                {option.label}
              </Link>
            );
          })}
        </nav>
        <form action="/dashboard/implementaciones" className="relative pb-3">
          <input type="hidden" name="etapa" value={etapa} />
          <Search className="pointer-events-none absolute top-[calc(50%-6px)] left-3 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <label htmlFor="implementaciones-q" className="sr-only">
            Buscar
          </label>
          <input id="implementaciones-q" name="q" defaultValue={q} placeholder="Proceso, proyecto o empresa" className={`${INPUT_BASE} ${inputState(false)} h-9 w-full pl-9 lg:w-72`} />
        </form>
      </div>

      <div className={`${CARD} mt-5 overflow-hidden`}>
        {!data ? (
          <p className="p-6 text-sm text-ink-500">No se pudieron cargar las implementaciones. Intenta de nuevo más tarde.</p>
        ) : data.items.length === 0 ? (
          <p className="p-6 text-sm text-ink-500">
            {q ? "Ningún proceso coincide con la búsqueda." : "Ningún proceso en esta etapa. Un proceso llega aquí cuando pasa a desarrollo con su PDD aprobado."}
          </p>
        ) : (
          <>
            <ul className="divide-y divide-line">
              {data.items.map((i) => {
                const pct = Math.round((i.itemsListos / i.itemsTotal) * 100);
                return (
                  <li key={i.id}>
                    <Link href={`/dashboard/implementaciones/${i.id}`} className="group grid gap-3 px-5 py-4 hover:bg-brand-50 md:grid-cols-[minmax(0,1fr)_14rem] md:items-center">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-medium text-ink-950 group-hover:underline">{i.nombre}</p>
                          <EtapaDesarrolloBadge etapa={i.etapa} />
                          {i.pddEstado !== "aprobado" && <PddEstadoBadge estado={i.pddEstado} version={i.pddVersion} />}
                        </div>
                        <p className="mt-0.5 truncate text-xs text-ink-500">
                          {i.empresaNombre} · {i.proyectoNombre}
                        </p>
                      </div>
                      {i.botId ? (
                        <p className="flex items-center gap-1.5 text-xs font-medium text-brand-700 md:justify-end">
                          <Bot className="h-3.5 w-3.5" />
                          Bot en producción
                        </p>
                      ) : (
                        <div>
                          <div className="flex items-center justify-between text-xs text-ink-500">
                            <span>
                              Checklist {i.itemsListos}/{i.itemsTotal}
                            </span>
                            {i.listo ? (
                              <span className="flex items-center gap-1 font-semibold text-brand-700">
                                <CircleCheck className="h-3.5 w-3.5" />
                                Listo
                              </span>
                            ) : (
                              <span className="font-semibold text-ink-950 tabular-nums">{pct}%</span>
                            )}
                          </div>
                          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-brand-100">
                            <div className="h-full rounded-full bg-brand-700" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Pagination page={data.page} totalPages={data.totalPages} totalCount={data.totalCount} basePath="/dashboard/implementaciones" params={{ q: q || undefined, etapa }} />
          </>
        )}
      </div>
    </div>
  );
}
