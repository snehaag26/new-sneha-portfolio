"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, ArrowUpRight, Sparkles, ArrowDownToLine } from "lucide-react";

import { heroData } from "@/data/hero";
import { projectsData } from "@/data/projects";
import { GlassCard } from "./GlassCard";
import { OrbitingTechIcons } from "./OrbitingTechIcons";
import { FloatingTile } from "./FloatingTile";
import { SocialIconRow } from "@/components/SocialIconRow";
import { useCursor } from "@/components/Providers";

export function HeroScene() {
  const { setCursorVariant, resetCursor } = useCursor();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
  }, []);

  // Intro character animation variants for "Sneha"
  const nameLetters = heroData.name.split("");

  return (
    <section className="relative w-full pt-[140px] pb-14 px-4 sm:px-6 flex flex-col items-center justify-center select-none overflow-visible">
      {/* Soft Studio Ambient Gradient & Central Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
        <div className="absolute w-[80vw] h-[80vw] max-w-[850px] max-h-[850px] rounded-full bg-gradient-to-tr from-[#FFE9B7]/40 via-[#FFD8E5]/35 to-[#CAE1E9]/40 dark:from-[#FFE9B7]/10 dark:via-[#FFD8E5]/10 dark:to-[#CAE1E9]/10 blur-[130px] animate-pulse" />
        <div className="absolute top-[35%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-[#FFE9B7]/50 dark:bg-[#FFE9B7]/15 blur-[90px]" />
      </div>

      <div className="relative w-full max-w-[1300px] mx-auto flex flex-col items-center">
        {/* HERO PANEL WRAPPER - clean surface, no grey overlay in light mode */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-[2rem] p-6 sm:p-8 lg:p-12 backdrop-blur-xl border shadow-[0_20px_60px_-15px_rgba(30,27,46,0.05)]"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        >
          {/* Subtle Grid Accent in dark mode only */}
          <div className="absolute inset-0 bg-grain opacity-25 pointer-events-none rounded-[2rem] hidden dark:block" />

          {/* ============================================================ */}
          {/* 2-COLUMN CSS GRID (Desktop: 1fr 1fr, gap 48px, items-center) */}
          {/* ============================================================ */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* ---------------------------------------------------------- */}
            {/* LEFT COLUMN: All text stack, top to bottom, no overlap     */}
            {/* ---------------------------------------------------------- */}
            <div className="flex flex-col items-start gap-4 z-10">
              {/* 1. Label "EXPLORE" (mono, 11px, letter-spacing: 0.08em) */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-mono tracking-[0.08em] uppercase"
                style={{
                  background: "var(--surface-2)",
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                <Sparkles className="w-3 h-3" style={{ color: "var(--accent)" }} />
                <span>{heroData.exploreLabel}</span>
              </div>

              {/* 2. Heading "Sneha" - WCAG AA compliant */}
              <h1
                className="font-display font-extrabold flex tracking-[-0.02em] leading-[0.95]"
                style={{
                  fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.02em",
                  color: "var(--text)",
                }}
              >
                {nameLetters.map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: 35, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1 + index * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>

              {/* 3. Subtitle "Full-Stack Developer" - WCAG AA compliant */}
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-2xl sm:text-3xl font-serif italic tracking-normal"
                style={{ color: "var(--accent)" }}
              >
                {heroData.role}
              </motion.h2>

              {/* 4. Location: strictly "India" */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-normal"
                style={{ color: "var(--text-muted)" }}
              >
                <MapPin className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                <span>{heroData.location}</span>
              </motion.div>

              {/* 5. 1-2 line intro */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="text-sm sm:text-base leading-relaxed tracking-normal max-w-lg"
                style={{ color: "var(--text-muted)" }}
              >
                {heroData.tagline}
              </motion.p>

              {/* 6. 2 CTAs: "View Projects", "Download Resume" */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="flex flex-wrap items-center gap-3 pt-1"
              >
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-sans font-semibold text-xs sm:text-sm tracking-normal shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
                  style={{
                    background: "var(--pill-active-bg)",
                    color: "var(--pill-active-text)",
                  }}
                  onMouseEnter={() => setCursorVariant("button")}
                  onMouseLeave={resetCursor}
                >
                  <span>View Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                {/* Resume button - strictly dark text on yellow bg */}
                <a
                  href="/resume.pdf"
                  download="Sneha_Agrawal_Resume.pdf"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full btn-resume font-sans font-semibold text-xs sm:text-sm tracking-normal shadow-xs hover:scale-[1.02] transition-transform cursor-pointer border border-[#f5d590]"
                  style={{
                    backgroundColor: "#FFE9B7",
                    color: "#1E1B2E",
                  }}
                  onMouseEnter={() => setCursorVariant("button")}
                  onMouseLeave={resetCursor}
                >
                  <span className="text-[#1E1B2E]">Download Resume</span>
                  <ArrowDownToLine className="w-3.5 h-3.5 text-[#1E1B2E]" />
                </a>
              </motion.div>

              {/* Social Icons Row under CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="pt-1"
              >
                <SocialIconRow size="sm" />
              </motion.div>

              {/* 7. Featured Projects Card (max-width 420px, margin-top 32px) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.75 }}
                className="w-full max-w-[420px] mt-8"
              >
                <GlassCard glowColor="rgba(202, 225, 233, 0.4)">
                  <div className="flex items-center justify-between mb-3 border-b pb-2" style={{ borderColor: "var(--border)" }}>
                    <span className="font-sans font-semibold text-xs tracking-normal" style={{ color: "var(--text)" }}>
                      Featured Projects
                    </span>
                    <Link
                      href="/projects"
                      className="text-[10px] font-sans font-semibold uppercase tracking-normal hover:underline flex items-center gap-0.5"
                      style={{ color: "var(--accent)" }}
                      onMouseEnter={() => setCursorVariant("button")}
                      onMouseLeave={resetCursor}
                    >
                      <span>View all</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {/* 3 Featured Project Rows */}
                  <div className="space-y-2">
                    {projectsData.slice(0, 3).map((item) => (
                      <Link
                        key={item.slug}
                        href={`/projects/${item.slug}`}
                        className="flex items-center justify-between p-2 rounded-2xl transition-colors group cursor-pointer"
                        style={{ background: "transparent" }}
                        onMouseEnter={() => setCursorVariant("hover")}
                        onMouseLeave={resetCursor}
                      >
                        <div className="flex items-center gap-2.5">
                          {/* Pastel badge with forced dark text */}
                          <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shadow-xs shrink-0 pastel-badge"
                            style={{ backgroundColor: item.color, color: "#1E1B2E" }}
                          >
                            ✦
                          </div>
                          <div>
                            <h4
                              className="font-sans font-semibold text-xs transition-colors line-clamp-1 tracking-normal"
                              style={{ color: "var(--text)" }}
                            >
                              {item.title}
                            </h4>
                            <div className="flex gap-1.5 mt-0.5">
                              {item.techStack.slice(0, 2).map((t) => (
                                <span
                                  key={t}
                                  className="text-[10px] font-mono tracking-normal"
                                  style={{ color: "var(--text-muted)" }}
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 transition-all shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: "var(--text-muted)" }} />
                      </Link>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            </div>

            {/* ---------------------------------------------------------- */}
            {/* RIGHT COLUMN: Diorama & Cards                              */}
            {/* Below 1024px: diorama first, then cards in vertical list   */}
            {/* Desktop: top-right card, diorama in right corner, btm card */}
            {/* ---------------------------------------------------------- */}
            <div className="relative w-full max-w-[600px] lg:justify-self-end flex flex-col items-center lg:items-end gap-3 lg:gap-4">
              {/* Card 1: "Currently building" (top-right corner of right col, max-width 280px) */}
              <div className="order-2 lg:order-1 w-full max-w-[280px] self-center lg:self-end z-20 lg:-mb-6 xl:-mb-8">
                <GlassCard glowColor="rgba(255, 233, 183, 0.4)">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span className="text-[11px] font-mono tracking-[0.08em] uppercase" style={{ color: "var(--text-muted)" }}>
                        {heroData.currentlyBuilding.status}
                      </span>
                    </div>
                    {/* Pastel badge with forced dark text #1E1B2E */}
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-sans font-semibold tracking-normal pastel-badge"
                      style={{ backgroundColor: "#FFE9B7", color: "#1E1B2E" }}
                    >
                      {heroData.currentlyBuilding.badge}
                    </span>
                  </div>

                  <h4 className="font-sans font-semibold text-xs sm:text-sm mb-2 tracking-normal" style={{ color: "var(--text)" }}>
                    {heroData.currentlyBuilding.projectName}
                  </h4>

                  {/* Mini Progress Bar */}
                  <div className="space-y-1">
                    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "var(--surface-2)" }}>
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[#FFE9B7] via-[#FFD8E5] to-[#CAE1E9]"
                        initial={{ width: 0 }}
                        animate={{ width: `${heroData.currentlyBuilding.progress}%` }}
                        transition={{ duration: 1.5, delay: 0.8 }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] font-mono tracking-[0.08em]" style={{ color: "var(--text-muted)" }}>
                      <span>Pipeline</span>
                      <span>{heroData.currentlyBuilding.progress}%</span>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* 3D Diorama Container: aligned right, max-width 640px, NO absolute positioning, idle float only */}
              <motion.div
                animate={reducedMotion ? {} : { y: [-6, 6, -6] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="order-1 lg:order-2 relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[540px] flex flex-col items-center justify-center self-center lg:self-end pointer-events-none"
              >
                {/* Image wrapper with radial mask to eliminate rectangular background */}
                <div
                  className="relative w-full aspect-square flex items-center justify-center"
                  style={{
                    maskImage:
                      "radial-gradient(ellipse 60% 60% at 50% 50%, black 55%, transparent 85%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse 60% 60% at 50% 50%, black 55%, transparent 85%)",
                    maskSize: "100% 100%",
                    WebkitMaskSize: "100% 100%",
                    backgroundColor: "transparent",
                  }}
                >
                  <Image
                    src="/hero/diorama.png"
                    alt="3D Miniature Developer Studio Diorama on Floating Marble Platform"
                    width={540}
                    height={540}
                    priority
                    className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(42,39,51,0.12)]"
                  />

                  {/* Floating Folded Paper Plane */}
                  <motion.div
                    className="absolute top-10 left-8 sm:left-14 w-10 h-10 sm:w-12 sm:h-12 pointer-events-auto cursor-pointer"
                    animate={
                      reducedMotion
                        ? {}
                        : {
                            x: [0, 12, -8, 0],
                            y: [0, -12, 6, 0],
                            rotate: [0, -10, 8, 0],
                          }
                    }
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{ scale: 1.25, rotate: 20 }}
                    title="Floating origami paper plane"
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                      <path
                        d="M 15,45 L 85,15 L 45,85 L 40,55 Z"
                        fill="#FFFFFF"
                        stroke="#FFE9B7"
                        strokeWidth="3"
                      />
                      <path d="M 85,15 L 40,55" stroke="#CAE1E9" strokeWidth="2" />
                    </svg>
                  </motion.div>

                  {/* Desk Lamp Warm Glow Pulse */}
                  <motion.div
                    className="absolute top-[44%] right-[24%] sm:right-[26%] w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFE9B7]/60 blur-xl pointer-events-none"
                    animate={
                      reducedMotion
                        ? {}
                        : {
                            opacity: [0.4, 0.85, 0.4],
                            scale: [0.9, 1.15, 0.9],
                          }
                    }
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Miniature Code Scrolling Simulation on Laptop */}
                  <div className="absolute top-[36%] left-[43%] sm:left-[44%] w-14 sm:w-18 h-8 sm:h-10 overflow-hidden opacity-80 pointer-events-none rounded-xs hidden sm:block">
                    <motion.div
                      className="space-y-1"
                      animate={reducedMotion ? {} : { y: [0, -45] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="h-1 bg-[#CAE1E9] w-12 rounded-full" />
                      <div className="h-1 bg-[#FFE9B7] w-8 rounded-full" />
                      <div className="h-1 bg-[#FFD8E5] w-14 rounded-full" />
                      <div className="h-1 bg-[#CAE1E9] w-10 rounded-full" />
                      <div className="h-1 bg-[#FFE9B7] w-16 rounded-full" />
                      <div className="h-1 bg-[#FFD8E5] w-12 rounded-full" />
                    </motion.div>
                  </div>
                </div>

                {/* Soft Ellipse Contact Shadow under the Platform */}
                <div className="w-3/4 max-w-[400px] h-8 sm:h-10 bg-radial from-[#2A2733]/25 dark:from-black/50 via-[#2A2733]/10 to-transparent blur-xl rounded-full -mt-4 sm:-mt-6" />
              </motion.div>

              {/* Card 2: "Core Tech Stack" (bottom-right corner of right col, max-width 300px, does not cover platform) */}
              <div className="order-3 lg:order-3 w-full max-w-[300px] self-center lg:self-end z-20 lg:-mt-6 xl:-mt-8">
                <GlassCard glowColor="rgba(255, 216, 229, 0.4)">
                  <div className="flex items-center justify-between mb-1 border-b pb-2" style={{ borderColor: "var(--border)" }}>
                    <span className="font-sans font-semibold text-xs tracking-normal" style={{ color: "var(--text)" }}>
                      Core Tech Stack
                    </span>
                    <span className="text-[11px] font-mono tracking-[0.08em]" style={{ color: "var(--text-muted)" }}>
                      Orbiting 3D
                    </span>
                  </div>

                  <OrbitingTechIcons />
                </GlassCard>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* BOTTOM TILES ROW (margin-top 40px, normal flow, centered)     */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="relative z-20 mt-10 w-full flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 px-2"
        >
          {heroData.floatingTiles.map((tile) => (
            <FloatingTile
              key={tile.title}
              title={tile.title}
              href={tile.href}
              isAccent={tile.isAccent}
              isDownload={tile.isDownload}
              downloadName={tile.downloadName}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
