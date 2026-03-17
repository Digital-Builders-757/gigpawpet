const DEFAULT_PAW_COLOR = "rgba(46, 134, 181, 0.12)"

export function PawPattern({ className = "", color = DEFAULT_PAW_COLOR }: { className?: string; color?: string }) {
  const pawSvg = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main pad */}
      <ellipse cx="10" cy="14" rx="4" ry="4" fill={color} />
      {/* Toe pads */}
      <circle cx="6" cy="8" r="2" fill={color} />
      <circle cx="10" cy="5" r="2" fill={color} />
      <circle cx="14" cy="8" r="2" fill={color} />
      <circle cx="7" cy="11" r="1.5" fill={color} />
      <circle cx="13" cy="11" r="1.5" fill={color} />
    </svg>
  )

  const size = 20
  const spacing = 56
  const rows = 30
  const cols = 30
  const paws: React.ReactNode[] = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      paws.push(
        <div
          key={`${row}-${col}`}
          className="absolute"
          style={{
            left: col * spacing,
            top: row * spacing,
            width: size,
            height: size,
          }}
        >
          {pawSvg}
        </div>
      )
    }
  }

  const patternSize = cols * spacing

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden
    >
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: patternSize,
          height: patternSize,
          transform: "translate(-50%, -50%) rotate(-45deg)",
        }}
      >
        {paws}
      </div>
    </div>
  )
}
