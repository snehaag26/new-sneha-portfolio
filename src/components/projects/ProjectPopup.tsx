"use client";

import React from "react";
import Link from "next/link";
import { ProjectItem } from "@/data/projects";

interface ProjectPopupProps {
  project: ProjectItem;
  index: number;
  isOpen: boolean;
  pinHotspot: { x: number; y: number };
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const ProjectPopup: React.FC<ProjectPopupProps> = ({
  project,
  index,
  isOpen,
  pinHotspot,
  onMouseEnter,
  onMouseLeave,
}) => {
  // Flip below pin if pin is located in upper area of island to avoid clipping the top
  const flipBelow = pinHotspot.y < 35;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute left-1/2 -translate-x-1/2 z-40 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        flipBelow
          ? "top-full mt-2.5 origin-top"
          : "bottom-full mb-2.5 origin-bottom"
      } ${
        isOpen
          ? "scale-100 opacity-100 translate-y-0 pointer-events-auto"
          : "scale-[0.3] opacity-0 pointer-events-none"
      }`}
    >
      {/* Thin stem connector line to the rooftop pin */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 w-[1.5px] bg-[#E85D88] pointer-events-none ${
          flipBelow ? "bottom-full h-2.5" : "top-full h-2.5"
        }`}
      >
        <span
          className={`absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#E85D88] ${
            flipBelow ? "top-0 -translate-y-1/2" : "bottom-0 translate-y-1/2"
          }`}
        />
      </div>

      {/* Clay Project Card (210px desktop, 190px mobile) */}
      <div
        className="w-[190px] max-w-[200px] sm:w-[210px] sm:max-w-none rounded-2xl p-2 space-y-1.5 bg-[#FFFBF5] dark:bg-[#1E1B2A] border border-black/5 dark:border-white/10 shadow-[0_12px_28px_rgba(42,39,51,0.18)] dark:shadow-[0_12px_28px_rgba(0,0,0,0.55)] select-none text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Project Thumbnail Screenshot */}
        <div className="relative w-full h-[88px] rounded-xl overflow-hidden bg-[#BFD9EA]/30 border border-black/5 dark:border-white/5">
          <img
            src={`/projects/${project.slug}/main.png`}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = "none";
            }}
          />
          <span className="absolute top-1 right-1 px-1.5 py-0.5 rounded-full text-[8.5px] font-mono font-bold bg-white/90 dark:bg-black/70 text-[#2A2733] dark:text-[#F5F3FB] shadow-sm">
            0{index + 1}
          </span>
        </div>

        {/* Title & Short Tagline */}
        <div className="space-y-0.5 px-0.5">
          <Link
            href={`/projects/${project.slug}`}
            className="group inline-flex items-center gap-1 font-serif font-bold text-xs text-[#2A2733] dark:text-[#F5F3FB] hover:text-[#E85D88] dark:hover:text-[#FF85A2] transition-colors leading-tight truncate w-full"
            title={`View ${project.title} case study`}
          >
            <span className="truncate">{project.title}</span>
            <svg
              className="w-2.5 h-2.5 flex-shrink-0 text-[#8E8A9F] group-hover:text-[#E85D88] group-hover:translate-x-0.5 transition-all"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <p className="text-[10px] font-body text-[#5E5B6E] dark:text-[#A3A0B5] line-clamp-1 leading-tight">
            {project.tagline}
          </p>
        </div>

        {/* Action Buttons: Live Demo and GitHub */}
        <div className="pt-0.5 flex items-center gap-1.5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1 py-1 px-1.5 rounded-lg bg-[#2A2733] dark:bg-[#F5F3FB] text-white dark:text-[#2A2733] text-[9.5px] font-mono font-semibold hover:bg-[#E85D88] dark:hover:bg-[#E85D88] dark:hover:text-white transition-colors text-center"
            >
              <span>Live Demo</span>
              <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center py-1 px-1.5 rounded-lg bg-black/5 dark:bg-white/10 text-[#2A2733] dark:text-[#F5F3FB] text-[9.5px] font-mono font-semibold hover:text-[#E85D88] hover:bg-[#E85D88]/10 transition-colors"
              aria-label="GitHub repository"
            >
              <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
