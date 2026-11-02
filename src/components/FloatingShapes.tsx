"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect } from "react";

export function FloatingShapes() {
  const mouseX = useSpring(0, { stiffness: 60, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 40;
      const y = (e.clientY / innerHeight - 0.5) * 40;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-0">
      {/* 1. Marshmallow Twist - Top Right */}
      <motion.div
        className="absolute top-24 right-[8%] w-24 h-24 hidden lg:block"
        style={{ x: mouseX, y: mouseY }}
        animate={{
          rotate: [0, 180, 360],
          y: [0, -15, 0],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="twistGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE9B7" />
              <stop offset="50%" stopColor="#FFD8E5" />
              <stop offset="100%" stopColor="#CAE1E9" />
            </linearGradient>
            <filter id="softGlow">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#2A2733" floodOpacity="0.08" />
            </filter>
          </defs>
          <path
            d="M 50,15 C 65,15 85,30 85,50 C 85,70 65,85 50,85 C 35,85 15,70 15,50 C 15,30 35,15 50,15 Z"
            fill="url(#twistGrad1)"
            filter="url(#softGlow)"
          />
          <path
            d="M 30,35 Q 50,50 70,65"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.8"
          />
          <circle cx="50" cy="50" r="14" fill="#ffffff" opacity="0.3" />
        </svg>
      </motion.div>

      {/* 2. Sparkle Star - Mid Left */}
      <motion.div
        className="absolute top-1/3 left-[5%] w-14 h-14"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: [1, 1.25, 1],
          rotate: [0, 45, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <path
            d="M 50,0 Q 50,50 0,50 Q 50,50 50,100 Q 50,50 100,50 Q 50,50 50,0 Z"
            fill="#FFE9B7"
            stroke="#f5d590"
            strokeWidth="2"
          />
        </svg>
      </motion.div>

      {/* 3. Soft Pink Blob - Bottom Left */}
      <motion.div
        className="absolute bottom-20 left-[10%] w-20 h-20 hidden md:block"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <path
            d="M 50 10 C 70 10, 90 30, 90 50 C 90 75, 75 90, 50 90 C 25 90, 10 70, 10 50 C 10 25, 30 10, 50 10 Z"
            fill="#FFD8E5"
            opacity="0.85"
          />
          <circle cx="40" cy="35" r="8" fill="#ffffff" opacity="0.5" />
        </svg>
      </motion.div>

      {/* 4. Soft Blue Pill / Donut - Bottom Right */}
      <motion.div
        className="absolute bottom-16 right-[12%] w-16 h-16 hidden sm:block"
        animate={{
          y: [0, -12, 0],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <circle cx="50" cy="50" r="38" fill="none" stroke="#CAE1E9" strokeWidth="16" />
          <circle cx="50" cy="50" r="46" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
        </svg>
      </motion.div>

      {/* 5. Mini Pastel Sparkle Star - Top Left */}
      <motion.div
        className="absolute top-20 left-[22%] w-8 h-8 opacity-75"
        animate={{
          rotate: [0, 90, 180, 270, 360],
          scale: [0.9, 1.2, 0.9],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M 50,0 Q 50,50 0,50 Q 50,50 50,100 Q 50,50 100,50 Q 50,50 50,0 Z"
            fill="#FFD8E5"
          />
        </svg>
      </motion.div>
    </div>
  );
}
