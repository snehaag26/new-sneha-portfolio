"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDownToLine, ArrowRight } from "lucide-react";
import { useCursor } from "@/components/Providers";

interface FloatingTileProps {
  title: string;
  href: string;
  isAccent?: boolean;
  isDownload?: boolean;
  downloadName?: string;
  depthZ?: number;
}

export function FloatingTile({
  title,
  href,
  isAccent = false,
  isDownload = false,
  downloadName,
}: FloatingTileProps) {
  const { setCursorVariant, resetCursor } = useCursor();

  const handleMouseEnter = () => setCursorVariant("button");
  const handleMouseLeave = () => resetCursor();

  const content = (
    <div className="flex items-center gap-2">
      <span className="font-sans font-semibold text-xs sm:text-sm tracking-normal whitespace-nowrap">
        {title}
      </span>
      {isDownload && <ArrowDownToLine className="w-3.5 h-3.5 shrink-0" />}
      {isAccent && !isDownload && <ArrowRight className="w-3.5 h-3.5 shrink-0" />}
    </div>
  );

  if (isDownload) {
    return (
      <motion.a
        href={href}
        download={downloadName || "Sneha_Agrawal_Resume.pdf"}
        whileHover={{
          y: -3,
          boxShadow:
            "0 20px 35px -8px rgba(30, 27, 46, 0.15), 0 0 20px rgba(255, 233, 183, 0.5)",
        }}
        whileTap={{ scale: 0.96 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="px-4 sm:px-6 py-3 rounded-2xl btn-resume border border-[#f5d590] shadow-md transition-shadow cursor-pointer block"
        style={{
          backgroundColor: "#FFE9B7",
          color: "#1E1B2E",
        }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      whileHover={{
        y: -3,
        boxShadow: isAccent
          ? "0 20px 35px -8px rgba(30, 27, 46, 0.25), 0 0 25px rgba(232, 85, 127, 0.35)"
          : "0 20px 35px -8px rgba(30, 27, 46, 0.10)",
      }}
      whileTap={{ scale: 0.96 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={href}
        className="px-4 sm:px-6 py-3 rounded-2xl cursor-pointer block transition-all border shadow-sm"
        style={{
          background: isAccent ? "var(--pill-active-bg)" : "var(--surface)",
          color: isAccent ? "var(--pill-active-text)" : "var(--text)",
          borderColor: "var(--border)",
        }}
      >
        {content}
      </Link>
    </motion.div>
  );
}
