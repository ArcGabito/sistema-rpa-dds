import { AuthShell } from "@/components/auth/auth-shell";
import { RestablecerForm } from "@/components/auth/restablecer-form";

// Where the e-mailed link lands (/restablecer?token=…).
export default async function RestablecerPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return (
    <AuthShell title="Elige una nueva contraseña" description="Al guardarla se cierran las sesiones abiertas de tu cuenta.">
      <RestablecerForm token={token?.trim() ?? ""} />
    </AuthShell>
  );
}
