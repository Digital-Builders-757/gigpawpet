export function TopBanner() {
  return (
    <div className="w-full bg-primary py-2 md:py-2.5 px-4 overflow-hidden" role="region" aria-label="Announcements">
      <p className="text-center text-[11px] md:text-[13px] font-medium text-white">
        <span className="hidden md:inline">🐾 Donate at checkout to support pet shelter and rescue</span>
        <span className="hidden md:inline mx-2">|</span>
        <span>🎉 Weekly special offers</span>
        <span className="hidden md:inline"> on Dog, Cat & Pets</span>
      </p>
    </div>
  )
}
