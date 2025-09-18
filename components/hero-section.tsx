"use client"

import { useState, useEffect } from "react"

interface HeroSectionProps {
  onImageClick?: (imageUrl: string) => void;
}

export function HeroSection({ onImageClick }: HeroSectionProps) {
  const images = [
    "https://i.imghippo.com/files/M3163Z.webp",
    "https://i.imghippo.com/files/UAj3025Ws.png", 
    "https://i.imghippo.com/files/Ar6382qTs.png",
    "https://i.imghippo.com/files/Kbfy8638ycg.png",
    "https://i.imghippo.com/files/Zf9899ac.jpeg"
  ]
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000) // Change image every 3 seconds

    return () => clearInterval(interval)
  }, [images.length])
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
          <div className="pt-16 sm:pt-20">
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              <span className="block text-lg sm:text-xl font-medium text-muted-foreground">Copy. Paste. Transform.</span>
              <span className="block">
                <span className="text-foreground">Powerful AI Image </span>
                <span className="text-accent">Prompts</span>
              </span>
            </h1>
          </div>

          <div className="flex items-center justify-center gap-x-6">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-accent to-accent/50 opacity-75 blur"></div>
              <div className="relative rounded-lg bg-card px-8 py-4">
                <p className="text-sm text-muted-foreground">Ready to create amazing AI art?</p>
              </div>
            </div>
          </div>

          {/* Slideshow */}
          <div className="mx-auto mt-16 max-w-lg">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <img 
                src={images[currentImageIndex]} 
                alt={`Gallery ${currentImageIndex + 1}`} 
                loading="eager" 
                className="w-full h-full object-cover cursor-pointer transition-opacity duration-500" 
                onClick={() => onImageClick?.(images[currentImageIndex])}
              />
              
              {/* Slide indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              {/* Navigation arrows */}
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-all duration-300"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-all duration-300"
                aria-label="Next image"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
