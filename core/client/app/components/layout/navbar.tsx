"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { NAV_LINKS, SITE, type NavLink } from "@/lib/site-config";

// A black header that runs into the dark hero below it: monospace
// uppercase links, a quiet "Ingresar" and a white pill for the main action.
// Not sticky — on the home page its own section nav is what sticks.
function isActive(link: NavLink, pathname: string) {
  const paths = [link.href, ...(link.children?.map((child) => child.href) ?? [])].filter(
    (href) => !href.includes("#"),
  );
  return paths.some((href) => (href === "/" ? pathname === "/" : pathname.startsWith(href)));
}

const PRIMARY_BUTTON =
  "inline-flex h-8 items-center rounded-full bg-white px-4 font-mono text-[11px] font-medium tracking-[0.08em] text-ink-950 uppercase transition-colors hover:bg-white/85";
const SECONDARY_BUTTON =
  "inline-flex h-8 items-center rounded-full px-3 font-mono text-[11px] font-medium tracking-[0.08em] text-white/80 uppercase transition-colors hover:text-white";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);

  return (
    <header className="relative z-40 bg-ink-950">
      <div className="border-b border-white/10">
        <Container className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 py-2 text-center font-mono text-[11px] tracking-[0.06em] uppercase">
          <span className="text-white/55">
            <span className="sm:hidden">Diagnóstico gratuito de tus procesos.</span>
            <span className="hidden sm:inline">
              ¿Primera vez con DDS? Agenda un diagnóstico gratuito de tus procesos.
            </span>
          </span>
          <Link href={SITE.contactUrl} className="text-glow-300 hover:underline">
            Solicítalo aquí
          </Link>
        </Container>
      </div>

      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image src="/assets/icon.png" alt="" width={28} height={28} className="h-7 w-7" />
          <span className="font-display text-[15px] font-semibold tracking-tight text-white">
            {SITE.name}
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link, pathname);
            const linkClass = `flex items-center gap-1 rounded-full px-3 py-1.5 font-mono text-[11px] font-medium tracking-[0.08em] uppercase transition-colors ${
              active ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
            }`;
            return link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setOpenDesktopMenu(link.label)}
                onMouseLeave={() =>
                  setOpenDesktopMenu((current) => (current === link.label ? null : current))
                }
              >
                <Link href={link.href} className={linkClass} aria-current={active ? "page" : undefined}>
                  {link.label}
                  <ChevronDown className="h-3 w-3" />
                </Link>

                <AnimatePresence>
                  {openDesktopMenu === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-0 pt-2"
                    >
                      <div className="w-64 rounded-lg bg-white p-1.5 shadow-flyout">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-md px-3 py-2.5 text-sm text-ink-700 transition-colors hover:bg-brand-50 hover:text-ink-950"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={linkClass}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/ingresar" className={SECONDARY_BUTTON}>
            Ingresar
          </Link>
          <Link href={SITE.contactUrl} className={PRIMARY_BUTTON}>
            Asesoría gratuita
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/10 bg-ink-950 lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-3">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <div className="flex items-center justify-between">
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="flex-1 rounded-md px-3 py-2.5 text-sm text-white/75 hover:bg-white/5 hover:text-white"
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMobileMenu((current) => (current === link.label ? null : link.label))
                        }
                        aria-label={`Mostrar submenú de ${link.label}`}
                        aria-expanded={openMobileMenu === link.label}
                        className="rounded-md p-2 text-white/60 hover:bg-white/5"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            openMobileMenu === link.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                    <AnimatePresence initial={false}>
                      {openMobileMenu === link.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1 py-1 pl-4">
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setOpen(false)}
                                className="rounded-md px-3 py-2 text-sm text-white/55 hover:bg-white/5 hover:text-white"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2.5 text-sm text-white/75 hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ),
              )}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link
                  href="/ingresar"
                  onClick={() => setOpen(false)}
                  className={`${SECONDARY_BUTTON} h-11 justify-center border border-white/15`}
                >
                  Ingresar
                </Link>
                <Link href={SITE.contactUrl} onClick={() => setOpen(false)} className={`${PRIMARY_BUTTON} h-11 justify-center`}>
                  Asesoría
                </Link>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
