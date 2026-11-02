"use client";

import React from "react";
import { ProjectItem } from "@/data/projects";

interface ProjectPillsProps {
  projects: ProjectItem[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export const ProjectPills: React.FC<ProjectPillsProps> = ({
  projects,
  currentIndex,
  onSelect,
}) => {
  return (
    <div
      className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2.5 w-full max-w-xl mx-auto"
      role="tablist"
      aria-label="Projects navigation pills"
    >
      {projects.map((proj, idx) => {
        const isActive = idx === currentIndex;
        return (
          <button
            key={proj.slug}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Select project 0${idx + 1} ${proj.title}`}
            onClick={() => onSelect(idx)}
            onMouseEnter={() => onSelect(idx)}
            className={`group inline-flex items-center justify-center sm:justify-start gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-mono transition-all duration-200 border cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E85D88] ${
              isActive
                ? "bg-[#2A2733] dark:bg-[#F5F3FB] text-white dark:text-[#2A2733] border-transparent shadow-md scale-105"
                : "bg-white/80 dark:bg-white/10 text-[#5E5B6E] dark:text-[#A3A0B5] border-black/5 dark:border-white/10 hover:bg-[#FFE9B7]/40 hover:text-[#2A2733] dark:hover:text-white"
            }`}
          >
            <span
              className={`font-bold transition-colors ${
                isActive ? "text-[#E85D88]" : "text-[#8E8A9F] group-hover:text-[#E85D88]"
              }`}
            >
              0{idx + 1}
            </span>
            <span className="font-medium truncate max-w-[130px] sm:max-w-none">
              {proj.title}
            </span>
          </button>
        );
      })}
    </div>
  );
};
