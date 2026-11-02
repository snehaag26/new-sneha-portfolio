"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import { experienceStops } from "@/data/experience";
import { RoadMarker } from "./RoadMarker";
import { RoadNode } from "./RoadNode";
import { ExperienceCard } from "./ExperienceCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

interface NodeCoord {
  x: number;
  y: number;
  cardX: number;
  cardY: number;
  deltaX: number;
  align: "left" | "right";
}

export function JourneyRoad() {
  const containerRef = useRef<HTMLDivElement>(null);
  const roadPathRef = useRef<SVGPathElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const markerRef = useRef<SVGGElement>(null);

  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const nodeRefs = useRef<(SVGGElement | null)[]>([]);
  const rippleRefs = useRef<(SVGCircleElement | null)[]>([]);
  const connectorRefs = useRef<(SVGPathElement | null)[]>([]);

  const [isMobile, setIsMobile] = useState(false);
  const [totalHeight, setTotalHeight] = useState(4400);
  const [containerWidth, setContainerWidth] = useState(1400);
  const [coords, setCoords] = useState<NodeCoord[]>([]);
  const [pathD, setPathD] = useState("");

  // Measure row centers and compute dramatic S-curve path
  const updateLayout = useCallback(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRef.current.offsetHeight;
    const mobile = width < 1024;

    setIsMobile(mobile);
    setContainerWidth(width);
    setTotalHeight(height);

    const newCoords: NodeCoord[] = [];

    experienceStops.forEach((stop, index) => {
      const rowEl = rowRefs.current[index];
      let y = 350 + index * 820;

      if (rowEl) {
        const rowRect = rowEl.getBoundingClientRect();
        y = rowRect.top - containerRect.top + rowRect.height / 2;
      }

      if (mobile) {
        // Mobile: Road is at x = 44px, cards begin at x = 84px
        const nodeX = 44;
        const cardX = 84;
        newCoords.push({
          x: nodeX,
          y,
          cardX,
          cardY: y,
          deltaX: nodeX - cardX, // -40px
          align: "right",
        });
      } else {
        // Desktop: S-curve sweeping ~32% to each side of center (50%)
        // Left cards: road sweeps right to 67.5% of width
        // Right cards: road sweeps left to 32.5% of width
        // Finish card: road comes to 50% center, card on right
        const isLeftCard = index % 2 === 0 && !stop.isFinish;
        let nodeX = width * 0.5;
        let cardX = width * 0.5;
        let align: "left" | "right" = "left";

        if (stop.isFinish) {
          nodeX = width * 0.5;
          cardX = width * 0.725 + 16;
          align = "right";
        } else if (isLeftCard) {
          nodeX = width * 0.675;
          cardX = width * 0.38 - 16;
          align = "left";
        } else {
          nodeX = width * 0.325;
          cardX = width * 0.62 + 16;
          align = "right";
        }

        const deltaX = nodeX - cardX;

        newCoords.push({
          x: nodeX,
          y,
          cardX,
          cardY: y,
          deltaX,
          align,
        });
      }
    });

    setCoords(newCoords);

    // Build smooth, dramatic cubic bezier S-curve path
    if (newCoords.length > 0) {
      let d = `M ${newCoords[0].x} 0 L ${newCoords[0].x} ${newCoords[0].y}`;

      for (let i = 0; i < newCoords.length - 1; i++) {
        const curr = newCoords[i];
        const next = newCoords[i + 1];
        const dy = next.y - curr.y;
        const cpY1 = curr.y + dy * 0.5;
        const cpY2 = next.y - dy * 0.5;

        d += ` C ${curr.x} ${cpY1}, ${next.x} ${cpY2}, ${next.x} ${next.y}`;
      }

      const last = newCoords[newCoords.length - 1];
      d += ` L ${last.x} ${height}`;

      setPathD(d);
    }
  }, []);

  // Update layout on mount and window resize
  useEffect(() => {
    updateLayout();

    const handleResize = () => {
      updateLayout();
    };

    window.addEventListener("resize", handleResize);
    const timeout = setTimeout(updateLayout, 300);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, [updateLayout]);

  // Master Scroll & Dot-First Card Reveal Animations
  useEffect(() => {
    if (!pathD || !containerRef.current || coords.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Reduced motion fallback: show all rectangular boxes immediately
    if (prefersReducedMotion) {
      cardRefs.current.forEach((cardEl) => {
        if (!cardEl) return;
        gsap.set(cardEl, { x: 0, scale: 1, opacity: 1, pointerEvents: "auto" });
        const children = cardEl.querySelectorAll("[data-card-reveal]");
        gsap.set(children, { opacity: 1, y: 0 });
      });
      connectorRefs.current.forEach((connEl) => {
        if (!connEl) return;
        gsap.set(connEl, { strokeDashoffset: 0, opacity: 1 });
      });
      nodeRefs.current.forEach((nodeEl) => {
        if (!nodeEl) return;
        gsap.set(nodeEl, { opacity: 1 });
      });
      if (progressPathRef.current) {
        gsap.set(progressPathRef.current, { strokeDashoffset: 0 });
      }
      return;
    }

    let ctx: gsap.Context | null = null;

    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      ctx = gsap.context(() => {
        // ------------------------------------------------------------
        // 1. MASTER ROAD PROGRESS & PAPER AIRPLANE MARKER
        // ------------------------------------------------------------
        const pathEl = progressPathRef.current;
        if (pathEl && markerRef.current) {
          const pathLength = pathEl.getTotalLength();
          if (!isNaN(pathLength) && pathLength > 0) {
            gsap.set(pathEl, {
              strokeDasharray: pathLength,
              strokeDashoffset: pathLength,
            });

            const roadTl = gsap.timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 30%",
                end: "bottom 90%",
                scrub: 1.2,
              },
            });

            roadTl.to(
              pathEl,
              {
                strokeDashoffset: 0,
                ease: "none",
                duration: 1,
              },
              0
            );

            roadTl.to(
              markerRef.current,
              {
                motionPath: {
                  path: pathEl,
                  align: pathEl,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: true,
                },
                ease: "none",
                duration: 1,
              },
              0
            );
          }
        }

        // ------------------------------------------------------------
        // 2. DOT FIRST -> REVEAL ON SCROLL FOR EACH STOP
        // ------------------------------------------------------------
        coords.forEach((coord, index) => {
          const rowEl = rowRefs.current[index];
          const cardEl = cardRefs.current[index];
          const nodeEl = nodeRefs.current[index];
          const rippleEl = rippleRefs.current[index];
          const connEl = connectorRefs.current[index];

          if (!rowEl || !cardEl) return;

          // Initial state: Card is literally inside the dot (shifted by deltaX, scale 0, opacity 0)
          gsap.set(cardEl, {
            x: coord.deltaX,
            scale: 0,
            opacity: 0,
            pointerEvents: "none",
          });

          const children = cardEl.querySelectorAll("[data-card-reveal]");
          gsap.set(children, {
            opacity: 0,
            y: 16,
          });

          // Upcoming node starts dimmed to 40%
          if (nodeEl) {
            gsap.set(nodeEl, { opacity: 0.4 });
          }

          // Connector line starts hidden & un-drawn
          let connLength = 240;
          if (connEl && connEl.getTotalLength) {
            connLength = connEl.getTotalLength() || 240;
            gsap.set(connEl, {
              strokeDasharray: connLength,
              strokeDashoffset: connLength,
              opacity: 0,
            });
          }

          // Reveal animation triggers on scroll:
          // Row 0 uses "center 55%" so it stays in dot initially until user scrolls
          // Other rows trigger as they scroll into center of screen
          const scrollStart = index === 0 ? "center 55%" : "center 65%";

          const revealTl = gsap.timeline({
            scrollTrigger: {
              trigger: rowEl,
              start: scrollStart,
              toggleActions: "play none none none",
              once: true,
            },
          });

          // Step 1: Node pulses and lights to 100% with ripple
          if (nodeEl) {
            revealTl.to(nodeEl, {
              opacity: 1,
              duration: 0.35,
              ease: "power2.out",
            });
          }

          if (rippleEl) {
            revealTl.fromTo(
              rippleEl,
              { scale: 0.8, opacity: 0 },
              {
                scale: 1.8,
                opacity: 0.85,
                duration: 0.55,
                ease: "back.out(2)",
              },
              0
            );
          }

          // Step 2: Connector line draws from dot toward the card
          if (connEl) {
            revealTl.to(
              connEl,
              {
                strokeDashoffset: 0,
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
              },
              0.15
            );
          }

          // Step 3: Rectangular card expands out directly from the dot
          // animates x from deltaX to 0, scale from 0 to 1, opacity from 0 to 1
          revealTl.to(
            cardEl,
            {
              x: 0,
              scale: 1,
              opacity: 1,
              duration: 0.85,
              ease: "power3.out",
              onStart: () => {
                gsap.set(cardEl, { pointerEvents: "auto" });
              },
            },
            0.3
          );

          // Step 4: Stagger reveal inside the rectangular card
          if (children && children.length > 0) {
            revealTl.to(
              children,
              {
                opacity: 1,
                y: 0,
                duration: 0.45,
                stagger: 0.08,
                ease: "power2.out",
              },
              0.55
            );
          }
        });
      }, containerRef);
    }, 160);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, [pathD, coords]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1400px] mx-auto select-none"
      aria-label="Winding road experience stops"
    >
      {/* ============================================================ */}
      {/* WIDE 3D ROAD SVG OVERLAY (~160px desktop width)              */}
      {/* ============================================================ */}
      {pathD && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          viewBox={`0 0 ${containerWidth || 1400} ${totalHeight || 4400}`}
        >
          <defs>
            {/* Pastel Road Deck Gradient */}
            <linearGradient
              id="roadSurfaceGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FFE9B7" />
              <stop offset="25%" stopColor="#FFD8E5" />
              <stop offset="50%" stopColor="#CAE1E9" />
              <stop offset="75%" stopColor="#FFE9B7" />
              <stop offset="100%" stopColor="#FFD8E5" />
            </linearGradient>

            {/* Glowing Scroll Progress Gradient */}
            <linearGradient
              id="progressFillGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#E85D88" />
              <stop offset="40%" stopColor="#FF8AB2" />
              <stop offset="80%" stopColor="#4A8FE7" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>

            {/* Marker Radial Glow */}
            <radialGradient id="markerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF8AB2" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#FFE9B7" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FFE9B7" stopOpacity="0" />
            </radialGradient>

            {/* Elevated Bridge Deep Drop Shadow */}
            <filter
              id="bridgeShadow"
              x="-20%"
              y="-10%"
              width="140%"
              height="120%"
            >
              <feDropShadow
                dx="0"
                dy="20"
                stdDeviation="18"
                floodColor="#2A2733"
                floodOpacity="0.10"
              />
            </filter>
          </defs>

          {/* LAYER 1: Deep Bridge Contact Drop Shadow (~195px on desktop) */}
          <path
            d={pathD}
            fill="none"
            stroke="rgba(42, 39, 51, 0.09)"
            strokeWidth={isMobile ? "22" : "195"}
            strokeLinecap="round"
            filter="url(#bridgeShadow)"
          />

          {/* LAYER 2: 3D Concrete Sidewall Thickness (Shifted down for 3D bridge edge) */}
          <path
            d={pathD}
            fill="none"
            stroke="rgba(216, 210, 197, 0.95)"
            strokeWidth={isMobile ? "18" : "175"}
            strokeLinecap="round"
            transform="translate(0, 12)"
            className="dark:stroke-[#232030]"
          />

          {/* LAYER 3: White Guard-Rail Base (~164px on desktop) */}
          <path
            d={pathD}
            fill="none"
            stroke="rgba(255, 255, 255, 0.95)"
            strokeWidth={isMobile ? "16" : "164"}
            strokeLinecap="round"
            className="dark:stroke-white/30"
          />

          {/* LAYER 4: Top Pastel Road Deck Surface (~144px on desktop) */}
          <path
            ref={roadPathRef}
            d={pathD}
            fill="none"
            stroke="url(#roadSurfaceGradient)"
            strokeWidth={isMobile ? "13" : "144"}
            strokeLinecap="round"
          />

          {/* LAYER 5: Guard-Rail Crisp Edge Lines */}
          <path
            d={pathD}
            fill="none"
            stroke="rgba(255, 255, 255, 0.85)"
            strokeWidth={isMobile ? "1.5" : "4"}
            strokeLinecap="round"
            className="dark:stroke-white/50"
          />

          {/* LAYER 6: Dashed Center Lane Divider */}
          <path
            d={pathD}
            fill="none"
            stroke="rgba(255, 255, 255, 0.95)"
            strokeWidth={isMobile ? "1.5" : "4"}
            strokeDasharray={isMobile ? "6 6" : "16 16"}
            strokeLinecap="round"
            className="dark:stroke-white/70"
          />

          {/* LAYER 7: Scroll-Scrubbed Glowing Progress Line */}
          <path
            ref={progressPathRef}
            d={pathD}
            fill="none"
            stroke="url(#progressFillGradient)"
            strokeWidth={isMobile ? "3.5" : "6"}
            strokeLinecap="round"
            opacity="0.95"
          />

          {/* LAYER 8: Road Nodes at each stop with connect lines */}
          {coords.map((coord, idx) => {
            const stop = experienceStops[idx];
            return (
              <RoadNode
                key={stop.id}
                x={coord.x}
                y={coord.y}
                step={stop.step}
                tag={stop.tag}
                tagColor={stop.tagColor}
                isFinish={stop.isFinish}
                connectorX={coord.cardX}
                connectorY={coord.cardY}
                nodeRef={{ current: nodeRefs.current[idx] }}
                rippleRef={{ current: rippleRefs.current[idx] }}
                connectorRef={{ current: connectorRefs.current[idx] }}
              />
            );
          })}

          {/* LAYER 9: Paper Airplane Marker Traveler (scaled 1.4x) */}
          <RoadMarker ref={markerRef} scale={isMobile ? 1.0 : 1.4} />
        </svg>
      )}

      {/* ============================================================ */}
      {/* STOP ROWS: min-height ~90vh on desktop, in-flow grid         */}
      {/* ============================================================ */}
      <ol className="relative list-none m-0 p-0 z-20 space-y-0">
        {experienceStops.map((stop, index) => {
          const isLeftCard = index % 2 === 0 && !stop.isFinish;
          const align = isLeftCard ? "left" : "right";

          return (
            <li
              key={stop.id}
              ref={(el) => {
                rowRefs.current[index] = el;
              }}
              className="w-full min-h-[65vh] lg:min-h-[90vh] flex items-center py-12 sm:py-16"
            >
              {/* MOBILE LAYOUT (<1024px): [Road 64px] [Card 1fr] */}
              <div className="w-full lg:hidden grid grid-cols-[64px_1fr] items-center gap-4 sm:gap-6">
                {/* Left empty spacer where road & node sit */}
                <div className="w-16" aria-hidden="true" />

                {/* Right Rectangular Card (expands directly from node) */}
                <div className="w-full flex justify-start">
                  <ExperienceCard
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    stop={stop}
                    index={index}
                    align="right"
                  />
                </div>
              </div>

              {/* DESKTOP LAYOUT (>=1024px): [Left Card Column 1fr] [Road Column 45%] [Right Card Column 1fr] */}
              <div className="w-full hidden lg:grid lg:grid-cols-[1fr_45%_1fr] items-center">
                {/* LEFT COLUMN: Rectangular Card sits here if isLeftCard */}
                <div className="w-full flex justify-end pr-10 xl:pr-14">
                  {isLeftCard ? (
                    <ExperienceCard
                      ref={(el) => {
                        cardRefs.current[index] = el;
                      }}
                      stop={stop}
                      index={index}
                      align="left"
                    />
                  ) : (
                    <div className="w-full max-w-[560px]" aria-hidden="true" />
                  )}
                </div>

                {/* CENTER ROAD COLUMN (45% width): Highway curves through here */}
                <div
                  className="w-full h-full flex items-center justify-center pointer-events-none relative"
                  aria-hidden="true"
                >
                  <div className="w-16 h-16" />
                </div>

                {/* RIGHT COLUMN: Rectangular Card sits here if not isLeftCard */}
                <div className="w-full flex justify-start pl-10 xl:pr-14">
                  {!isLeftCard ? (
                    <ExperienceCard
                      ref={(el) => {
                        cardRefs.current[index] = el;
                      }}
                      stop={stop}
                      index={index}
                      align="right"
                    />
                  ) : (
                    <div className="w-full max-w-[560px]" aria-hidden="true" />
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
