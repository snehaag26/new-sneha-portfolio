"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Education", href: "/education" },
  { name: "Contact", href: "/contact" },
];

export function GlassNavPill() {
  const pathname = usePathname();

  return (
    <nav
      className="inline-flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full backdrop-blur-2xl border shadow-sm"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {navLinks.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        return (
          <Link
            key={link.name}
            href={link.href}
            className="relative px-2.5 sm:px-3.5 py-1 text-[11px] sm:text-xs font-semibold tracking-wide rounded-full transition-colors duration-200"
            style={{
              color: isActive ? "var(--pill-active-text)" : "var(--text-muted)",
              fontWeight: isActive ? 700 : 500,
            }}
          >
            {isActive && (
              <motion.div
                layoutId="glassNavActiveOutline"
                className="absolute inset-0 rounded-full shadow-xs -z-10"
                style={{
                  backgroundColor: "var(--pill-active-bg)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {link.name}
          </Link>
        );
      })}

      {/* User Avatar on the Right */}
      <div
        className="ml-1 pl-2 border-l flex items-center"
        style={{ borderColor: "var(--border)" }}
      >
        <Link
          href="/about"
          className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FFE9B7] via-[#FFD8E5] to-[#CAE1E9] p-0.5 flex items-center justify-center shadow-xs hover:scale-105 transition-transform"
          title="Sneha — About Me"
        >
          <div
            className="w-full h-full rounded-full flex items-center justify-center text-[11px] font-display font-extrabold"
            style={{
              backgroundColor: "var(--surface)",
              color: "var(--text)",
            }}
          >
            S
          </div>
        </Link>
      </div>
    </nav>
  );
}
