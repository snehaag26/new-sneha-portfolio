import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Sparkles,
  CheckCircle,
  Layers,
  Clock,
  Briefcase,
  Cpu,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { portfolioData, Project } from "@/data/portfolio";

export async function generateStaticParams() {
  return portfolioData.projects.map((project) => ({
    slug: project.slug,
  }));
}

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = portfolioData.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Find next project
  const currentIndex = portfolioData.projects.findIndex((p) => p.slug === slug);
  const nextProject =
    portfolioData.projects[(currentIndex + 1) % portfolioData.projects.length];

  return (
    <article className="pt-28 md:pt-36 pb-20 px-4 md:px-8 max-w-5xl mx-auto space-y-14">
      {/* Back Link */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-bold font-display uppercase tracking-wider text-[#5E5B6E] dark:text-[#A3A0B5] hover:text-[#E85D88] dark:hover:text-[#FF8AB2] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all projects</span>
        </Link>
      </div>

      {/* Case Study Hero Banner */}
      <div
        className="rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden shadow-marshmallow border"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <div className="space-y-4 max-w-3xl relative z-10">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold font-display tracking-wider uppercase border"
            style={{
              backgroundColor: "var(--surface-2)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
            <span>{project.category} Case Study</span>
          </div>

          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold leading-tight"
            style={{ color: "var(--text)" }}
          >
            {project.title}
          </h1>

          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {project.description}
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold font-display hover:scale-105 active:scale-95 transition-all shadow-md"
              style={{
                backgroundColor: "var(--pill-active-bg)",
                color: "var(--pill-active-text)",
              }}
            >
              <span>Visit Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border text-xs font-bold font-display transition-all shadow-sm"
              style={{
                backgroundColor: "var(--surface-2)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            >
              <GithubIcon className="w-4 h-4" />
              <span>View Source Code</span>
            </a>
          </div>
        </div>
      </div>

      {/* Project Metadata Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          className="rounded-2xl p-4 border space-y-1"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Client / Context
          </span>
          <p className="text-xs font-bold" style={{ color: "var(--text)" }}>
            {project.caseStudy.clientOrType}
          </p>
        </div>

        <div
          className="rounded-2xl p-4 border space-y-1"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Timeline
          </span>
          <p className="text-xs font-bold" style={{ color: "var(--text)" }}>
            {project.caseStudy.timeline}
          </p>
        </div>

        <div
          className="rounded-2xl p-4 border space-y-1"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Sneha&apos;s Role
          </span>
          <p className="text-xs font-bold" style={{ color: "var(--text)" }}>
            {project.caseStudy.role}
          </p>
        </div>

        <div
          className="rounded-2xl p-4 border space-y-1"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Primary Tech
          </span>
          <p className="text-xs font-bold" style={{ color: "var(--text)" }}>
            {project.techStack.slice(0, 2).join(", ")}
          </p>
        </div>
      </div>

      {/* Challenge & Solution Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* The Challenge */}
        <div
          className="rounded-3xl p-8 border space-y-3"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold"
            style={{ backgroundColor: "#FFD8E5", color: "#1E1B2E" }}
          >
            <span>01. The Challenge</span>
          </div>
          <h3
            className="text-xl font-display font-extrabold"
            style={{ color: "var(--text)" }}
          >
            The Problem Statement
          </h3>
          <p
            className="text-xs sm:text-sm leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {project.caseStudy.challenge}
          </p>
        </div>

        {/* The Solution */}
        <div
          className="rounded-3xl p-8 border space-y-3"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold"
            style={{ backgroundColor: "#CAE1E9", color: "#1E1B2E" }}
          >
            <span>02. The Architecture</span>
          </div>
          <h3
            className="text-xl font-display font-extrabold"
            style={{ color: "var(--text)" }}
          >
            The Engineering Solution
          </h3>
          <p
            className="text-xs sm:text-sm leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {project.caseStudy.solution}
          </p>
        </div>
      </div>

      {/* Architectural Pillars */}
      <div
        className="rounded-3xl p-8 md:p-10 border space-y-6"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="space-y-1">
          <span
            className="text-xs font-mono font-bold tracking-widest uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            Under the Hood
          </span>
          <h3
            className="text-2xl font-display font-extrabold"
            style={{ color: "var(--text)" }}
          >
            Key Technical Implementations
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.caseStudy.architecture.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border flex items-start gap-3"
              style={{
                backgroundColor: "var(--surface-2)",
                borderColor: "var(--border)",
              }}
            >
              <Cpu className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
              <span
                className="text-xs sm:text-sm font-medium leading-relaxed"
                style={{ color: "var(--text)" }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Measurable Outcomes & Results */}
      <div
        className="rounded-3xl p-8 md:p-10 border space-y-6"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="space-y-1">
          <span
            className="text-xs font-mono font-bold tracking-widest uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            Impact & Metrics
          </span>
          <h3
            className="text-2xl font-display font-extrabold"
            style={{ color: "var(--text)" }}
          >
            Delivered Results
          </h3>
        </div>

        <div className="space-y-3">
          {project.caseStudy.outcomes.map((outcome, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-4 rounded-2xl border"
              style={{
                backgroundColor: "var(--surface-2)",
                borderColor: "var(--border)",
              }}
            >
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
              <span
                className="text-xs sm:text-sm font-bold"
                style={{ color: "var(--text)" }}
              >
                {outcome}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Full Chips */}
      <div className="space-y-3">
        <span
          className="text-xs font-mono font-bold tracking-widest uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          Full Technologies Used
        </span>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 rounded-full text-xs font-bold border"
              style={{
                backgroundColor: "var(--surface-2)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Next Project Footer Card */}
      <div className="pt-8 border-t" style={{ borderColor: "var(--border)" }}>
        <Link
          href={`/projects/${nextProject.slug}`}
          className="rounded-[2rem] p-8 flex items-center justify-between border hover:shadow-lg transition-all group"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div>
            <span
              className="text-xs font-mono font-bold uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              Next Case Study →
            </span>
            <h4
              className="text-2xl font-display font-extrabold transition-colors"
              style={{ color: "var(--text)" }}
            >
              {nextProject.title}
            </h4>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {nextProject.tagline}
            </p>
          </div>
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform"
            style={{
              backgroundColor: "#FFE9B7",
              color: "#1E1B2E",
            }}
          >
            →
          </div>
        </Link>
      </div>
    </article>
  );
}
