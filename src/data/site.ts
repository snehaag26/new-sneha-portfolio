export interface SiteContact {
  name: string;
  role: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  instagram: string;
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  resumeUrl: string;
  tagline: string;
  heading: string;
  subheading: string;
}

export const siteConfig: SiteContact = {
  name: "Sneha Agrawal",
  role: "Full-Stack Developer",
  email: "snehha.ag2610@gmail.com",
  location: "India",
  github: "https://github.com/snehaag26",
  linkedin: "https://www.linkedin.com/in/sneha-agrawal-93a489295/",
  instagram: "https://www.instagram.com/little_messysneha/",
  githubUrl: "https://github.com/snehaag26",
  linkedinUrl: "https://www.linkedin.com/in/sneha-agrawal-93a489295/",
  instagramUrl: "https://www.instagram.com/little_messysneha/",
  resumeUrl: "/resume.pdf",
  tagline: "Have an idea or a project in mind? Send me a message.",
  heading: "Let's Talk",
  subheading: "Have an idea or a project in mind? Send me a message.",
};

export interface SocialLinkItem {
  name: "GitHub" | "LinkedIn" | "Instagram" | "Email";
  url: string;
  label: string;
  color: string;
}

export const socialLinks: SocialLinkItem[] = [
  {
    name: "GitHub",
    url: siteConfig.github,
    label: "Sneha on GitHub",
    color: "#FFD8E5", // pastel pink
  },
  {
    name: "LinkedIn",
    url: siteConfig.linkedin,
    label: "Sneha on LinkedIn",
    color: "#CAE1E9", // pastel blue
  },
  {
    name: "Instagram",
    url: siteConfig.instagram,
    label: "Sneha on Instagram",
    color: "#FFE9B7", // pastel yellow
  },
  {
    name: "Email",
    url: `mailto:${siteConfig.email}`,
    label: "Email Sneha",
    color: "#FDF1F4", // pastel cream
  },
];
