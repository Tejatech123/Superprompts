export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5" />

      <div className="container relative max-w-screen-xl px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Create Stunning AI Images with <span className="text-accent">Viral Prompts</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Copy the prompt. Paste. Generate.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-accent to-accent/50 opacity-75 blur"></div>
              <div className="relative rounded-lg bg-card px-8 py-4">
                <p className="text-sm text-muted-foreground">Ready to create amazing AI art?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
