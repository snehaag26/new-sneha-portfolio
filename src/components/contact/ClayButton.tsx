"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useCursor } from "@/components/Providers";

interface ClayButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "icon";
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export function ClayButton({
  children,
  variant = "primary",
  isLoading = false,
  className = "",
  onClick,
  type = "button",
  ...props
}: ClayButtonProps) {
  const { setCursorVariant, resetCursor } = useCursor();

  let styleClasses = "";

  if (variant === "primary") {
    // Pastel pink/blue gradient with puffy 3D press effect
    styleClasses =
      "bg-gradient-to-r from-[#FFD8E5] via-[#FFE9B7] to-[#CAE1E9] text-[#2A2733] font-semibold shadow-[0_12px_24px_-8px_rgba(232,93,136,0.28),inset_1px_1px_2px_rgba(255,255,255,0.9),inset_-1px_-1px_2px_rgba(42,39,51,0.06)] border border-white/80 active:shadow-[0_4px_12px_-4px_rgba(232,93,136,0.3),inset_2px_2px_4px_rgba(42,39,51,0.08)]";
  } else if (variant === "secondary") {
    styleClasses =
      "bg-[#FFFBF5] dark:bg-[#1E1B2A] text-[#2A2733] dark:text-[#F5F1FA] font-medium shadow-[0_10px_20px_-8px_rgba(42,39,51,0.08),inset_1px_1px_2px_rgba(255,255,255,0.9)] border border-black/05 dark:border-white/10";
  } else if (variant === "icon") {
    styleClasses =
      "w-12 h-12 rounded-full flex items-center justify-center bg-[#FFFBF5] dark:bg-[#1E1B2A] text-[#2A2733] dark:text-[#F5F1FA] shadow-[0_10px_20px_-6px_rgba(42,39,51,0.10),inset_1px_1px_3px_rgba(255,255,255,0.95),inset_-1px_-1px_2px_rgba(42,39,51,0.04)] border border-white/80 dark:border-white/10";
  }

  return (
    <motion.button
      type={type}
      disabled={isLoading}
      onClick={onClick}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ y: 2, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`rounded-full relative select-none cursor-pointer flex items-center justify-center transition-shadow duration-200 disabled:opacity-70 disabled:cursor-not-allowed ${styleClasses} ${className}`}
      onMouseEnter={() => setCursorVariant("button")}
      onMouseLeave={resetCursor}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-[#2A2733]" />
          <span>Sending...</span>
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}
