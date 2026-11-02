"use client";

import React from "react";
import { projectsData } from "@/data/projects";
import { SpinningIsland } from "@/components/projects/SpinningIsland";

export default function ProjectsPage() {
  return (
    <div className="pt-[140px] pb-24 px-4 sm:px-6 md:px-8 max-w-[1300px] mx-auto flex flex-col items-center">
      {/* HEADER */}
      <header className="text-center max-w-2xl mx-auto space-y-2.5 mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-widest"
          style={{
            background: "#CAE1E9",
            color: "#1E1B2E",
            border: "1px solid rgba(31, 90, 120, 0.18)",
          }}
        >
          <span>PROJECTS</span>
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight"
          style={{ color: "var(--text)" }}
        >
          Things I&apos;ve{" "}
          <span className="italic" style={{ color: "var(--accent)" }}>
            Built
          </span>
        </h1>

        <p
          className="text-sm sm:text-base font-body leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          Follow the pins across my little world.
        </p>
      </header>

      {/* STAGE: Floating & Continuously Spinning 3D City Island */}
      <main className="w-full flex justify-center">
        <SpinningIsland projects={projectsData} />
      </main>
    </div>
  );
}
