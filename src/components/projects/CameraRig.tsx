"use client";

import React from "react";

interface CameraRigProps {
  children: React.ReactNode;
  tx: number;
  ty: number;
  scale: number;
  isIntro: boolean;
  prefersReducedMotion: boolean;
}

export const CameraRig: React.FC<CameraRigProps> = ({
  children,
  tx,
  ty,
  scale,
  isIntro,
  prefersReducedMotion,
}) => {
  const transition = prefersReducedMotion
    ? "none"
    : isIntro
    ? "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease"
    : "transform 1.2s cubic-bezier(0.65, 0, 0.35, 1)";

  return (
    <div
      className="absolute left-1/2 top-1/2 will-change-transform pointer-events-auto"
      style={{
        transform: `translate3d(-50%, -50%, 0) translate3d(${tx}px, ${ty}px, 0px) scale(${scale})`,
        transformOrigin: "center center",
        transition,
      }}
    >
      {children}
    </div>
  );
};
