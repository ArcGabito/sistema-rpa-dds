// Shared vocabulary of implementations, mirroring core/server/Models/Implementacion.cs
// and Services/PaseProduccion.cs.
import type { BorradorBot } from "@/lib/operacion";

export const ITEM_PASE_ESTADOS = [
  { value: "pendiente", label: "Pendiente" },
  { value: "hecho", label: "Hecho" },
  { value: "no_aplica", label: "No aplica" },
] as const;

export type ImplementacionItem = {
  id: number;
  nombre: string;
  servicio: string;
  etapa: string;
  pddEstado: string;
  pddVersion: number;
  proyectoId: number;
  proyectoNombre: string;
  empresaId: number;
  empresaNombre: string;
  itemsListos: number;
  itemsTotal: number;
  listo: boolean;
  botId: number | null;
};

export type ItemPase = {
  clave: string;
  titulo: string;
  ayuda: string;
  automatico: boolean;
  puedeNoAplicar: boolean;
  notaLabel: string | null;
  notaObligatoria: boolean;
  estado: string;
  nota: string | null;
  actualizadoPor: string | null;
  actualizadoAtUtc: string | null;
};

export type Implementacion = ImplementacionItem & {
  area: string | null;
  pddAprobadoPor: string | null;
  pddAprobadoAtUtc: string | null;
  proyectoEstado: string;
  items: ItemPase[];
  faltantes: string[];
  secretosCliente: number;
  licenciasCliente: number;
  borrador: BorradorBot;
};
