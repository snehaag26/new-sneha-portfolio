"use client";

import React from "react";
import { ContactScene } from "@/components/contact/ContactScene";

export default function ContactPage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden pt-24 md:pt-32 pb-24 flex items-center justify-center">
      {/* ============================================================ */}
      {/* SOFT PASTEL STUDIO BACKGROUND GLOWS (Matching theme)        */}
      {/* ============================================================ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Top-Center Glow: Butter Yellow */}
        <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[65vw] h-[65vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-tr from-[#FFE9B7]/40 via-[#FFD8E5]/30 to-[#CAE1E9]/35 dark:from-[#FFE9B7]/08 dark:via-[#FFD8E5]/06 dark:to-[#CAE1E9]/07 blur-[125px]" />
        {/* Left Accent Glow: Blush Pink */}
        <div className="absolute top-[35%] -left-[10%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-[#FFD8E5]/30 dark:bg-[#FFD8E5]/06 blur-[110px]" />
        {/* Right Accent Glow: Powder Blue */}
        <div className="absolute top-[45%] -right-[10%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-[#CAE1E9]/35 dark:bg-[#CAE1E9]/07 blur-[110px]" />
      </div>

      {/* ============================================================ */}
      {/* 3D CLAYMORPHISM SCENE CONTAINER                              */}
      {/* ============================================================ */}
      <section className="w-full relative z-10" aria-label="Contact Section">
        <ContactScene />
      </section>
    </main>
  );
}
