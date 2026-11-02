"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { aboutHotspots } from "@/data/about";
import type { Hotspot } from "@/data/about";
import HotspotPin from "./HotspotPin";
import AboutPanel from "./AboutPanel";

// Dev helper: ?pick=1 logs click coordinates as percentages
function usePickMode(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (!params.has("pick")) return;
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
      const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1);
      console.log(`Hotspot click: x=${x}%, y=${y}%`);
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, [containerRef]);
}

export default function AboutScene() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [hintId, setHintId] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoHintTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  usePickMode(containerRef);

  const activeHotspot: Hotspot | null =
    aboutHotspots.find((h) => h.id === activeId) ?? null;

  const handleActivate = useCallback((id: number) => {
    setActiveId((prev) => (prev === id ? null : id));
    // Reset auto-hint cycle
    if (autoHintTimer.current) clearInterval(autoHintTimer.current);
    autoHintTimer.current = setInterval(() => {
      setHintId((prev) => (prev % aboutHotspots.length) + 1);
    }, 4000);
  }, []);

  // Auto-hint every 4s when nothing is active
  useEffect(() => {
    autoHintTimer.current = setInterval(() => {
      setHintId((prev) => (prev % aboutHotspots.length) + 1);
    }, 4000);
    return () => {
      if (autoHintTimer.current) clearInterval(autoHintTimer.current);
    };
  }, []);

  // Escape key deactivates
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="w-full max-w-[1100px] mx-auto">
      {/* ── Desktop 2-column layout ── */}
      <div
        className="hidden md:grid md:grid-cols-2 rounded-[3rem] overflow-hidden shadow-2xl"
        style={{ border: "1px solid rgba(255,255,255,0.5)" }}
      >
        {/* LEFT — Character stage (dark bg to match original image) */}
        <div
          ref={containerRef}
          className="relative overflow-hidden"
          style={{
            /* Deep navy-charcoal matching the image background, with pastel gradient edges */
            background:
              "radial-gradient(ellipse 70% 60% at 20% 20%, #2d1f3d 0%, #1a1424 100%)",
            minHeight: 660,
          }}
        >
          {/* Soft pastel edge glows to blend the corners */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {/* top-left butter glow */}
            <div
              className="absolute rounded-full opacity-25"
              style={{ width: 260, height: 260, top: -60, left: -60, background: "#FFE9B7", filter: "blur(80px)" }}
            />
            {/* bottom-left blush glow */}
            <div
              className="absolute rounded-full opacity-20"
              style={{ width: 220, height: 220, bottom: -40, left: -20, background: "#FFD8E5", filter: "blur(70px)" }}
            />
            {/* top-right powder glow */}
            <div
              className="absolute rounded-full opacity-20"
              style={{ width: 200, height: 200, top: -30, right: -30, background: "#CAE1E9", filter: "blur(65px)" }}
            />
            {/* bottom-right subtle glow */}
            <div
              className="absolute rounded-full opacity-15"
              style={{ width: 180, height: 180, bottom: -20, right: -20, background: "#FFE9B7", filter: "blur(60px)" }}
            />
          </div>

          {/* Character image — contains its own black bg from the JPEG, fills container */}
          <motion.div
            className="relative z-10 w-full h-full"
            style={{ minHeight: 660 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/about/me.webp"
              alt="Sneha — 3D clay character with laptop, camera, books, lightbulb, heart, and pencil"
              fill
              priority
              sizes="(max-width: 1100px) 50vw, 550px"
              className="object-contain object-center"
            />
          </motion.div>

          {/* Twinkling sparkles */}
          {[
            { top: "6%", left: "7%", delay: 0 },
            { top: "14%", left: "55%", delay: 0.8 },
            { top: "42%", left: "3%", delay: 1.6 },
            { top: "68%", right: "6%", delay: 2.4 },
            { bottom: "14%", left: "20%", delay: 3.2 },
            { top: "28%", left: "28%", delay: 1.2 },
          ].map((pos, i) => (
            <motion.span
              key={i}
              className="pointer-events-none absolute text-[11px] text-[#FFE9B7] select-none z-20"
              style={pos as React.CSSProperties}
              animate={{ opacity: [0, 1, 0], scale: [0.4, 1.3, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: pos.delay, ease: "easeInOut" }}
              aria-hidden="true"
            >
              ✦
            </motion.span>
          ))}

          {/* Hotspot pins — all 6, clipped inside the image area */}
          {aboutHotspots.map((hs) => (
            <HotspotPin
              key={hs.id}
              hotspot={hs}
              isActive={activeId === hs.id}
              isHinted={activeId === null && hintId === hs.id}
              onActivate={handleActivate}
            />
          ))}
        </div>

        {/* RIGHT — Detail panel */}
        <div
          className="flex flex-col justify-center"
          style={{ background: "#FFFBF5" }}
        >
          <AboutPanel active={activeHotspot} isDefault={activeId === null} />
        </div>
      </div>

      {/* ── Mobile stack layout ── */}
      <div
        className="md:hidden flex flex-col rounded-[2.5rem] overflow-hidden shadow-xl"
        style={{ border: "1px solid rgba(255,255,255,0.5)" }}
      >
        {/* Image */}
        <div
          ref={containerRef}
          className="relative overflow-hidden"
          style={{ height: 420, background: "#1a1424" }}
        >
          {/* Edge glows */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute rounded-full opacity-25" style={{ width: 180, height: 180, top: -30, left: -30, background: "#FFE9B7", filter: "blur(55px)" }} />
            <div className="absolute rounded-full opacity-20" style={{ width: 150, height: 150, bottom: -20, left: 10, background: "#FFD8E5", filter: "blur(45px)" }} />
            <div className="absolute rounded-full opacity-18" style={{ width: 140, height: 140, top: -20, right: -10, background: "#CAE1E9", filter: "blur(45px)" }} />
          </div>

          <motion.div
            className="relative z-10 w-full h-full"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/about/me.webp"
              alt="Sneha — 3D clay character"
              fill
              priority
              sizes="100vw"
              className="object-contain object-center"
            />
          </motion.div>

          {aboutHotspots.map((hs) => (
            <HotspotPin
              key={hs.id}
              hotspot={hs}
              isActive={activeId === hs.id}
              isHinted={activeId === null && hintId === hs.id}
              onActivate={handleActivate}
            />
          ))}
        </div>

        {/* Panel */}
        <div style={{ minHeight: 300, background: "#FFFBF5" }}>
          <AboutPanel active={activeHotspot} isDefault={activeId === null} />
        </div>

        {/* Dot row */}
        <div className="flex justify-center gap-2 pb-5" style={{ background: "#FFFBF5" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.button
              key={i}
              id={`mobile-dot-${i + 1}`}
              aria-label={`Go to ${aboutHotspots[i].label}`}
              onClick={() => handleActivate(aboutHotspots[i].id)}
              className="w-2.5 h-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#E85D88]"
              style={{
                backgroundColor: activeId === i + 1 ? aboutHotspots[i].color : "#2A2733",
                opacity: activeId === i + 1 ? 1 : 0.2,
              }}
              animate={{ scale: activeId === i + 1 ? 1.5 : 1 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
