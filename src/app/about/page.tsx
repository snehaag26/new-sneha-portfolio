"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { siteConfig } from "@/data/site";
import { SocialIconRow } from "@/components/SocialIconRow";
import AboutScene from "@/components/about/AboutScene";
import TechStackBlock from "@/components/about/TechStackBlock";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* ================================================================ */}
      {/* HEADER — Mono label · Heading · Subtitle                         */}
      {/* ================================================================ */}
      <header
        className="pt-[140px] pb-12 px-4 md:px-8 text-center space-y-4"
        aria-label="About page header"
      >
        <motion.span
          className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-[0.22em] uppercase"
          style={{
            background: "#F3E6F7",
            color: "#1E1B2E",
            border: "1px solid rgba(107, 58, 138, 0.18)",
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ABOUT
        </motion.span>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold leading-tight"
          style={{ color: "var(--text)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          Hi, I&apos;m{" "}
          <em className="not-italic" style={{ color: "var(--accent)" }}>Sneha</em>
        </motion.h1>

        <motion.p
          className="text-sm sm:text-base font-medium tracking-wide"
          style={{ color: "var(--text-muted)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Full-Stack Developer &middot; India
        </motion.p>
      </header>

      {/* ================================================================ */}
      {/* HERO SCENE — Character image + interactive hotspot panel         */}
      {/* ================================================================ */}
      <motion.section
        className="px-4 md:px-8 max-w-[1200px] mx-auto"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        aria-label="Interactive character scene"
      >
        <AboutScene />
      </motion.section>

      {/* ================================================================ */}
      {/* BELOW HERO — Story block + CTA buttons                           */}
      {/* ================================================================ */}
      <section
        className="px-4 md:px-8 max-w-[900px] mx-auto mt-20 space-y-10"
        aria-label="Short bio"
      >
        <motion.div
          className="rounded-[2.5rem] p-8 md:p-12 border text-center space-y-6 shadow-marshmallow"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p
            className="text-base sm:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            I&apos;m a passionate Full-Stack Developer pursuing B.Tech in CS &amp; AI
            at Newton School of Technology. I craft pixel-perfect UIs, scalable
            backends, and delightful micro-interactions — all from India. 🇮🇳
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              id="download-resume-btn"
              href={portfolioData.personal.links.resume}
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold font-display shadow-md hover:scale-105 active:scale-95 transition-all"
              style={{
                backgroundColor: "#FFE9B7",
                color: "#1E1B2E",
              }}
              aria-label="Download resume PDF"
            >
              Download Resume ↓
            </a>
            <Link
              id="lets-talk-btn"
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold font-display shadow-sm hover:scale-105 active:scale-95 transition-all"
              style={{
                backgroundColor: "#FFD8E5",
                color: "#1E1B2E",
              }}
              aria-label="Navigate to contact page"
            >
              Let&apos;s Talk →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/* TECH STACK BLOCK — lazy loaded below hero                        */}
      {/* ================================================================ */}
      <section className="px-4 md:px-8 max-w-[1200px] mx-auto mt-20">
        <TechStackBlock />
      </section>

      {/* ================================================================ */}
      {/* EDUCATION & EXPERIENCE LINKS                                     */}
      {/* ================================================================ */}
      <section
        className="px-4 md:px-8 max-w-[900px] mx-auto mt-16 mb-24"
        aria-label="Navigation links"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            {
              id: "education-link",
              href: "/education",
              label: "Academic Journey",
              emoji: "🎓",
              desc: "B.Tech CSE · AI Specialization · Newton School of Technology",
              color: "#FFE9B7",
            },
            {
              id: "experience-link",
              href: "/experience",
              label: "Work Experience",
              emoji: "💼",
              desc: "Full-Stack Engineer · Modern Web & AI Systems",
              color: "#FFD8E5",
            },
          ].map((item) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <Link
                id={item.id}
                href={item.href}
                className="group flex items-center gap-4 rounded-[2rem] p-6 border hover:shadow-lg transition-shadow"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
                aria-label={`Go to ${item.label}`}
              >
                <span
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                  style={{ backgroundColor: `${item.color}88` }}
                >
                  {item.emoji}
                </span>
                <div className="flex-1 min-w-0">
                  <p
                    className="font-display font-extrabold text-sm transition-colors"
                    style={{ color: "var(--text)" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-xs mt-0.5 truncate"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.desc}
                  </p>
                </div>
                <span
                  className="group-hover:translate-x-1 transition-transform text-lg"
                  style={{ color: "var(--text-muted)" }}
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Let's Talk & Socials Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 rounded-[2rem] p-6 sm:p-8 border flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div>
            <h3
              className="text-xl sm:text-2xl font-display font-extrabold"
              style={{ color: "var(--text)" }}
            >
              Let&apos;s Talk
            </h3>
            <p
              className="text-xs sm:text-sm mt-1"
              style={{ color: "var(--text-muted)" }}
            >
              Have a project or opportunity? Reach out anytime.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full text-xs font-bold font-display shadow-sm hover:scale-105 active:scale-95 transition-all"
              style={{
                backgroundColor: "var(--pill-active-bg)",
                color: "var(--pill-active-text)",
              }}
            >
              Contact Me →
            </Link>
            <SocialIconRow size="sm" />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
