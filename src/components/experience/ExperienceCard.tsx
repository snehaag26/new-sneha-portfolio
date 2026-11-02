"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import {
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Building2,
  Flag,
} from "lucide-react";
import { ExperienceStop } from "@/data/experience";
import { useCursor } from "@/components/Providers";

interface ExperienceCardProps {
  stop: ExperienceStop;
  index: number;
  align: "left" | "right";
}

export const ExperienceCard = forwardRef<HTMLElement, ExperienceCardProps>(
  ({ stop, index, align }, ref) => {
    const { setCursorVariant, resetCursor } = useCursor();

    return (
      <article
        ref={ref}
        tabIndex={0}
        aria-label={`${stop.role} at ${stop.organization}`}
        className="w-full max-w-[560px] p-8 sm:p-10 relative transition-shadow duration-300 focus-visible:outline-none select-none rounded-2xl shadow-lg border"
        style={{
          borderRadius: "16px",
          transformOrigin: align === "left" ? "right center" : "left center",
          backgroundColor: stop.isFinish ? "var(--surface-2)" : "var(--surface)",
          borderColor: "var(--border)",
          color: "var(--text)",
        }}
        onMouseEnter={() => setCursorVariant("hover")}
        onMouseLeave={resetCursor}
      >
        {/* Step Badge + Category Tag + Period */}
        <div
          data-card-reveal
          className="flex flex-wrap items-center justify-between gap-3 mb-6"
        >
          <div className="flex items-center gap-2.5">
            {/* Step Pill */}
            <span
              className="px-3.5 py-1 rounded-lg font-mono text-[11px] font-bold tracking-widest text-[#1E1B2E] border border-black/05 shadow-xs"
              style={{ backgroundColor: stop.tagColor }}
            >
              {stop.step}
            </span>

            {/* Category Tag */}
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-mono uppercase tracking-[0.10em] font-semibold"
              style={{
                backgroundColor: "var(--surface-2)",
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
              }}
            >
              {stop.isFinish ? (
                <Flag className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
              ) : (
                <Sparkles className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
              )}
              {stop.tag}
            </span>
          </div>

          {/* Period in 11px Monospace */}
          <div
            className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wider"
            style={{ color: "var(--text-muted)" }}
          >
            <Calendar className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
            <span>{stop.period}</span>
          </div>
        </div>

        {/* Role / Title (36px Instrument Serif) */}
        <h2
          data-card-reveal
          className="font-serif text-3xl sm:text-4xl lg:text-[36px] leading-[1.1] mb-2.5 tracking-tight"
          style={{ letterSpacing: "-0.02em", color: "var(--text)" }}
        >
          {stop.role}
        </h2>

        {/* Company / Organization (16px) */}
        <div
          data-card-reveal
          className="flex flex-wrap items-center gap-2 text-base mb-5"
          style={{ color: "var(--text-muted)" }}
        >
          <span className="font-semibold" style={{ color: "var(--text)" }}>
            {stop.organization}
          </span>
          {stop.sublabel && (
            <>
              <span>•</span>
              <span className="text-sm font-medium">
                {stop.sublabel}
              </span>
            </>
          )}
        </div>

        {/* For Stop 02: 3 Company Pills */}
        {stop.companies && stop.companies.length > 0 && (
          <div
            data-card-reveal
            className="flex flex-wrap items-center gap-2 mb-6 p-3.5 rounded-xl border"
            style={{
              backgroundColor: "var(--surface-2)",
              borderColor: "var(--border)",
            }}
          >
            <span
              className="text-[11px] font-mono uppercase tracking-wider mr-1 flex items-center gap-1.5 font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              <Building2 className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
              Brands:
            </span>
            {stop.companies.map((company, cIdx) => (
              <span
                key={cIdx}
                className="px-3 py-1 rounded-lg text-xs font-mono font-medium border shadow-xs"
                style={{
                  backgroundColor: "var(--surface)",
                  color: "var(--text)",
                  borderColor: "var(--border)",
                }}
              >
                {company}
              </span>
            ))}
          </div>
        )}

        {/* Impact Bullet Points (17px text, leading-relaxed, space-y-4) */}
        {stop.bullets && stop.bullets.length > 0 && (
          <ul className="space-y-4 mb-7 list-none p-0">
            {stop.bullets.map((bullet, idx) => (
              <li
                key={idx}
                data-card-reveal
                className="flex items-start gap-3 text-base sm:text-[17px] leading-relaxed"
                style={{ color: "var(--text)" }}
              >
                <CheckCircle2 className="w-4 h-4 mt-1.5 shrink-0" style={{ color: "var(--accent)" }} />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tech / Skill Chips (13px font-mono clean rectangular pills) */}
        {stop.chips && stop.chips.length > 0 && (
          <div
            data-card-reveal
            className="flex flex-wrap gap-2.5 pt-3 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            {stop.chips.map((chip, sIdx) => (
              <span
                key={sIdx}
                className="px-3.5 py-1.5 rounded-lg text-[13px] font-mono font-medium tracking-tight border shadow-xs transition-colors"
                style={{
                  backgroundColor: "var(--surface-2)",
                  color: "var(--text)",
                  borderColor: "var(--border)",
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        )}

        {/* CTA Button for Final Stop */}
        {stop.isFinish && stop.ctaLink && (
          <div
            data-card-reveal
            className="mt-8 pt-6 border-t flex items-center justify-between"
            style={{ borderColor: "var(--border)" }}
          >
            <span
              className="text-xs font-mono tracking-wider uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              NEXT OPPORTUNITY
            </span>
            <Link
              href={stop.ctaLink}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-xs tracking-wider uppercase transition-transform hover:scale-105 active:scale-95 shadow-md group"
              style={{
                backgroundColor: "var(--pill-active-bg)",
                color: "var(--pill-active-text)",
              }}
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={resetCursor}
            >
              <span>{stop.ctaText || "Let's Work Together"}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </article>
    );
  }
);

ExperienceCard.displayName = "ExperienceCard";
