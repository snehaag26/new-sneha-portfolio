import type { Metadata } from "next";
import { EducationPage } from "@/components/education/EducationPage";

export const metadata: Metadata = {
  title: "Education — Sneha Agrawal",
  description:
    "Sneha Agrawal's education journey — from Carmel Public School (ICSE) and Academic World School (CBSE) to B.Tech Computer Science & AI at Newton School of Technology, Rishihood University.",
  openGraph: {
    title: "Education — Sneha Agrawal",
    description:
      "A visual map of my learning path — school, senior secondary, and a CS & AI degree.",
    url: "https://snehaagrawal.dev/education",
  },
};

export default function EducationPageRoute() {
  return <EducationPage />;
}
