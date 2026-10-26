"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { LogoutButton } from "@/components/sections/logout-button";
import { DASHBOARD_NAV } from "@/lib/dashboard-nav";
import { SITE } from "@/lib/site-config";
import { puede, type Me } from "@/lib/permisos";
import type { SessionUser } from "@/lib/session";

const GLOW =
  "radial-gradient(90% 70% at 50% 100%, rgb(91 149 247 / 0.45) 0%, rgb(37 99 235 / 0.16) 50%, rgb(19 19 21 / 0) 80%)";

function getInitials(name: string | undefined) {
  const parts = name?.trim().split(/\s+/).filter(Boolean) ?? [];
  if (parts.length === 0) return "AD";
  return parts
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

export function DashboardSidebar({
  user,
  me,
  onNavigate,
  onClose,
}: {
  user: SessionUser | null;
  // Null when the API couldn't be reached: then the whole menu shows and
  // each page reports its own error.
  me: Me | null;
  onNavigate?: () => void;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const visibleNav = DASHBOARD_NAV.map((group) => ({
    ...group,
    items: group.items.filter((item) =>
      item.adminOnly ? me?.esAdmin === true : !item.modulo || !me || puede(me, item.modulo, "ver"),
    ),
  })).filter((group) => group.items.length > 0);

  return (
    // The public site's dark band: near-black with a hairline edge and the
    // blue glow rising from the bottom, as in its footer.
    <aside className="relative flex h-full w-72 shrink-0 flex-col overflow-hidden border-r border-white/[0.08] bg-night-950 px-3 py-5">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64" style={{ backgroundImage: GLOW }} aria-hidden="true" />
      <div className="grain pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative flex min-h-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-3 px-2">
          <Link href="/" className="flex min-w-0 items-center gap-2.5" onClick={onNavigate}>
            <Image src="/assets/icon.png" alt="" width={28} height={28} className="h-7 w-7 shrink-0" />
            <div className="min-w-0 leading-tight">
              <p className="truncate font-display text-sm font-semibold text-white">{SITE.name}</p>
              <p className="font-mono text-[10px] tracking-[0.08em] text-white/45 uppercase">Panel de administración</p>
            </div>
          </Link>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar menú"
              className="rounded-md p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
  
        <nav className="mt-8 -mr-1 flex flex-col gap-6 overflow-y-auto pr-1 [scrollbar-color:rgb(255_255_255/0.15)_transparent] [scrollbar-width:thin]">
          {visibleNav.map((group, index) => (
            <div key={group.title ?? index} className="flex flex-col gap-0.5">
              {group.title && (
                <p className="px-3 pb-1.5 font-mono text-[10px] font-medium tracking-[0.14em] text-white/35 uppercase">
                  {group.title}
                </p>
              )}
              {group.items.map((item) => {
                const isActive =
                  item.href === "/dashboard"
                    ? pathname === item.href
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex h-9 items-center gap-3 border-l-2 px-3 text-[13px] transition-colors ${
                      isActive
                        ? "border-white bg-white/[0.04] font-medium text-white"
                        : "border-transparent text-white/55 hover:bg-white/[0.03] hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
  
        <div className="mt-auto flex flex-col gap-4 border-t border-white/10 px-2 pt-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-ink-950">
              {getInitials(user?.name)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {user?.name || "Administrador"}
              </p>
              <p className="truncate text-xs text-white/45">{user?.email}</p>
              {(me?.roleLabel ?? user?.role) && <p className="mt-0.5 truncate text-xs text-white/70">{me?.roleLabel ?? user?.role}</p>}
            </div>
          </div>
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}
