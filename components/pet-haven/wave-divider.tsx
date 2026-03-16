"use client"

/**
 * Unique wave path definitions. Each produces a distinct shape.
 * viewBox 0 0 1200 100 - paths span full width, height ~100 for curves.
 */
const WAVE_PATHS: Record<string, string> = {
  // Standalone / transition shapes - each unique
  newArrivalsTop:
    "M0,50 C150,20 250,80 400,50 C550,20 650,80 800,50 C950,20 1050,80 1200,50 L1200,100 L0,100 Z",
  transitionPeach:
    "M0,60 C120,30 280,90 400,55 C520,25 680,85 800,50 C920,15 1080,75 1200,45 L1200,100 L0,100 Z",
  catSuppliesBottom:
    "M0,40 C100,70 200,30 350,55 C500,80 600,35 750,60 C900,85 1000,40 1200,65 L1200,100 L0,100 Z",
  dogSuppliesTop:
    "M0,55 C180,25 320,85 500,50 C680,15 820,75 1000,40 C1150,70 1200,50 1200,50 L1200,0 L0,0 Z",
  transitionCream:
    "M0,50 C80,80 220,35 400,60 C580,85 720,40 900,65 C1050,90 1200,55 1200,55 L1200,100 L0,100 Z",
  transitionSage:
    "M0,45 C130,15 270,75 450,45 C630,15 770,75 950,45 C1100,20 1200,40 1200,40 L1200,100 L0,100 Z",
  newsletterBottom:
    "M0,65 C150,35 300,95 450,60 C600,25 750,85 900,55 C1050,25 1200,70 1200,70 L1200,100 L0,100 Z",
}

export interface WaveDividerProps {
  /** Fill color (hex, rgb, or CSS variable) */
  fill: string
  /** "top" = wave at top of section (curves down), "bottom" = wave at bottom (curves up) */
  variant: "top" | "bottom"
  /** Unique shape key from WAVE_PATHS */
  shapeId: keyof typeof WAVE_PATHS
  /** Drift direction */
  direction: "left" | "right"
  /** Animation duration in seconds (5–9) */
  duration: number
  /** Optional className */
  className?: string
}

export function WaveDivider({
  fill,
  variant,
  shapeId,
  direction,
  duration,
  className = "",
}: WaveDividerProps) {
  const pathData = WAVE_PATHS[shapeId]
  if (!pathData) return null

  const driftClass = direction === "left" ? "animate-wave-drift-left" : "animate-wave-drift-right"

  // Paths with curve at top (L1200,100 L0,100 Z) are for bottom waves.
  // For top waves we flip them so the curve is at bottom (wave dips down).
  // dogSuppliesTop has curve at top, flat at bottom - designed for top placement as-is.
  const needsFlip =
    variant === "top" &&
    shapeId !== "dogSuppliesTop"

  return (
    <div
      className={`absolute left-0 right-0 w-full overflow-hidden pointer-events-none ${className}`}
      style={{
        [variant === "top" ? "top" : "bottom"]: 0,
        height: "80px",
        lineHeight: 0,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        className={`block w-full h-full ${driftClass}`}
        style={{
          animationDuration: `${duration}s`,
        }}
        aria-hidden="true"
      >
        <path
          d={pathData}
          fill={fill}
          transform={needsFlip ? "scale(1, -1) translate(0, 100)" : undefined}
        />
      </svg>
    </div>
  )
}
