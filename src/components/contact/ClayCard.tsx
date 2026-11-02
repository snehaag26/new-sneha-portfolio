"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ClayCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  variant?: "base" | "elevated" | "inset";
}

export function ClayCard({
  children,
  className = "",
  variant = "base",
  ...props
}: ClayCardProps) {
  let shadowClass = "";

  if (variant === "base") {
    // Puffy white clay card (solid white in light, dark plum in dark)
    shadowClass =
      "bg-[var(--lt-card-bg,#FFFFFF)] dark:bg-[#2E2A3A] text-[#2A2733] dark:text-[#F5F3FB] border border-[rgba(42,39,51,0.08)] dark:border-white/10 shadow-[0_25px_60px_-15px_rgba(120,90,140,0.16),inset_3px_3px_6px_rgba(255,255,255,0.95),inset_-3px_-3px_8px_rgba(42,39,51,0.03)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),inset_2px_2px_4px_rgba(255,255,255,0.15),inset_-3px_-3px_8px_rgba(0,0,0,0.35)]";
  } else if (variant === "elevated") {
    // Front card with slightly higher elevation
    shadowClass =
      "bg-[var(--lt-card-bg,#FFFFFF)] dark:bg-[#2E2A3A] text-[#2A2733] dark:text-[#F5F3FB] border border-[rgba(42,39,51,0.08)] dark:border-white/15 shadow-[0_30px_70px_-15px_rgba(120,90,140,0.18),inset_3px_3px_6px_rgba(255,255,255,1),inset_-3px_-3px_8px_rgba(42,39,51,0.03)] dark:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6),inset_2px_2px_4px_rgba(255,255,255,0.18),inset_-3px_-3px_8px_rgba(0,0,0,0.4)]";
  } else if (variant === "inset") {
    shadowClass =
      "bg-[#F8F5EF] dark:bg-[#252130] border border-black/05 dark:border-white/05 shadow-[inset_2px_2px_5px_rgba(42,39,51,0.05),inset_-2px_-2px_4px_rgba(255,255,255,0.85)] dark:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.4),inset_-1px_-1px_3px_rgba(255,255,255,0.06)]";
  }

  return (
    <motion.div
      className={`rounded-[2.5rem] relative ${shadowClass} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
