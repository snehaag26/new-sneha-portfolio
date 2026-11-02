"use client";

import React from "react";
import { ProjectItem } from "@/data/projects";
import { ProjectPopup } from "./ProjectPopup";

interface IslandPinProps {
  project: ProjectItem;
  index: number;
  isActive: boolean;
  isPaused: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
}

export const IslandPin: React.FC<IslandPinProps> = ({
  project,
  index,
  isActive,
  isPaused,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
}) => {
  return (
    <div
      className={`absolute -translate-x-1/2 -translate-y-1/2 ${
        isActive ? "z-40" : "z-20"
      }`}
      style={{
        left: `${project.hotspot.x}%`,
        top: `${project.hotspot.y}%`,
      }}
    >
      {/* Pin Drop-in Entrance + Idle Soft Hop */}
      <div
        className="relative flex flex-col items-center island-pin-wrapper"
        style={{
          animationDelay: `${0.3 + index * 0.2}s, ${1.5 + index * 0.15}s`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {/* Project Card Popup */}
        <ProjectPopup
          project={project}
          index={index}
          isOpen={isActive}
          pinHotspot={project.hotspot}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />

        {/* The Clay Rooftop Pin Button */}
        <button
          type="button"
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-label={`Project 0${index + 1}: ${project.title}`}
          aria-expanded={isActive}
          className={`group relative flex flex-col items-center cursor-pointer transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E85D88] focus-visible:ring-offset-2 rounded-full ${
            isActive ? "scale-130 z-20" : "scale-90 hover:scale-105 z-10 opacity-90 hover:opacity-100"
          }`}
        >
          {/* Ground Pulsing Glow Ring on Rooftop */}
          {isActive ? (
            <span
              className="absolute -inset-3 rounded-full border-2 border-[#E85D88] animate-ping opacity-75 pointer-events-none"
              style={{ animationDuration: "1.8s" }}
            />
          ) : (
            <span className="absolute -inset-1.5 rounded-full bg-[#E85D88]/15 group-hover:bg-[#E85D88]/30 transition-colors pointer-events-none" />
          )}

          {/* Clay Pin Body */}
          <div
            className={`relative flex items-center justify-center px-2 py-0.5 rounded-full bg-gradient-to-br from-[#FFA0BD] via-[#F46F94] to-[#E85D88] text-white shadow-[0_4px_12px_rgba(232,93,136,0.45)] border border-white/70 text-[10px] sm:text-[11px] font-mono font-bold tracking-tight transition-all duration-300 ${
              isActive ? "ring-2 ring-white/90 shadow-[0_6px_16px_rgba(232,93,136,0.6)]" : ""
            }`}
          >
            <span>0{index + 1}</span>
          </div>

          {/* Clay Arrow Tip pointing to rooftop */}
          <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-[#E85D88] -mt-[1px] drop-shadow-sm" />
        </button>
      </div>

      {/* Pin Animations: Drop-in with bounce, then gentle idle hop */}
      <style jsx>{`
        .island-pin-wrapper {
          animation: pinDrop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both,
            pinHop 2.4s ease-in-out infinite;
        }

        @keyframes pinDrop {
          0% {
            opacity: 0;
            transform: translateY(-30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pinHop {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
};
