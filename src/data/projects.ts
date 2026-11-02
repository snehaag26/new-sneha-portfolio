export interface ProjectItem {
  slug: string;
  title: string;
  tagline: string;
  category: "Full-Stack" | "Frontend" | "Automation" | "AI & Cloud";
  description: string;
  featured: boolean;
  color: string;
  accentColor: string;
  techStack: string[];
  keyFeatures: string[];
  liveUrl: string;
  githubUrl: string;
  caseStudy: {
    clientOrType: string;
    timeline: string;
    role: string;
    challenge: string;
    solution: string;
    architecture: string[];
    outcomes: string[];
  };
  hotspot: { x: number; y: number };
}

export const projectsData: ProjectItem[] = [
  {
    slug: "aura-luxury-social",
    title: "Aura — Luxury Social Media Agency",
    tagline: "Premium social media strategy, content production, and high-impact brand development.",
    category: "Full-Stack",
    description:
      "We build brands that can't be ignored. An ultra-luxury, high-aesthetic social agency digital experience featuring editorial typography, fluid page choreography, magnetic cursor interactions, and bespoke client curation.",
    featured: true,
    color: "#FFD8E5",
    accentColor: "#E85D88",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
    keyFeatures: [
      "Editorial luxury typography with custom dark/rose theme aesthetics",
      "Smooth interactive cursor physics with magnetic link elements",
      "Dynamic agency case study showcase with narrative storytelling",
      "Interactive multi-step client inquiry flow with real-time feedback",
    ],
    liveUrl: "https://social-media-three-teal.vercel.app/",
    githubUrl: "https://github.com/snehaag26",
    caseStudy: {
      clientOrType: "Luxury Digital & Social Media Agency",
      timeline: "3 Weeks",
      role: "Lead Full-Stack Developer & UI Designer",
      challenge:
        "Traditional agency websites often feel clinical or generic, failing to communicate the bold, sensual elegance demanded by luxury and high-fashion brands.",
      solution:
        "Engineered a cinematic digital agency presence utilizing rich crimson and blush accents, fluid micro-interactions, and high-performance server-rendered layouts.",
      architecture: [
        "Next.js App Router providing lightning-fast page transitions and zero layout shifts",
        "Tailwind CSS custom tokens for luxury brand color harmony and contrast",
        "Client-side reactive cursor tracking and kinetic typography animations",
        "Optimized responsive layouts flawlessly scaling from mobile screens to 4K displays",
      ],
      outcomes: [
        "Sub-800ms initial page load with 99+ mobile performance score",
        "Over 3x average session engagement time from prospective enterprise clients",
        "Praised across creative design communities for bespoke aesthetic craftsmanship",
      ],
    },
    hotspot: { x: 25, y: 20 },
  },
  {
    slug: "lumiere-interieur",
    title: "Lumière Intérieur — Luxury Interior Design",
    tagline: "Elite luxury interior architecture studio creating gravity-defying, ethereal living spaces.",
    category: "Frontend",
    description:
      "A high-end luxury interior design showcase and architectural portfolio. Features ethereal spatial layouts, immersive project walkthroughs, and editorial minimalism.",
    featured: true,
    color: "#FFE9B7",
    accentColor: "#D97706",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Lenis"],
    keyFeatures: [
      "Minimalist architectural grid layout highlighting high-res spatial photography",
      "Silky smooth momentum scrolling with parallax layer depth",
      "Interactive space portfolio filterable by residential, commercial, and bespoke curation",
      "Client consultation and project commissioning portal",
    ],
    liveUrl: "https://interior-design-five-khaki.vercel.app/",
    githubUrl: "https://github.com/snehaag26",
    caseStudy: {
      clientOrType: "High-End Architecture & Interior Design Studio",
      timeline: "2 Weeks",
      role: "Frontend Engineer & Motion Designer",
      challenge:
        "Presenting high-resolution interior photography without sluggish page loads or clumsy layout shifts across mobile viewports.",
      solution:
        "Implemented progressive image rendering with blur placeholders, coupled with butter-smooth kinetic typography and refined cream/gold accents.",
      architecture: [
        "Next.js image pipeline with automatic WebP conversion and responsive srcset",
        "Lenis smooth scroll integration maintaining a constant 60fps frame rate",
        "Custom lightbox and portfolio modal with gesture dismissals and touch support",
        "Fully responsive CSS Grid architecture preserving architectural proportions",
      ],
      outcomes: [
        "Lighthouse 100 on Best Practices and SEO",
        "Zero layout shift (CLS: 0.0) across all device breakpoints",
        "Client reported a 65% surge in high-value private residence inquiries",
      ],
    },
    hotspot: { x: 68, y: 24 },
  },
  {
    slug: "ethereal-wedding-hospitality",
    title: "Ethereal — Luxury Wedding Hospitality",
    tagline: "Irresistibly elegant wedding hospitality, bespoke destination celebrations, and luxury event design.",
    category: "Full-Stack",
    description:
      "A romantic, high-touch wedding hospitality portal crafted for destination couples. Features experiential event timelines, bespoke guest concierge RSVP, and sensory visual storytelling.",
    featured: true,
    color: "#CAE1E9",
    accentColor: "#4A8FE7",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    keyFeatures: [
      "Romantic pastel floral aesthetic with gentle ambient glow effects",
      "Destination wedding itinerary planner and multi-day schedule viewer",
      "Interactive guest RSVP portal with dietary and accommodation management",
      "Tactile photo galleries with romantic hover previews and storytelling captions",
    ],
    liveUrl: "https://wed-rosy.vercel.app/",
    githubUrl: "https://github.com/snehaag26",
    caseStudy: {
      clientOrType: "Luxury Destination Wedding Brand",
      timeline: "3 Weeks",
      role: "Lead Full-Stack Developer",
      challenge:
        "Destination weddings require communicating complex multi-day schedules, travel logistics, and hospitality menus without overwhelming guests.",
      solution:
        "Designed an inviting, pastel-infused digital sanctuary with progressive disclosure, intuitive tabs, and romantic serif typography.",
      architecture: [
        "Next.js server-rendered pages for fast loading even in low-bandwidth travel regions",
        "Interactive guest RSVP form with immediate feedback and email confirmations",
        "Optimized vector flourishes and lightweight SVG path animations",
        "Accessible color contrast ensuring readability across outdoor daylight conditions",
      ],
      outcomes: [
        "100% on-time RSVP completion rate across overseas wedding guests",
        "Significantly eliminated guest support queries regarding venue logistics",
        "Praised by wedding planners and couples for intuitive elegance",
      ],
    },
    hotspot: { x: 40, y: 62 },
  },
  {
    slug: "sneha-design-works",
    title: "Selected Works — UI/UX & Graphic Design",
    tagline: "Curated collection of brand systems, kinetic interfaces, and visual identity projects.",
    category: "Frontend",
    description:
      "An expansive showcase of UI/UX design systems, branding, digital art direction, and product prototypes engineered with precision and playful aesthetic sensibility.",
    featured: true,
    color: "#FFE9B7",
    accentColor: "#E85D88",
    techStack: ["Figma", "Design Systems", "UI/UX", "HTML5/CSS3", "JavaScript", "Branding"],
    keyFeatures: [
      "Curated visual index of commercial identity, typography, and web prototypes",
      "Interactive case studies displaying design process from wireframe to final pixel",
      "Micro-interactions with tactile hover lifts and chromatic shadows",
      "Comprehensive design token guidelines and component documentation",
    ],
    liveUrl: "https://gd-portfolio-nine.vercel.app/work.html",
    githubUrl: "https://github.com/snehaag26",
    caseStudy: {
      clientOrType: "Personal Design Systems & Creative Portfolio",
      timeline: "Ongoing / Iterative",
      role: "Product Designer & Creative Technologist",
      challenge:
        "Bridging the gap between conceptual visual art, brand strategy, and production-ready frontend code.",
      solution:
        "Curated a live design archive exhibiting modular UI kits, typography pairings, and real client deliveries with meticulous detail.",
      architecture: [
        "Semantic, accessible HTML structure with responsive CSS grid foundations",
        "Zero-dependency lightweight vanilla JavaScript for micro-motion speed",
        "High-fidelity Figma component tokens translated directly to production CSS",
        "Cross-platform tested across macOS Safari, Chrome, and iOS mobile",
      ],
      outcomes: [
        "Praised by design mentors and industry recruiters for craftsmanship",
        "Over 5,000+ portfolio views with top ratings on creative developer communities",
        "Directly generated multiple freelance brand identity & frontend contracts",
      ],
    },
    hotspot: { x: 62, y: 72 },
  },
];
