"use client";

import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { ProjectItem } from "@/data/projects";
import { IslandPin } from "./IslandPin";
import { ProjectPills } from "./ProjectPills";

interface SpinningIslandProps {
  projects: ProjectItem[];
}

export const SpinningIsland: React.FC<SpinningIslandProps> = ({ projects }) => {
  return (
    <Suspense fallback={<div className="w-[min(640px,92vw)] aspect-square mx-auto rounded-3xl bg-[#BFD9EA]/20 animate-pulse" />}>
      <FloatingIslandInner projects={projects} />
    </Suspense>
  );
};

export const FloatingIsland = SpinningIsland;

// 8 Ambient Twinkling Floating Sparkles/Stars
const SPARKLES = [
  { top: "12%", left: "14%", size: 10, color: "#FFE9B7", delay: "0s", duration: "4.2s" },
  { top: "22%", left: "84%", size: 12, color: "#FFD8E5", delay: "1.2s", duration: "5.1s" },
  { top: "45%", left: "6%", size: 8, color: "#CAE1E9", delay: "0.6s", duration: "3.8s" },
  { top: "72%", left: "10%", size: 11, color: "#FFE9B7", delay: "1.8s", duration: "4.7s" },
  { top: "80%", left: "88%", size: 9, color: "#FFD8E5", delay: "0.9s", duration: "3.5s" },
  { top: "15%", left: "58%", size: 8, color: "#CAE1E9", delay: "2.1s", duration: "4.9s" },
  { top: "60%", left: "92%", size: 10, color: "#FFE9B7", delay: "1.4s", duration: "4.4s" },
  { top: "34%", left: "94%", size: 8, color: "#FFD8E5", delay: "2.5s", duration: "5.5s" },
];

