"use client";

interface HubRoadsProps {
  isRevealed: boolean;
  prefersReduced: boolean;
}

export function HubRoads({ isRevealed, prefersReduced }: HubRoadsProps) {
  // Road paths connecting Hub exits to building platforms
  const paths = {
    pink: "M 440 310 C 405 270, 375 235, 355 195",
    yellow: "M 560 310 C 595 270, 625 235, 645 195",
    blue: "M 500 470 C 500 500, 550 525, 565 555",
  };

  // Approximate path lengths for stroke-dashoffset reveal
  const pinkLen = 170;
  const yellowLen = 170;
  const blueLen = 120;

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <svg
        viewBox="0 0 1000 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* ========================================================
            1. PINK ROAD (Hub -> Pink School Platform)
        ======================================================== */}
        <g id="road-pink">
          {/* Edge Glow */}
          <path
            d={paths.pink}
            stroke="#FF8AB2"
            strokeWidth={58}
            strokeLinecap="round"
            opacity={0.3}
          />
          {/* Charcoal Asphalt */}
          <path
            d={paths.pink}
            stroke="#2A2733"
            strokeWidth={54}
            strokeLinecap="round"
            style={{
              strokeDasharray: pinkLen,
              strokeDashoffset: isRevealed || prefersReduced ? 0 : pinkLen,
              transition: prefersReduced ? "none" : "stroke-dashoffset 0.6s ease-out 0.3s",
            }}
          />
          {/* White Dashed Center Line */}
          <path
            d={paths.pink}
            stroke="white"
            strokeWidth={2.5}
            strokeDasharray="10 8"
            strokeLinecap="round"
            opacity={0.9}
            style={{
              strokeDasharray: isRevealed || prefersReduced ? "10 8" : `${pinkLen}`,
              strokeDashoffset: isRevealed || prefersReduced ? 0 : pinkLen,
              transition: prefersReduced ? "none" : "stroke-dashoffset 0.6s ease-out 0.35s",
            }}
          />
          {/* 1 Traffic Dot */}
          {!prefersReduced && (
            <circle r={3.5} fill="#FFFFFF">
              <animateMotion
                path={paths.pink}
                dur="3.8s"
                repeatCount="indefinite"
                keyPoints="0;1"
                keyTimes="0;1"
              />
            </circle>
          )}
        </g>

        {/* ========================================================
            2. YELLOW ROAD (Hub -> Yellow School Platform)
        ======================================================== */}
        <g id="road-yellow">
          {/* Edge Glow */}
          <path
            d={paths.yellow}
            stroke="#FBBF24"
            strokeWidth={58}
            strokeLinecap="round"
            opacity={0.3}
          />
          {/* Charcoal Asphalt */}
          <path
            d={paths.yellow}
            stroke="#2A2733"
            strokeWidth={54}
            strokeLinecap="round"
            style={{
              strokeDasharray: yellowLen,
              strokeDashoffset: isRevealed || prefersReduced ? 0 : yellowLen,
              transition: prefersReduced ? "none" : "stroke-dashoffset 0.6s ease-out 0.45s",
            }}
          />
          {/* White Dashed Center Line */}
          <path
            d={paths.yellow}
            stroke="white"
            strokeWidth={2.5}
            strokeDasharray="10 8"
            strokeLinecap="round"
            opacity={0.9}
            style={{
              strokeDasharray: isRevealed || prefersReduced ? "10 8" : `${yellowLen}`,
              strokeDashoffset: isRevealed || prefersReduced ? 0 : yellowLen,
              transition: prefersReduced ? "none" : "stroke-dashoffset 0.6s ease-out 0.5s",
            }}
          />
          {/* 1 Traffic Dot */}
          {!prefersReduced && (
            <circle r={3.5} fill="#FFFFFF">
              <animateMotion
                path={paths.yellow}
                dur="4.2s"
                repeatCount="indefinite"
                keyPoints="0;1"
                keyTimes="0;1"
              />
            </circle>
          )}
        </g>

        {/* ========================================================
            3. BLUE ROAD (Hub -> Blue Campus Platform)
        ======================================================== */}
        <g id="road-blue">
          {/* Edge Glow */}
          <path
            d={paths.blue}
            stroke="#60A5FA"
            strokeWidth={58}
            strokeLinecap="round"
            opacity={0.3}
          />
          {/* Charcoal Asphalt */}
          <path
            d={paths.blue}
            stroke="#2A2733"
            strokeWidth={54}
            strokeLinecap="round"
            style={{
              strokeDasharray: blueLen,
              strokeDashoffset: isRevealed || prefersReduced ? 0 : blueLen,
              transition: prefersReduced ? "none" : "stroke-dashoffset 0.6s ease-out 0.6s",
            }}
          />
          {/* White Dashed Center Line */}
          <path
            d={paths.blue}
            stroke="white"
            strokeWidth={2.5}
            strokeDasharray="10 8"
            strokeLinecap="round"
            opacity={0.9}
            style={{
              strokeDasharray: isRevealed || prefersReduced ? "10 8" : `${blueLen}`,
              strokeDashoffset: isRevealed || prefersReduced ? 0 : blueLen,
              transition: prefersReduced ? "none" : "stroke-dashoffset 0.6s ease-out 0.65s",
            }}
          />
          {/* 1 Traffic Dot */}
          {!prefersReduced && (
            <circle r={3.5} fill="#FFFFFF">
              <animateMotion
                path={paths.blue}
                dur="3.2s"
                repeatCount="indefinite"
                keyPoints="0;1"
                keyTimes="0;1"
              />
            </circle>
          )}
        </g>
      </svg>
    </div>
  );
}
