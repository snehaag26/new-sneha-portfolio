"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";
import { ClayButton } from "./ClayButton";

interface SuccessStateProps {
  onReset: () => void;
}

export function SuccessState({ onReset }: SuccessStateProps) {
  useEffect(() => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.65 },
        colors: ["#FFE9B7", "#FFD8E5", "#CAE1E9", "#E85D88"],
      });
    } catch {
      // ignore
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: "backOut" }}
      className="py-8 px-4 text-center space-y-6"
    >
      {/* Bouncing Checkmark Badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.25, 1] }}
        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.15 }}
        className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#FFE9B7] via-[#FFD8E5] to-[#CAE1E9] border-2 border-white shadow-md flex items-center justify-center relative"
      >
        <Check className="w-10 h-10 text-[#2A2733] stroke-[2.5]" />
        
        {/* Little floating celebration sparkles */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -right-1"
        >
          <Sparkles className="w-5 h-5 text-[#E85D88]" />
        </motion.div>
      </motion.div>

      {/* Success Heading */}
      <div className="space-y-2">
        <h3 className="font-serif text-3xl sm:text-4xl text-[#2A2733] dark:text-[#F5F3FB] leading-tight">
          Message Sent!
        </h3>
        <p className="text-sm sm:text-base text-[#5E5B6E] dark:text-[#A3A0B5] max-w-sm mx-auto leading-relaxed">
          Thank you for reaching out. I'll get back to you as soon as possible.
        </p>
      </div>

      {/* Reset button */}
      <div className="pt-2">
        <ClayButton
          variant="secondary"
          onClick={onReset}
          className="mx-auto px-6 py-2.5 text-xs font-semibold tracking-wider uppercase flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Send Another</span>
        </ClayButton>
      </div>
    </motion.div>
  );
}
