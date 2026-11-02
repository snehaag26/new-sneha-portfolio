"use client";

import React from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { ProjectItem } from "@/data/projects";

interface TourControlsProps {
  projects: ProjectItem[];
  currentIndex: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  isPaused: boolean;
  onTogglePause: () => void;
}

export const TourControls: React.FC<TourControlsProps> = ({
  projects,
  currentIndex,
  onSelect,
  onPrev,
  onNext,
  isPaused,
  onTogglePause,
}) => {
  return (
    <div
      className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 dark:bg-[#181622]/90 shadow-[0_8px_24px_rgba(42,39,51,0.08)] border border-white/80 dark:border-white/15 backdrop-blur-md"
      role="region"
      aria-label="Island Tour Controls"
    >
      {/* Prev Button */}
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous project building"
        className="w-7 h-7 rounded-full flex items-center justify-center text-[#2A2733] dark:text-[#F5F3FB] hover:bg-[#FFE9B7] dark:hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E85D88]"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* 4 Numbered Dots */}
      <div className="flex items-center gap-1.5 px-0.5" role="tablist" aria-label="Projects">
        {projects.map((proj, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={proj.slug}
              role="tab"
              aria-selected={isActive}
              aria-label={`Jump to 0${idx + 1} ${proj.title}`}
              onClick={() => onSelect(idx)}
              className={`relative flex items-center justify-center rounded-full text-[11px] font-mono font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E85D88] ${
                isActive
                  ? "w-6 h-6 sm:w-7 sm:h-7 bg-[#E85D88] text-white shadow-sm shadow-[#E85D88]/30 scale-105"
                  : "w-6 h-6 bg-[#2A2733]/5 dark:bg-white/10 text-[#5E5B6E] dark:text-[#A3A0B5] hover:bg-[#2A2733]/15 hover:text-[#2A2733] dark:hover:text-white"
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={onNext}
        aria-label="Next project building"
        className="w-7 h-7 rounded-full flex items-center justify-center text-[#2A2733] dark:text-[#F5F3FB] hover:bg-[#FFE9B7] dark:hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E85D88]"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Divider */}
      <div className="w-px h-3.5 bg-black/10 dark:bg-white/10 mx-0.5" />

      {/* Play / Pause Toggle */}
      <button
        type="button"
        onClick={onTogglePause}
        aria-label={isPaused ? "Resume auto tour" : "Pause auto tour"}
        title={isPaused ? "Resume auto tour" : "Pause auto tour"}
        className="w-7 h-7 rounded-full flex items-center justify-center text-[#5E5B6E] dark:text-[#A3A0B5] hover:text-[#2A2733] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E85D88]"
      >
        {isPaused ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3 fill-current" />}
      </button>
    </div>
  );
};
