"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Hotspot } from "@/data/about";

interface AboutPanelProps {
  active: Hotspot | null;
  isDefault: boolean;
}

export default function AboutPanel({ active, isDefault }: AboutPanelProps) {
  return (
    <div
      className="relative h-full flex flex-col justify-center px-8 py-8 overflow-hidden"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        {isDefault || !active ? (
          /* Default intro state */
          <motion.div
            key="default"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-6"
          >
            {/* Step chip */}
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest"
              style={{ backgroundColor: "#FFD8E5", color: "#1E1B2E" }}
            >
              00 / 06
            </span>

            <div className="space-y-3">
              <h2
                className="text-3xl sm:text-4xl font-display font-extrabold leading-tight"
                style={{ color: "var(--text)" }}
              >
                Hi, I&apos;m{" "}
                <em className="not-italic" style={{ color: "var(--accent)" }}>Sneha</em>
              </h2>
              <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                Full-Stack Developer &middot; India
              </p>
              <p
                className="text-sm leading-relaxed max-w-xs"
                style={{ color: "var(--text-muted)" }}
              >
                I design and build delightful web experiences — from scalable
                backends to pixel-perfect frontends. Click any pin on the image
                to learn more about me.
              </p>
            </div>

            {/* Animated hand icon hint */}
            <motion.div
              className="flex items-center gap-2 text-xs font-semibold"
              style={{ color: "var(--accent)" }}
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-base">👆</span>
              <span>Tap a pin to explore</span>
            </motion.div>

            {/* Dot nav row — 6 dots */}
            <div className="flex gap-2 pt-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "var(--border)" }}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          /* Active hotspot detail */
          <motion.div
            key={`hs-${active.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-5"
          >
            {/* Step chip */}
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest"
              style={{ backgroundColor: active.color, color: "#1E1B2E" }}
            >
              0{active.id} / 06
            </span>

            <div className="space-y-1.5">
              <p
                className="text-xs font-mono font-bold tracking-wider uppercase"
                style={{ color: "var(--text-muted)" }}
              >
                {active.subtitle}
              </p>
              <h3
                className="text-2xl sm:text-3xl font-display font-extrabold leading-tight"
                style={{ color: "var(--text)" }}
              >
                {active.emoji} {active.title}
              </h3>
            </div>

            <p
              className="text-sm leading-relaxed max-w-sm"
              style={{ color: "var(--text-muted)" }}
            >
              {active.description}
            </p>

            {/* Pastel chips */}
            <div className="flex flex-wrap gap-1.5">
              {active.chips.map((chip) => (
                <span
                  key={chip}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                  style={{ backgroundColor: active.color, color: "#1E1B2E" }}
                >
                  {chip}
                </span>
              ))}
            </div>

            {/* Dot nav row */}
            <div className="flex gap-2 pt-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      i === active.id - 1 ? active.color : "var(--border)",
                    opacity: i === active.id - 1 ? 1 : 0.6,
                    transform:
                      i === active.id - 1 ? "scale(1.4)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
