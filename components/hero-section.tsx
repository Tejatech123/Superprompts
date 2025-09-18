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
        <div className="mx-auto max-w-6xl text-center space-y-6 sm:space-y-8">
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            <span className="block text-lg sm:text-xl font-medium text-muted-foreground">Copy. Paste. Transform.</span>
            <span className="block">
              <span className="text-foreground">Powerful AI Image </span>
              <span className="text-accent">Prompts</span>
            </span>
          </h1>

          <div className="flex items-center justify-center gap-x-6">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-accent to-accent/50 opacity-75 blur"></div>
              <div className="relative rounded-lg bg-card px-8 py-4">
                <p className="text-sm text-muted-foreground">Ready to create amazing AI art?</p>
              </div>
            </div>
          </div>

          {/* Grid of 5 image boxes with staggered layout */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-5 gap-3 md:gap-4">
              <div className="aspect-[3/4] rounded-xl overflow-hidden border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
                <img src="https://i.imghippo.com/files/M3163Z.webp" alt="Gallery 1" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[3/4] rounded-xl overflow-hidden border border-white/20 shadow-lg hover:shadow-xl transition-shadow -mt-4">
                <img src="https://i.imghippo.com/files/UAj3025Ws.png" alt="Gallery 2" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[3/4] rounded-xl overflow-hidden border border-white/20 shadow-lg hover:shadow-xl transition-shadow -mt-8">
                <img src="https://i.imghippo.com/files/Ar6382qTs.png" alt="Gallery 3" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[3/4] rounded-xl overflow-hidden border border-white/20 shadow-lg hover:shadow-xl transition-shadow -mt-4">
                <img src="https://i.imghippo.com/files/Kbfy8638ycg.png" alt="Gallery 4" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[3/4] rounded-xl overflow-hidden border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
                <img src="https://i.imghippo.com/files/Zf9899ac.jpeg" alt="Gallery 5" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
