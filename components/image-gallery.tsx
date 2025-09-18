"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const sampleImages = [
  {
    id: 1,
    src: "/cyberpunk-neon-city.png",
    prompt:
      "A cyberpunk cityscape at night with neon lights reflecting on wet streets, futuristic buildings, and flying cars",
    title: "Cyberpunk City",
  },
  {
    id: 2,
    src: "/mystical-forest-with-glowing-mushrooms.jpg",
    prompt:
      "Mystical enchanted forest with bioluminescent mushrooms, ethereal fog, and magical creatures hiding in shadows",
    title: "Enchanted Forest",
  },
  {
    id: 3,
    src: "/space-station-orbiting-alien-planet.jpg",
    prompt: "Massive space station orbiting a colorful alien planet with multiple moons and asteroid rings",
    title: "Space Station",
  },
  {
    id: 4,
    src: "/steampunk-mechanical-dragon.jpg",
    prompt: "Intricate steampunk mechanical dragon with brass gears, copper pipes, and steam emanating from joints",
    title: "Steampunk Dragon",
  },
  {
    id: 5,
    src: "/underwater-crystal-palace.jpg",
    prompt:
      "Underwater crystal palace with coral gardens, schools of tropical fish, and rays of sunlight filtering through water",
    title: "Crystal Palace",
  },
]

export function ImageGallery() {
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const copyPrompt = async (prompt: string, id: number) => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error("Failed to copy prompt:", err)
    }
  }

  return (
    <section className="py-24">
      <div className="container max-w-screen-xl px-4 mx-auto">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Viral AI Prompts Gallery</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Click any image to copy its prompt and recreate the magic
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
            {sampleImages.map((image, index) => (
              <Card
                key={image.id}
                className={cn(
                  "group relative overflow-hidden border-border bg-card transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/20",
                  index % 2 === 0 ? "rotate-1" : "-rotate-1",
                  "hover:rotate-0",
                )}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                  <h3 className="text-lg font-semibold text-white mb-2">{image.title}</h3>
                  <p className="text-sm text-gray-200 mb-3 line-clamp-2">{image.prompt}</p>
                  <Button
                    onClick={() => copyPrompt(image.prompt, image.id)}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    size="sm"
                  >
                    {copiedId === image.id ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        Copy Prompt
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
