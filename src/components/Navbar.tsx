"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowDownToLine, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme, useCursor } from "./Providers";
import { portfolioData } from "@/data/portfolio";
import { siteConfig } from "@/data/site";
import { SocialIconRow } from "./SocialIconRow";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Education", href: "/education" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { setCursorVariant, resetCursor } = useCursor();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollY, scrollYProgress } = useScroll();

  // Handle scroll detection: shrink, hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    setIsScrolled(latest > 40);

    if (latest > 120 && diff > 8 && !mobileMenuOpen) {
      setIsHidden(true);
    } else if (diff < -8 || latest <= 120) {
      setIsHidden(false);
    }
  });

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Scroll Progress Bar at very top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFE9B7] via-[#FFD8E5] to-[#CAE1E9] z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Floating Pill Navbar Container */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-4 md:pt-6 pointer-events-none"
        animate={{
          y: isHidden ? -100 : 0,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-3 md:gap-6 px-4 md:px-6 py-2.5 md:py-3 rounded-full transition-all duration-300 border ${
            isScrolled
              ? "shadow-xl py-2 md:py-2.5 scale-95"
              : "shadow-md"
          }`}
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        >
          {/* Animated Monogram Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            onMouseEnter={() => setCursorVariant("button")}
            onMouseLeave={resetCursor}
          >
            <motion.div
              className="relative w-10 h-10 rounded-2xl flex items-center justify-center font-display font-extrabold text-lg overflow-hidden border border-[#FFE9B7] shadow-sm"
              style={{
                background: "linear-gradient(135deg, #FFE9B7 0%, #FFD8E5 50%, #CAE1E9 100%)",
              }}
              whileHover={{
                scale: 1.12,
                rotate: [0, -8, 8, -4, 0],
                borderRadius: ["1rem", "1.5rem", "0.75rem", "1rem"],
              }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-[#1E1B2E] font-display font-black text-xl">
                S
              </span>
            </motion.div>
            <div className="hidden sm:flex flex-col">
              <span className="font-display font-bold text-sm tracking-tight leading-none" style={{ color: "var(--text)" }}>
                Sneha
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest leading-tight" style={{ color: "var(--accent)" }}>
                Portfolio
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links with Sliding Active Blob */}
          <div className="hidden md:flex items-center gap-1 relative p-1 rounded-full border" style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}>
            {navItems.map((item, index) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-normal transition-colors duration-200 z-10"
                  style={{
                    color: isActive ? "var(--pill-active-text)" : "var(--text-muted)",
                    fontWeight: isActive ? 700 : 500,
                  }}
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                    setCursorVariant("hover");
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    resetCursor();
                  }}
                >
                  {/* Active Link Blob */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBlob"
                      className="absolute inset-0 rounded-full shadow-sm -z-10"
                      style={{
                        background: "var(--pill-active-bg)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Hover Blob */}
                  {!isActive && hoveredIndex === index && (
                    <motion.div
                      layoutId="hoverNavBlob"
                      className="absolute inset-0 rounded-full -z-10 opacity-70"
                      style={{
                        background: "var(--surface)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right Action Icons: Theme Toggle + Resume CTA */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors border"
              style={{
                background: "var(--surface-2)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              aria-label="Toggle Dark Mode"
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={resetCursor}
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" style={{ color: "var(--text)" }} />
              ) : (
                <Sun className="w-4 h-4 text-[#FFE9B7]" />
              )}
            </motion.button>

            {/* Standout Resume CTA - forced dark text on yellow bg */}
            <motion.a
              href={portfolioData.personal.links.resume}
              download="Sneha_Agrawal_Resume.pdf"
              className="relative group hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold font-display btn-resume border border-[#f5d590] shadow-sm overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: "#FFE9B7",
                color: "#1E1B2E",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={resetCursor}
            >
              {/* Shimmer light streak */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              <ArrowDownToLine className="w-3.5 h-3.5 text-[#1E1B2E] group-hover:translate-y-0.5 transition-transform" />
              <span className="text-[#1E1B2E]">Resume</span>
            </motion.a>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center border"
              style={{
                background: "var(--surface-2)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Full Screen Pastel Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-30 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 md:hidden"
            style={{
              background: "var(--bg)",
              color: "var(--text)",
            }}
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 -left-12 w-64 h-64 bg-[#FFE9B7]/40 dark:bg-[#FFE9B7]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -right-12 w-64 h-64 bg-[#FFD8E5]/40 dark:bg-[#FFD8E5]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col gap-4 relative z-10">
              <span className="text-xs uppercase font-mono tracking-widest" style={{ color: "var(--text-muted)" }}>
                Navigation
              </span>
              <div className="flex flex-col gap-3">
                {navItems.map((item, idx) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 * idx, duration: 0.4 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-3xl font-display font-extrabold flex items-center justify-between py-2 border-b"
                        style={{
                          borderColor: "var(--border)",
                          color: isActive ? "var(--accent)" : "var(--text)",
                        }}
                      >
                        <span>{item.name}</span>
                        {isActive && (
                          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--accent)" }} />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="space-y-4 relative z-10 pt-6">
              <a
                href={siteConfig.resumeUrl}
                download="Sneha_Agrawal_Resume.pdf"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-display font-bold shadow-md btn-resume"
                style={{
                  backgroundColor: "#FFE9B7",
                  color: "#1E1B2E",
                }}
              >
                <ArrowDownToLine className="w-4 h-4 text-[#1E1B2E]" />
                <span className="text-[#1E1B2E]">Download Resume PDF</span>
              </a>

              {/* Social Icons Row at bottom of full-screen mobile menu */}
              <div className="flex justify-center pt-1">
                <SocialIconRow size="md" />
              </div>

              <div className="flex justify-between items-center text-xs pt-1" style={{ color: "var(--text-muted)" }}>
                <a href={`mailto:${siteConfig.email}`} className="hover:underline">
                  {siteConfig.email}
                </a>
                <span style={{ color: "var(--accent)" }}>Full-Stack Developer</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
