export interface EducationStage {
  id: string;
  color: string;
  accentColor: string;
  badgeBg: string;
  badgeBorder: string;
  label: string;
  institution: string;
  board: string;
  chip: string;
  period: string;
  hoverLine: string;
  modalLine: string;
  image: string;
  buildingType: "school" | "tower" | "campus";
  position: "top-left" | "top-right" | "bottom-center";
  isCurrent?: boolean;
}

export const educationData: EducationStage[] = [
  {
    id: "edu-01",
    color: "#FFD0E0",
    accentColor: "#B02A5E",
    badgeBg: "rgba(255, 208, 224, 0.45)",
    badgeBorder: "rgba(176, 42, 94, 0.3)",
    label: "Class 1 to 10",
    institution: "Carmel Public School",
    board: "ICSE",
    chip: "Foundation Years",
    period: "[2010-2023]",
    hoverLine: "Foundation of my curiosity",
    modalLine: "Where my love for learning began — nurturing curiosity across mathematics, science, language, and creative arts.",
    image: "/education/school-pink.webp",
    buildingType: "school",
    position: "top-left",
  },
  {
    id: "edu-02",
    color: "#FFE29A",
    accentColor: "#8A5A00",
    badgeBg: "rgba(255, 226, 154, 0.50)",
    badgeBorder: "rgba(138, 90, 0, 0.30)",
    label: "Class 11 to 12",
    institution: "Academic World School",
    board: "CBSE",
    chip: "Senior Secondary",
    period: "[2023-2025]",
    hoverLine: "Where leadership and writing began",
    modalLine: "Served as Editorial Head, discovering a passion for communication, storytelling, analytical writing, and leading school teams.",
    image: "/education/school-yellow.webp",
    buildingType: "tower",
    position: "top-right",
  },
  {
    id: "edu-03",
    color: "#BFDDEA",
    accentColor: "#1F5A78",
    badgeBg: "rgba(191, 221, 234, 0.50)",
    badgeBorder: "rgba(31, 90, 120, 0.30)",
    label: "B.Tech CSE (AI)",
    institution: "Rishihood University (Newton School of Technology)",
    board: "Computer Science & Artificial Intelligence",
    chip: "Computer Science and AI",
    period: "[2025-2029]",
    hoverLine: "Where I learn to build real products",
    modalLine: "Pursuing an intensive B.Tech in CS & AI. Engineering responsive full-stack applications, deep learning workflows, autonomous AI systems, and fluid UI experiences.",
    image: "/education/campus-blue.webp",
    buildingType: "campus",
    position: "bottom-center",
    isCurrent: true,
  },
];
