import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";

const SECCIONES = [
  { value: "cuenta", label: "Mi cuenta", href: "/dashboard/configuracion" },
  { value: "usuarios", label: "Usuarios", href: "/dashboard/configuracion/usuarios", soloAdmin: true },
  { value: "roles", label: "Roles", href: "/dashboard/configuracion/roles" },
] as const;

export type SeccionConfiguracion = (typeof SECCIONES)[number]["value"];

// The settings' title and tabs: your account, the team's users (admins
// only) and what each role can do.
export function ConfiguracionHeader({
  activa,
  esAdmin,
  description,
  actions,
}: {
  activa: SeccionConfiguracion;
  esAdmin: boolean;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <>
      <PageHeader title="Configuración" description={description} actions={actions} />
      <nav className="mt-6 -mb-px flex gap-1 overflow-x-auto border-b border-line" aria-label="Configuración">
        {SECCIONES.filter((s) => esAdmin || !("soloAdmin" in s)).map((s) => {
          const active = s.value === activa;
          return (
            <Link
              key={s.value}
              href={s.href}
              aria-current={active ? "page" : undefined}
              className={`border-b-2 px-3 pb-2.5 text-sm whitespace-nowrap transition-colors ${
                active ? "border-brand-700 font-semibold text-brand-700" : "border-transparent text-ink-500 hover:text-ink-950"
              }`}
            >
              {s.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
