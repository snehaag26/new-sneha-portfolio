"use client";

import React, { forwardRef } from "react";

interface RoadNodeProps {
  x: number;
  y: number;
  step: string;
  tag: string;
  tagColor?: string;
  isFinish?: boolean;
  connectorX?: number;
  connectorY?: number;
  nodeRef?: React.RefObject<SVGGElement | null>;
  rippleRef?: React.RefObject<SVGCircleElement | null>;
  connectorRef?: React.RefObject<SVGPathElement | null>;
}

export function RoadNode({
  x,
  y,
  step,
  tagColor = "#FFE9B7",
  isFinish = false,
  connectorX,
  connectorY,
  nodeRef,
  rippleRef,
  connectorRef,
}: RoadNodeProps) {
  // Connector curve from node to card
  let connectorPath = "";
  if (connectorX !== undefined && connectorY !== undefined) {
    const midX = (x + connectorX) / 2;
    connectorPath = `M ${x} ${y} C ${midX} ${y}, ${midX} ${connectorY}, ${connectorX} ${connectorY}`;
  }

  return (
    <g className="road-node-group">
      {/* Connector line from node to card */}
      {connectorPath && (
        <path
          ref={connectorRef}
          d={connectorPath}
          fill="none"
          stroke={tagColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          className="road-connector"
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      )}

      {/* Main Node Group (scaled/pulsed on reveal) */}
      <g
        ref={nodeRef}
        className="road-node"
        style={{ transformOrigin: `${x}px ${y}px` }}
      >
        {/* Outer Ripple Wave */}
        <circle
          ref={rippleRef}
          cx={x}
          cy={y}
          r="30"
          fill="none"
          stroke={tagColor}
          strokeWidth="2"
          opacity="0"
          style={{ transformOrigin: `${x}px ${y}px` }}
        />

        {/* Ambient Soft Glow Disc */}
        <circle
          cx={x}
          cy={y}
          r="26"
          fill={tagColor}
          opacity="0.3"
          filter="blur(6px)"
        />

        {/* Main Node Outer Ring */}
        <circle
          cx={x}
          cy={y}
          r="20"
          fill={isFinish ? "#FFE9B7" : "#FFFFFF"}
          stroke={tagColor}
          strokeWidth="3"
          className="shadow-sm"
        />

        {/* Inner Core Disc */}
        <circle
          cx={x}
          cy={y}
          r="16"
          fill={isFinish ? "#2A2733" : "#2A2733"}
          opacity="0.95"
        />

        {/* Step Label in Center */}
        {isFinish ? (
          <text
            x={x}
            y={y + 5}
            textAnchor="middle"
            fill="#FFE9B7"
            fontSize="14"
            fontWeight="bold"
            fontFamily="var(--font-mono)"
          >
            ★
          </text>
        ) : (
          <text
            x={x}
            y={y + 4.5}
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="11"
            fontWeight="bold"
            fontFamily="var(--font-mono)"
            letterSpacing="0.05em"
          >
            {step}
          </text>
        )}
      </g>
    </g>
  );
}
