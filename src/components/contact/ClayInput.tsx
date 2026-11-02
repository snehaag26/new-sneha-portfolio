"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface ClayInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  icon?: React.ReactNode;
  iconBgColor?: string;
  isTextArea?: boolean;
  rows?: number;
  required?: boolean;
}

export function ClayInput({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon,
  iconBgColor = "#FFE9B7",
  isTextArea = false,
  rows = 4,
  required = false,
}: ClayInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full space-y-1.5 text-left">
      {/* Label in JetBrains Mono 11px */}
      <div className="flex items-center justify-between px-2">
        <label
          htmlFor={id}
          className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#5E5B6E] dark:text-[#B5B2C5]"
        >
          {label} {required && <span className="text-[#E85D88]">*</span>}
        </label>
        {error && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9, y: -2 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium text-[#E85D88] bg-[#FFD8E5] dark:bg-[#FF8AB2]/25 border border-[#FF8AB2]/30"
          >
            {error}
          </motion.span>
        )}
      </div>

      {/* Puffy Inset Clay Container */}
      <div
        className={`relative flex items-center transition-all duration-200 bg-[#FBF8F2] dark:bg-[#252130] ${
          isTextArea ? "rounded-3xl items-start p-2" : "rounded-full px-2 py-1.5"
        } ${
          isFocused
            ? "border border-[#FF8AB2]/60 ring-2 ring-[#FF8AB2]/30 shadow-[inset_2px_2px_4px_rgba(42,39,51,0.06),inset_-1px_-1px_3px_rgba(255,255,255,0.9)]"
            : error
            ? "border border-[#E85D88]/50 ring-1 ring-[#FFD8E5] shadow-[inset_2px_2px_4px_rgba(42,39,51,0.05),inset_-1px_-1px_3px_rgba(255,255,255,0.8)]"
            : "border border-black/04 dark:border-white/05 shadow-[inset_2px_2px_5px_rgba(42,39,51,0.04),inset_-2px_-2px_4px_rgba(255,255,255,0.85)] dark:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.35),inset_-1px_-1px_2px_rgba(255,255,255,0.05)]"
        }`}
      >
        {/* Round Pastel Icon Bubble */}
        {icon && (
          <motion.div
            animate={isFocused ? { scale: [1, 1.12, 1], y: [0, -2, 0] } : {}}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border border-white/60 dark:border-white/10 shadow-xs ${
              isTextArea ? "mt-1.5 ml-1" : "ml-1"
            }`}
            style={{ backgroundColor: iconBgColor }}
          >
            {icon}
          </motion.div>
        )}

        {/* Input or Textarea */}
        {isTextArea ? (
          <textarea
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={rows}
            className="w-full bg-transparent px-3.5 py-2 text-sm text-[#2A2733] dark:text-[#F5F3FB] placeholder-[#8E8A9F] dark:placeholder-[#7D798E] focus:outline-none resize-none leading-relaxed"
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full bg-transparent px-3.5 py-2 text-sm text-[#2A2733] dark:text-[#F5F3FB] placeholder-[#8E8A9F] dark:placeholder-[#7D798E] focus:outline-none"
          />
        )}
      </div>
    </div>
  );
}
