"use client";

import { motion } from "framer-motion";

const CATEGORIES = [
  {
    icon: "🎨",
    title: "Frontend",
    color: "#FFD8E5",
    skills: ["React 19 & Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "HTML5/A11y"],
  },
  {
    icon: "⚙️",
    title: "Backend",
    color: "#FFE9B7",
    skills: ["Node.js & Express", "Python & FastAPI", "REST & GraphQL", "Auth.js / JWT", "Microservices"],
  },
  {
    icon: "🗄️",
    title: "Database",
    color: "#CAE1E9",
    skills: ["PostgreSQL & Prisma", "MongoDB", "Supabase & Firebase", "Redis", "Vercel / Cloudflare"],
  },
  {
    icon: "🛠️",
    title: "Dev Tools",
    color: "#FFD8E5",
    skills: ["Figma & FigJam", "Git & GitHub CI/CD", "Make / n8n / Zapier", "LangChain & OpenAI", "Design Systems"],
  },
];

export default function TechStackBlock() {
  return (
    <section className="space-y-8 py-4">
      <div className="text-center space-y-2">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest border"
          style={{
            backgroundColor: "#CAE1E9",
            color: "#1E1B2E",
            borderColor: "rgba(30,27,46,0.1)",
          }}
        >
          MY STACK
        </span>
        <h2
          className="text-2xl sm:text-3xl font-display font-extrabold"
          style={{ color: "var(--text)" }}
        >
          Tools & Technologies
        </h2>
        <p
          className="text-sm max-w-md mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          My battle-tested stack for building fast, accessible, and beautiful software.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-[2rem] p-6 border space-y-3 hover:shadow-lg transition-shadow"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                style={{ backgroundColor: `${cat.color}88` }}
              >
                {cat.icon}
              </span>
              <h3
                className="font-display font-extrabold text-sm"
                style={{ color: "var(--text)" }}
              >
                {cat.title}
              </h3>
            </div>
            <ul className="space-y-1.5">
              {cat.skills.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-2 text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
