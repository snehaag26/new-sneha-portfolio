"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { educationData, type EducationStage } from "@/data/education";
import { HubRoads } from "./HubRoads";
import { StageBuilding } from "./StageBuilding";
import { StageLabel } from "./StageLabel";
import { StageModal } from "./StageModal";

export function JourneyStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prefersReduced, setPrefersReduced] = useState(false);

  const [selectedStage, setSelectedStage] = useState<EducationStage | null>(null);
  const [hoveredStageId, setHoveredStageId] = useState<string | null>(null);

  const pinkStage = educationData.find((s) => s.id === "edu-01")!;
  const yellowStage = educationData.find((s) => s.id === "edu-02")!;
  const blueStage = educationData.find((s) => s.id === "edu-03")!;

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener("change", handler);

    // IntersectionObserver for one-time reveal and visibility pause
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && !isRevealed) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.15 }
    );

    if (stageRef.current) {
      observer.observe(stageRef.current);
    }

    return () => {
      mediaQuery.removeEventListener("change", handler);
      observer.disconnect();
    };
  }, [isRevealed]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Inline Scoped Styles for CSS Keyframe Float (Disabled on Mobile & Reduced Motion) */}
      <style jsx>{`
        @keyframes eduFloat1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes eduFloat2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes eduFloat3 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @media (min-width: 1024px) {
          .edu-float-pink {
            animation: eduFloat1 4.5s ease-in-out infinite;
          }
          .edu-float-yellow {
            animation: eduFloat2 5.0s ease-in-out infinite 0.6s;
          }
          .edu-float-blue {
            animation: eduFloat3 5.5s ease-in-out infinite 1.2s;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .edu-float-pink,
          .edu-float-yellow,
          .edu-float-blue {
            animation: none !important;
          }
        }
      `}</style>

      {/* ========================================================
          PAGE HEADER
          Top padding handled in page container; margin-bottom 48px
      ======================================================== */}
      <div className="w-full max-w-3xl text-center mb-12 space-y-3">
        {/* Label pill: pastel pink in light mode, white/dark in dark mode */}
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full shadow-xs"
          style={{
            background: "var(--lt-chip-pink-bg, #FFD0E0)",
            color: "#1E1B2E",
            border: "1px solid rgba(176, 42, 94, 0.20)",
          }}
        >
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
          <span className="text-[11px] font-mono font-bold tracking-widest uppercase">
            EDUCATION
          </span>
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight"
          style={{ color: "var(--text)" }}
        >
          My Learning{" "}
          <span className="font-serif italic font-normal" style={{ color: "var(--accent)" }}>
            Path
          </span>
        </h1>

        <p
          className="text-base sm:text-lg max-w-lg mx-auto font-sans font-medium"
          style={{ color: "var(--text-muted)" }}
        >
          From school classrooms to a CS and AI campus.
        </p>
      </div>

      {/* ========================================================
          STUDIO PANEL (Organised CSS Grid, max-w-[1200px], p-10)
          Cream #FFFBF5, rounded-[3rem], solid light background
      ======================================================== */}
      <div
        ref={stageRef}
        className="relative w-full max-w-[1200px] rounded-[3rem] p-6 sm:p-10 select-none overflow-hidden"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          color: "var(--text)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
        }}
      >
        {/* 4 Static Extras in empty corners — full opacity for visibility */}
        <div className="absolute top-6 left-6 pointer-events-none opacity-100">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 0C16 8.8 8.8 16 0 16C8.8 16 16 23.2 16 32C16 23.2 23.2 16 32 16C23.2 16 16 8.8 16 0Z"
              fill="#FFD0E0"
              stroke="#D6457A"
              strokeWidth="1"
            />
          </svg>
        </div>
        <div className="absolute top-6 right-6 pointer-events-none opacity-100">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 0C16 8.8 8.8 16 0 16C8.8 16 16 23.2 16 32C16 23.2 23.2 16 32 16C23.2 16 16 8.8 16 0Z"
              fill="#FFE29A"
              stroke="#8A5A00"
              strokeWidth="1"
            />
          </svg>
        </div>
        <div className="absolute bottom-6 left-6 pointer-events-none opacity-50 font-mono font-bold text-sm text-[#2563EB]/60">
          {`{ }`}
        </div>
        <div className="absolute bottom-6 right-6 pointer-events-none opacity-50">
          <svg width="22" height="22" viewBox="0 0 64 64" fill="none">
            <path d="M32 14L56 25L32 36L8 25L32 14Z" fill="#2A2733" />
            <path d="M18 29.5V40C18 43.5 24.3 46 32 46C39.7 46 46 43.5 46 40V29.5" fill="#2A2733" />
          </svg>
        </div>

        {/* ========================================================
            DESKTOP 4-COLUMN, 3-ROW GRID
        ======================================================== */}
        <div className="hidden lg:block relative w-full">
          {/* Clean Road SVG Overlay (Behind buildings and hub) */}
          <HubRoads isRevealed={isRevealed} prefersReduced={prefersReduced} />

          <div
            className="grid w-full items-center gap-y-4"
            style={{
              gridTemplateColumns: "1fr 1.2fr 1.2fr 1fr",
            }}
          >
            {/* ---------------- ROW 1: PINK & YELLOW ---------------- */}
            {/* Col 1: Pink Label Card */}
            <div
              className="justify-self-end w-full max-w-[300px] z-10 transition-all duration-500 ease-out"
              style={{
                opacity: isRevealed || prefersReduced ? 1 : 0,
                transform: isRevealed || prefersReduced ? "translateY(0)" : "translateY(30px)",
                transitionDelay: prefersReduced ? "0s" : "0.6s",
              }}
            >
              <StageLabel
                stage={pinkStage}
                isHovered={hoveredStageId === pinkStage.id}
                onClick={() => setSelectedStage(pinkStage)}
              />
            </div>

            {/* Col 2: Pink Building */}
            <div
              className="flex justify-center items-center z-10 transition-all duration-500 ease-out"
              style={{
                opacity: isRevealed || prefersReduced ? 1 : 0,
                transform: isRevealed || prefersReduced ? "translateY(0)" : "translateY(30px)",
                transitionDelay: prefersReduced ? "0s" : "0.6s",
              }}
            >
              <StageBuilding
                stage={pinkStage}
                isHovered={hoveredStageId === pinkStage.id}
                onHoverChange={(h) => setHoveredStageId(h ? pinkStage.id : null)}
                onClick={() => setSelectedStage(pinkStage)}
                priority={true}
                floatClass="edu-float-pink"
                isPaused={!isVisible}
              />
            </div>

            {/* Col 3: Yellow Building */}
            <div
              className="flex justify-center items-center z-10 transition-all duration-500 ease-out"
              style={{
                opacity: isRevealed || prefersReduced ? 1 : 0,
                transform: isRevealed || prefersReduced ? "translateY(0)" : "translateY(30px)",
                transitionDelay: prefersReduced ? "0s" : "0.8s",
              }}
            >
              <StageBuilding
                stage={yellowStage}
                isHovered={hoveredStageId === yellowStage.id}
                onHoverChange={(h) => setHoveredStageId(h ? yellowStage.id : null)}
                onClick={() => setSelectedStage(yellowStage)}
                floatClass="edu-float-yellow"
                isPaused={!isVisible}
              />
            </div>

            {/* Col 4: Yellow Label Card */}
            <div
              className="justify-self-start w-full max-w-[300px] z-10 transition-all duration-500 ease-out"
              style={{
                opacity: isRevealed || prefersReduced ? 1 : 0,
                transform: isRevealed || prefersReduced ? "translateY(0)" : "translateY(30px)",
                transitionDelay: prefersReduced ? "0s" : "0.8s",
              }}
            >
              <StageLabel
                stage={yellowStage}
                isHovered={hoveredStageId === yellowStage.id}
                onClick={() => setSelectedStage(yellowStage)}
              />
            </div>

            {/* ---------------- ROW 2: HUB (CENTERED) ---------------- */}
            <div
              className="col-start-2 col-span-2 flex flex-col items-center justify-center my-[-15px] z-10 transition-all duration-400 ease-out"
              style={{
                opacity: isRevealed || prefersReduced ? 1 : 0,
                transform: isRevealed || prefersReduced ? "scale(1)" : "scale(0.85)",
              }}
            >
              <div className="relative w-[210px] h-[210px] sm:w-[230px] sm:h-[230px]">
                {/* 3D Roundabout WebP Image */}
                <Image
                  src="/education/hub.webp"
                  alt="My Education Hub"
                  fill
                  sizes="230px"
                  className="object-contain pointer-events-none"
                />

                {/* Real HTML Text "My Education" — charcoal + white glow so it reads on the glass plate */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                  <h2
                    className="font-serif text-[#2A2733] dark:text-[#F5F3FB] font-normal tracking-wide text-center"
                    style={{
                      fontSize: "clamp(18px, 2vw, 26px)",
                      textShadow: "0 1px 8px rgba(255,255,255,0.90), 0 0px 2px rgba(255,255,255,1)",
                    }}
                  >
                    My Education
                  </h2>
                  {/* 3-color underline */}
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-4 h-1 rounded-full bg-[#FF8AB2]" />
                    <span className="w-4 h-1 rounded-full bg-[#60A5FA]" />
                    <span className="w-4 h-1 rounded-full bg-[#FBBF24]" />
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------- ROW 3: BLUE CAMPUS (CENTERED) ---------------- */}
            <div
              className="col-span-4 flex items-center justify-center gap-8 lg:gap-10 z-10 transition-all duration-500 ease-out"
              style={{
                opacity: isRevealed || prefersReduced ? 1 : 0,
                transform: isRevealed || prefersReduced ? "translateY(0)" : "translateY(30px)",
                transitionDelay: prefersReduced ? "0s" : "1.0s",
              }}
            >
              {/* Blue Label Card on the left, vertically centered */}
              <div className="w-full max-w-[300px]">
                <StageLabel
                  stage={blueStage}
                  isHovered={hoveredStageId === blueStage.id}
                  onClick={() => setSelectedStage(blueStage)}
                />
              </div>

              {/* Blue Campus Building (Largest) */}
              <StageBuilding
                stage={blueStage}
                size="large"
                isHovered={hoveredStageId === blueStage.id}
                onHoverChange={(h) => setHoveredStageId(h ? blueStage.id : null)}
                onClick={() => setSelectedStage(blueStage)}
                floatClass="edu-float-blue"
                isPaused={!isVisible}
              />
            </div>
          </div>
        </div>

        {/* ========================================================
            MOBILE STACKED LAYOUT
            Vertical road on left, clean stack, no float animation
        ======================================================== */}
        <div className="lg:hidden w-full flex flex-col items-center space-y-8">
          {/* Hub */}
          <div className="relative w-[180px] h-[180px]">
            <Image
              src="/education/hub.webp"
              alt="My Education Hub"
              fill
              sizes="180px"
              className="object-contain"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
              <h2
                className="font-serif text-xl text-[#2A2733] dark:text-[#F5F3FB] font-normal"
                style={{ textShadow: "0 1px 8px rgba(255,255,255,0.90)" }}
              >
                My Education
              </h2>
              <div className="flex items-center gap-1 mt-1">
                <span className="w-3 h-1 rounded-full bg-[#FF8AB2]" />
                <span className="w-3 h-1 rounded-full bg-[#60A5FA]" />
                <span className="w-3 h-1 rounded-full bg-[#FBBF24]" />
              </div>
            </div>
          </div>

          {/* Stage 1: Pink */}
          <div className="w-full flex flex-col items-center gap-3">
            <StageBuilding
              stage={pinkStage}
              isHovered={hoveredStageId === pinkStage.id}
              onHoverChange={(h) => setHoveredStageId(h ? pinkStage.id : null)}
              onClick={() => setSelectedStage(pinkStage)}
            />
            <StageLabel
              stage={pinkStage}
              isHovered={hoveredStageId === pinkStage.id}
              onClick={() => setSelectedStage(pinkStage)}
            />
          </div>

          {/* Vertical road separator */}
          <div className="w-10 h-12 rounded-full bg-[#2A2733] flex flex-col items-center justify-center gap-1.5">
            <div className="w-1.5 h-2.5 rounded-full bg-white/90" />
            <div className="w-1.5 h-2.5 rounded-full bg-white/90" />
          </div>

          {/* Stage 2: Yellow */}
          <div className="w-full flex flex-col items-center gap-3">
            <StageBuilding
              stage={yellowStage}
              isHovered={hoveredStageId === yellowStage.id}
              onHoverChange={(h) => setHoveredStageId(h ? yellowStage.id : null)}
              onClick={() => setSelectedStage(yellowStage)}
            />
            <StageLabel
              stage={yellowStage}
              isHovered={hoveredStageId === yellowStage.id}
              onClick={() => setSelectedStage(yellowStage)}
            />
          </div>

          {/* Vertical road separator */}
          <div className="w-10 h-12 rounded-full bg-[#2A2733] flex flex-col items-center justify-center gap-1.5">
            <div className="w-1.5 h-2.5 rounded-full bg-white/90" />
            <div className="w-1.5 h-2.5 rounded-full bg-white/90" />
          </div>

          {/* Stage 3: Blue Campus */}
          <div className="w-full flex flex-col items-center gap-3">
            <StageBuilding
              stage={blueStage}
              size="large"
              isHovered={hoveredStageId === blueStage.id}
              onHoverChange={(h) => setHoveredStageId(h ? blueStage.id : null)}
              onClick={() => setSelectedStage(blueStage)}
            />
            <StageLabel
              stage={blueStage}
              isHovered={hoveredStageId === blueStage.id}
              onClick={() => setSelectedStage(blueStage)}
            />
          </div>
        </div>
      </div>

      {/* ========================================================
          BOTTOM CAPTION (Normal centered line below stage)
      ======================================================== */}
      <p
        className="mt-8 text-center text-sm font-medium"
        style={{ color: "var(--text-muted)" }}
      >
        Currently building my future, one project at a time.
      </p>

      {/* Detail Modal */}
      <StageModal
        stage={selectedStage}
        onClose={() => setSelectedStage(null)}
      />
    </div>
  );
}
