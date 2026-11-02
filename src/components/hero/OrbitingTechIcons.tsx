"use client";

import React from "react";
import { motion } from "framer-motion";
import { orbitingTechIcons } from "@/data/skills";

export function OrbitingTechIcons() {
  return (
    <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center select-none overflow-hidden">
      {/* Outer subtle orbital ring path */}
      <div className="absolute w-36 h-36 sm:w-40 sm:h-40 rounded-full border border-dashed border-[#CAE1E9]/80 dark:border-white/10" />
      <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-dotted border-[#FFD8E5]/80 dark:border-white/10" />

      {/* Central Core Sphere */}
      <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-tr from-[#FFE9B7] via-[#FFD8E5] to-[#CAE1E9] p-0.5 shadow-md flex items-center justify-center">
        <div className="w-full h-full rounded-full bg-white/90 dark:bg-[#181622] flex items-center justify-center">
          <span className="font-display font-extrabold text-xs text-[#2A2733] dark:text-[#F5F3FB]">
            TECH
          </span>
        </div>
      </div>

      {/* Continuous 360° Orbiting Container */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        {orbitingTechIcons.map((tech, index) => {
          // Distribute along circular perimeter
          const angleRad = (tech.angle * Math.PI) / 180;
          const x = Math.cos(angleRad) * (tech.radius * 0.82);
          const y = Math.sin(angleRad) * (tech.radius * 0.82);

          return (
            <motion.div
              key={tech.name}
              className="absolute w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold font-mono shadow-sm border border-white/80 dark:border-white/15"
              style={{
                x,
                y,
                backgroundColor: tech.color,
                color: "#2A2733",
              }}
              // Counter-rotate each icon so text/symbol remains upright
              animate={{ rotate: -360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              title={tech.name}
            >
              <span>{tech.symbol}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
