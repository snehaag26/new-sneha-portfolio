"use client";

import React from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  depthZ?: number;
  glowColor?: string;
  style?: React.CSSProperties;
}

export function GlassCard({
  children,
  className = "",
  glowColor = "rgba(255, 233, 183, 0.25)",
  style,
}: GlassCardProps) {
  return (
    <motion.div
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        color: "var(--text)",
        ...style,
      }}
      whileHover={{
        y: -4,
        boxShadow: `0 20px 40px -10px rgba(0, 0, 0, 0.12), 0 0 20px 2px ${glowColor}`,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={`rounded-3xl backdrop-blur-xl border p-4 sm:p-5 transition-shadow duration-300 shadow-sm ${className}`}
    >
      {children}
    </motion.div>
  );
}
