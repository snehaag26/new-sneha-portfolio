"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Check if preloader was already viewed this session
    const hasLoaded = sessionStorage.getItem("sneha-preloader-done");
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    const duration = 1800; // ~1.8 seconds
    const intervalTime = 25;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(100, Math.round((currentStep / steps) * 100));
      setCount(progress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem("sneha-preloader-done", "true");
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-auto"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          {/* Pastel Curtain Wipe Layers */}
          <motion.div
            className="absolute inset-0 bg-[#FFE9B7] z-10"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          />
          <motion.div
            className="absolute inset-0 bg-[#FFD8E5] z-20"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          />
          <motion.div
            className="absolute inset-0 bg-[#CAE1E9] z-30"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Main Canvas with Marshmallow Content */}
          <motion.div
            className="absolute inset-0 bg-[#FFFBF5] dark:bg-[#14121C] z-40 flex flex-col items-center justify-center px-6"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Ambient Background Blobs */}
            <div className="absolute w-72 h-72 bg-[#FFE9B7]/40 rounded-full blur-3xl animate-blob-1" />
            <div className="absolute w-80 h-80 bg-[#FFD8E5]/40 rounded-full blur-3xl animate-blob-2" />
            <div className="absolute w-64 h-64 bg-[#CAE1E9]/40 rounded-full blur-3xl animate-blob-3" />

            {/* Marshmallow Twist Central Graphic */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.div
                className="relative w-28 h-28 mb-8 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                {/* 3 Interlocking Pastel Petals/Twists */}
                <motion.div
                  className="absolute w-20 h-20 rounded-3xl bg-[#FFE9B7] opacity-90 shadow-md"
                  animate={{
                    scale: [1, 1.15, 1],
                    rotate: [0, 90, 0],
                    borderRadius: ["32% 68% 70% 30% / 30% 30% 70% 70%", "60% 40% 30% 70% / 60% 30% 70% 40%", "32% 68% 70% 30% / 30% 30% 70% 70%"],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute w-20 h-20 rounded-3xl bg-[#FFD8E5] opacity-80 mix-blend-multiply"
                  animate={{
                    scale: [1.1, 0.9, 1.1],
                    rotate: [45, 135, 45],
                    borderRadius: ["50% 50% 30% 70% / 50% 50% 70% 30%", "30% 70% 70% 30% / 50% 30% 70% 50%", "50% 50% 30% 70% / 50% 50% 70% 30%"],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute w-20 h-20 rounded-3xl bg-[#CAE1E9] opacity-80 mix-blend-multiply"
                  animate={{
                    scale: [0.95, 1.15, 0.95],
                    rotate: [-30, 60, -30],
                    borderRadius: ["70% 30% 50% 50% / 30% 60% 40% 70%", "40% 60% 60% 40% / 60% 40% 60% 40%", "70% 30% 50% 50% / 30% 60% 40% 70%"],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute z-20 text-3xl font-black text-[#2A2733] dark:text-[#F5F1FA] font-display">
                  S
                </div>
              </motion.div>

              {/* Monogram / Name Reveal */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-2"
              >
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#2A2733] dark:text-[#F5F1FA] font-display">
                  SNEHA <span className="text-[#E85D88] dark:text-[#FF8FB8]">AGRAWAL</span>
                </h1>
                <p className="text-xs md:text-sm tracking-widest uppercase font-semibold text-[#5E5B6E] dark:text-[#A9A3B8]">
                  Full-Stack Developer • Creative Engineer
                </p>
              </motion.div>

              {/* Progress Counter & Pill Bar */}
              <div className="mt-8 flex flex-col items-center gap-3">
                <div className="w-48 h-2 bg-[#2A2733]/5 dark:bg-white/10 rounded-full overflow-hidden p-0.5 border border-[#2A2733]/10 dark:border-white/15">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#FFE9B7] via-[#FFD8E5] to-[#CAE1E9]"
                    style={{ width: `${count}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
                <span className="text-xs font-mono font-medium text-[#2A2733]/70 dark:text-[#F5F1FA]/70">
                  {count}%
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
