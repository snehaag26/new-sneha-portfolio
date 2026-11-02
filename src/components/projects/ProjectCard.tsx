"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ExternalLink, Check, Sparkles, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { ProjectItem } from "@/data/projects";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  total: number;
  isMobile?: boolean;
  isVisible?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  total,
  isVisible = true,
}) => {
  const [imgError, setImgError] = useState(false);
  const numStr = String(index + 1).padStart(2, "0");
  const totalStr = String(total).padStart(2, "0");

  useEffect(() => {
    setImgError(false);
  }, [project.slug]);

  return (
    <div
      className="w-full max-w-[440px] rounded-[2rem] bg-[#FFFBF5] dark:bg-[#181622] border border-white/80 dark:border-white/10 p-5 sm:p-6 shadow-[0_20px_50px_rgba(42,39,51,0.08)] transition-all duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.97)",
      }}
    >
      {/* Top Media Thumbnail */}
      <div className="relative w-full h-28 sm:h-32 rounded-2xl overflow-hidden mb-3.5 bg-gradient-to-br from-[#FFE9B7]/50 via-[#FFD8E5]/40 to-[#CAE1E9]/60 border border-black/5 dark:border-white/10 flex flex-col justify-between p-2.5">
        {!imgError ? (
          <img
            src={`/projects/${project.slug}/main.png`}
            alt={`${project.title} screenshot`}
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E85D88]/40" />
                <span className="w-2 h-2 rounded-full bg-[#FFE9B7]/70" />
                <span className="w-2 h-2 rounded-full bg-[#CAE1E9]/80" />
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/90 dark:bg-[#181622]/90 text-[#2A2733] dark:text-[#F5F3FB] shadow-xs">
                {project.category}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-white/90 dark:bg-white/10 flex items-center justify-center text-[#E85D88] shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <p className="font-serif font-bold text-sm text-[#2A2733] dark:text-[#F5F3FB] truncate">
                {project.tagline}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Header Chips & Number */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="px-2.5 py-0.5 rounded-full font-mono font-bold text-xs bg-[#2A2733]/5 dark:bg-white/10 text-[#E85D88] border border-[#E85D88]/20 tracking-normal">
          {numStr} / {totalStr}
        </span>
        <span className="text-[10px] font-mono font-medium text-[#5E5B6E] dark:text-[#A3A0B5] bg-white/80 dark:bg-white/5 px-2 py-0.5 rounded-md border border-black/5 dark:border-white/5 tracking-normal">
          {project.category}
        </span>
      </div>

      {/* Project Title (Instrument Serif) */}
      <h3
        className="font-serif font-bold text-2xl sm:text-[26px] text-[#2A2733] dark:text-[#F5F3FB] leading-tight mb-1.5 tracking-normal"
        aria-live="polite"
      >
        {project.title}
      </h3>

      {/* 2-line Description */}
      <p className="text-xs text-[#5E5B6E] dark:text-[#A3A0B5] line-clamp-2 leading-relaxed mb-3.5 font-sans tracking-normal">
        {project.description}
      </p>

      {/* 3 Key Features (fully wrapped, no ellipsis clipping) */}
      <div className="space-y-1.5 mb-3.5">
        {project.keyFeatures.slice(0, 3).map((feat, i) => (
          <div key={i} className="flex items-start gap-2 text-xs text-[#2A2733] dark:text-[#F5F3FB]">
            <span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-[#E85D88]/15 flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5 text-[#E85D88]" />
            </span>
            <span className="text-[#2A2733] dark:text-[#F5F3FB] font-sans font-medium text-[11px] sm:text-xs tracking-normal leading-normal">
              {feat}
            </span>
          </div>
        ))}
      </div>

      {/* Tech Chips */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.techStack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 rounded-md bg-[#2A2733]/5 dark:bg-white/10 text-[10px] font-mono tracking-normal text-[#5E5B6E] dark:text-[#A3A0B5]"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-2.5 border-t border-black/5 dark:border-white/10">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#2A2733] dark:bg-[#F5F3FB] text-white dark:text-[#2A2733] text-xs font-sans font-semibold tracking-normal hover:bg-[#E85D88] dark:hover:bg-[#E85D88] dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E85D88]"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-white/10 border border-black/10 dark:border-white/10 text-[#2A2733] dark:text-[#F5F3FB] text-xs font-sans font-semibold tracking-normal hover:bg-black/5 dark:hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E85D88]"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        )}

        <Link
          href={`/projects/${project.slug}`}
          className="p-2 rounded-xl bg-white dark:bg-white/10 border border-black/10 dark:border-white/10 text-[#5E5B6E] dark:text-[#A3A0B5] hover:text-[#2A2733] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E85D88]"
          aria-label={`View full case study for ${project.title}`}
          title="View full case study"
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
