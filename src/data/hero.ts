export interface HeroData {
  name: string;
  role: string;
  exploreLabel: string;
  location: string;
  tagline: string;
  currentlyBuilding: {
    status: string;
    projectName: string;
    progress: number;
    badge: string;
  };
  floatingTiles: Array<{
    title: string;
    href: string;
    isAccent?: boolean;
    isDownload?: boolean;
    downloadName?: string;
  }>;
}

export const heroData: HeroData = {
  name: "Sneha",
  role: "Full-Stack Developer",
  exploreLabel: "EXPLORE",
  location: "India",
  tagline: "Crafting expressive, award-winning full-stack applications & fluid interactive web experiences.",
  currentlyBuilding: {
    status: "Currently building",
    projectName: "Aura — Luxury Agency",
    progress: 95,
    badge: "v2.0 Live",
  },
  floatingTiles: [
    { title: "Projects", href: "/projects" },
    { title: "Experience", href: "/experience" },
    { title: "Education", href: "/education" },
    { title: "Let's Work Together →", href: "/contact", isAccent: true },
    { title: "Resume ↓", href: "/resume.pdf", isDownload: true, downloadName: "Sneha_Agrawal_Resume.pdf" },
  ],
};
