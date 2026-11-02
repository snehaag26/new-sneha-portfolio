"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, Mail, Copy, Check, Heart, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/site";
import { SocialIconRow } from "./SocialIconRow";
import { useCursor } from "./Providers";

export function Footer() {
  const { setCursorVariant, resetCursor } = useCursor();
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in India (IST, UTC+5:30)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-IN", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative z-10 w-full pt-16 pb-12 px-4 md:px-8 border-t mt-20"
      style={{ borderColor: "var(--border)", color: "var(--text)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Big Pre-Footer Card */}
        <div
          className="rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden mb-14 border"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
          }}
        >
          {/* Ambient Glows */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#FFE9B7]/40 dark:bg-[#FFE9B7]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#FFD8E5]/40 dark:bg-[#FFD8E5]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border"
                style={{
                  backgroundColor: "#FFE9A8",
                  color: "#1E1B2E",
                  borderColor: "rgba(30,27,46,0.1)",
                }}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Let&apos;s collaborate</span>
              </div>
              <h2
                className="text-3xl md:text-5xl font-display font-extrabold tracking-tight leading-tight"
                style={{ color: "var(--text)" }}
              >
                Got an exciting idea? Let&apos;s build it with{" "}
                <span
                  className="px-3 py-1 rounded-2xl inline-block -rotate-1 font-bold"
                  style={{ backgroundColor: "#FFD8E5", color: "#1E1B2E" }}
                >
                  pastel magic
                </span>
                .
              </h2>
              <p
                className="text-sm md:text-base max-w-xl"
                style={{ color: "var(--text-muted)" }}
              >
                Open for full-stack engineering roles, Summer 2026 internships, and high-impact web applications.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-4 rounded-2xl font-display font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg text-center"
                style={{
                  backgroundColor: "var(--pill-active-bg)",
                  color: "var(--pill-active-text)",
                }}
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={resetCursor}
              >
                Start a Conversation ↗
              </Link>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border text-xs font-bold transition-all shadow-sm"
                style={{
                  backgroundColor: "var(--surface-2)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={resetCursor}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Copied {siteConfig.email}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Nav & Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FFE9B7] to-[#FFD8E5] flex items-center justify-center font-display font-black text-sm text-[#1E1B2E] shadow-sm">
                S
              </div>
              <span
                className="font-display font-extrabold text-base tracking-tight"
                style={{ color: "var(--text)" }}
              >
                Sneha Agrawal
              </span>
            </div>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Full-Stack Developer & Creative Engineer. B.Tech CSE (AI) at Newton School of Technology.
            </p>
            {/* Live Local Time */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px]"
              style={{
                backgroundColor: "var(--surface-2)",
                borderColor: "var(--border)",
                color: "var(--text-muted)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>India: {currentTime || "18:45:10"} IST</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <span
              className="text-xs font-mono font-bold tracking-widest uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Explore
            </span>
            <ul className="space-y-2 text-xs font-semibold" style={{ color: "var(--text)" }}>
              <li>
                <Link href="/" className="hover:opacity-75 transition-opacity">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:opacity-75 transition-opacity">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:opacity-75 transition-opacity">
                  Projects & Case Studies
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:opacity-75 transition-opacity">
                  Experience & Journey
                </Link>
              </li>
              <li>
                <Link href="/education" className="hover:opacity-75 transition-opacity">
                  Education & Learning Path
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect / Socials */}
          <div className="space-y-4">
            <span
              className="text-xs font-mono font-bold tracking-widest uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Connect
            </span>
            {/* Social Icons Row with Hover Lift */}
            <SocialIconRow size="sm" />
            {/* Email Direct Text */}
            <div className="pt-1">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono transition-opacity hover:opacity-80"
                style={{ color: "var(--text-muted)" }}
              >
                <Mail className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                <span>{siteConfig.email}</span>
              </a>
            </div>
          </div>

          {/* Back to top & Status */}
          <div className="space-y-4 flex flex-col justify-between items-start md:items-end">
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-bold shadow-sm transition-all"
              style={{
                backgroundColor: "var(--surface-2)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={resetCursor}
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>

            <div className="text-right text-[11px]" style={{ color: "var(--text-muted)" }}>
              <p>Newton School of Technology</p>
              <p>Rishihood University</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div
          className="pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-3 text-xs"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        >
          <p className="flex items-center gap-1.5">
            Designed & built with <Heart className="w-3.5 h-3.5 text-[#E85D88] fill-[#E85D88]" /> by{" "}
            <span className="font-bold" style={{ color: "var(--text)" }}>Sneha Agrawal</span>
          </p>
          <p>© 2026 All rights reserved. Marshmallow Pastel Edition.</p>
        </div>
      </div>
    </footer>
  );
}
