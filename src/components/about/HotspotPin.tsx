"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Hotspot } from "@/data/about";

interface HotspotPinProps {
  hotspot: Hotspot;
  isActive: boolean;
  isHinted: boolean;
  onActivate: (id: number) => void;
}

export default function HotspotPin({
  hotspot,
  isActive,
  isHinted,
  onActivate,
}: HotspotPinProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  // Whether label should appear above (to prevent clipping at bottom)
  const labelAbove = hotspot.y > 75;

  return (
    <button
      ref={btnRef}
      id={`hotspot-pin-${hotspot.id}`}
      aria-label={`${hotspot.label} — ${hotspot.title}`}
      aria-pressed={isActive}
      onClick={(e) => {
        e.stopPropagation();
        onActivate(hotspot.id);
      }}
      className="absolute group focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      style={{
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: 30,
        /* Give enough touch area */
        padding: 8,
      }}
    >
      {/* Pulsing ring */}
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-full border-2"
        style={{
          borderColor: hotspot.color,
          margin: "-8px",
        }}
        animate={
          isHinted || isActive
            ? { scale: [1, 1.9, 1], opacity: [0.9, 0, 0.9] }
            : { scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }
        }
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        aria-hidden="true"
      />

      {/* Pin dot */}
      <motion.span
        className="relative flex items-center justify-center w-8 h-8 rounded-full shadow-lg text-sm select-none"
        style={{
          backgroundColor: isActive ? hotspot.color : "rgba(255,251,245,0.92)",
          border: `2px solid ${isActive ? "white" : hotspot.color}`,
          color: "#2A2733",
        }}
        animate={{ scale: isActive ? 1.2 : isHinted ? 1.1 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        whileHover={{ scale: 1.2 }}
      >
        {hotspot.emoji}
      </motion.span>

      {/* Floating label — flips above when near bottom */}
      <AnimatePresence>
        {!isActive && (
          <motion.span
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow-sm"
            style={{
              backgroundColor: hotspot.color,
              color: "#2A2733",
              ...(labelAbove
                ? { bottom: "calc(100% + 4px)" }
                : { top: "calc(100% + 4px)" }),
            }}
            initial={{ opacity: 0, y: labelAbove ? 4 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: labelAbove ? 4 : -4 }}
            transition={{ duration: 0.2 }}
          >
            {hotspot.label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
