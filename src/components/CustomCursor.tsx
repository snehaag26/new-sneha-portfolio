"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useCursor } from "./Providers";

export function CustomCursor() {
  const { cursorVariant, cursorText } = useCursor();
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth spring physics for organic marshmallow follow effect
  const mouseX = useSpring(0, { stiffness: 450, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 450, damping: 28 });

  const dotX = useSpring(0, { stiffness: 800, damping: 35 });
  const dotY = useSpring(0, { stiffness: 800, damping: 35 });

  useEffect(() => {
    // Only enable custom cursor for devices with mouse/fine pointer
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsPointerDevice(mediaQuery.matches);

    const handlePointerTypeChange = (e: MediaQueryListEvent) => {
      setIsPointerDevice(e.matches);
    };
    mediaQuery.addEventListener("change", handlePointerTypeChange);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      mediaQuery.removeEventListener("change", handlePointerTypeChange);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, dotX, dotY, isVisible]);

  if (!isPointerDevice || !isVisible) return null;

  const variants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: "rgba(255, 216, 229, 0.4)",
      borderColor: "rgba(232, 93, 136, 0.5)",
      borderWidth: "1.5px",
      scale: 1,
    },
    hover: {
      width: 56,
      height: 56,
      backgroundColor: "rgba(202, 225, 233, 0.5)",
      borderColor: "rgba(74, 143, 231, 0.8)",
      borderWidth: "1.5px",
      scale: 1.15,
    },
    button: {
      width: 48,
      height: 48,
      backgroundColor: "rgba(255, 233, 183, 0.6)",
      borderColor: "rgba(245, 158, 11, 0.8)",
      borderWidth: "2px",
      scale: 1.1,
    },
    project: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(42, 39, 51, 0.92)",
      borderColor: "#FFD8E5",
      borderWidth: "2px",
      scale: 1,
    },
  };

  const currentVariant = variants[cursorVariant as keyof typeof variants] || variants.default;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Marshmallow Ring / Blob */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center backdrop-blur-[2px] transition-colors duration-200"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={currentVariant}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        {cursorVariant === "project" && (
          <span className="text-[11px] font-bold tracking-wider text-[#FFE9B7] uppercase font-display">
            {cursorText || "View ↗"}
          </span>
        )}
      </motion.div>

      {/* Tiny Core Dot */}
      {cursorVariant !== "project" && (
        <motion.div
          className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#E85D88]"
          style={{
            x: dotX,
            y: dotY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      )}
    </div>
  );
}
