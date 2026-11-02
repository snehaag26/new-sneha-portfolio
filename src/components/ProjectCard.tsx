"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight, Sparkles } from "lucide-react";
import { GithubIcon } from "./Icons";
import { Project } from "@/data/portfolio";
import { TiltCard } from "./TiltCard";
import { useCursor } from "./Providers";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { setCursorVariant, resetCursor } = useCursor();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <TiltCard
        maxTilt={6}
        className="glass-card rounded-[2rem] p-6 md:p-8 flex flex-col justify-between h-full border border-white/80 dark:border-white/10 group overflow-hidden"
      >
        <div>
          {/* Visual Mockup Preview Header */}
          <div
            className="relative w-full h-52 md:h-64 rounded-2xl overflow-hidden mb-6 flex items-center justify-center p-6 border border-white/60 dark:border-white/10"
            style={{
              background: `linear-gradient(135deg, ${project.color}35 0%, #FFFFFF20 50%, ${project.color}50 100%)`,
            }}
            onMouseEnter={() => setCursorVariant("project", "Explore")}
            onMouseLeave={resetCursor}
          >
            {/* Ambient decorative glowing blobs */}
            <div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl opacity-60"
              style={{ backgroundColor: project.color }}
            />
            <div
              className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-2xl opacity-40 bg-[#FFD8E5]"
            />

            {/* Stylized Device / App Mockup Window */}
            <motion.div
              className="relative z-10 w-full max-w-[90%] bg-white/90 dark:bg-[#181622]/90 rounded-xl shadow-xl border border-white dark:border-white/10 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {/* Window Title Bar */}
              <div className="flex items-center justify-between px-3 py-2 bg-black/[0.03] dark:bg-white/[0.05] border-b border-black/[0.05] dark:border-white/[0.05]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF8AB2]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFE9B7]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#CAE1E9]" />
                </div>
                <span className="text-[10px] font-mono font-medium text-[#5E5B6E] dark:text-[#A3A0B5] truncate max-w-[140px]">
                  {project.slug}.sneha.dev
                </span>
                <span className="text-[10px] text-emerald-500 font-bold">LIVE</span>
              </div>

              {/* Mockup Body Content */}
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                    style={{ backgroundColor: project.color, color: "#2A2733" }}
                  >
                    ✦
                  </div>
                  <div className="space-y-1">
                    <div className="w-24 h-2.5 rounded bg-black/10 dark:bg-white/10" />
                    <div className="w-16 h-2 rounded bg-black/5 dark:bg-white/5" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div
                    className="h-10 rounded-md p-1.5 flex flex-col justify-between"
                    style={{ backgroundColor: "#FFE9A8", color: "#1E1B2E" }}
                  >
                    <span className="text-[8px] font-semibold opacity-75">Score</span>
                    <span className="text-[11px] font-bold">100%</span>
                  </div>
                  <div
                    className="h-10 rounded-md p-1.5 flex flex-col justify-between"
                    style={{ backgroundColor: "#CAE1E9", color: "#1E1B2E" }}
                  >
                    <span className="text-[8px] font-semibold opacity-75">Latency</span>
                    <span className="text-[11px] font-bold">42ms</span>
                  </div>
                  <div
                    className="h-10 rounded-md p-1.5 flex flex-col justify-between"
                    style={{ backgroundColor: "#FFD8E5", color: "#1E1B2E" }}
                  >
                    <span className="text-[8px] font-semibold opacity-75">Rating</span>
                    <span className="text-[11px] font-bold">5.0 ★</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Category Pill Tag */}
            <div className="absolute top-3 left-3 z-20">
              <span
                className="px-3 py-1 rounded-full text-[11px] font-bold font-display tracking-wider uppercase shadow-sm backdrop-blur-md border"
                style={{
                  backgroundColor: "var(--surface)",
                  color: "var(--text)",
                  borderColor: "var(--border)",
                }}
              >
                {project.category}
              </span>
            </div>
          </div>

          {/* Project Header & Tagline */}
          <div className="space-y-2 mb-4">
            <div className="flex items-start justify-between gap-2">
              <h3
                className="text-xl md:text-2xl font-display font-extrabold transition-colors"
                style={{ color: "var(--text)" }}
              >
                {project.title}
              </h3>
              <Link
                href={`/projects/${project.slug}`}
                className="p-1.5 rounded-full transition-colors"
                style={{ color: "var(--text-muted)" }}
                aria-label={`View ${project.title} case study`}
              >
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
            <p
              className="text-xs md:text-sm font-medium line-clamp-2"
              style={{ color: "var(--text-muted)" }}
            >
              {project.tagline}
            </p>
          </div>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border"
                style={{
                  backgroundColor: "var(--surface-2)",
                  color: "var(--text)",
                  borderColor: "var(--border)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Key Features Bullet List */}
          <div className="space-y-1.5 mb-6">
            {project.keyFeatures.slice(0, 2).map((feat, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons: Case Study + Live Demo + GitHub */}
        <div
          className="pt-4 border-t flex items-center justify-between gap-2"
          style={{ borderColor: "var(--border)" }}
        >
          <Link
            href={`/projects/${project.slug}`}
            className="text-xs font-bold font-display inline-flex items-center gap-1.5"
            style={{ color: "var(--text)" }}
            onMouseEnter={() => setCursorVariant("button")}
            onMouseLeave={resetCursor}
          >
            <span>Read Case Study</span>
            <span>→</span>
          </Link>

          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl border transition-colors"
              style={{
                backgroundColor: "var(--surface-2)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
              title="View GitHub Code"
              aria-label="GitHub Repository"
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={resetCursor}
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold font-display hover:scale-105 active:scale-95 transition-all shadow-sm"
              style={{
                backgroundColor: "#FFE9B7",
                color: "#1E1B2E",
                border: "1px solid rgba(30,27,46,0.1)",
              }}
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={resetCursor}
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
