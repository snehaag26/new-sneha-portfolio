"use client";

import React, { forwardRef } from "react";

interface RoadMarkerProps {
  className?: string;
  scale?: number;
}

/**
 * An elevated miniature paper airplane marker that glides along the winding road.
 * Rotates and travels smoothly along the SVG path via GSAP MotionPath.
 */
export const RoadMarker = forwardRef<SVGGElement, RoadMarkerProps>(
  ({ className = "", scale = 1.4 }, ref) => {
    return (
      <g
        ref={ref}
        id="road-marker"
        className={`pointer-events-none select-none ${className}`}
        style={{ transformOrigin: "center center" }}
      >
        <g transform={`scale(${scale})`}>
          {/* Ambient soft glow under the paper plane */}
          <circle
            cx="0"
            cy="0"
            r="28"
            fill="url(#markerGlow)"
            opacity="0.8"
          />

          {/* Contact drop shadow under plane for 3D flight elevation */}
          <ellipse
            cx="0"
            cy="14"
            rx="18"
            ry="7"
            fill="rgba(42, 39, 51, 0.22)"
            filter="blur(5px)"
          />

          {/* Paper Plane Silhouette (pointed along +X axis for autoRotate: 0) */}
          {/* Left wing (shaded butter pastel) */}
          <polygon
            points="24,0 -18,-15 -7,0"
            fill="#FFE9B7"
            stroke="#E8D19F"
            strokeWidth="0.8"
          />
          {/* Right wing (lit cream pastel) */}
          <polygon
            points="24,0 -7,0 -18,15"
            fill="#FFF6DE"
            stroke="#E8D19F"
            strokeWidth="0.8"
          />
          {/* Central spine fold (blush pink accent) */}
          <polygon
            points="24,0 -18,-5 -7,0"
            fill="#FFD8E5"
            opacity="0.95"
          />
          <polygon
            points="24,0 -7,0 -18,5"
            fill="#FFB9CF"
            opacity="0.95"
          />

          {/* Jet trail pulse particle at rear */}
          <circle cx="-18" cy="0" r="3.5" fill="#FF8AB2">
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur="1.1s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="2.5;5;2.5"
              dur="1.1s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Front nose cockpit sparkle */}
          <circle cx="24" cy="0" r="2" fill="#FFFFFF" />
        </g>
      </g>
    );
  }
);

RoadMarker.displayName = "RoadMarker";
