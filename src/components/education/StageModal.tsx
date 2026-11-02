"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Award, Sparkles, BookOpen } from "lucide-react";
import type { EducationStage } from "@/data/education";

interface StageModalProps {
  stage: EducationStage | null;
  onClose: () => void;
}

export function StageModal({ stage, onClose }: StageModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (stage) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [stage, onClose]);

  return (
    <AnimatePresence>
      {stage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-[#2A2733]/40 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Card */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg rounded-3xl overflow-hidden z-10"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              boxShadow: "0 25px 60px -15px rgba(0,0,0,0.3)",
            }}
          >
            {/* Top decorative banner with stage pastel color */}
            <div
              className="h-24 px-6 pt-5 pb-4 flex items-start justify-between relative overflow-hidden"
              style={{ backgroundColor: stage.color }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-white/90 text-[#1E1B2E] shadow-sm">
                  {stage.chip}
                </span>
                {stage.isCurrent && (
                  <span
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-extrabold uppercase shadow-sm"
                    style={{
                      backgroundColor: "var(--pill-active-bg)",
                      color: "var(--pill-active-text)",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    NOW
                  </span>
                )}
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#1E1B2E] flex items-center justify-center transition-all duration-200 hover:rotate-90 shadow-sm cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <span
                  className="text-xs font-mono font-semibold uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  {stage.label}
                </span>
                <h3
                  id="modal-title"
                  className="text-2xl sm:text-3xl font-display font-bold mt-0.5"
                  style={{ color: "var(--text)" }}
                >
                  {stage.institution}
                </h3>
                <p
                  className="text-sm font-medium mt-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {stage.board}
                </p>
              </div>

              {/* Meta pills */}
              <div
                className="flex flex-wrap items-center gap-3 text-xs font-medium"
                style={{ color: "var(--text)" }}
              >
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border"
                  style={{
                    backgroundColor: "var(--surface-2)",
                    borderColor: "var(--border)",
                  }}
                >
                  <Calendar className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
                  <span>{stage.period}</span>
                </div>
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border"
                  style={{
                    backgroundColor: "var(--surface-2)",
                    borderColor: "var(--border)",
                  }}
                >
                  <MapPin className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
                  <span>India</span>
                </div>
              </div>

              {/* Highlight callout */}
              <div
                className="p-4 rounded-2xl border transition-all"
                style={{
                  backgroundColor: "var(--surface-2)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex items-start gap-3">
                  <Sparkles
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: "var(--accent)" }}
                  />
                  <p
                    className="text-sm font-semibold leading-relaxed"
                    style={{ color: "var(--text)" }}
                  >
                    &ldquo;{stage.hoverLine}&rdquo;
                  </p>
                </div>
              </div>

              {/* Summary line */}
              <div
                className="space-y-2 pt-1 border-t"
                style={{ borderColor: "var(--border)" }}
              >
                <span
                  className="text-[11px] font-mono uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  Summary & Focus
                </span>
                <p
                  className="text-sm leading-relaxed font-sans"
                  style={{ color: "var(--text-muted)" }}
                >
                  {stage.modalLine}
                </p>
              </div>

              {/* Action */}
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer shadow-md"
                  style={{
                    backgroundColor: "var(--pill-active-bg)",
                    color: "var(--pill-active-text)",
                  }}
                >
                  Close & Return to Map
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
