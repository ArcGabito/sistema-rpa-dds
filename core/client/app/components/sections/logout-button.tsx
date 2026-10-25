"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { sileo } from "sileo";

// "dark" on the dashboard sidebar, "light" on a white card.
export function LogoutButton({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      sileo.success({ title: "Sesión cerrada" });
      router.push("/ingresar");
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className={`inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border text-sm font-medium transition-colors disabled:opacity-60 ${
        tone === "dark"
          ? "border-white/10 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white"
          : "border-line text-ink-700 hover:bg-brand-50 hover:text-ink-950"
      }`}
    >
      {loading ? "Saliendo..." : "Cerrar sesión"}
      <LogOut className="h-4 w-4" />
    </button>
  );
}
