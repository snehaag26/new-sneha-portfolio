"use client";

import { JourneyStage } from "./JourneyStage";

export function EducationPage() {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden pt-[140px] pb-24 px-4 sm:px-6 md:px-8">
      {/* Dark mode only: subtle tinted glows on top of dark body bg */}
      <div className="fixed inset-0 pointer-events-none -z-10 hidden [data-theme='dark']_&:block" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-radial from-[#FFD8E5]/10 to-transparent" />
        <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-radial from-[#CAE1E9]/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-radial from-[#FFE9B7]/10 to-transparent" />
      </div>

      {/* Main 3D Journey Stage */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto">
        <JourneyStage />
      </div>
    </div>
  );
}
