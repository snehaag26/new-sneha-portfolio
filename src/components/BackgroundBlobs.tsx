"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function BackgroundBlobs() {
  const [mounted, setMounted] = useState(false);

  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 50;
      const y = (e.clientY / innerHeight - 0.5) * 50;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Grain / Stipple overlay - dark mode only, clean in light mode */}
      <div className="absolute inset-0 bg-grain opacity-40 z-10 hidden dark:block" />

      {/* Floating Animated Gradient Blobs — light: vivid pastels; dark: subtle */}
      <motion.div
        className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-[#FFE9B7]/65 dark:bg-[#FFE9B7]/15 blur-[100px] animate-blob-1"
        style={{ x: mouseX, y: mouseY }}
      />
      
      <motion.div
        className="absolute top-[25%] -right-[15%] w-[60vw] h-[60vw] max-w-[750px] max-h-[750px] rounded-full bg-[#FFD8E5]/70 dark:bg-[#FFD8E5]/20 blur-[120px] animate-blob-2"
        style={{ x: mouseX, y: mouseY }}
      />

      <motion.div
        className="absolute -bottom-[15%] left-[20%] w-[65vw] h-[65vw] max-w-[800px] max-h-[800px] rounded-full bg-[#CAE1E9]/65 dark:bg-[#CAE1E9]/20 blur-[130px] animate-blob-3"
        style={{ x: mouseX, y: mouseY }}
      />

      {/* Central subtle highlight blob */}
      <div className="absolute top-[50%] left-[35%] w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] rounded-full bg-[#FFE9B7]/45 dark:bg-[#FFE9B7]/10 blur-[90px] animate-blob-1" />
    </div>
  );
}
