"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AuthHeader } from "@/components/auth-header";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const copyPromptLandingStyle = async (prompt: string, key: string) => {
    const markCopied = () => {
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 2000)
    }
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(prompt)
        markCopied()
        return
      }
    } catch {}
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
    } catch (e: any) {
      toast({ title: "Copy failed", description: e?.message ?? "Please try again.", variant: "destructive" })
    }
  }

  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in");
    }
  }, [user, loading, router]);


  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to sign-in
  }

  return (
    <div className="min-h-screen bg-background">
      <AuthHeader />
      
      {/* Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">

          {/* Prompt helper header + filters */}
          <section className="mb-8">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-foreground">Tap an image to copy the prompt</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Paste in <span className="text-green-500 font-medium">Gemini</span> with your photo to create a similar look. Results may vary.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                "All",
                "Women",
                "Men",
                "Baby Girl",
                "Baby Boy",
                "Navratri Special",
                "Family",
                "Couple",
                "Traditional",
                "Vintage/Retro",
                "Korean",
                "Creative",
              ].map((cat) => {
                const isActive = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={
                      `rounded-full px-4 py-2 text-sm border transition-colors ` +
                      (isActive
                        ? `bg-foreground text-background border-transparent`
                        : `bg-transparent text-foreground border-border hover:bg-muted/60`)
                    }
                    aria-pressed={isActive}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </section>

          {/* Women Category - Gallery */}
          {(selectedCategory === "All" || selectedCategory === "Women") && (
          <section className="space-y-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Image 1 - landing style */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwWVWoHbGn0A6bF5yLp2EtrRBMslG4CHkwIXmd"
                    alt="Women gallery image 1"
                    loading="lazy"
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                    onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwWVWoHbGn0A6bF5yLp2EtrRBMslG4CHkwIXmd")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Underwater Serenity</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "A hyper-detailed 4K vertical cinematic medium shot (9:16) using 100% of the face from the uploaded photo, with no change in jawline or face shape. A beautiful Indian woman is submerged in serene turquoise waters of a lush freshwater pond alive with aquatic life. Eyes closed in peaceful meditation, a gentle smile graces her lips as her long, dark, voluminous hair floats around her head. She wears a vibrant pink blouse with a royal blue sari pallu edged in green and gold embroidery, a delicate gold choker, and jhumka earrings. In her clasped hands rests a single peacock feather. Around her, vivid pink and pure white water lilies bloom, lily pads drift above and below, and small goldfish weave gracefully. A turtle drifts in the background. Sunlight filters down, casting ethereal beams and shimmering caustic light across her skin as tiny bubbles rise.",
                        "women-1"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "women-1" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 2 - landing style */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwPSz9PLUBMVZJ47vNpc91sLzxKCkmFDnGX6q3"
                  alt="Women gallery image 2"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwPSz9PLUBMVZJ47vNpc91sLzxKCkmFDnGX6q3")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Monsoon Balcony Joy</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Hyper-realistic cinematic portrait of a young Indian woman in a burnt-orange cotton saree, standing on a vintage balcony. She is laughing joyfully, hand stretched out to feel the raindrops. Her hair is loosely braided, face glowing with natural happiness. Background shows an old rustic house wall, warm sepia tones. Vintage traditional cinematic realism, ultra-detailed.",
                        "women-2"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "women-2" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 3 - landing style */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwik4M2DTxnVosi45XmY9zrfg0QSaehtvdlOHM"
                  alt="Women gallery image 3"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwik4M2DTxnVosi45XmY9zrfg0QSaehtvdlOHM")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Lotus Meditation</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Generate a highly realistic editorial portrait using my uploaded selfie as the exact face — preserve my facial identity, features, skin tone, and proportions naturally without altering them. Ensure perfect face swap: seamless blending of skin tone, lighting, and shadows, with natural pores and texture. Do not beautify, slim, or reshape my face. I am seated on a studio floor in a serene Indian look. I wear an off-white handloom saree with tiny dark micro-motifs and a thin beige/gold border, draped modestly with the pallu over my left shoulder and pooling on the floor by my left knee. The blouse is fitted, solid black, and long-sleeved. Accessories: a small round black bindi centered above the brows; a slim jasmine bracelet on my left wrist; jasmine garlands around both ankles. No other jewelry. I gently hold a single pink lotus flower in my left hand near my chest, petals facing the camera. legs folded to the right side; right hand resting lightly on the floor for balance; torso upright with an elongated neck. Head tilted slightly up and to the left; eyes closed; calm, meditative expression. medium–full body; subject centered slightly left with negative space to the right. Shallow depth of field that keeps me in crisp focus while softly blurring background and floor details. painterly charcoal/dark-gray studio backdrop and mid-gray studio floor, with small off-white jasmine petals scattered around me. soft diffused key from the upper left (~45°), gentle frontal fill, and a subtle rim from the right to separate hair and shoulder. Low-contrast, cinematic, editorial softness. Warm-neutral color grade; retain fabric weave, petal texture, and natural skin grain. No harsh highlights or heavy vignettes. use my selfie only to lock the face; keep my exact facial geometry, undertones, freckles/moles, and natural asymmetry. Remove any selfie accessories like glasses, caps, or earbuds so the look matches the styling above. no sindoor, no extra jewelry, no text or watermark, no duplicated fingers or warped borders, no plastic skin, no mismatched neck/face tones, no cartoon/illustration look. high-resolution color image, retro editorial quality with my exact face integrated into the described composition.",
                        "women-3"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "women-3" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 4 - landing style */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwaUjfSMiRDNb3IhfgrKEmuyxs7vH80dATFPYa"
                  alt="Women gallery image 4"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwaUjfSMiRDNb3IhfgrKEmuyxs7vH80dATFPYa")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Festive Silk Portrait</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Hyper-realistic portrait of a beautiful South Indian woman wearing a traditional red and gold silk saree. She is adorned with gold jewelry including jhumkas, a necklace, and a nose ring. A small red bindi decorates her forehead. Her hair is styled neatly, flowing naturally. The background is softly blurred, focusing on her elegant face. Warm natural sunlight enhances her features, creating a festive and cultural atmosphere. Cinematic 8K ultra-detailed realism.",
                        "women-4"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "women-4" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 5 - landing style */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwwZ2WhVkNi0m4VxOsT8326pgFSDWGbXqnh5Bf"
                  alt="Women gallery image 5"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwwZ2WhVkNi0m4VxOsT8326pgFSDWGbXqnh5Bf")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Maharashtrian Grace</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Generate a highly realistic editorial portrait using my uploaded selfie as the exact face — preserve my facial identity, features, and proportions naturally without altering them. Ensure seamless blending of skin tone, makeup, and lighting so the face integrates perfectly. I am styled in a traditional Maharashtrian saree look. The saree is a rich purple with golden borders, draped in a traditional Nauvari style, paired with a golden-yellow short-sleeved blouse. The pallu flows gracefully over one shoulder, with intricate pleats tied at the waist. Accessories: A gold waist chain, bangles stacked on both wrists, statement earrings, and a delicate nose pin. My hair is tied back in an elegant braided bun adorned with fresh white jasmine flowers. I also wear a small bindi and subtle forehead jewelry (maang tikka). Pose & framing: I am shown in a graceful three-quarter pose, slightly turning my upper body with a soft smile. I hold a traditional brass plate with marigold flowers and a small oil lamp, symbolizing festivity. The frame should capture me from mid-thigh upward, focusing on the saree drape, jewelry, and expression. Background: A festive Indian backdrop with muted tones — a softly lit interior with vintage patterned walls, or an old courtyard with arches. The background should be softly blurred to highlight me as the main subject. Mood & quality: The photo must feel editorial and cinematic, polished with rich colors, soft daylight, and natural shadows that highlight fabric textures, jewelry gleam, and floral details. The overall atmosphere should evoke a timeless festive portrait, elegant yet rooted in cultural authenticity.",
                        "women-5"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "women-5" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 6 - landing style */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwXyDTC27Bt3KSY7wnDLHrzE2elpbQuU4OX9ax"
                  alt="Women gallery image 6"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwXyDTC27Bt3KSY7wnDLHrzE2elpbQuU4OX9ax")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Rustic Rain Balcony</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Then Generate a highly realistic editorial photo using my uploaded selfie as the exact face — preserve my facial identity, features, and proportions naturally without altering them. Ensure seamless face integration with perfect blending of skin tone, lighting, and shadows. I am styled in a traditional Indian look wearing a rustic burnt-orange cotton saree with a simple blouse. The saree drapes naturally, with soft, realistic folds and textures that evoke authenticity. The blouse is short-sleeved, fitted, and complements the earthy color palette of the saree. My hair is styled in a loosely braided side plait, slightly tousled to create a natural, romantic look. A tiny red bindi adorns my forehead, completing the traditional vibe. I am leaning gently against an old wooden balcony railing, one hand resting on the edge, the other arm bent behind me. My gaze is turned slightly to the side, looking outward with a thoughtful, graceful expression. The framing should show me from the waist up, highlighting the saree drape, my braid, and my natural posture. A rustic old building with weathered walls and peeling paint, featuring a distressed wooden balcony. Subtle rain droplets are visible in the scene, adding to the cinematic atmosphere. The lighting should be soft and moody, evoking the nostalgic warmth of a monsoon evening, with natural daylight filtering through the overcast sky. The overall mood should feel cinematic, intimate, and vintage, as if captured from a period drama or an old Indian film still. The tones should be warm, earthy, and slightly muted, enhancing the texture of the saree and the rustic setting. The photograph must feel timeless, nostalgic, and deeply evocative.",
                        "women-6"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "women-6" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 7 - Black Lehenga Editorial */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwK5TsQECEz9Sj47VuOge2ClmtwhGY5F1ALcPk"
                  alt="Women gallery image 7"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwK5TsQECEz9Sj47VuOge2ClmtwhGY5F1ALcPk")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Black Lehenga Editorial</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Then generate a highly realistic full-body fashion editorial photo using my uploaded selfie as the exact face — preserve my facial identity, features, and proportions naturally without altering them. Ensure seamless face integration with perfect blending of skin tone, lighting, and shadows. I am styled in an Indian traditional lehenga look, evoking the elegance of a high-end ethnic fashion shoot. The outfit is a black lehenga with intricate golden floral embroidery and motifs across the skirt. The lehenga has a wide spread, creating a circular, regal flow around me as I sit. The blouse is red with gold detailing, a deep neckline, and short sleeves featuring embroidered borders. A sheer black dupatta with delicate floral embroidery is draped gracefully across my shoulder and arm, edged with golden borders and hints of navy detailing. I am sitting elegantly on the floor, lehenga spread out in a circular formation around me. My posture is upright yet relaxed, with one arm resting gently on my knee and the other hand placed naturally. My head is tilted slightly upward, looking softly at the camera, creating a graceful, poised, and captivating expression. The frame should capture me from head to toe, showing the full spread of the lehenga and centered composition. Smooth wooden flooring in natural daylight. The soft lighting enhances the richness of the fabric, embroidery, and my skin tone, adding depth and realism. Shadows should be crisp yet natural, evoking the polished look of a professional studio-like shoot set in a real environment. The overall feel should be cinematic, polished, and editorial-quality, as if shot for a luxury Indian bridal/fashion campaign. Ensure high realism, maintaining authenticity of fabric textures, embroidery details, skin, and face blending.",
                        "women-7"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "women-7" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 8 - Temple Saree Grace */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwL5BqSZObUuOwQ3JFylTsXkfHctSMIBCxvrDj"
                  alt="Women gallery image 8"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwL5BqSZObUuOwQ3JFylTsXkfHctSMIBCxvrDj")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Temple Saree Grace</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Hyper-realistic portrait of a woman wearing a traditional green silk saree with a broad golden border, paired with temple jewelry and a waist belt. She stands in front of a South Indian temple gopuram, smiling gracefully while gently holding her saree pleats. Background features temple architecture in soft focus. Cinematic HDR, vintage traditional realism, 8K detail.",
                        "women-8"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "women-8" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 9 - Rainy Street Walk */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwQ2xoK9to4iDVqPSE2G8d0fgRysWrx9mC3vcY"
                  alt="Women gallery image 9"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwQ2xoK9to4iDVqPSE2G8d0fgRysWrx9mC3vcY")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Rainy Street Walk</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Hyper-realistic cinematic portrait of a woman in a dark green traditional saree with golden and maroon borders. She walks barefoot on a wet street after rain, holding her saree pleats with one hand. Her hair is styled in a bun decorated with jasmine flowers, wearing gold earrings and bangles. Background is an old town street, softly blurred. Vintage cinematic realism, ultra-detailed 8K.",
                        "women-9"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "women-9" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 10 - Pastel Barbie Gown */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwGWpGTEBsXRletSyFPif3JqbwdE0nUhCmI89B"
                  alt="Women gallery image 10"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwGWpGTEBsXRletSyFPif3JqbwdE0nUhCmI89B")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Pastel Barbie Gown</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Front view, 4K HD realistic, a stunning portrait of a young Indian woman with the exact same face (no alteration, 100% identical to the uploaded reference). She has long, dark, wavy hair cascading over her shoulders. She is wearing a dreamy Barbie-style gown in pastel pink with soft shimmering layers, delicate floral details, and a flowing skirt. White flowers are tucked behind her right ear. She is looking slightly to her right, with a soft, serene, and graceful expression.",
                        "women-10"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "women-10" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 11 - Floral Wall Bouquet */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwWQewbBUGn0A6bF5yLp2EtrRBMslG4CHkwIXm"
                  alt="Women gallery image 11"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwWQewbBUGn0A6bF5yLp2EtrRBMslG4CHkwIXm")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Floral Wall Bouquet</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "A captivating portrait of a young woman with a radiant smile, wearing a light pink knitted sweater. She holds a vibrant bouquet of orange, pink, and yellow flowers close to her chest, her gaze directed warmly at the viewer. She is positioned next to an old stone wall, which is richly covered in climbing flowers of similar hues, creating a beautiful floral backdrop. The setting is outdoors with soft, warm golden hour lighting, suggesting either sunrise or sunset, with a hint of lush greenery and distant natural scenery blurred in the background, adding depth to the image. The overall mood is joyful, serene, and picturesque, with a shallow depth of field to keep the focus on the woman and the flowers.",
                        "women-11"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "women-11" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>
          )}

          {/* Men Category - Gallery */}
          {(selectedCategory === "All" || selectedCategory === "Men") && (
          <section className="space-y-6 mt-16">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Image 1 - Stylish Man Portrait */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwKFQ67ApCEz9Sj47VuOge2ClmtwhGY5F1ALcP"
                  alt="Men gallery image 1"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwKFQ67ApCEz9Sj47VuOge2ClmtwhGY5F1ALcP")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Stylish Man Portrait</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "realistic ultra-clear close-up shot 120mm zoom lens portrait of a stylish young man sitting, right hand touching modern brown hanging swing chair. He has hair, face, eye mouths (same upload image generateland looking the camera conference. He is dressed in a light beige textured button-up shirt with sleeves rolled up, black baggy pants, and white and black color sneakers. A smartwatch. The background features outdoor chairs, greenery, and a colorful amusement park-like at sunsets time",
                        "men-1"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "men-1" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 2 - Cinematic Low-light Portrait */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwvVnSihqr4RWh2BzsnfQYAoV8uCFUqGg1k5lv"
                  alt="Men gallery image 2"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwvVnSihqr4RWh2BzsnfQYAoV8uCFUqGg1k5lv")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Cinematic Low-light Portrait</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "A cinematic low-light portrait of a stylish South Asian man lounging on a vintage leather couch, wearing an open button silk shirt, layered necklace, and round sunglasses. He holds a cigar in one hand and a crystal glass of whiskey in the other. Warm golden light highlights the smoke around him, while the background stays dark and moody. Expression confident, exuding power and calm authority. Ultra photorealistic, cinematic shadows, 8K quality.",
                        "men-2"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "men-2" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 3 - 90s Vintage Editorial */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwpXSpWieNu726RMeTXDadHG1zIB3tvw84Ynxh"
                  alt="Men gallery image 3"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwpXSpWieNu726RMeTXDadHG1zIB3tvw84Ynxh")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">90s Vintage Editorial</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "A 90s vintage editorial-style portrait of a young man (face reference from uploaded photo) leaning casually against an old rustic doorway. He poses with one hand gripping the chipped wooden door and the other tucked in his black pleated trousers, exuding effortless confidence.",
                        "men-3"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "men-3" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 4 - Rainy Street Portrait */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwF3kNHbdIoRsHkT3nZS6YcalbweLB5izVrGJA"
                  alt="Men gallery image 4"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwF3kNHbdIoRsHkT3nZS6YcalbweLB5izVrGJA")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Rainy Street Portrait</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Create a cinematic portrait of the subject standing beneath a glowing streetlight on a rainy night. The subject holds an umbrella, raindrops glistening and wet reflections glowing on the ground. The outfit is casual but stylish, like a jacket and jeans. Background: dark rainy street with blurred neon signs and reflections. Lighting: warm-yellow streetlight combined with cooler bluish tones in the background. Mood: dreamy, melancholic, romantic, like a scene from an arthouse film. Style: realistic cinematic portrait, sharp focus on face and raindrops, soft bokeh lights in background.",
                        "men-4"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "men-4" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 5 - Mysterious Pigeon Portrait */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwXovxEO7Bt3KSY7wnDLHrzE2elpbQuU4OX9ax"
                  alt="Men gallery image 5"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwXovxEO7Bt3KSY7wnDLHrzE2elpbQuU4OX9ax")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Mysterious Pigeon Portrait</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "A mysterious black-and-white cinematic portrait of a young slim body man in a long dark trench coat, surrounded by pigeons flying dramatically around him. Some pigeons fly very close to the camera, wings blurred in motion, others perch on his shoulder. His expression is serious and enigmatic, half of his face obscured by a pigeon in the foreground. Moody lighting with strong shadows and highlights, high-contrast monochrome film style, grainy analog texture, surreal mystical fashion",
                        "men-5"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "men-5" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 6 - Black and White Aesthetic Portrait */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw6d6hpXR53SnutNYHFlcKhsWkDoeapCyiRLgf"
                  alt="Men gallery image 6"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw6d6hpXR53SnutNYHFlcKhsWkDoeapCyiRLgf")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Black and White Aesthetic Portrait</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Use my image with the face kept 100% accurate, exactly the same (do not alter my facial features, keep my identity intact). Create a black-and-white aesthetic portrait of me sitting on the floor in dramatic lighting. I am wearing an oversized dark coat. My pose is emotional and introspective, with one hand near my mouth and my head slightly turned to the side. Shadows from a window fall across the wall behind me, creating a moody and artistic atmosphere. The overall vibe is mysterious, emotional, and cinematic.",
                        "men-6"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "men-6" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 7 - Retro Futuristic Café Portrait */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOweDNmcixc9HQ3GZfqXJBtES2vMxYF5pV0bsCO"
                  alt="Men gallery image 7"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOweDNmcixc9HQ3GZfqXJBtES2vMxYF5pV0bsCO")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Retro Futuristic Café Portrait</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Create a retro yet futuristic portrait of the subject sitting in a cozy café corner, styled in 90s vintage outfit with wired headphones, sipping coffee. Background: neon holographic menus glowing on café walls, soft vaporwave aesthetic. Lighting: mix of warm café light and glowing neon pink-blue reflections. Mood: nostalgic yet futuristic, cozy cyberpunk slice-of-life. Style: realistic cinematic portrait with Pinterest-like retro-futuristic tones.",
                        "men-7"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "men-7" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 8 - 90s Movie Hair Baddie */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw1mYjRUIKKMiwgGY1SZHo49FzdOE8cbm0rJCs"
                  alt="Men gallery image 8"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw1mYjRUIKKMiwgGY1SZHo49FzdOE8cbm0rJCs")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">90s Movie Hair Baddie</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Create a retro vintage grainy but bright image of the reference picture but draped in a perfect black colour suit Pinteresty aesthetic retro pants. It must feel like a '90s movie hair baddie with a small flower bookey in hand and romanticising a windy environment. The man is standing against a solid deep shadow and contrast drama, creating a mysterious and artistic atmosphere where the lighting is warm with golden tones evoking a sunset or golden hour glow. The background is minimalist",
                        "men-8"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "men-8" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 9 - Burning Newspaper Editorial */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw2YGGidPdNwuUS4GmpFVAx9MIeP0Cc38hkJ1T"
                  alt="Men gallery image 9"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw2YGGidPdNwuUS4GmpFVAx9MIeP0Cc38hkJ1T")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Burning Newspaper Editorial</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Cinematic editorial photograph of person holding up a burning newspaper, flames curling dramatically around paper edges. Newspaper headline reads bold text with modern typography, editorial style layout, featuring black and white images and quotes. Subject is dressed in sharp black suit. Dark background enhances fires glow, creating contrast with warm highlights on subjects clothing. Use the reference image for the face to maintain likeness. Ultra-detailed, high-contrast lighting,",
                        "men-9"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "men-9" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 10 - Moody Studio Portrait */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwuvNAbMyOx8QSKjRDgENotv2CseWp9U4PY7Hf"
                  alt="Men gallery image 10"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwuvNAbMyOx8QSKjRDgENotv2CseWp9U4PY7Hf")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Moody Studio Portrait</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Prompt: moody studio portrait of the upload person, bethed in golden-orange spotlight that create glowing circular halo behind Thema on the wall. The warm light should sculpt the face and upper body with soft, sunset-like tones, while casting s strong head shadow to the right. Style the person. Her eye are closed and chin tilted slightly up",
                        "men-10"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "men-10" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 11 - Red Wine Vintage Portrait */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwpV2VlaeNu726RMeTXDadHG1zIB3tvw84Ynxh"
                  alt="Men gallery image 11"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwpV2VlaeNu726RMeTXDadHG1zIB3tvw84Ynxh")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Red Wine Vintage Portrait</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Create a retro vintage grainy but bright image of the reference picture but draped in a perfect red wine color Pinteresty aesthetic retro shirt with white pant and holding a rose flower in hands. It must feel like a 90s movie and romanticising windy environment. The boy is standing against a solid wall deep shadows and contrast drama, creating a mysterious and artistic atmosphere where the lighting is warm with a golden tones of evoking a sunset or golden hour glow. The background is minimalist and slightly textured. The expression on her face is moody, calm yet happy and introspective. Use the face from the uploaded reference image and preserve the same facial features — do not alter the face.",
                        "men-11"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "men-11" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 12 - Luxury Yacht Portrait */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwsX0t1VrA9yP62t1XhHlQpzUKS8a4MNTRjOom"
                  alt="Men gallery image 12"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwsX0t1VrA9yP62t1XhHlQpzUKS8a4MNTRjOom")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Luxury Yacht Portrait</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "The project involves creating an ultra-realistic 8K cinematic full-body portrait from an uploaded image, ensuring strict 100% face-reference alignment. A young Indian man reclines barefoot on a luxury yacht at sunset, confident and stylish. Outfit: a flowing black silk shirt, slightly unbuttoned, paired with tailored high-waist white trousers. His hair is tousled in the sea breeze, paired with sleek sunglasses, a minimal leather strap watch, and a sleek wallet by his side. Background: ocean",
                        "men-12"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "men-12" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 13 - Beige Wall Portrait */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwh9rSfonL1yHDPmZnwgCOA8EKibXWT0MBsc9U"
                  alt="Men gallery image 13"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwh9rSfonL1yHDPmZnwgCOA8EKibXWT0MBsc9U")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Beige Wall Portrait</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "A South Asian man standing against a warm beige wall, dressed in a relaxed yet elegant outfit: an off-white linen shirt with rolled-up sleeves and slightly unbuttoned collar, tucked into high-waisted beige trousers with a belt. The lighting is soft and golden, casting dramatic shadows across the wall for a cinematic effect. His pose is calm and introspective, with one hand in his pocket and head slightly tilted down, giving a thoughtful and stylish atmosphere.",
                        "men-13"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "men-13" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>
          )}

          {/* Baby Girl Category - Gallery */}
          {(selectedCategory === "All" || selectedCategory === "Baby Girl") && (
          <section className="space-y-6 mt-16">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Image 1 - Garden Water Play */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwwAXWqTkNi0m4VxOsT8326pgFSDWGbXqnh5Bf"
                  alt="Baby Girl gallery image 1"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwwAXWqTkNi0m4VxOsT8326pgFSDWGbXqnh5Bf")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Garden Water Play</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Create a retro vintage grainy but bright image of the reference picture, without changing the face, but dressed in a soft white summer dress KNEE LENGTH with delicate frills. The3.5-year-old baby girl is playing in a beautiful garden surrounded by flowers, greenery, and gentle sunlight. Her shoulder length curly hair flows naturally with a few tiny flowers tucked in, giving a dreamy and innocent charm. The atmosphere should feel whimsical and magical, with soft shadows, bright light, and a nostalgic, artistic aesthetic. Her pose should suggest that she is spraying water upwards in a hose pipe and playing, where deep shadows and dramatic contrasts add mystery and artistry to the scene, creating a moody yet enchanting cinematic effect. line a sunset or golden our time of the day. Fine droplets of water clearly visible on her face eyelashes and skin making her look radiant and cute in the rain. she can be facing upwards with a naughty and cute expression. the atmosphere is dreamy and vibrant, not dull with a soft golden touch.",
                        "baby-girl-1"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "baby-girl-1" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 2 - Garden Swing */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwmiaj6vFQsyraRhvPnxS68Ajwm5eEfOL4H31D"
                  alt="Baby Girl gallery image 2"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwmiaj6vFQsyraRhvPnxS68Ajwm5eEfOL4H31D")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Garden Swing</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Create a 3 year baby girl from this uploaded photo. She has long, flowing hair styled in loose waves, and a fresh, clean look. She is wearing a beautifully embroidered frock in a vibrant orange hue, with delicate mirror work. She is gracefully seated on a wooden swing, holding small yellow flowers in both hands, offering one towards with a warm smile. The background is a lush, vibrant garden filled with colorful marigolds and blooming flowers with a golden hour glow.",
                        "baby-girl-2"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "baby-girl-2" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 3 - Happy Clapping */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw4Fj3loaYFX86A5gi7HbrqUwvNzJdpP9B4RST"
                  alt="Baby Girl gallery image 3"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw4Fj3loaYFX86A5gi7HbrqUwvNzJdpP9B4RST")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Happy Clapping</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Create a retro vintage grainy but bright image of the reference picture, without changing the face, but dressed in a soft white summer dress KNEE LENGTH with delicate frills. The 3.5-year-old baby girl is PLAYING in a beautiful garden surrounded by flowers, greenery, and gentle sunlight. Her shoulder length curly hair flows naturally with a few tiny flowers tucked in, giving a dreamy and innocent charm. The atmosphere should feel whimsical and magical, with soft shadows, bright light, and a nostalgic, artistic aesthetic. Her pose should suggest that she is CLAPPING HER HANDS HAPPILY. It drizzles softy, where deep shadows and dramatic contrasts add mystery and artistry to the scene, creating a moody yet enchanting cinematic effect. line a sunset or golden our time of the day. Fine rain drops clearly visible on her face eyelashes and skin making her look radiant and cute in the rain. the atmosphere is dreamy and vibrant, not dull. with a soft golden touch.",
                        "baby-girl-3"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "baby-girl-3" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 4 - Fountain Play */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwTjllYXpH8xseo7JY4wrVvp9IzPcy3ZjtRUFM"
                  alt="Baby Girl gallery image 4"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwTjllYXpH8xseo7JY4wrVvp9IzPcy3ZjtRUFM")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Fountain Play</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Create a retro vintage grainy but bright image of the reference picture, without changing the face, but dressed in a soft white summer dress KNEE LENGTH with delicate frills. The 3.5-year-old baby girl is sitting in a beautiful garden surrounded by flowers, greenery, and gentle sunlight. Her shoulder length curly hair flows naturally with a few tiny flowers tucked in, giving a dreamy and innocent charm. The atmosphere should feel whimsical and magical, with soft shadows, bright light, and a nostalgic, artistic aesthetic. Her pose should suggest that she is sitting down near a fountain with her legs immersed in the fountain water. It drizzles softy, where deep shadows and dramatic contrasts add mystery and artistry to the scene, creating a moody yet enchanting cinematic effect. line a sunset or golden our time of the day. Fine rain drops clearly visible on her face eyelashes and skin making her look radiant and cute in the rain. the atmosphere is dreamy and vibrant, not dull. with a soft golden touch. make the lighting as dreamy as possible.",
                        "baby-girl-4"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "baby-girl-4" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>
          )}

          {/* Baby Boy Category - Gallery */}
          {(selectedCategory === "All" || selectedCategory === "Baby Boy") && (
          <section className="space-y-6 mt-16">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Image 1 - Vintage Studio Portrait */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwLgBpIwObUuOwQ3JFylTsXkfHctSMIBCxvrDj"
                  alt="Baby Boy gallery image 1"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwLgBpIwObUuOwQ3JFylTsXkfHctSMIBCxvrDj")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Vintage Studio Portrait</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Use the exact face of the baby in the reference photo without altering facial features or identity. Photorealistic baby portrait in a vintage-inspired indoor studio. A baby with soft features, short dark hair, and expressive eyes is sitting on a wooden floor, wearing a light blue knit romper with a cream collar and button details. The baby is holding a fluffy brown teddy bear and gazing slightly upward with a curious expression.",
                        "baby-boy-1"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "baby-boy-1" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 2 - White Fashion Editorial */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwljgd1Wq04S3xi5AcUH7YKGTCQzhJXPnpgo2V"
                  alt="Baby Boy gallery image 2"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwljgd1Wq04S3xi5AcUH7YKGTCQzhJXPnpgo2V")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">White Fashion Editorial</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Take the face from the attached photo , same 100% same , he is a kid A stylish kid in a sleek, all-white outfit poses confidently against a pitch-white house background. He wears a tailored white suit, a white shirt with the top buttons open, and a subtle silver chain around his neck. He sports white sunglasses , exuding charisma and mystery. A luxury wristwatch glints on his left wrist. The lighting is dramatic, highlighting his facial features and casting soft shadows, creating a bold, high-fashion editorial look.",
                        "baby-boy-2"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "baby-boy-2" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 3 - Vintage Suitcase Portrait */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwEJqpPmjCfTambo7hxXWv36wH15tjIge0iBdr"
                  alt="Baby Boy gallery image 3"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwEJqpPmjCfTambo7hxXWv36wH15tjIge0iBdr")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Vintage Suitcase Portrait</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Take the face from the attached photo , same 100% same , he is a kid A stylish kid, facial will be the same as the reference image, with sharp features and dark tousled hair parted naturally. He is leaning casually against a vintage suitcase. He wears a textured brown blazer over an open-collar dark brown shirt, slightly unbuttoned at the top, paired with high-waisted light beige pleated trousers and a dark belt. The aesthetic is elegant and retro-inspired, with earthy tones. Minimalistic indoor background, cinematic warm natural lighting.",
                        "baby-boy-3"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "baby-boy-3" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 4 - 90s Movie Style */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwLAoxGoObUuOwQ3JFylTsXkfHctSMIBCxvrDj"
                  alt="Baby Boy gallery image 4"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwLAoxGoObUuOwQ3JFylTsXkfHctSMIBCxvrDj")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">90s Movie Style</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Take the face from the attached reference photo exactly 100% the same (do not alter his facial features, keep his identity intact). He is a kid. Create a retro, vintage-inspired, grainy yet bright image where the boy is dressed in a perfect black suit with Pinterest-style retro pants. The mood should feel like a 90s movie hair baddie. He holds a bunch of red roses in one hand while the other hand rests in his pocket, romanticizing a windy environment. The young boy stands against a solid deep shadow with dramatic contrast, evoking mystery and artistry. The lighting must be warm and golden, resembling a sunset or golden hour glow.",
                        "baby-boy-4"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "baby-boy-4" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>
          )}

          {/* Navratri Special Category - Gallery */}
          {(selectedCategory === "All" || selectedCategory === "Navratri Special") && (
          <section className="space-y-6 mt-16">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Image 1 - Night Festival Editorial */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwHNAjCBvcTbexiRGQSaVPyjDLoh0Nw7C31uA2"
                  alt="Navratri Special gallery image 1"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwHNAjCBvcTbexiRGQSaVPyjDLoh0Nw7C31uA2")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Night Festival Editorial</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Generate a highly realistic night-time editorial photo using my uploaded selfie as the exact face—preserve my facial identity, features, undertones, and proportions without altering them. Match lighting, shadows, and makeup to the scene; keep natural skin texture. Nothing changes except the face. Create an outdoor festive setting at night with rows of warm fairy lights stretching horizontally across the background as soft bokeh. Distant practicals glow near the horizon. Ground is an open sandy/paved courtyard with subtle repeating texture; long, soft shadows. Wardrobe and styling (match exactly): black spaghetti-strap crop top; rich black lehenga with gold brocade motifs; a deep maroon dupatta with gold border draped from the right shoulder and falling down the front; oxidized silver jewelry—statement choker, large earrings, stacked bangles/bracelet; a slim silver floral waist chain (kamarbandh). No bindi, no sindoor, no extra jewelry or props. Pose and expression: full-length, centered. Both elbows raised; hands near the ears/neck as if adjusting jewelry. Torso open and relaxed; head turned slightly left with a soft, content smile and eyes looking into the distance. Keep hands/fingers and garment folds anatomically correct. Lighting and mood: warm ambient tungsten from the string lights with gentle front fill; clean highlights on jewelry; subtle rim on hair/shoulders; shallow depth of field so the lights blur while I stay sharp. Add a light filmic grain for realism. Identity rules: use ONLY my selfie to lock identity; preserve exact facial geometry and natural asymmetry. Remove any selfie accessories (glasses, cap, earbuds). Negative instructions: no plastic skin or harsh HDR/oversharpening, no warped hands/waist chain/dupattā, no text or watermark, no outfit or background changes, no cartoon/AI look, and no mismatched tones between face, neck, and midriff. Output: high-resolution color image matching this composition and styling with my exact face seamlessly integrated.",
                        "navratri-1"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "navratri-1" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 2 - Dhunuchi Naach */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwq6fPjCNU4BmMWfYHFOxGdgRar1D06t8NZlQj"
                  alt="Navratri Special gallery image 2"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwq6fPjCNU4BmMWfYHFOxGdgRar1D06t8NZlQj")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Dhunuchi Naach</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Create an ultra-realistic 8K image of a uploaded young Indian woman performing Dhunuchi Naach during Durga Puja. She is wearing a traditional red saree with golden borders, silver bangles, and testive jewelry. She holds o clay incense pot (dhunuchi) in both hands with smoke rising gracefully around her. Her expression is joyful, immersed in devotion, as she dances in front of a grand Durga idol decorated with flowers and garlands. Behind her, drummers and women in colorful sarees are watching, creating a festive and vibrant atmosphere. Natural soft sunlight enhances the smoke and golden tones of the scene.",
                        "navratri-2"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "navratri-2" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 3 - Garbo Portrait */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwkbbMX54nfFMYyIDuqjoX73E4dcxeWPzgvlHr"
                  alt="Navratri Special gallery image 3"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwkbbMX54nfFMYyIDuqjoX73E4dcxeWPzgvlHr")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Garbo Portrait</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Highly realistic cinematic portrait of c joung Gujarati woman in a traditional Garbo outfit. She is wearing a vibrant chaniya choli with mirror work, colortul embroidery, and a gracetully dupatta in authentic Gujarati style. She is adorned with oxidized silver jewelry - bangles, jhumka earrings, necklace, and maang tikka - completing the festive look. Inspired by the uploaded reference image, her pose is elegant and her expression warm and graceful. The background has a dramatic cinematic effect similar to the reference photo: a dark moody backdrop with a diagonal beam of golden light falling on her, creating depth and highlighting her features. The overall grading is warm with subtle film grain, giving a professional retro-cinematic Gujarati festive atmosphere.",
                        "navratri-3"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "navratri-3" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 4 - Dandiya Dance */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwLiWVa7ObUuOwQ3JFylTsXkfHctSMIBCxvrDj"
                  alt="Navratri Special gallery image 4"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwLiWVa7ObUuOwQ3JFylTsXkfHctSMIBCxvrDj")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Dandiya Dance</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Beautiful woman extract face from image playing dandiya with joyful abandon. She has a bright smile, her hair flying as she twirls, holding decorated dandiya sticks, dressed in a colorful, traditional ghagra choli with intricate embroidery and mirror work. The background is a lively blurred scene of a nighttime Navratri festival with other dancers, twinkling lights, and festive decorations. The image is captured trom a slightly low angle, emphasizing her dynamic movement.",
                        "navratri-4"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "navratri-4" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 5 - Retro Garba Style */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwzsVOKUEuOU5j7RGPoWnLZQwFJb69v1KaNVlt"
                  alt="Navratri Special gallery image 5"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwzsVOKUEuOU5j7RGPoWnLZQwFJb69v1KaNVlt")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Retro Garba Style</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Retro pinterest-inspired aesthetic portrait of the same girl (face exactly same), wearing a bright green and yellow garba dress with embroidery and traditional silver jewellery. Her wavy curly long hair with a flower tucked in moves slightly in the wind. She stands leaning gently against a wall, looking slightly to her right with an introspective happy mood. The lighting is golden hour, high contrast shadows, 90s Bollywood retro grain, cinematic mysterious vibe.",
                        "navratri-5"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "navratri-5" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 6 - Vintage Garba Back Pose */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw1tTtc6KKMiwgGY1SZHo49FzdOE8cbm0rJCsU"
                  alt="Navratri Special gallery image 6"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw1tTtc6KKMiwgGY1SZHo49FzdOE8cbm0rJCsU")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Vintage Garba Back Pose</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Start with the original image ensuring the facial features remain unchanged Garba dress: overlay a digital image of a traditional garba dress choose a design with intricate embroidery and vibrant colors typical of the 90s aesthetic. Jewellery: add statement piece like a choker bangles and earrings opt tor complement the dress Hairs: replace the original hair with a digital images of dark brown wavy curly long hair tick a small flower into the curly for a romantic touch. Background: use a solid wall background with deep shadows and contrast add a slight texture to the wall to enhance the vintage feel. Lighting: apply a warm golden tone to mimic the glow of sunset or golden hour ensure the lighting is dramatic to create a moody atmosphere Expression: keep the original expression intact maintaining the mood. Hand: keep the dandiya in hand Full pic back pose.",
                        "navratri-6"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "navratri-6" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 7 - Bandhani Dupatta Portrait */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwaLHoMxiRDNb3IhfgrKEmuyxs7vH80dATFPYa"
                  alt="Navratri Special gallery image 7"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwaLHoMxiRDNb3IhfgrKEmuyxs7vH80dATFPYa")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Bandhani Dupatta Portrait</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "cinematic portrait of a young Indian woman during Navratri festival, wearing a traditional colorful Bandhani dupatta with intricate patterns, silver jhumkas, and bangles. She holds a dandiya stick gracefully in her hands. Her long wavy hair flows naturally, glowing softly in warm golden hour lighting. Festive lights twinkle in the blurred background, creating a dreamy and cultural celebration atmosphere. Ultra realistic, high detail, cinematic photography style.",
                        "navratri-7"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "navratri-7" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>
          )}

          {/* Couple Category - Gallery */}
          {(selectedCategory === "All" || selectedCategory === "Couple") && (
          <section className="space-y-6 mt-16">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Image 1 - Red Saree Couple */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwwa3f2KAkNi0m4VxOsT8326pgFSDWGbXqnh5B"
                  alt="Couple gallery image 1"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwwa3f2KAkNi0m4VxOsT8326pgFSDWGbXqnh5B")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Red Saree Couple</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Create a retro, vintage-inspired image – grainy yet bright – based on the reference picture. The girl should be draped in a perfect red, Pinterest-style aesthetic retro saree, and the guy should be wearing a white kurta with a Pinterest-style Chinese collar in a retro look. The vibe must capture the essence of a 90s movie brown-haired baddie, with wavy curls and a small flower tucked visibly into her hair, and the hair should fly enhanced by a windy, romantic atmosphere. The guy should be holding her waist and looking deep into her eyes. They stand against a solid wall, where deep shadows and dramatic contrasts add mystery and artistry to the scene, creating a moody yet enchanting cinematic effect. They should be looking at each other.",
                        "couple-1"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "couple-1" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 2 - Purple Chiffon Couple */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwsHUkQbrA9yP62t1XhHlQpzUKS8a4MNTRjOom"
                  alt="Couple gallery image 2"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwsHUkQbrA9yP62t1XhHlQpzUKS8a4MNTRjOom")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Purple Chiffon Couple</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Create a retro, vintage-inspired image - grainy yet bright - based on the reference picture. The girl should be draped in a perfect purple chiffon, Pinterest-style aesthetic saree. The vibe must capture the essence of a 90s movie dark-brown-haired baddie, with silky hair and a small flower tucked visibly into her hair, enhanced by a windy, romantic atmosphere. She is standing against a wall with the shadow of a tree, where deep shadows and dramatic contrasts add mystery and artistry to the scene, creating a moody yet enchanting cinematic effect. Her pose should suggest that she is adjusting her hair. And the boy must wear black shirt with suitable pants add watch he must be behind the girl.",
                        "couple-2"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "couple-2" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 3 - Brown Saree Couple */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwNaSgigbTHRAxyeo1PknU9XO4BQqv67SVLbKa"
                  alt="Couple gallery image 3"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwNaSgigbTHRAxyeo1PknU9XO4BQqv67SVLbKa")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Brown Saree Couple</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Create a retro vintage grainy but bright image of the reference picture but draped in a perfect brown Pinterest aesthetic retro saree for girl and suite for boy. It must feel like a 90s movie black hair baddie with A small flower tucked visibly in long wavy hair and romanticising windy environment. The girl and boy standing against a solid wall deep shadows and contrast drama, creating a mysterious and artistic atmosphere where the lighting is warm with a golden tones of evoking a sunset or golden hour glow. The background is minimalist and slightly textured the expression on her face is moody, calm yet happy and introspective.",
                        "couple-3"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "couple-3" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 4 - Red Kurta Couple */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwODJq0k891UNau7cYf2wMep30kjvxyXARgPFr"
                  alt="Couple gallery image 4"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwODJq0k891UNau7cYf2wMep30kjvxyXARgPFr")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Red Kurta Couple</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Create a retro, vintage-inspired image – grainy yet bright – based on the reference picture. The girl should be draped in a perfect red, Pinterest-style aesthetic retro saree, and the guy should be wearing a white kurta with a Pinterest-style Chinese collar in a retro look. The vibe must capture the essence of a 90s movie brown-haired baddie, with wavy curls and a small flower tucked visibly into her hair, and the hair should fly enhanced by a windy, romantic atmosphere. The guy should be holding her waist and looking deep into her eyes. They stand against a solid wall, where deep shadows and dramatic contrasts add mystery and artistry to the scene, creating a moody yet enchanting cinematic effect. They should be looking at each other.",
                        "couple-4"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "couple-4" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 5 - Brown Suite Couple */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwFGAp856dIoRsHkT3nZS6YcalbweLB5izVrGJ"
                  alt="Couple gallery image 5"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwFGAp856dIoRsHkT3nZS6YcalbweLB5izVrGJ")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Brown Suite Couple</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Create a retro vintage grainy but bright image of the reference picture but draped in a perfect brown Pinterest y aesthetic retro saree for girl and 582 suite for boy. It must feel like a 90s movie red hair baddie with a small flower tuck visibly in the curls and windy environment romanticising for girl. The girl and boy is standing against a solid wall deep shadows and contrast drama, creating a mysterious and artistic atmosphere.",
                        "couple-5"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "couple-5" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 6 - Blue Cotton Couple */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwE8LzzUjCfTambo7hxXWv36wH15tjIge0iBdr"
                  alt="Couple gallery image 6"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwE8LzzUjCfTambo7hxXWv36wH15tjIge0iBdr")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Blue Cotton Couple</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "First ask me to upload my selfie. Then Create a retro, vintage-inspired image - grainy yet right - based on the reference picture. The girl should be draped in a perfect blue cotton saree with small white flower prints, paired with a white blouse with sleeves above the elbow, styled in a Pinterest-inspired aesthetic. The guy should be in a cotton shirt and pant with a flower bouquet in hand. The vibe must capture the essence of a 90s movies dark- brown-haired baddie, with silky hair and a small flower tucked visibly into her hair, enhanced by a windy, romantic atmosphere. She is sitting on a wooden bench as a few leaves blow in the air, while dramatic contrasts add mystery and artistry to the scene while the guy is bending in the wooden bench behind her smiling at her, creating a moody yet enchanting cinematic effect.",
                        "couple-6"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "couple-6" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 7 - Off White Couple */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw70ErklgrCexzG3sdp8WYDicNkoUbPOmTa0nI"
                  alt="Couple gallery image 7"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw70ErklgrCexzG3sdp8WYDicNkoUbPOmTa0nI")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Off White Couple</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "First ask me to upload my selfie. Then Create a retro, vintage - inspired image-grainy yet right- based on the reference picture Triea the google gemini as a couple The girl should be draped in a perfect Off white cotton saree With a red blouse. Pinterest styles aesthetic saree. The vibe must capture the essence of a 90s movie dark brown -haired baddie, enhanced by a windy, romantic atmosphere and the guy should be wearing an off white shirt kurta. She stands against an old wooden door, where deep shadows and dramatic contrast add mystery and artistry to the scene, creating a moody yet enchanting cinematic effect. Make the girl pose like she's walking and looking back while the guys is holding her saree pallu very evidently and the guy should be looking at the girl.",
                        "couple-7"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "couple-7" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 8 - Yellow Chiffon Couple */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw0XqANnvEiYx46uGItXmDjA3PwKcqrgvpnF7H"
                  alt="Couple gallery image 8"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw0XqANnvEiYx46uGItXmDjA3PwKcqrgvpnF7H")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Yellow Chiffon Couple</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "First ask me to upload a couple photo or upload 2 photos of a girl and a boy. He will be holding my hand from behind dressed in retro style with a black shirt, carrying a I will be in perfect plain chiffon saree, yellow in color, giving a Pinterest y aesthetic retro vibe. Think of a 90s movie feel-dark brown wavy curly hair with a small flower tucked visibly into the curls, romanticizing in a windy environment. I'll be standing against a solid wall with deep shadows and contrast drama, creating mysterious and artistic atmosphere. The lighting will be warm with golden tones, evoking a sunset or golden hour glow. The background will stay minimalistic and slightly textured, while my expression will be moody, calm yet happy and introspective.",
                        "couple-8"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "couple-8" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 9 - Red Chiffon Couple */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwOidm8k91UNau7cYf2wMep30kjvxyXARgPFrB"
                  alt="Couple gallery image 9"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwOidm8k91UNau7cYf2wMep30kjvxyXARgPFrB")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Red Chiffon Couple</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "First ask me to upload a couple photo or upload 2 photos of a girl and a boy. He will be sitting & giving me flower seeing me. in a romantic way dressed in a retro style with a black shirt. I will be in a perfect plain chiffon saree, red in color, giving a Pinterest y aesthetic retro vibe. Think of a 90s movie feel-dark brown wavy curly hair with a small flower tucked visibly into the curls, romanticizing in a windy environment. I'll be sitting against the retro wall. with deep shadows and contrast drama, creating a mysterious and artistic.",
                        "couple-9"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "couple-9" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image 10 - Blue Winter Couple */}
              <div className="group relative overflow-hidden border-border bg-card rounded-2xl transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-accent/20 transform-gpu">
                <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden">
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOweff96hxc9HQ3GZfqXJBtES2vMxYF5pV0bsCO"
                  alt="Couple gallery image 10"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewImage("https://lsn12plqor.ufs.sh/f/LXPMWJObUuOweff96hxc9HQ3GZfqXJBtES2vMxYF5pV0bsCO")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">Blue Winter Couple</h3>
                  <p className="text-sm text-white/80 mb-3">Tap to copy prompt</p>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "Create a retro vintage grainy but bright image of the reference picture with the girl draped in a perfect plain blue chiffon saree and the boy in a black Winter wear, Pinteresty aesthetic retro saree vibe, feeling like a 90s movie with dark brown wavy curly hair and a small flower tucked visibly into her curls, romanticising a Snowy environment; the girl is making snow ball and throwing at him. The scene look like they are playing and enjoying each other company. Preserve the face and it's facial details.",
                        "couple-10"
                      )
                    }
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 text-sm font-medium inline-flex items-center justify-center"
                  >
                    {copiedKey === "couple-10" ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>
          )}

        </div>
      </main>
    </div>
  );
}
