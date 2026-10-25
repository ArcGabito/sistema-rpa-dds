import { BotForm } from "@/components/operacion/bot-form";
import { PageHeader } from "@/components/ui/page-header";
import { apiGet } from "@/lib/api";
import type { TeamUser } from "@/lib/comercial";
import { todayInLima } from "@/lib/format-date";
import { getSessionUser } from "@/lib/session";

// A bot that didn't come out of a project. A project's process goes live
// from its implementation, with its checklist complete.
export default async function NuevoBotPage() {
  const [users, user] = await Promise.all([apiGet<TeamUser[]>("users"), getSessionUser()]);

  return (
    <div>
      <PageHeader
        back={{ href: "/dashboard/bots", label: "Bots" }}
        title="Registrar bot en producción"
        description="Un bot que no salió de un proyecto del sistema. Los procesos de un proyecto pasan a producción desde Implementaciones."
      />
      <div className="mt-8">
        <BotForm users={users ?? []} defaultResponsableId={user?.id} today={todayInLima()} />
      </div>
    </div>
  );
}
