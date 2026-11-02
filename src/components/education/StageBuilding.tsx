"use client";

import Image from "next/image";
import type { EducationStage } from "@/data/education";

interface StageBuildingProps {
  stage: EducationStage;
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
  onClick: () => void;
  priority?: boolean;
  size?: "normal" | "large";
  floatClass?: string;
  isPaused?: boolean;
}

export function StageBuilding({
  stage,
  isHovered,
  onHoverChange,
  onClick,
  priority = false,
  size = "normal",
  floatClass = "",
  isPaused = false,
}: StageBuildingProps) {
  const isLarge = size === "large" || stage.buildingType === "campus";

  return (
    <div
      className="relative flex flex-col items-center select-none cursor-pointer"
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${stage.institution} building`}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {/* Pre-baked smooth CSS radial shadow under the building (NO CSS blur filter) */}
      <div
        className="absolute -bottom-2 w-[70%] h-6 rounded-full pointer-events-none transition-transform duration-250 ease-out"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(42,39,51,0.25) 0%, rgba(42,39,51,0) 70%)",
          transform: isHovered ? "scale(0.9)" : "scale(1)",
        }}
      />

      {/* Building Container with slow CSS float + hover lift */}
      <div
        className={`relative transition-transform duration-250 ease-out ${
          isHovered ? "-translate-y-1.5" : floatClass
        }`}
        style={{
          animationPlayState: isPaused ? "paused" : "running",
          willChange: "transform",
        }}
      >
        <div
          className={`relative ${
            isLarge
              ? "w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] lg:w-[320px] lg:h-[320px]"
              : "w-[190px] h-[190px] sm:w-[220px] sm:h-[220px] lg:w-[250px] lg:h-[250px]"
          }`}
        >
          <Image
            src={stage.image}
            alt={stage.institution}
            fill
            sizes={isLarge ? "(max-width: 768px) 280px, 320px" : "(max-width: 768px) 220px, 250px"}
            className="object-contain pointer-events-none select-none"
            priority={priority}
            loading={priority ? undefined : "lazy"}
          />
        </div>
      </div>
    </div>
  );
}
