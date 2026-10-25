import { ConfiguracionHeader } from "@/components/configuracion/configuracion-header";
import { CARD } from "@/components/ui/panel-styles";
import { apiGet } from "@/lib/api";
import { MODULOS, NIVEL_LABELS, ROLES, type Modulo, type Nivel } from "@/lib/permisos";
import { getMe } from "@/lib/session";

type Rol = { rol: string; label: string; permisos: Record<Modulo, Nivel> };

const NIVEL_ESTILO: Record<Nivel, string> = {
  editar: "bg-brand-700 text-white",
  ver: "bg-brand-100 text-brand-700",
  ninguno: "text-ink-400",
};

// What each role can do in each module by default. An admin can still
// adjust any module for one user from their profile.
export default async function RolesPage() {
  const [roles, { me }] = await Promise.all([apiGet<Rol[]>("users/roles"), getMe()]);

  return (
    <div>
      <ConfiguracionHeader
        activa="roles"
        esAdmin={me?.esAdmin === true}
        description="Lo que cada rol puede ver y cambiar por defecto. Un administrador puede ajustar cualquier módulo para un usuario en particular."
      />
      {!roles ? (
        <p className={`${CARD} mt-6 p-6 text-sm text-ink-500`}>No se pudieron cargar los roles. Intenta de nuevo más tarde.</p>
      ) : (
        <>
          <div className={`${CARD} mt-6 overflow-x-auto`}>
            <table className="w-full min-w-[40rem] text-sm">
              <thead>
                <tr className="border-b border-line text-left">
                  <th scope="col" className="px-5 py-3 font-medium text-ink-500">
                    Módulo
                  </th>
                  {roles.map((r) => (
                    <th key={r.rol} scope="col" className="px-3 py-3 text-center font-semibold text-ink-950">
                      {r.label}
                      {me?.role === r.rol && <span className="block text-[11px] font-normal text-ink-400">tu rol</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {MODULOS.map((m) => (
                  <tr key={m.value}>
                    <th scope="row" className="px-5 py-3 text-left font-normal">
                      <span className="font-medium text-ink-950">{m.label}</span>
                      <span className="block text-xs text-ink-500">{m.ayuda}</span>
                    </th>
                    {roles.map((r) => {
                      const nivel = r.permisos[m.value] ?? "ninguno";
                      return (
                        <td key={r.rol} className="px-3 py-3 text-center">
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${NIVEL_ESTILO[nivel]}`}>{NIVEL_LABELS[nivel]}</span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="px-5 py-3 text-left font-normal">
                    <span className="font-medium text-ink-950">Usuarios y eliminaciones</span>
                    <span className="block text-xs text-ink-500">Crear usuarios, cambiar roles, eliminar registros y ver el registro de la Bóveda.</span>
                  </th>
                  {roles.map((r) => (
                    <td key={r.rol} className="px-3 py-3 text-center">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${NIVEL_ESTILO[r.rol === "Admin" ? "editar" : "ninguno"]}`}>
                        {r.rol === "Admin" ? "Sí" : "No"}
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {ROLES.map((r) => (
              <li key={r.value} className={`${CARD} p-5`}>
                <p className="text-sm font-semibold text-ink-950">{r.label}</p>
                <p className="mt-1 text-sm text-ink-500">{r.ayuda}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
