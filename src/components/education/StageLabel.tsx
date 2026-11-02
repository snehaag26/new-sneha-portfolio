"use client";

import type { EducationStage } from "@/data/education";

interface StageLabelProps {
  stage: EducationStage;
  isHovered: boolean;
  onClick: () => void;
  className?: string;
}

export function StageLabel({
  stage,
  isHovered,
  onClick,
  className = "",
}: StageLabelProps) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${stage.institution}`}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className={`group cursor-pointer select-none rounded-2xl p-6 transition-transform duration-250 ease-out w-full max-w-[300px] text-left flex flex-col justify-between ${
        isHovered ? "scale-[1.03]" : ""
      } ${className}`}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: isHovered
          ? "0 16px 40px rgba(120, 90, 140, 0.20)"
          : "0 12px 30px rgba(120, 90, 140, 0.08)",
        color: "var(--text)",
      }}
    >
      <div className="space-y-3">
        {/* 1. Step chip (mono) */}
        <div className="flex items-center gap-2">
          <span
            className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase text-[#1E1B2E]"
            style={{ backgroundColor: stage.color }}
          >
            {stage.chip}
          </span>
          {stage.isCurrent && (
            <span
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase"
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

        {/* 2. Course / class (mono, colored) */}
        <div
          className="text-xs font-mono font-bold uppercase tracking-wider"
          style={{ color: "var(--accent)" }}
        >
          {stage.label}
        </div>

        {/* 3. School name (Instrument Serif 24px) */}
        <h3
          className="font-serif text-[24px] leading-snug transition-colors"
          style={{ color: "var(--text)" }}
        >
          {stage.institution}
        </h3>

        {/* 4. Board */}
        <p
          className="text-xs font-medium leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          {stage.board}
        </p>

        {/* 5. Years */}
        <div
          className="text-xs font-mono font-medium"
          style={{ color: "var(--text-muted)" }}
        >
          {stage.period}
        </div>
      </div>

      {/* 6. Click for details */}
      <div
        className="pt-4 mt-3 border-t flex items-center justify-between text-[11px] font-mono font-semibold"
        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
      >
        <span className="group-hover:opacity-80 transition-opacity">Click for details</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  );
}
