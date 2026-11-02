"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
} from "lucide-react";

import { portfolioData } from "@/data/portfolio";
import { HeroScene } from "@/components/hero/HeroScene";

export default function HomePage() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* ============================================================== */}
      {/* 1. 3D DIORAMA + GLASS UI HERO OPENING                          */}
      {/* ============================================================== */}
      <HeroScene />

      {/* ============================================================== */}
      {/* 2. QUICK-GLANCE STATS STRIP                                    */}
      {/* ============================================================== */}
      <section className="px-4 md:px-8 max-w-6xl mx-auto mt-6 mb-24 relative z-10">
        <div
          className="rounded-[2.5rem] p-6 md:p-10 border shadow-marshmallow"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: "var(--border)" }}>
            {portfolioData.personal.stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center text-center p-3 ${
                  idx > 0 ? "pt-4 md:pt-3" : ""
                }`}
              >
                <div
                  className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold mb-1 flex items-baseline"
                  style={{ color: "var(--text)" }}
                >
                  <span>{stat.value}</span>
                  <span className="text-2xl sm:text-3xl" style={{ color: "var(--accent)" }}>
                    {stat.suffix}
                  </span>
                </div>
                <span
                  className="text-xs sm:text-sm font-semibold"
                  style={{ color: "var(--text-muted)" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. TECH STACK CONTINUOUS MARQUEE                               */}
      {/* ============================================================== */}
      <section className="mb-28 overflow-hidden py-10 relative z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center mb-8">
          <span
            className="text-xs font-mono font-bold tracking-widest uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            Tech Stack & Tools
          </span>
          <h2
            className="text-2xl sm:text-3xl font-display font-extrabold mt-1"
            style={{ color: "var(--text)" }}
          >
            Engineered with modern tools & frameworks
          </h2>
        </div>

        {/* Row 1: Forward Marquee */}
        <div className="relative w-full overflow-hidden flex mb-4">
          <div className="animate-marquee flex items-center gap-4 whitespace-nowrap">
            {[
              "Next.js 15 (App Router)",
              "React 19",
              "TypeScript",
              "Tailwind CSS",
              "Framer Motion",
              "GSAP / Lenis",
              "Node.js & Express",
              "Python & FastAPI",
              "PostgreSQL & Prisma",
              "Supabase",
              "Next.js 15 (App Router)",
              "React 19",
              "TypeScript",
              "Tailwind CSS",
              "Framer Motion",
            ].map((skill, idx) => (
              <span
                key={idx}
                className="px-5 py-3 rounded-2xl text-xs md:text-sm font-bold border shadow-sm flex items-center gap-2"
                style={{
                  backgroundColor: "var(--surface)",
                  color: "var(--text)",
                  borderColor: "var(--border)",
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FFE9A8" }} />
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2: Reverse Marquee */}
        <div className="relative w-full overflow-hidden flex">
          <div className="animate-marquee-reverse flex items-center gap-4 whitespace-nowrap">
            {[
              "Interactive 3D Dioramas",
              "UI/UX Design Systems",
              "Figma Prototyping",
              "Automated Webhooks",
              "Stripe API",
              "Docker & CI/CD",
              "AI Multi-Agents",
              "MongoDB",
              "Redis",
              "Responsive Layouts",
              "Interactive 3D Dioramas",
              "UI/UX Design Systems",
              "Figma Prototyping",
              "Automated Webhooks",
            ].map((skill, idx) => (
              <span
                key={idx}
                className="px-5 py-3 rounded-2xl text-xs md:text-sm font-bold border shadow-sm flex items-center gap-2"
                style={{
                  backgroundColor: "var(--surface)",
                  color: "var(--text)",
                  borderColor: "var(--border)",
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FFD8E5" }} />
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. ACADEMIC & ENGINEERING PRACTICE SPOTLIGHT                   */}
      {/* ============================================================== */}
      <section className="px-4 md:px-8 max-w-6xl mx-auto mb-20 relative z-10">
        <div
          className="rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden border shadow-marshmallow"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border"
                style={{
                  backgroundColor: "#FFE9A8",
                  color: "#1E1B2E",
                  borderColor: "rgba(30,27,46,0.1)",
                }}
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Computer Science & AI</span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-display font-extrabold leading-tight"
                style={{ color: "var(--text)" }}
              >
                Engineering intelligent systems with{" "}
                <span style={{ color: "var(--accent)" }}>aesthetic precision</span>
              </h2>
              <p
                className="text-sm md:text-base leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                Pursuing B.Tech CSE with an Artificial Intelligence specialization at Newton School of Technology, Rishihood University. Focused on human-computer interaction, autonomous agents, and fluid web animations.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  "Full-Stack Web Apps",
                  "AI Orchestration",
                  "Design Systems & Tokens",
                  "100% On-Time Delivery",
                ].map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1 rounded-xl text-xs font-bold"
                    style={{
                      backgroundColor: "#CAE1E9",
                      color: "#1E1B2E",
                    }}
                  >
                    ✓ {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3">
              <div
                className="p-5 rounded-2xl border space-y-2"
                style={{
                  backgroundColor: "var(--surface-2)",
                  borderColor: "var(--border)",
                }}
              >
                <span
                  className="text-xs font-mono font-bold"
                  style={{ color: "var(--text-muted)" }}
                >
                  LOCATION
                </span>
                <h4
                  className="text-sm font-bold font-display"
                  style={{ color: "var(--text)" }}
                >
                  India
                </h4>
                <p
                  className="text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  Open for global remote roles & Summer 2026 internships
                </p>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/experience"
                  className="flex-1 text-center py-3.5 rounded-2xl font-display font-bold text-xs shadow-md hover:scale-[1.02] transition-transform"
                  style={{
                    backgroundColor: "var(--pill-active-bg)",
                    color: "var(--pill-active-text)",
                  }}
                >
                  View Experience Timeline →
                </Link>
                <Link
                  href="/about"
                  className="px-5 py-3.5 rounded-2xl text-xs font-bold font-display border transition-colors"
                  style={{
                    backgroundColor: "var(--surface-2)",
                    color: "var(--text)",
                    borderColor: "var(--border)",
                  }}
                >
                  About Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
