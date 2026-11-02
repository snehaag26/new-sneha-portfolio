export interface Hotspot {
  id: number;
  label: string;
  x: number; // percentage left
  y: number; // percentage top
  title: string;
  subtitle: string;
  description: string;
  chips: string[];
  color: string;
  emoji: string;
}

export const aboutHotspots: Hotspot[] = [
  {
    id: 1,
    label: "What I do",
    x: 20,
    y: 17,
    title: "What I Do",
    subtitle: "Full-Stack Engineer",
    description:
      "I design and build end-to-end web applications — pixel-perfect frontends with Next.js & React, and scalable backends with Node.js, Python, and PostgreSQL. Every product I ship is fast, accessible, and delightful.",
    chips: ["Next.js", "React", "TypeScript", "Node.js", "FastAPI"],
    color: "#FFD8E5",
    emoji: "💻",
  },
  {
    id: 2,
    label: "Moments",
    x: 82,
    y: 18,
    title: "Captured Moments",
    subtitle: "Photographer & Visual Storyteller",
    description:
      "Between commits I pick up my camera. Portraits, street scenes, golden-hour architecture — photography trains my eye for light, composition, and the tiny details that separate good design from memorable design.",
    chips: ["Portrait", "Street", "Golden Hour", "Composition"],
    color: "#CAE1E9",
    emoji: "📷",
  },
  {
    id: 3,
    label: "What I'm learning",
    x: 13,
    y: 52,
    title: "Always Learning",
    subtitle: "B.Tech CSE · AI Specialization",
    description:
      "Currently deep-diving into Three.js / WebGL shaders, LLM agent orchestration, and Awwwards-tier kinetic interfaces. Studying at Newton School of Technology with a 3.9 GPA while shipping real projects every week.",
    chips: ["Three.js", "WebGL", "LangChain", "App Router", "LLMs"],
    color: "#FFE9B7",
    emoji: "📚",
  },
  {
    id: 4,
    label: "How I think",
    x: 85,
    y: 54,
    title: "How I Think",
    subtitle: "Curiosity-First Problem Solver",
    description:
      "I start every problem by asking \"why\" before \"how\". Good solutions are invisible — they just feel obvious in hindsight. I combine systems thinking with creative intuition to find ideas that are both elegant and practical.",
    chips: ["Systems Thinking", "First Principles", "Design Thinking"],
    color: "#FFE9B7",
    emoji: "💡",
  },
  {
    id: 5,
    label: "What I love",
    x: 18,
    y: 74,
    title: "What I Love",
    subtitle: "Craft & Community",
    description:
      "Chai, lo-fi synth jazz, pastel palettes, and the satisfying click of a perfect spring animation. I love open-source, design systems, developer communities, and anything that makes the web a more joyful place.",
    chips: ["Open Source", "Design Systems", "Chai ☕", "Lo-fi Music"],
    color: "#FFD8E5",
    emoji: "🩷",
  },
  {
    id: 6,
    label: "Writing & design",
    x: 83,
    y: 83,
    title: "Writing & Design",
    subtitle: "Words & Visual Identity",
    description:
      "I write about UI craft, developer experience, and building beautiful things on the web. I also design brand identities, illustration systems, and motion-rich prototypes — all starting with a pencil sketch.",
    chips: ["Figma", "Brand Identity", "UI Writing", "Illustration"],
    color: "#CAE1E9",
    emoji: "✏️",
  },
];