const FloatingIslandInner: React.FC<SpinningIslandProps> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Dev coordinate picker helper (?pick=1)
  const [isPickMode, setIsPickMode] = useState<boolean>(false);
  const [pickedCoords, setPickedCoords] = useState<{ x: number; y: number } | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const islandRef = useRef<HTMLDivElement>(null);

  // Detect prefers-reduced-motion, mobile viewport, and ?pick=1
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("pick") === "1") {
        setIsPickMode(true);
      }

      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", handleMotionChange);

      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener("resize", checkMobile);

      return () => {
        mediaQuery.removeEventListener("change", handleMotionChange);
        window.removeEventListener("resize", checkMobile);
      };
    }
  }, []);

  // IntersectionObserver to pause motion when off-screen
  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsIntersecting(entry.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Motion is paused when hovered, focused, off-screen, or under prefers-reduced-motion
  const isMotionPaused = isHovered || isFocused || !isIntersecting || prefersReducedMotion;

  // Auto-cycle through projects every 5 seconds
  useEffect(() => {
    if (isMotionPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isMotionPaused, projects.length]);

  // Handle pin or pill click/hover
  const handlePinClick = useCallback((idx: number) => {
    setCurrentIndex((prev) => (prev === idx ? -1 : idx));
  }, []);

  const handlePinHover = useCallback((idx: number) => {
    setCurrentIndex(idx);
  }, []);

  const handlePillSelect = useCallback((idx: number) => {
    setCurrentIndex(idx);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [projects.length]);

  // Dev Picker Click (?pick=1)
  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPickMode || !islandRef.current) return;
    const rect = islandRef.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    console.log(`[Dev Hotspot Picker] Clicked: { x: ${x}, y: ${y} }`);
    setPickedCoords({ x, y });
  };

  const activeProject = projects[currentIndex] || projects[0];

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Accessibility Announcement */}
      <div className="sr-only" aria-live="polite">
        Current active project: {activeProject?.title}. Use arrow keys to tour buildings.
      </div>

      {/* Dev Picker Indicator Banner */}
      {isPickMode && (
        <div className="mb-4 flex items-center justify-between px-4 py-2.5 rounded-2xl bg-[#FFE9B7] text-[#2A2733] border border-[#f5d799] text-xs font-mono shadow-sm max-w-xl w-full">
          <span>
            🛠 <strong>Dev Picker Active:</strong> Click anywhere on the island to log rooftop coordinates.
          </span>
          {pickedCoords && (
            <span className="font-bold text-[#E85D88] bg-white px-2 py-0.5 rounded-md">
              Selected: x: {pickedCoords.x}%, y: {pickedCoords.y}%
            </span>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 1. FLOATING & SWAYING ISLAND STAGE                             */}
      {/* ============================================================== */}
      <div
        ref={stageRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-[min(640px,92vw)] max-h-[62vh] aspect-square flex items-center justify-center overflow-visible island-entrance"
      >
        {/* Floating Twinkling Stars in Background */}
        {!prefersReducedMotion &&
          SPARKLES.map((s, i) => (
            <div
              key={i}
              className="absolute pointer-events-none z-0 ambient-sparkle"
              style={{
                top: s.top,
                left: s.left,
                animationDelay: s.delay,
                animationDuration: s.duration,
                animationPlayState: isMotionPaused ? "paused" : "running",
              }}
            >
              <svg
                width={s.size}
                height={s.size}
                viewBox="0 0 24 24"
                fill={s.color}
                className="opacity-70"
              >
                <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
              </svg>
            </div>
          ))}

        {/* Orbiting Paper Plane (Passes behind & in front of the island) */}
        {!prefersReducedMotion && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none plane-orbit-container"
            style={{
              animationPlayState: isMotionPaused ? "paused" : "running",
            }}
          >
            {/* The Paper Plane and faint vapor trail */}
            <div className="relative flex items-center">
              {/* Dotted vapor trail */}
              <div className="flex items-center gap-1.5 mr-2 opacity-50">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E85D88]/40" />
                <span className="w-1 h-1 rounded-full bg-[#E85D88]/30" />
                <span className="w-0.5 h-0.5 rounded-full bg-[#E85D88]/20" />
              </div>
              {/* Origami Paper Plane */}
              <svg
                className="w-5 h-5 text-[#E85D88]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </div>
          </div>
        )}

        {/* The Floating and Rocking Island Wrapper */}
        <div
          ref={islandRef}
          onClick={handleStageClick}
          className={`relative w-full h-full flex items-center justify-center overflow-visible island-float-sway ${
            isPickMode ? "cursor-crosshair" : "cursor-default"
          }`}
          style={{
            animationPlayState: isMotionPaused ? "paused" : "running",
          }}
        >
          {/*
            TODO: The island cutout can be further regenerated from the original master image
            with high-res edge matting if diagonal artifacts persist on source exports.
          */}
          <div
            className="relative w-full h-full overflow-hidden"
            style={{
              // Soft feather on outer right edge if cutout has straight cut
              maskImage: "linear-gradient(to left, transparent 0%, black 8%, black 100%)",
              WebkitMaskImage: "linear-gradient(to left, transparent 0%, black 8%, black 100%)",
            }}
          >
            {/* Transparent Cutout Island Image (Entire island & clouds fully visible) */}
            <img
              src="/projects-world/island-cutout.webp"
              alt="Floating 3D city island with project buildings"
              draggable={false}
              className="w-full h-full object-contain select-none pointer-events-none"
            />
          </div>

          {/* 4 Rooftop Pins that sit directly on their buildings */}
          {projects.map((project, index) => (
            <IslandPin
              key={project.slug}
              project={project}
              index={index}
              isActive={index === currentIndex}
              isPaused={isMotionPaused}
              onClick={() => handlePinClick(index)}
              onMouseEnter={() => handlePinHover(index)}
              onMouseLeave={() => {}}
              onFocus={() => {
                setIsFocused(true);
                handlePinHover(index);
              }}
              onBlur={() => setIsFocused(false)}
            />
          ))}
        </div>
      </div>

      {/* Soft Ellipse Shadow (Scales opposite to island vertical float) */}
      <div
        className="w-[58%] max-w-[440px] h-6 sm:h-9 mx-auto rounded-[50%] pointer-events-none island-shadow"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(42, 39, 51, 0.22) 0%, rgba(42, 39, 51, 0.08) 50%, transparent 75%)",
          animationPlayState: isMotionPaused ? "paused" : "running",
        }}
        aria-hidden="true"
      />

      {/* ============================================================== */}
      {/* 2. ROW OF 4 PROJECT NAME PILLS (Margin-top 32px)               */}
      {/* ============================================================== */}
      <div className="w-full mt-8 pb-4">
        <ProjectPills
          projects={projects}
          currentIndex={currentIndex}
          onSelect={handlePillSelect}
        />
      </div>

      {/* Pure CSS Animations (Transform and Opacity only, No CSS Filters) */}
      <style jsx global>{`
        /* Entrance animation (1.2s soft bounce scale and fade-in) */
        .island-entrance {
          animation: islandEntrance 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        @keyframes islandEntrance {
          0% {
            opacity: 0;
            transform: scale(0.85);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Gentle float (translateY 0 to -12px, 6s) + slow rocking sway (rotate -3deg to 3deg, 9s) */
        .island-float-sway {
          animation: islandFloat 6s ease-in-out infinite alternate,
            islandSway 9s ease-in-out infinite alternate;
          transform-origin: center bottom;
          will-change: transform;
        }

        @keyframes islandFloat {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-12px);
          }
        }

        @keyframes islandSway {
          0% {
            rotate: -3deg;
          }
          100% {
            rotate: 3deg;
          }
        }

        @media (max-width: 768px) {
          @keyframes islandSway {
            0% {
              rotate: -2deg;
            }
            100% {
              rotate: 2deg;
            }
          }
        }

        /* Shadow scales opposite to float */
        .island-shadow {
          animation: shadowPulse 6s ease-in-out infinite alternate;
          will-change: transform, opacity;
        }

        @keyframes shadowPulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(0.85);
            opacity: 0.65;
          }
        }

        /* Orbiting Paper Plane (Elliptical 3D-like orbit: passes behind at top, in front at bottom) */
        .plane-orbit-container {
          animation: orbitPlane 18s linear infinite;
          will-change: transform, opacity;
        }

        @keyframes orbitPlane {
          0% {
            transform: translate(50%, -5%) rotate(10deg) scale(0.85);
            z-index: 10;
            opacity: 0.9;
          }
          25% {
            transform: translate(0%, -42%) rotate(-25deg) scale(0.7);
            z-index: 0;
            opacity: 0.75;
          }
          50% {
            transform: translate(-50%, -5%) rotate(-80deg) scale(0.85);
            z-index: 30;
            opacity: 0.9;
          }
          75% {
            transform: translate(0%, 38%) rotate(85deg) scale(1);
            z-index: 30;
            opacity: 1;
          }
          100% {
            transform: translate(50%, -5%) rotate(10deg) scale(0.85);
            z-index: 10;
            opacity: 0.9;
          }
        }

        /* Ambient Twinkling Floating Sparkles */
        .ambient-sparkle {
          animation: sparkleDrift 4.5s ease-in-out infinite alternate;
          will-change: transform, opacity;
        }

        @keyframes sparkleDrift {
          0% {
            opacity: 0.2;
            transform: translateY(0px) scale(0.8);
          }
          50% {
            opacity: 0.85;
            transform: translateY(-8px) scale(1.15);
          }
          100% {
            opacity: 0.3;
            transform: translateY(-14px) scale(0.9);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .island-entrance,
          .island-float-sway,
          .island-shadow,
          .plane-orbit-container,
          .ambient-sparkle {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};
