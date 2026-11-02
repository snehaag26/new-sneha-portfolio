"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import { JourneyRoad } from "@/components/experience/JourneyRoad";

export default function ExperiencePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden pt-28 md:pt-36 pb-32">
      {/* ============================================================ */}
      {/* AMBIENT STUDIO GLOW: Exactly 3 soft blurred pastel glows     */}
      {/* ============================================================ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Glow 1: Top Butter Yellow */}
        <div className="absolute top-[5%] left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-[#FFE9B7]/30 dark:bg-[#FFE9B7]/06 blur-[130px]" />
        {/* Glow 2: Middle Powder Blue */}
        <div className="absolute top-[42%] right-[8%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full bg-[#CAE1E9]/30 dark:bg-[#CAE1E9]/06 blur-[120px]" />
        {/* Glow 3: Bottom Blush Pink */}
        <div className="absolute bottom-[8%] left-[18%] w-[48vw] h-[48vw] max-w-[580px] max-h-[580px] rounded-full bg-[#FFD8E5]/30 dark:bg-[#FFD8E5]/06 blur-[130px]" />
      </div>

      <div className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        {/* ============================================================ */}
        {/* PAGE HEADER: Monospace label + Big Serif reveal              */}
        {/* ============================================================ */}
        <header className="text-center max-w-3xl mx-auto mb-14 md:mb-20 space-y-4">
          {/* Small Monospace Label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full shadow-xs"
            style={{
              background: "#FFE9A8",
              color: "#1E1B2E",
              border: "1px solid rgba(30,27,46,0.1)",
            }}
          >
            <Compass
              className="w-3.5 h-3.5 animate-spin"
              style={{ animationDuration: "16s", color: "#1E1B2E" }}
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] font-semibold">
              EXPERIENCE
            </span>
          </motion.div>

          {/* Big Serif Heading: "My Journey" */}
          <div className="overflow-visible">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.02] tracking-tight"
              style={{ color: "var(--text)" }}
            >
              My{" "}
              <span className="italic font-normal" style={{ color: "var(--accent)" }}>
                Journey
              </span>
            </motion.h1>
          </div>

          {/* Short Narrative Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            A winding path of leadership, brand strategy, design systems, and full-stack engineering milestones.
          </motion.p>
        </header>

        {/* ============================================================ */}
        {/* WINDING ROAD JOURNEY: 5 Stops Grid                           */}
        {/* ============================================================ */}
        <section aria-label="Winding road experience milestones">
          <JourneyRoad />
        </section>
      </div>
    </main>
  );
}
