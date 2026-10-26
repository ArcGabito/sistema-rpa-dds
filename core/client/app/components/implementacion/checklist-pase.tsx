"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleCheck, CircleDashed, CircleMinus, Loader2 } from "lucide-react";
import { sileo } from "sileo";
import { BUTTON_PRIMARY, CARD, INPUT_BASE, inputState } from "@/components/ui/panel-styles";
import { formatDate } from "@/lib/format-date";
import { ITEM_PASE_ESTADOS, type ItemPase } from "@/lib/implementacion";
import { panelFetch } from "@/lib/panel-api";

const ICONOS = {
  hecho: <CircleCheck className="h-5 w-5 text-brand-700" />,
  no_aplica: <CircleMinus className="h-5 w-5 text-ink-400" />,
  pendiente: <CircleDashed className="h-5 w-5 text-ink-400" />,
} as Record<string, React.ReactNode>;

function Fila({ procesoId, item, pddHref, pista }: { procesoId: number; item: ItemPase; pddHref: string; pista?: string }) {
  const router = useRouter();
  const [estado, setEstado] = useState(item.estado);
  const [nota, setNota] = useState(item.nota ?? "");
  const [guardando, setGuardando] = useState(false);
  const cambiado = estado !== item.estado || nota.trim() !== (item.nota ?? "");
  const faltaNota = estado === "hecho" && item.notaObligatoria && nota.trim() === "";

  async function guardar() {
    setGuardando(true);
    const result = await panelFetch(`implementaciones/${procesoId}/pase/${item.clave}`, {
      method: "PUT",
      body: { estado, nota: nota.trim() || null },
    });
    setGuardando(false);
    if (!result.ok) {
      sileo.error({ title: "No se pudo guardar", description: result.message });
      return;
    }
    router.refresh();
  }

  return (
    <li className="flex gap-3 px-5 py-4">
      <span className="mt-0.5 shrink-0">{ICONOS[item.estado] ?? ICONOS.pendiente}</span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-ink-950">{item.titulo}</p>
        <p className="mt-0.5 text-xs text-ink-500">{item.ayuda}</p>
        {pista && <p className="mt-1 text-xs text-ink-700">{pista}</p>}
        {item.automatico ? (
          <p className="mt-2 text-xs text-ink-700">
            {item.nota ?? "Pendiente."}{" "}
            <Link href={pddHref} className="font-medium text-brand-700 hover:underline">
              Ver el PDD
            </Link>
          </p>
        ) : (
          <>
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              <div role="radiogroup" aria-label={item.titulo} className="inline-flex rounded-md border border-line bg-white p-0.5">
                {ITEM_PASE_ESTADOS.filter((e) => e.value !== "no_aplica" || item.puedeNoAplicar).map((e) => (
                  <button
                    key={e.value}
                    type="button"
                    role="radio"
                    aria-checked={estado === e.value}
                    onClick={() => setEstado(e.value)}
                    className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                      estado === e.value ? "bg-ink-950 text-white" : "text-ink-700 hover:bg-brand-50"
                    }`}
                  >
                    {e.label}
                  </button>
                ))}
              </div>
              {(estado !== "pendiente" || nota) && (
                <>
                  <label htmlFor={`nota-${item.clave}`} className="sr-only">
                    {item.notaLabel ?? "Nota"}
                  </label>
                  <input
                    id={`nota-${item.clave}`}
                    value={nota}
                    maxLength={500}
                    onChange={(e) => setNota(e.target.value)}
                    placeholder={item.notaLabel ?? (estado === "no_aplica" ? "Por qué no aplica" : "Nota (opcional)")}
                    className={`${INPUT_BASE} ${inputState(faltaNota && cambiado)} h-8 min-w-0 flex-1 sm:max-w-sm`}
                  />
                </>
              )}
              {cambiado && (
                <button type="button" onClick={guardar} disabled={guardando || faltaNota} className={`${BUTTON_PRIMARY} h-8 px-3`}>
                  {guardando && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  Guardar
                </button>
              )}
            </div>
            {item.actualizadoPor && item.actualizadoAtUtc && !cambiado && (
              <p className="mt-1.5 text-xs text-ink-400">
                {item.actualizadoPor} · {formatDate(item.actualizadoAtUtc)}
              </p>
            )}
          </>
        )}
      </div>
    </li>
  );
}

// The go-live checklist: the PDD's approval (it follows the PDD), then each
// item marked by hand, with a note where it helps (who approved the tests,
// why something doesn't apply).
export function ChecklistPase({
  procesoId,
  items,
  pddHref,
  pistas,
}: {
  procesoId: number;
  items: ItemPase[];
  pddHref: string;
  pistas: Record<string, string>;
}) {
  const listos = items.filter((i) => i.estado !== "pendiente").length;
  return (
    <section className={`${CARD} overflow-hidden`}>
      <div className="flex items-center justify-between gap-3 p-5">
        <h2 className="text-base font-semibold tracking-[-0.02em] text-ink-950">Checklist de pase a producción</h2>
        <span className="text-sm text-ink-500 tabular-nums">
          {listos}/{items.length}
        </span>
      </div>
      <ul className="divide-y divide-line border-t border-line">
        {items.map((item) => (
          <Fila key={`${item.clave}-${item.estado}-${item.nota ?? ""}`} procesoId={procesoId} item={item} pddHref={pddHref} pista={pistas[item.clave]} />
        ))}
      </ul>
    </section>
  );
}
