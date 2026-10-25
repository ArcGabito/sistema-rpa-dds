"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRound, X } from "lucide-react";
import { GlowBackdrop } from "@/components/layout/glow-backdrop";
import { LogoutButton } from "@/components/sections/logout-button";
import { DASHBOARD_NAV } from "@/lib/dashboard-nav";
import { SITE } from "@/lib/site-config";
import { puede, type Me } from "@/lib/permisos";
import type { SessionUser } from "@/lib/session";

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
    <aside className="relative flex h-full w-72 shrink-0 flex-col overflow-hidden px-3 py-5 lg:rounded-3xl">
      <GlowBackdrop glow="low" />
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
                    className={`relative flex h-9 items-center gap-3 rounded-md px-3 text-sm transition-colors ${
                      isActive
                        ? "bg-white/10 font-medium text-white ring-1 ring-white/10 ring-inset before:absolute before:inset-y-2.5 before:left-0 before:w-[3px] before:rounded-full before:bg-glow-300"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
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
              <div className="flex items-center gap-1.5">
                <p className="truncate text-sm font-medium text-white">
                  {user?.name || "Administrador"}
                </p>
                {(me?.roleLabel ?? user?.role) && (
                  <span className="shrink-0 rounded-full border border-white/15 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.06em] text-white/70 uppercase">
                    {me?.roleLabel ?? user?.role}
                  </span>
                )}
              </div>
              <p className="truncate text-xs text-white/45">{user?.email}</p>
            </div>
          </div>
          <Link
            href="/dashboard/cuenta"
            onClick={onNavigate}
            aria-current={pathname === "/dashboard/cuenta" ? "page" : undefined}
            className="-mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-white/50 hover:text-white aria-[current=page]:text-glow-300"
          >
            <UserRound className="h-3.5 w-3.5" />
            Mi cuenta y contraseña
          </Link>
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}
