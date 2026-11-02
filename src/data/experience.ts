export interface ExperienceStop {
  id: string;
  step: string;
  tag: string;
  tagColor: string;
  role: string;
  organization: string;
  sublabel?: string;
  period: string;
  location?: string;
  companies?: string[]; // for stop 02 pills
  bullets: string[];
  chips: string[];
  isFinish?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

export const experienceStops: ExperienceStop[] = [
  {
    id: "stop-01",
    step: "01",
    tag: "LEADERSHIP",
    tagColor: "#FFE9B7",
    role: "Editorial Head",
    organization: "School",
    sublabel: "Class 11 and 12",
    period: "[2023-2025]",
    location: "India",
    bullets: [
      "Led the school editorial team and its publications",
      "Managed writers, content planning and editing",
      "Built leadership, communication and storytelling skills",
    ],
    chips: ["Leadership", "Writing", "Editing"],
  },
  {
    id: "stop-02",
    step: "02",
    tag: "MARKETING",
    tagColor: "#CAE1E9",
    role: "Social Media Manager",
    organization: "3 Companies",
    companies: ["[Event-company]", "[music-company]", "[psychologist]"],
    period: "[2023-present]",
    location: "India",
    bullets: [
      "Managed social media for 3 different brands",
      "Content planning, post design and caption writing",
      "Grew each brand's online presence",
    ],
    chips: ["Social Media", "Content Strategy", "Canva/Figma"],
  },
  {
    id: "stop-03",
    step: "03",
    tag: "FREELANCE",
    tagColor: "#FFD8E5",
    role: "Freelance Website Developer",
    organization: "Self-employed",
    period: "[2026]",
    location: "India",
    bullets: [
      "Designed and built websites for clients",
      "Handled everything from UI design to deployment",
    ],
    chips: ["Next.js", "React", "Tailwind CSS", "Figma"],
  },
  {
    id: "stop-04",
    step: "04",
    tag: "AGENCY FOUNDER",
    tagColor: "#FFE9B7",
    role: "Agency Founder",
    organization: "Digital Creative Agency",
    period: "May 2026 - Present",
    location: "India",
    bullets: [
      "Founded digital creative agency offering web development, app development, automation and social media management",
      "Lead design and frontend development for modern brand experiences",
    ],
    chips: ["Web Dev", "App Dev", "Automation", "Social Media"],
  },
  {
    id: "stop-05",
    step: "FINISH",
    tag: "NEXT CHAPTER",
    tagColor: "#FF8AB2",
    role: "Let's Build Something Great",
    organization: "Open to Collaborations & Roles",
    period: "[PRESENT & BEYOND]",
    location: "India",
    bullets: [
      "Available for full-stack engineering roles and creative product partnerships",
      "Delivering end-to-end web experiences from design to production deployment",
    ],
    chips: ["Full-Stack", "Frontend", "UI/UX", "Product Engineering"],
    isFinish: true,
    ctaText: "Let's Work Together",
    ctaLink: "/contact",
  },
];
