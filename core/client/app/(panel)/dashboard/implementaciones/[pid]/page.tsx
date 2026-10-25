import Link from "next/link";
import { notFound } from "next/navigation";
import { Bot, Rocket } from "lucide-react";
import { ChecklistPase } from "@/components/implementacion/checklist-pase";
import { EtapaAcciones } from "@/components/implementacion/etapa-acciones";
import { BotForm } from "@/components/operacion/bot-form";
import { SoloLectura } from "@/components/permisos/solo-lectura";
import { PageHeader } from "@/components/ui/page-header";
import { CARD } from "@/components/ui/panel-styles";
import { EtapaDesarrolloBadge, PddEstadoBadge } from "@/components/ui/proyecto-badges";
import { apiGet } from "@/lib/api";
import type { TeamUser } from "@/lib/comercial";
import { todayInLima } from "@/lib/format-date";
import type { Implementacion } from "@/lib/implementacion";
import { puede } from "@/lib/permisos";
import { getMe } from "@/lib/session";

const plural = (n: number, uno: string, varios: string) => `${n} ${n === 1 ? uno : varios}`;

export default async function ImplementacionPage({ params }: { params: Promise<{ pid: string }> }) {
  const { pid } = await params;
  const [impl, users, { me }] = await Promise.all([apiGet<Implementacion>(`implementaciones/${pid}`), apiGet<TeamUser[]>("users"), getMe()]);
  if (!impl) notFound();
  const editar = puede(me, "implementaciones", "editar");
  const pddHref = `/dashboard/proyectos/${impl.proyectoId}/procesos/${impl.id}`;

  // What the company already has, to check the checklist against.
  const pistas: Record<string, string> = {
    credenciales: `La Bóveda tiene ${plural(impl.secretosCliente, "credencial", "credenciales")} de ${impl.empresaNombre}.`,
    licencias: `Vencimientos tiene ${plural(impl.licenciasCliente, "licencia", "licencias")} de ${impl.empresaNombre}.`,
  };

  const bloqueo =
    impl.etapa !== "pruebas"
      ? "Pasa el proceso a pruebas antes de ponerlo en producción."
      : impl.faltantes.length > 0
        ? `Falta: ${impl.faltantes.join(", ")}.`
        : null;

  return (
    <div>
      <PageHeader
        back={{ href: "/dashboard/implementaciones", label: "Implementaciones" }}
        title={impl.nombre}
        badges={
          <>
            <EtapaDesarrolloBadge etapa={impl.etapa} />
            <PddEstadoBadge estado={impl.pddEstado} version={impl.pddVersion} />
          </>
        }
        description={
          <>
            <Link href={`/dashboard/empresas/${impl.empresaId}`} className="font-medium text-ink-950 hover:underline">
              {impl.empresaNombre}
            </Link>
            {" · "}
            {puede(me, "proyectos") ? (
              <Link href={`/dashboard/proyectos/${impl.proyectoId}`} className="hover:text-ink-950 hover:underline">
                {impl.proyectoNombre}
              </Link>
            ) : (
              impl.proyectoNombre
            )}
            {impl.area && ` · ${impl.area}`}
          </>
        }
        actions={editar && !impl.botId && <EtapaAcciones procesoId={impl.id} etapa={impl.etapa} pddAprobado={impl.pddEstado === "aprobado"} />}
      />

      {impl.botId && (
        <section className={`${CARD} mt-6 flex flex-wrap items-center justify-between gap-3 p-5`}>
          <p className="flex items-center gap-2 text-sm text-ink-700">
            <Bot className="h-4 w-4 text-brand-700" />
            Este proceso ya está en producción con su bot.
          </p>
          <Link href={`/dashboard/bots/${impl.botId}`} className="text-sm font-medium text-brand-700 hover:underline">
            Ver el bot
          </Link>
        </section>
      )}

      <div className="mt-6">
        <SoloLectura activo={!editar} aviso="Solo lectura: tu acceso a Implementaciones no permite marcar el checklist ni poner en producción.">
          <ChecklistPase procesoId={impl.id} items={impl.items} pddHref={pddHref} pistas={pistas} />
        </SoloLectura>
      </div>

      {!impl.botId && editar && (
        <section className="mt-8">
          <h2 className="flex items-center gap-2 text-base font-semibold text-ink-950">
            <Rocket className="h-4 w-4" />
            Poner en producción
          </h2>
          <p className="mt-1 mb-4 max-w-2xl text-sm text-ink-500">
            Con el checklist completo y el proceso en pruebas: se registra su bot en Operación, el proceso pasa a producción y su tarea de puesta en producción queda hecha.
          </p>
          <BotForm borrador={impl.borrador} bloqueo={bloqueo} users={users ?? []} defaultResponsableId={me?.id} today={todayInLima()} />
        </section>
      )}
    </div>
  );
}
