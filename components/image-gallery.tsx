"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const sampleImages = [
  {
    id: 1,
    src: "https://i.imghippo.com/files/awlH1032Bk.jpg",
    link: "https://i.imghippo.com/files/awlH1032Bk.jpg",
    prompt:
      "Create a 1/7 scale commercialized figurine of the characters in the picture, in a realistic style, in a real environment. The figurine is placed on a computer desk. The figurine has a round transparent acrylic base, with no text on the base. The content on the computer screen is a 3D modeling process of this figurine. Next to the computer screen is a toy packaging box, designed in a style reminiscent of high-quality collectible figures, printed with original artwork. The packaging features two-dimensional flat illustrations",
    title: "Figurine on Computer Desk",
  },
  {
    id: 2,
    src: "https://i.imghippo.com/files/AKck9774eiA.png",
    link: "https://i.imghippo.com/files/AKck9774eiA.png",
    prompt:
      "Create a retro vintage grainy but bright image of the reference picture styled in an old retro shirt, slightly loose and worn, giving a 90s movie vibe. The man is standing and laying casually on a classic white Indian Ambassador car near the headlights, romanticising the windy outdoor environment. The scene must feel cinematic, with deep shadows and contrast drama, warm, Bird view angle.",
    title: "90s Retro Ambassador",
  },
  {
    id: 3,
    src: "https://i.imghippo.com/files/xTAR9021vMQ.jpg",
    link: "https://i.imghippo.com/files/xTAR9021vMQ.jpg",
    prompt:
      "A stylish man in a sleek, all-black outfit poses confidently against a pitch-black background. He wears a tailored black suit, a black shirt with the top buttons open, and a subtle silver chain around his neck. He sports black sunglasses and a well-groomed beard, exuding charisma and mystery. A luxury wristwatch glints on his left wrist. The lighting is dramatic, highlighting his facial features and casting soft shadows, creating a bold, high-fashion editorial look.",
    title: "All-Black Editorial Portrait",
  },
  {
    id: 4,
    src: "https://i.imghippo.com/files/iVrc7632TM.jpg",
    link: "https://i.imghippo.com/files/iVrc7632TM.jpg",
    prompt:
      "A dramatic portrait of a serious man in a black suit and white shirt holding a burning newspaper, realistic flames consuming the paper with glowing embers and smoke rising, cinematic lighting, dark background, intense facial expression, hyper-realistic photography style, high detail, moody atmosphere, cinematic color grading, 8k ultra realistic.",
    title: "Burning Newspaper Portrait",
  },
  {
    id: 5,
    src: "https://i.imghippo.com/files/NkIS6197TAE.jpg",
    link: "https://i.imghippo.com/files/NkIS6197TAE.jpg",
    prompt:
      "Create a hyper-realistic outdoor scene featuring a massive 300-foot tall full-body cutout of the uploaded person, showing the entire figure from head to toe with lifelike detail and clarity. The cutout is decorated with a beautiful, vibrant flower garland draped gracefully around the neck and shoulders, adding a festive and respectful touch. Place the cutout on a sturdy support frame in a busy public square filled with a diverse crowd of enthusiastic fans facing and admiring it. Fans are cheering, holding flags, banners, and placards with the person’s image, some capturing the moment on their phones. The fans look up in awe, creating a natural, dynamic interaction. Add scattered fresh flower petals on the ground, colorful confetti floating gently in the air, and warm sunlight casting soft shadows over the scene. The environment should feel lively and celebratory, with realistic urban elements like buildings, trees, and street lamps framing the background",
    title: "Dhaka Statue Cutout",
  },
  {
    id: 6,
    src: "https://i.imghippo.com/files/pym2107IQ.jpg",
    link: "https://i.imghippo.com/files/pym2107IQ.jpg",
    prompt:
      "Create a giant hyper-realistic statue based on the given photo, keeping the original face exactly the same without changes. The statue stands tall in the middle of a roundabout in Dhaka, near a famous historical landmark. The statue is still under construction, surrounded by scaffolding, with many construction workers in yellow helmets and orange vests climbing, welding, and working on it. Parts of the statue's body are still exposed metal framework, while other sections are already detailed and finished. The background shows the realistic atmosphere of Dhaka city: crowded streets with colorful rickshaws, packed buses, and small cars circling the roundabout. Street vendors with tea stalls, fruit carts, and colorful umbrellas line the roadside. Shop signs, big billboards, and messy hanging electric wires crisscross above the streets, creating the typical Dhaka city vibe. The bright daytime sky shines above, with tropical trees and a bustling, lively atmosphere. Style: photorealistic, vibrant, and full of life",
    title: "Dhaka Roundabout Statue",
  },
]

export function ImageGallery() {
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const copyPrompt = async (prompt: string, id: number) => {
    const markCopied = () => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    }

    // Try modern Clipboard API first
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(prompt)
        markCopied()
        return
      }
    } catch (err) {
      // Fall through to legacy method
    }

    // Fallback for iOS/Safari and older Android browsers
    try {
      const textarea = document.createElement("textarea")
      textarea.value = prompt
      textarea.setAttribute("readonly", "")
      textarea.style.position = "fixed"
      textarea.style.top = "-9999px"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)

      textarea.focus()
      textarea.select()
      textarea.setSelectionRange(0, textarea.value.length)

      const successful = document.execCommand("copy")
      document.body.removeChild(textarea)

      if (successful) {
        markCopied()
        return
      }
      throw new Error("execCommand copy failed")
    } catch (fallbackErr) {
      console.error("Failed to copy prompt:", fallbackErr)
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
                  "group relative overflow-hidden border-border bg-card transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu will-change-transform",
                )}
              >
                <div className="overflow-hidden">
                  {image.link ? (
                    <a href={image.link} target="_blank" rel="noopener noreferrer">
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={image.title}
                        fetchPriority={index === 0 ? "high" : undefined}
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                        className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105 transform-gpu [image-rendering:auto]"
                      />
                    </a>
                  ) : (
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.title}
                      fetchPriority={index === 0 ? "high" : undefined}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105 transform-gpu [image-rendering:auto]"
                    />
                  )}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />

                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold text-white mb-2">{image.title}</h3>
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
                        Copy
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
