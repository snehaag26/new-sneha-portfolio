"use client";

import React from "react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/Icons";
import { socialLinks } from "@/data/site";
import { useCursor } from "./Providers";

interface SocialIconRowProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function SocialIconRow({ className = "", size = "md" }: SocialIconRowProps) {
  const { setCursorVariant, resetCursor } = useCursor();

  const sizeClasses = {
    sm: "w-9 h-9",
    md: "w-11 h-11",
    lg: "w-13 h-13",
  };

  const iconClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const getIcon = (name: string, iconCls: string) => {
    switch (name) {
      case "GitHub":
        return <GithubIcon className={iconCls} />;
      case "LinkedIn":
        return <LinkedinIcon className={iconCls} />;
      case "Instagram":
        return <InstagramIcon className={iconCls} />;
      case "Email":
        return <Mail className={iconCls} />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map((item) => {
        const isEmail = item.name === "Email";
        return (
          <a
            key={item.name}
            href={item.url}
            target={isEmail ? undefined : "_blank"}
            rel={isEmail ? undefined : "noopener noreferrer"}
            aria-label={item.label}
            title={item.label}
            onMouseEnter={() => setCursorVariant("button")}
            onMouseLeave={resetCursor}
            className={`group relative ${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8557F] shadow-sm select-none hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(232,85,127,0.25)] active:translate-y-0`}
            style={{
              backgroundColor: item.color,
              color: "#1E1B2E",
              border: "1px solid rgba(30, 27, 46, 0.08)",
            }}
          >
            {getIcon(item.name, iconClasses[size])}

            {/* Accessible tooltip on hover */}
            <span
              role="tooltip"
              className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wider opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 whitespace-nowrap shadow-md z-30"
              style={{
                backgroundColor: "var(--pill-active-bg)",
                color: "var(--pill-active-text)",
              }}
            >
              {item.name}
            </span>
          </a>
        );
      })}
    </div>
  );
}
