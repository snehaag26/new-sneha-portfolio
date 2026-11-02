"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";

// Theme Context
type Theme = "light" | "dark";
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});
export const useTheme = () => useContext(ThemeContext);

// Cursor Context
interface CursorContextType {
  cursorVariant: string;
  cursorText: string;
  setCursorVariant: (variant: string, text?: string) => void;
  resetCursor: () => void;
}
const CursorContext = createContext<CursorContextType>({
  cursorVariant: "default",
  cursorText: "",
  setCursorVariant: () => {},
  resetCursor: () => {},
});
export const useCursor = () => useContext(CursorContext);

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [cursorVariant, setVariant] = useState<string>("default");
  const [cursorText, setCursorText] = useState<string>("");

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("sneha-portfolio-theme") as Theme | null;
    const initial = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("sneha-portfolio-theme", next);
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  // Lenis Smooth Scroll
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const setCursorVariant = (variant: string, text: string = "") => {
    setVariant(variant);
    setCursorText(text);
  };

  const resetCursor = () => {
    setVariant("default");
    setCursorText("");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <CursorContext.Provider
        value={{ cursorVariant, cursorText, setCursorVariant, resetCursor }}
      >
        {children}
      </CursorContext.Provider>
    </ThemeContext.Provider>
  );
}
