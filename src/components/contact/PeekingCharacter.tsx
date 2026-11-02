"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

interface PeekingCharacterProps {
  isSuccess?: boolean;
}

export function PeekingCharacter({ isSuccess = false }: PeekingCharacterProps) {
  const [imageError, setImageError] = useState(false);

  return (
    /*
     * Outer wrapper: 320×300 px centered, NO background, NO border.
     * overflow:visible so heart/sparkle can peek outside.
     * The form card sits with -mt-10 (overlaps bottom 40px) → chin effect.
     */
    <div className="relative w-[320px] h-[300px] mx-auto select-none pointer-events-none overflow-visible">

      {/* ---------------------------------------------------------------- */}
      {/* HEART – top-right, outside the face                              */}
      {/* ---------------------------------------------------------------- */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5, ease: "backOut" }}
        className="absolute -top-1 right-2 z-30"
      >
        <motion.div
          animate={{ y: [-3, 3, -3], rotate: [0, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-7 h-7 rounded-full bg-[#FFD8E5] dark:bg-[#FF8AB2]/30 border border-white/60 dark:border-white/20 shadow-xs flex items-center justify-center"
        >
          <Heart className="w-3.5 h-3.5 text-[#E85D88] fill-[#E85D88]" />
        </motion.div>
      </motion.div>

      {/* ---------------------------------------------------------------- */}
      {/* SPARKLE – left side, outside the face                            */}
      {/* ---------------------------------------------------------------- */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.95, duration: 0.5, ease: "backOut" }}
        className="absolute top-6 left-2 z-30"
      >
        <motion.div
          animate={{ y: [3, -3, 3], rotate: [0, -10, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-6 rounded-full bg-[#FFE9B7] dark:bg-[#FFE9B7]/30 border border-white/60 dark:border-white/20 shadow-xs flex items-center justify-center"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
        </motion.div>
      </motion.div>

      {/* ---------------------------------------------------------------- */}
      {/* CHARACTER IMAGE                                                   */}
      {/*                                                                   */}
      {/* PNG has cream studio bg (~#F7EDE3). Removed via two techniques    */}
      {/* applied DIRECTLY on the <Image> element:                          */}
      {/*  1. mix-blend-mode: multiply  → cream merges with light page bg   */}
      {/*  2. radial ellipse mask       → hard edges fade to transparent     */}
      {/*                                                                   */}
      {/* object-position: 50% 8%  frames the head, hair, glasses and       */}
      {/* shoulders at natural cover scale (no extra zoom needed):          */}
      {/*   scale = 320/576 ≈ 0.556 → rendered height ≈ 569px              */}
      {/*   top offset = (569-300) × 0.08 ≈ 21px → shows img y 38–578      */}
      {/*   (hair starts y≈65, chin ≈ y450 → all visible, centred) ✓       */}
      {/* ---------------------------------------------------------------- */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: isSuccess ? [-10, 0, -6, 0] : 0, opacity: 1 }}
        transition={{
          y: isSuccess
            ? { duration: 0.8, ease: "easeInOut" }
            : { type: "spring", stiffness: 180, damping: 18, delay: 0.25 },
          opacity: { duration: 0.5, delay: 0.2 },
        }}
      >
        {/* Idle float + gentle head-tilt */}
        <motion.div
          animate={{ y: [0, -6, 0], rotate: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut" }}
        >
          {!imageError ? (
            /*
             * inner div is exactly 320×300 and clips the bottom bleed.
             * overflow-hidden here (not on outer) so decorations stay visible.
             */
            <div className="relative w-[320px] h-[300px] overflow-hidden">
              <Image
                src="/contact/sneha-doll.png"
                alt="Sneha 3D Doll Avatar"
                fill
                priority
                sizes="320px"
                className="object-cover"
                style={{
                  objectPosition: "50% 8%",
                  /* Blend cream background away on the light card surface */
                  mixBlendMode: "multiply",
                  /* Radial ellipse mask – opaque on face, transparent at edges */
                  maskImage:
                    "radial-gradient(ellipse 65% 75% at 50% 45%, black 55%, transparent 90%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 65% 75% at 50% 45%, black 55%, transparent 90%)",
                }}
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            /* Fallback initials avatar */
            <div className="w-[320px] h-[300px] flex items-center justify-center">
              <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-[#FFE9B7] via-[#FFD8E5] to-[#CAE1E9] border-4 border-white shadow-lg flex items-center justify-center">
                <span className="font-serif text-5xl font-bold text-[#2A2733]">
                  S
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* ---------------------------------------------------------------- */}
      {/* SOFT CONTACT SHADOW on card top edge (under the chin)            */}
      {/* ---------------------------------------------------------------- */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-44 h-3 rounded-full bg-[#2A2733]/15 dark:bg-black/35 blur-sm pointer-events-none z-10" />
    </div>
  );
}
