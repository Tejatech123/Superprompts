"use client"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px, 80px 80px",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4">
        <div className="mx-auto max-w-6xl text-center space-y-8 sm:space-y-12">
        </div>
      </div>
    </section>
  )
}
