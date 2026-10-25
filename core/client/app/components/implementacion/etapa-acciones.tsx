"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { sileo } from "sileo";
import { BUTTON_PRIMARY, BUTTON_SECONDARY } from "@/components/ui/panel-styles";
import { ETAPA_DESARROLLO_LABELS } from "@/lib/proyecto";
import { panelFetch } from "@/lib/panel-api";

// Moves a process between development and testing. Production is reached
// only by going live; the API enforces the rules (an approved PDD to start).
export function EtapaAcciones({ procesoId, etapa, pddAprobado }: { procesoId: number; etapa: string; pddAprobado: boolean }) {
  const router = useRouter();
  const [moviendo, setMoviendo] = useState<string | null>(null);

  async function mover(nueva: string) {
    setMoviendo(nueva);
    const result = await panelFetch(`implementaciones/${procesoId}/etapa`, { method: "PUT", body: { etapa: nueva } });
    setMoviendo(null);
    if (!result.ok) {
      sileo.error({ title: "No se pudo cambiar la etapa", description: result.message });
      return;
    }
    sileo.success({ title: `Proceso en ${ETAPA_DESARROLLO_LABELS[nueva]?.toLowerCase() ?? nueva}` });
    router.refresh();
  }

  const boton = (nueva: string, label: string, primario: boolean, atras = false) => (
    <button type="button" onClick={() => mover(nueva)} disabled={moviendo !== null} className={primario ? BUTTON_PRIMARY : BUTTON_SECONDARY}>
      {moviendo === nueva ? <Loader2 className="h-4 w-4 animate-spin" /> : atras ? <ArrowLeft className="h-4 w-4" /> : null}
      {label}
      {!atras && moviendo !== nueva && <ArrowRight className="h-4 w-4" />}
    </button>
  );

  if (etapa === "levantamiento")
    return pddAprobado ? boton("desarrollo", "Pasar a desarrollo", true) : <p className="text-sm text-ink-500">Pasa a desarrollo con el PDD aprobado.</p>;
  if (etapa === "desarrollo") return boton("pruebas", "Pasar a pruebas", true);
  if (etapa === "pruebas") return boton("desarrollo", "Volver a desarrollo", false, true);
  return null;
}
