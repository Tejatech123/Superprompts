"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Sample AI-generated images following the prompts.mom style
const promptsMomImages = [
  {
    id: 1,
    src: "https://i.imghippo.com/files/awlH1032Bk.jpg",
    alt: "Retro Cinematic Portrait",
    prompt: "Create a retro vintage grainy but bright image styled in an old retro shirt, slightly loose and worn, giving a 90s movie vibe. The man is standing and laying casually on a classic white Indian Ambassador car near the headlights, romanticising the windy outdoor environment. The scene must feel cinematic, with deep shadows and contrast drama, warm, Bird view angle.",
  },
  {
    id: 2,
    src: "https://i.imghippo.com/files/AKck9774eiA.png",
    alt: "Korean Royal Style Portrait",
    prompt: "Generate a portrait in Korean royal style with traditional attire, featuring elegant poses and regal expressions. The subject should be centered with a softly blurred background, color graded for a cohesive look. Use vibrant colors with smooth lighting and soft shadow effects.",
  },
  {
    id: 3,
    src: "https://i.imghippo.com/files/xTAR9021vMQ.jpg",
    alt: "All-Black Editorial Portrait",
    prompt: "A stylish man in a sleek, all-black outfit poses confidently against a pitch-black background. He wears a tailored black suit, a black shirt with the top buttons open, and a subtle silver chain around his neck. He sports black sunglasses and a well-groomed beard, exuding charisma and mystery.",
  },
  {
    id: 4,
    src: "https://i.imghippo.com/files/iVrc7632TM.jpg",
    alt: "Burning Newspaper Portrait",
    prompt: "A dramatic portrait of a serious man in a black suit and white shirt holding a burning newspaper, realistic flames consuming the paper with glowing embers and smoke rising, cinematic lighting, dark background, intense facial expression, hyper-realistic photography style.",
  },
  {
    id: 5,
    src: "https://i.imghippo.com/files/NkIS6197TAE.jpg",
    alt: "Festive Navratri Portrait",
    prompt: "Create a festive Navratri-themed portrait with traditional Indian attire, vibrant colors, and celebratory elements. The subject should be centered with a minimal background, featuring classic poses with a trendy Instagram-inspired touch. Use smooth lighting and soft shadow effects.",
  },
  {
    id: 6,
    src: "https://i.imghippo.com/files/pym2107IQ.jpg",
    alt: "Vintage Couple Portrait",
    prompt: "Generate a vintage couple portrait with traditional attire and classic poses. The subjects should be centered within the frame with a softly blurred background, color graded for a cohesive retro look. Use warm lighting and soft shadow effects for a romantic, cinematic feel.",
  },
  {
    id: 7,
    src: "https://i.imghippo.com/files/awlH1032Bk.jpg",
    alt: "Creative Cinematic Portrait",
    prompt: "Create a creative cinematic portrait with dramatic lighting and artistic composition. The subject should be centered with a minimal or softly blurred background, featuring flattering poses with a trendy Instagram-inspired touch. Use vibrant colors and smooth lighting effects.",
  },
  {
    id: 8,
    src: "https://i.imghippo.com/files/AKck9774eiA.png",
    alt: "Traditional Attire Portrait",
    prompt: "Generate a portrait featuring traditional attire with elegant poses and regal expressions. The subject should be centered with a softly blurred background, color graded for a cohesive look. Use vibrant colors with smooth lighting and soft shadow effects.",
  },
]

interface PromptsMomGalleryProps {
  onImageClick?: (imageUrl: string) => void;
}

export function PromptsMomGallery({ onImageClick }: PromptsMomGalleryProps) {
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
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            AI Prompts Gallery
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Click any image to copy its prompt and recreate the magic
          </p>
        </div>

        {/* Prompts.mom Style Image Gallery */}
        <div className="flex justify-center">
          <div className="image-row">
            {promptsMomImages.map((image, index) => (
              <div key={image.id} className="image-wrap group">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="image-style cursor-pointer"
                  onClick={() => onImageClick?.(image.src)}
                  loading={index < 4 ? "eager" : "lazy"}
                  decoding="async"
                />
                
                {/* Hover overlay with copy button */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-center justify-center">
                  <Button
                    onClick={() => copyPrompt(image.prompt, image.id)}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground text-sm px-4 py-2"
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
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .image-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 24px;
          max-width: 800px;
          margin: auto;
        }

        .image-wrap {
          position: relative;
          width: 120px;
          height: 120px;
          perspective: 400px;
        }

        .image-style {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 1.5rem;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.18);
          border: 1px solid rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .image-wrap:hover .image-style {
          transform: scale(1.05);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
        }

        @media (max-width: 600px) {
          .image-row {
            flex-direction: column;
            align-items: center;
            gap: 18px;
          }
          .image-wrap {
            width: 90px;
            height: 90px;
          }
        }

        @media (max-width: 480px) {
          .image-row {
            gap: 16px;
          }
          .image-wrap {
            width: 80px;
            height: 80px;
          }
        }
      `}</style>
    </section>
  )
}
