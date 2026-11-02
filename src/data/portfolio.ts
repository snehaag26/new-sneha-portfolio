import { projectsData, ProjectItem } from "./projects";
import { skillsOverview } from "./skills";
import { siteConfig } from "./site";

export type Project = ProjectItem;

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  type: "Full-Time" | "Internship" | "Freelance" | "Open-Source";
  period: string;
  location: string;
  description: string;
  skills: string[];
  bullets: string[];
  badgeColor: string;
}


export interface SkillItem {
  name: string;
  level: string;
  icon: string;
  color: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: SkillItem[];
}

export const portfolioData = {
  personal: {
    name: "Sneha Agrawal",
    firstName: "Sneha",
    lastName: "Agrawal",
    role: "Full-Stack Developer",
    tagline: "Building buttery-smooth digital experiences & intelligent web systems.",
    shortBio:
      "Full-stack engineer crafting award-winning aesthetic frontend experiences with scalable backend architectures, generative AI, and fluid micro-interactions.",
    fullBio: [
      "I am a passionate Full-Stack Developer and creative technologist pursuing my B.Tech in Computer Science and Engineering with an AI specialization at Newton School of Technology, Rishihood University.",
      "I specialize in end-to-end web engineering, bespoke design systems, and workflow automation. Over the past few years, I have architected and deployed modern web applications, scalable APIs, and intuitive user interfaces.",
      "My core philosophy centers on emotion-driven engineering: code should not just function cleanly—it should feel delightful to touch, fluid to navigate, and visually unforgettable. When I'm not tuning Framer Motion curves, you can find me exploring AI agents, designing posters, or experimenting with pastel palettes.",
    ],
    status: {
      text: "Available for freelance & summer '26 internships",
      available: true,
    },
    education: {
      degree: "B.Tech in Computer Science & Engineering (Artificial Intelligence)",
      institution: "Newton School of Technology, Rishihood University",
      period: "2023 – 2027",
      location: "India",
      gpa: "3.9 / 4.0",
      highlights: [
        "Specializing in Artificial Intelligence, Intelligent Agents, and Advanced Algorithms.",
        "Founder of the Creative Tech Circle and active speaker at developer meetups.",
        "Winner of multiple university hackathons for AI-driven frontend apps.",
      ],
    },
    links: {
      email: siteConfig.email,
      github: siteConfig.github,
      linkedin: siteConfig.linkedin,
      instagram: siteConfig.instagram,
      resume: siteConfig.resumeUrl,
    },
    stats: [
      { label: "Projects Delivered", value: "24", suffix: "+" },
      { label: "Happy Clients", value: "18", suffix: "+" },
      { label: "Technologies Mastered", value: "18", suffix: "+" },
      { label: "Client Satisfaction", value: "100", suffix: "%" },
    ],
    funFacts: [
      { emoji: "🎨", title: "Pastel Obsessed", desc: "I believe soft marshmallow palettes make the internet a gentler, more joyful place." },
      { emoji: "⚡", title: "Micro-Interaction Junkie", desc: "I spend an unreasonable amount of time perfecting 300ms spring physics and bouncy easing." },
      { emoji: "🤖", title: "AI Curious", desc: "Actively building autonomous multi-agent pipelines and generative web UI experiments." },
      { emoji: "☕", title: "Chai & Code", desc: "Powered by iced matcha, aromatic masala chai, and lo-fi synth jazz." },
    ],
    learningNow: [
      "Three.js & WebGL Shaders for playful 3D canvas interactions",
      "Next.js App Router Server Actions & Partial Prerendering",
      "Large Language Model orchestration & streaming UI states",
      "Design systems with variable color tokens & fluid typography",
    ],
  },

  skillsCategories: [
    {
      category: "Frontend Excellence",
      description: "Delightful, responsive, high-performance web interfaces with fluid motion and accessible markup.",
      skills: [
        { name: "React 19 & Next.js", level: "Expert", icon: "react", color: "#CAE1E9" },
        { name: "TypeScript", level: "Advanced", icon: "typescript", color: "#FFE9B7" },
        { name: "Tailwind CSS", level: "Expert", icon: "tailwind", color: "#FFD8E5" },
        { name: "Framer Motion", level: "Expert", icon: "motion", color: "#CAE1E9" },
        { name: "GSAP & ScrollTrigger", level: "Proficient", icon: "gsap", color: "#FFE9B7" },
        { name: "HTML5 / Semantic A11y", level: "Expert", icon: "html", color: "#FFD8E5" },
        { name: "CSS Modules & PostCSS", level: "Advanced", icon: "css", color: "#CAE1E9" },
        { name: "Redux Toolkit & Zustand", level: "Advanced", icon: "state", color: "#FFE9B7" },
      ],
    },
    {
      category: "Backend & Systems",
      description: "Robust REST & GraphQL APIs, distributed database models, and serverless compute pipelines.",
      skills: [
        { name: "Node.js & Express", level: "Advanced", icon: "nodejs", color: "#FFD8E5" },
        { name: "Python & FastAPI", level: "Proficient", icon: "python", color: "#CAE1E9" },
        { name: "Next.js API Routes", level: "Expert", icon: "nextapi", color: "#FFE9B7" },
        { name: "RESTful Architecture", level: "Expert", icon: "api", color: "#FFD8E5" },
        { name: "Authentication (Auth.js/JWT)", level: "Advanced", icon: "lock", color: "#CAE1E9" },
        { name: "Microservices & Webhooks", level: "Proficient", icon: "webhook", color: "#FFE9B7" },
      ],
    },
    {
      category: "Databases & Cloud",
      description: "Persistent storage, ACID transactional integrity, and scalable cloud deployments.",
      skills: [
        { name: "PostgreSQL & Prisma", level: "Advanced", icon: "postgres", color: "#FFE9B7" },
        { name: "MongoDB & Mongoose", level: "Advanced", icon: "mongodb", color: "#FFD8E5" },
        { name: "Supabase & Firebase", level: "Expert", icon: "supabase", color: "#CAE1E9" },
        { name: "Redis Caching", level: "Proficient", icon: "redis", color: "#FFE9B7" },
        { name: "Vercel & Cloudflare", level: "Expert", icon: "cloud", color: "#FFD8E5" },
        { name: "AWS S3 / Docker basics", level: "Proficient", icon: "docker", color: "#CAE1E9" },
      ],
    },
    {
      category: "Creative Tools & Automation",
      description: "Design systems, interactive prototyping, and workflow automations.",
      skills: [
        { name: "Figma & FigJam", level: "Expert", icon: "figma", color: "#FFD8E5" },
        { name: "Adobe Illustrator & Photoshop", level: "Advanced", icon: "adobe", color: "#FFE9B7" },
        { name: "Make / n8n / Zapier", level: "Expert", icon: "automation", color: "#CAE1E9" },
        { name: "Git & GitHub CI/CD", level: "Advanced", icon: "git", color: "#FFD8E5" },
        { name: "LangChain / OpenAI APIs", level: "Proficient", icon: "ai", color: "#FFE9B7" },
        { name: "Design Systems & Tokens", level: "Expert", icon: "design", color: "#CAE1E9" },
      ],
    },
  ] as SkillCategory[],

  projects: projectsData,

  experience: [
    {
      id: "lead-dev",
      role: "Lead Full-Stack & UI/UX Engineer",
      company: "Independent Client Solutions",
      type: "Full-Time",
      period: "2024 – Present",
      location: "India",
      badgeColor: "#FFE9B7",
      description:
        "Architecting bespoke web applications, interactive design systems, and automated data pipelines for modern startups and global clients.",
      skills: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "UI/UX Design", "n8n Automation"],
      bullets: [
        "Architected and deployed 15+ high-conversion websites and custom web applications for venture-backed startups and D2C brands.",
        "Spearheaded design systems, establishing reusable component libraries that accelerated delivery cycles by 40%.",
        "Engineered end-to-end automation pipelines integrating CRM, social media scheduling, and payment gateways.",
        "Maintained a 100% client satisfaction score across all product deliverables.",
      ],
    },
    {
      id: "intern-fs",
      role: "Full-Stack Software Engineering Intern",
      company: "TechNova Solutions",
      type: "Internship",
      period: "Summer 2024",
      location: "India",
      badgeColor: "#CAE1E9",
      description:
        "Contributed to core enterprise SaaS dashboards, optimizing query performance and developing interactive data visualization widgets.",
      skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "REST APIs"],
      bullets: [
        "Re-engineered tabular data components into virtualized tables, reducing memory consumption by 35% on datasets over 50,000 rows.",
        "Created 12+ RESTful microservice endpoints with automated unit testing and Swagger documentation.",
        "Collaborated with senior engineers on CI/CD pipelines, reducing staging deployment friction.",
      ],
    },
    {
      id: "freelance-design",
      role: "Freelance Creative Technologist & Graphic Designer",
      company: "Independent Practice",
      type: "Freelance",
      period: "2023 – 2024",
      location: "India",
      badgeColor: "#FFD8E5",
      description:
        "Partnered directly with international creators, founders, and businesses to design visual identities, editorial layouts, and responsive landing pages.",
      skills: ["Figma", "Branding", "Adobe Illustrator", "HTML/CSS", "Design Systems"],
      bullets: [
        "Delivered 30+ brand identity packages, including vector logos, typography hierarchies, and social media kits.",
        "Designed and published high-converting landing pages with subtle scroll-triggered micro-interactions.",
        "Maintained 5-star ratings across all freelance platforms with repeat client engagements.",
      ],
    },
    {
      id: "ai-lead",
      role: "Undergraduate AI & Frontend Researcher",
      company: "Newton School of Technology, Rishihood University",
      type: "Open-Source",
      period: "2023 – Present",
      location: "India",
      badgeColor: "#FFE9B7",
      description:
        "Leading student research in Generative UI, intelligent agent UX patterns, and modern web application development.",
      skills: ["Python", "PyTorch Basics", "LangChain", "Next.js", "A11y", "Research"],
      bullets: [
        "Authored exploratory prototypes on streaming responsive UI interfaces for large language models.",
        "Mentored junior cohorts in JavaScript fundamentals, Git workflows, and modern CSS techniques.",
        "Won accolades at national level hackathons for frontend aesthetics, speed, and AI integration.",
      ],
    },
  ] as ExperienceItem[],


  contact: {
    heading: "Let's build something unforgettable together.",
    subheading:
      "Whether you need an award-winning web app, full-stack development, or want to discuss Summer 2026 internships—my inbox is always open.",
    availability: "Currently accepting select freelance projects & Summer 2026 roles.",
    responseTime: "Usually responds within 12 hours.",
    socials: [
      { name: "GitHub", handle: "@snehaag26", url: siteConfig.github },
      { name: "LinkedIn", handle: "Sneha Agrawal", url: siteConfig.linkedin },
      { name: "Instagram", handle: "@little_messysneha", url: siteConfig.instagram },
    ],
  },
};
