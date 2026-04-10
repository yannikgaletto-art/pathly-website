"use client";

/**
 * FeatureTabIcons — Vertical Stacked Glassmorphism (Left-Side Layout)
 * Glassmorphism icon tabs displayed vertically for the Features section.
 * 2 gestapelte Vierecke pro Karte (hinten solid, vorne frosted mit radial-gradient/noise).
 */

const TABS = [
  {
    id: "job-search",
    label: "Job Search",
    backColor: "bg-[#012e7a]",
    iconFill: "white",
    icon: (fill: string) => (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
        <circle cx="10.5" cy="10.5" r="7" fill={fill} />
        <path d="m20.5 20.5-4.5-4.5" stroke={fill} strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "cv-optimizer",
    label: "CV Optimizer",
    backColor: "bg-gray-400",
    iconFill: "white",
    icon: (fill: string) => (
      <svg width="36" height="36" viewBox="0 0 24 24" fill={fill}>
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
  },
  {
    id: "cover-letter",
    label: "Cover Letter",
    backColor: "bg-gray-900",
    iconFill: "white",
    icon: (fill: string) => (
      <svg width="36" height="36" viewBox="0 0 24 24" fill={fill}>
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
      </svg>
    ),
  },
  {
    id: "coaching",
    label: "Coaching",
    backColor: "bg-[#c7d8f0]",
    iconFill: "#012e7a",
    icon: (fill: string) => (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill={fill} />
        <circle cx="8" cy="11.5" r="1.5" fill="white" />
        <circle cx="12" cy="11.5" r="1.5" fill="white" />
        <circle cx="16" cy="11.5" r="1.5" fill="white" />
      </svg>
    ),
  },
] as const;

interface FeatureTabIconsProps {
  activeIndex: number;
  onTabChange: (index: number) => void;
}

export function FeatureTabIcons({ activeIndex, onTabChange }: FeatureTabIconsProps) {
  return (
    <div className="flex flex-col justify-between h-full" style={{ minHeight: 520 }}>
      {TABS.map((tab, i) => {
        const isActive = activeIndex === i;
        return (
          <div
            key={tab.id}
            onClick={() => onTabChange(i)}
            className={`
              group flex items-center gap-5 outline-none cursor-pointer
              rounded-2xl px-5 py-4 transition-all duration-300
              ${isActive
                ? "bg-white/80 shadow-md border border-border"
                : "bg-transparent hover:bg-white/40 border border-transparent"
              }
            `}
            role="tab"
            aria-selected={isActive}
          >
            {/* Stacked dual-card container (scaled down for vertical layout) */}
            <div className="relative w-[100px] h-[100px] shrink-0">
              
              {/* Back square — solid, top-right aligned */}
              <div
                className={`
                  absolute top-0 right-0 w-[80px] h-[80px] rounded-[1.25rem]
                  ${tab.backColor}
                  transition-transform duration-200 ease-out
                  group-hover:scale-105
                `}
              />

              {/* Front square — frosted glass, bottom-left aligned */}
              <div
                className={`
                  absolute bottom-0 left-0 w-[80px] h-[80px] rounded-[1.25rem]
                  backdrop-blur-md overflow-hidden flex items-center justify-center
                  border border-white/60 shadow-lg
                  transition-transform duration-200 ease-out
                  group-hover:scale-105 active:scale-95
                  ${isActive ? "ring-2 ring-offset-2 ring-offset-transparent ring-white/80" : ""}
                `}
              >
                {/* Radial white glow from bottom-left */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 0% 100%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.05) 100%)"
                  }}
                />
                
                {/* Noise overlay concentrated at bottom-left */}
                <div
                  className="absolute inset-0 opacity-[0.4] mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    WebkitMaskImage: 'radial-gradient(circle at 0% 100%, black 0%, transparent 60%)',
                    maskImage: 'radial-gradient(circle at 0% 100%, black 0%, transparent 60%)'
                  }}
                />
                
                {/* Icon */}
                <div className={`relative z-10 drop-shadow-sm transition-transform duration-200 ${isActive ? "scale-105" : ""}`}>
                  {tab.icon(tab.iconFill)}
                </div>
              </div>
            </div>

            {/* Label */}
            <span
              className={`
                text-[16px] tracking-tight transition-colors duration-300 whitespace-nowrap
                ${isActive
                  ? "font-semibold text-[#012e7a]"
                  : "font-normal text-gray-400 group-hover:text-gray-500"
                }
              `}
            >
              {tab.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
