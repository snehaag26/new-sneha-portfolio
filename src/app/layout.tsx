import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/data/site";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { Preloader } from "@/components/Preloader";
import { BackgroundBlobs } from "@/components/BackgroundBlobs";

export const metadata: Metadata = {
  title: "Sneha Agrawal — Full-Stack Developer",
  description:
    "Personal portfolio of Sneha Agrawal. Full-Stack Developer and creative engineer. Crafting expressive digital experiences from India.",
  keywords: [
    "Sneha Agrawal",
    "Full-Stack Developer",
    "Frontend Engineer",
    "Creative Developer",
    "UI/UX Designer",
    "Next.js",
    "React",
    "TypeScript",
  ],
  authors: [{ name: "Sneha Agrawal", url: siteConfig.github }],
  creator: "Sneha Agrawal",
  openGraph: {
    title: "Sneha Agrawal — Full-Stack Developer",
    description: "Building buttery-smooth digital experiences & intelligent web systems.",
    url: "https://snehaagrawal.dev",
    siteName: "Sneha Agrawal Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sneha Agrawal — Full-Stack Developer",
    description: "Building buttery-smooth digital experiences & intelligent web systems.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sneha Agrawal",
    url: "https://snehaagrawal.dev",
    email: siteConfig.email,
    jobTitle: "Full-Stack Developer",
    address: {
      "@type": "PostalAddress",
      addressCountry: "India",
    },
    sameAs: [
      siteConfig.linkedin,
      siteConfig.github,
      siteConfig.instagram,
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-[#FFE9B7] selection:text-[#2A2733] min-h-screen flex flex-col">
        <Providers>
          <Preloader />
          <CustomCursor />
          <BackgroundBlobs />
          <Navbar />
          <main className="flex-1 w-full relative z-10">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
