"use client";

import React from "react";
import { ProjectItem } from "@/data/projects";

interface HotspotPinProps {
  project: ProjectItem;
  index: number;
  isActive: boolean;
  isWideView?: boolean;
  introDropped?: boolean;
  onClick: () => void;
}

export const HotspotPin: React.FC<HotspotPinProps> = ({
  project,
  index,
  isActive,
  onClick,
}) => {
  const numStr = String(index + 1).padStart(2, "0");

  return (
    <div
      className="absolute pointer-events-auto"
      style={{
        left: `${project.hotspot.x}%`,
        top: `${project.hotspot.y}%`,
        transform: "translate(-50%, -100%)",
        zIndex: isActive ? 40 : 30,
      }}
    >
      <button
        type="button"
        onClick={onClick}
        aria-label={`Project ${numStr}: ${project.title}`}
        aria-pressed={isActive}
        className="group relative flex flex-col items-center cursor-pointer transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E85D88] focus-visible:ring-offset-2 rounded-full"
        style={{
          transform: isActive ? "scale(1.15) translateY(-2px)" : "scale(0.92)",
          transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Pulsing ring on the rooftop */}
        <span
          className={`absolute -bottom-1.5 w-4 h-2 rounded-full transition-opacity duration-300 ${
            isActive ? "opacity-100" : "opacity-30 group-hover:opacity-70"
          }`}
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(232, 93, 136, 0.6) 0%, rgba(232, 93, 136, 0) 70%)",
          }}
        />

        {isActive && (
          <span
            className="absolute -bottom-1.5 w-5 h-2.5 rounded-full border border-[#E85D88] animate-ping pointer-events-none"
            style={{ animationDuration: "2s" }}
          />
        )}

        {/* Pin Badge: Clay-style pastel pink */}
        <div
          className={`relative flex items-center justify-center font-mono font-bold text-[11px] tracking-tight transition-all duration-300 ${
            isActive
              ? "bg-gradient-to-b from-[#FFA7C4] to-[#E85D88] text-white shadow-md shadow-[#E85D88]/30 ring-2 ring-white"
              : "bg-white/95 text-[#2A2733] shadow-xs border border-[#E85D88]/30 group-hover:bg-[#FFD8E5] group-hover:text-[#2A2733]"
          }`}
          style={{
            width: isActive ? "30px" : "25px",
            height: isActive ? "30px" : "25px",
            borderRadius: "50%",
            boxShadow: isActive
              ? "0 6px 12px -2px rgba(232, 93, 136, 0.45), inset 0 2px 3px rgba(255, 255, 255, 0.7)"
              : "0 2px 6px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.9)",
          }}
        >
          {numStr}
        </div>

        {/* Pin Needle Arrow Tip pointing down to the building rooftop */}
        <div
          className={`w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent -mt-0.5 transition-colors duration-300 ${
            isActive ? "border-t-[7px] border-t-[#E85D88]" : "border-t-[5px] border-t-white"
          }`}
        />
      </button>
    </div>
  );
};
