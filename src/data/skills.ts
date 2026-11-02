export interface OrbitingTech {
  name: string;
  symbol: string;
  color: string;
  angle: number; // in degrees for circular orbital layout
  radius: number; // distance from center
}

export const orbitingTechIcons: OrbitingTech[] = [
  { name: "React", symbol: "⚛️", color: "#CAE1E9", angle: 0, radius: 88 },
  { name: "Next.js", symbol: "▲", color: "#FFE9B7", angle: 45, radius: 95 },
  { name: "TypeScript", symbol: "TS", color: "#CAE1E9", angle: 90, radius: 88 },
  { name: "Tailwind", symbol: "🌊", color: "#FFD8E5", angle: 135, radius: 92 },
  { name: "Node.js", symbol: "🟢", color: "#FFE9B7", angle: 180, radius: 88 },
  { name: "Python", symbol: "🐍", color: "#CAE1E9", angle: 225, radius: 95 },
  { name: "PostgreSQL", symbol: "🐘", color: "#FFD8E5", angle: 270, radius: 88 },
  { name: "Framer Motion", symbol: "✦", color: "#FFE9B7", angle: 315, radius: 92 },
];

export const skillsOverview = [
  { name: "React 19 & Next.js", level: "Expert", color: "#CAE1E9" },
  { name: "TypeScript", level: "Advanced", color: "#FFE9B7" },
  { name: "Tailwind CSS", level: "Expert", color: "#FFD8E5" },
  { name: "Node.js & Express", level: "Advanced", color: "#FFE9B7" },
  { name: "Python & AI Tools", level: "Proficient", color: "#CAE1E9" },
  { name: "PostgreSQL & Prisma", level: "Advanced", color: "#FFD8E5" },
  { name: "Framer Motion & GSAP", level: "Expert", color: "#CAE1E9" },
  { name: "Figma & UI/UX", level: "Expert", color: "#FFE9B7" },
];
