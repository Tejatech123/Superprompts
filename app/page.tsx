"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AuthHeader } from "@/components/auth-header";

export default function Home() {
  const { toast } = useToast();
    const [copiedKey, setCopiedKey] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [selectedDiwaliFilter, setSelectedDiwaliFilter] = useState<string>("Women");
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

  const handleShare = async (title: string, text: string, url: string = window.location.href) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text,
          url
        });
        toast({ title: "Shared successfully!", description: "The content has been shared." });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(url);
        toast({ title: "Link copied!", description: "The link has been copied to your clipboard." });
      }
    } catch (error) {
      // If share is cancelled or fails, try clipboard fallback
      if (error instanceof Error && error.name === 'AbortError') {
        // User cancelled the share, do nothing
        return;
      }
      
      try {
        await navigator.clipboard.writeText(url);
        toast({ title: "Link copied!", description: "The link has been copied to your clipboard." });
      } catch (clipboardError) {
        toast({ 
          title: "Share failed", 
          description: "Unable to share or copy. Please try again.", 
          variant: "destructive" 
        });
      }
    }
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
            <div className="aspect-[282.4/370.4] w-[282.4px] overflow-hidden mx-auto">
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
          {/* Minimal Landing Hero + Showcase */}
          <section className="mb-16">
            {/* Header + Hero */}
            <div className="text-center py-8">
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">COPY THE PROMPT. CREATE THE LOOK.</p>
              <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold text-foreground leading-[1.1]">
                Viral AI Image Prompts
              </h1>
              {/* Decorative stars */}
              <div className="relative mx-auto mt-2 h-0">
                <span className="absolute -top-5 left-1/3 text-pink-400">✦</span>
                <span className="absolute -top-4 right-1/4 text-purple-400">✦</span>
                <span className="absolute -top-2 left-1/5 text-purple-300">✦</span>
              </div>
            </div>

            {/* Image Showcase with subtle grid */}
              <div className="relative">
              {/* grid background */}
              <div
                aria-hidden
                className="absolute inset-0 -z-10 opacity-60"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                  backgroundPosition: "center",
                }}
              />

              <div className="flex items-end justify-center gap-4 sm:gap-6 px-2">
                {[
                  // 1st: Couple 7th image
                  "https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw70ErklgrCexzG3sdp8WYDicNkoUbPOmTa0nI",
                  // 2nd: Baby Girl 1st image
                  "https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwwAXWqTkNi0m4VxOsT8326pgFSDWGbXqnh5Bf",
                  // 3rd: Baby Boy 4th image
                  "https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwLAoxGoObUuOwQ3JFylTsXkfHctSMIBCxvrDj",
                  // 4th: Navratri Special 4th image
                  "https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwLiWVa7ObUuOwQ3JFylTsXkfHctSMIBCxvrDj",
                  // 5th: Men 3rd image
                  "https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwpXSpWieNu726RMeTXDadHG1zIB3tvw84Ynxh",
                ].map((src, i) => (
                  <div
                    key={src}
                    className={
                      "relative w-64 sm:w-72 md:w-80 aspect-[4/5] rounded-2xl overflow-hidden shadow-md bg-card " +
                      (i % 2 === 0 ? "-rotate-3" : "rotate-3")
                    }
                    style={{ transformOrigin: "center bottom" }}
                  >
                    <img src={src} alt="Showcase" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            
          </section>


          {/* Prompt helper header + filters */}
          <section className="mb-6">
            <div className="text-center mb-3">
              <h2 className="text-lg font-semibold text-foreground">Tap an image to copy the prompt</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Paste in <span className="text-green-500 font-medium">Gemini</span> or <span className="text-green-500 font-medium">ChatGPT</span> with your photo to create a similar look. Results may vary.
              </p>
    </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {[
                "All",
                "Women",
                "Men",
                "Baby",
                "Navratri Special",
                "Couple",
                "Diwali",
                "Ads",
              ].map((cat) => {
                const isActive = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={
                      `rounded-full px-2 py-1 text-xs border transition-colors ` +
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
          <section className="space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Image 1 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Women</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwWVWoHbGn0A6bF5yLp2EtrRBMslG4CHkwIXmd"
                    alt="Underwater Serenity"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Underwater Serenity</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    A hyper-detailed 4K vertical cinematic medium shot (9:16) using 100% of the face from the uploaded photo, with no change in jawline or face shape. A beautiful Indian woman is submerged in serene turquoise waters of a lush freshwater pond alive with aquatic life. Eyes closed in peaceful meditation, a gentle smile graces her lips as her long, dark, voluminous hair floats around her head...
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Underwater Serenity - AI Prompt',
                        'Check out this amazing AI prompt for creating underwater portraits!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "A hyper-detailed 4K vertical cinematic medium shot (9:16) using 100% of the face from the uploaded photo, with no change in jawline or face shape. A beautiful Indian woman is submerged in serene turquoise waters of a lush freshwater pond alive with aquatic life. Eyes closed in peaceful meditation, a gentle smile graces her lips as her long, dark, voluminous hair floats around her head. She wears a vibrant pink blouse with a royal blue sari pallu edged in green and gold embroidery, a delicate gold choker, and jhumka earrings. In her clasped hands rests a single peacock feather. Around her, vivid pink and pure white water lilies bloom, lily pads drift above and below, and small goldfish weave gracefully. A turtle drifts in the background. Sunlight filters down, casting ethereal beams and shimmering caustic light across her skin as tiny bubbles rise.",
                          "women-1"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "women-1" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 2 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Women</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwPSz9PLUBMVZJ47vNpc91sLzxKCkmFDnGX6q3"
                    alt="Monsoon Balcony Joy"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Monsoon Balcony Joy</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Hyper-realistic cinematic portrait of a young Indian woman in a burnt-orange cotton saree, standing on a vintage balcony. She is laughing joyfully, hand stretched out to feel the raindrops. Her hair is loosely braided, face glowing with natural happiness. Background shows an old rustic house wall, warm sepia tones. Vintage traditional cinematic realism, ultra-detailed.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Monsoon Balcony Joy - AI Prompt',
                        'Check out this amazing AI prompt for creating monsoon portraits!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Hyper-realistic cinematic portrait of a young Indian woman in a burnt-orange cotton saree, standing on a vintage balcony. She is laughing joyfully, hand stretched out to feel the raindrops. Her hair is loosely braided, face glowing with natural happiness. Background shows an old rustic house wall, warm sepia tones. Vintage traditional cinematic realism, ultra-detailed.",
                          "women-2"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "women-2" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 3 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Women</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwik4M2DTxnVosi45XmY9zrfg0QSaehtvdlOHM"
                    alt="Lotus Meditation"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Lotus Meditation</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Generate a highly realistic editorial portrait using my uploaded selfie as the exact face — preserve my facial identity, features, skin tone, and proportions naturally without altering them. Ensure perfect face swap: seamless blending of skin tone, lighting, and shadows, with natural pores and texture. Do not beautify, slim, or reshape my face...
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('Lotus Meditation - AI Prompt', 'Check out this amazing AI prompt for creating meditation portraits!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Generate a highly realistic editorial portrait using my uploaded selfie as the exact face — preserve my facial identity, features, skin tone, and proportions naturally without altering them. Ensure perfect face swap: seamless blending of skin tone, lighting, and shadows, with natural pores and texture. Do not beautify, slim, or reshape my face. I am seated on a studio floor in a serene Indian look. I wear an off-white handloom saree with tiny dark micro-motifs and a thin beige/gold border, draped modestly with the pallu over my left shoulder and pooling on the floor by my left knee. The blouse is fitted, solid black, and long-sleeved. Accessories: a small round black bindi centered above the brows; a slim jasmine bracelet on my left wrist; jasmine garlands around both ankles. No other jewelry. I gently hold a single pink lotus flower in my left hand near my chest, petals facing the camera. legs folded to the right side; right hand resting lightly on the floor for balance; torso upright with an elongated neck. Head tilted slightly up and to the left; eyes closed; calm, meditative expression. medium–full body; subject centered slightly left with negative space to the right. Shallow depth of field that keeps me in crisp focus while softly blurring background and floor details. painterly charcoal/dark-gray studio backdrop and mid-gray studio floor, with small off-white jasmine petals scattered around me. soft diffused key from the upper left (~45°), gentle frontal fill, and a subtle rim from the right to separate hair and shoulder. Low-contrast, cinematic, editorial softness. Warm-neutral color grade; retain fabric weave, petal texture, and natural skin grain. No harsh highlights or heavy vignettes. use my selfie only to lock the face; keep my exact facial geometry, undertones, freckles/moles, and natural asymmetry. Remove any selfie accessories like glasses, caps, or earbuds so the look matches the styling above. no sindoor, no extra jewelry, no text or watermark, no duplicated fingers or warped borders, no plastic skin, no mismatched neck/face tones, no cartoon/illustration look. high-resolution color image, retro editorial quality with my exact face integrated into the described composition.",
                          "women-3"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "women-3" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 4 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Women</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwaUjfSMiRDNb3IhfgrKEmuyxs7vH80dATFPYa"
                    alt="Festive Silk Portrait"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Festive Silk Portrait</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Hyper-realistic portrait of a beautiful South Indian woman wearing a traditional red and gold silk saree. She is adorned with gold jewelry including jhumkas, a necklace, and a nose ring. A small red bindi decorates her forehead. Her hair is styled neatly, flowing naturally. The background is softly blurred, focusing on her elegant face. Warm natural sunlight enhances her features, creating a festive and cultural atmosphere. Cinematic 8K ultra-detailed realism.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('Festive Silk Portrait - AI Prompt', 'Check out this amazing AI prompt for creating festive portraits!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Hyper-realistic portrait of a beautiful South Indian woman wearing a traditional red and gold silk saree. She is adorned with gold jewelry including jhumkas, a necklace, and a nose ring. A small red bindi decorates her forehead. Her hair is styled neatly, flowing naturally. The background is softly blurred, focusing on her elegant face. Warm natural sunlight enhances her features, creating a festive and cultural atmosphere. Cinematic 8K ultra-detailed realism.",
                          "women-4"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "women-4" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 5 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Women</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwwZ2WhVkNi0m4VxOsT8326pgFSDWGbXqnh5Bf"
                    alt="Maharashtrian Grace"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Maharashtrian Grace</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Generate a highly realistic editorial portrait using my uploaded selfie as the exact face — preserve my facial identity, features, and proportions naturally without altering them. Ensure seamless blending of skin tone, makeup, and lighting so the face integrates perfectly. I am styled in a traditional Maharashtrian saree look...
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('Maharashtrian Grace - AI Prompt', 'Check out this amazing AI prompt for creating traditional portraits!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Generate a highly realistic editorial portrait using my uploaded selfie as the exact face — preserve my facial identity, features, and proportions naturally without altering them. Ensure seamless blending of skin tone, makeup, and lighting so the face integrates perfectly. I am styled in a traditional Maharashtrian saree look. The saree is a rich purple with golden borders, draped in a traditional Nauvari style, paired with a golden-yellow short-sleeved blouse. The pallu flows gracefully over one shoulder, with intricate pleats tied at the waist. Accessories: A gold waist chain, bangles stacked on both wrists, statement earrings, and a delicate nose pin. My hair is tied back in an elegant braided bun adorned with fresh white jasmine flowers. I also wear a small bindi and subtle forehead jewelry (maang tikka). Pose & framing: I am shown in a graceful three-quarter pose, slightly turning my upper body with a soft smile. I hold a traditional brass plate with marigold flowers and a small oil lamp, symbolizing festivity. The frame should capture me from mid-thigh upward, focusing on the saree drape, jewelry, and expression. Background: A festive Indian backdrop with muted tones — a softly lit interior with vintage patterned walls, or an old courtyard with arches. The background should be softly blurred to highlight me as the main subject. Mood & quality: The photo must feel editorial and cinematic, polished with rich colors, soft daylight, and natural shadows that highlight fabric textures, jewelry gleam, and floral details. The overall atmosphere should evoke a timeless festive portrait, elegant yet rooted in cultural authenticity.",
                          "women-5"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "women-5" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 6 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Women</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwXyDTC27Bt3KSY7wnDLHrzE2elpbQuU4OX9ax"
                    alt="Rustic Rain Balcony"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Rustic Rain Balcony</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Then Generate a highly realistic editorial photo using my uploaded selfie as the exact face — preserve my facial identity, features, and proportions naturally without altering them. Ensure seamless face integration with perfect blending of skin tone, lighting, and shadows. I am styled in a traditional Indian look wearing a rustic burnt-orange cotton saree...
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('Rustic Rain Balcony - AI Prompt', 'Check out this amazing AI prompt for creating rustic portraits!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Then Generate a highly realistic editorial photo using my uploaded selfie as the exact face — preserve my facial identity, features, and proportions naturally without altering them. Ensure seamless face integration with perfect blending of skin tone, lighting, and shadows. I am styled in a traditional Indian look wearing a rustic burnt-orange cotton saree with a simple blouse. The saree drapes naturally, with soft, realistic folds and textures that evoke authenticity. The blouse is short-sleeved, fitted, and complements the earthy color palette of the saree. My hair is styled in a loosely braided side plait, slightly tousled to create a natural, romantic look. A tiny red bindi adorns my forehead, completing the traditional vibe. I am leaning gently against an old wooden balcony railing, one hand resting on the edge, the other arm bent behind me. My gaze is turned slightly to the side, looking outward with a thoughtful, graceful expression. The framing should show me from the waist up, highlighting the saree drape, my braid, and my natural posture. A rustic old building with weathered walls and peeling paint, featuring a distressed wooden balcony. Subtle rain droplets are visible in the scene, adding to the cinematic atmosphere. The lighting should be soft and moody, evoking the nostalgic warmth of a monsoon evening, with natural daylight filtering through the overcast sky. The overall mood should feel cinematic, intimate, and vintage, as if captured from a period drama or an old Indian film still. The tones should be warm, earthy, and slightly muted, enhancing the texture of the saree and the rustic setting. The photograph must feel timeless, nostalgic, and deeply evocative.",
                          "women-6"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "women-6" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 7 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Women</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwK5TsQECEz9Sj47VuOge2ClmtwhGY5F1ALcPk"
                    alt="Black Lehenga Editorial"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Black Lehenga Editorial</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Then generate a highly realistic full-body fashion editorial photo using my uploaded selfie as the exact face — preserve my facial identity, features, and proportions naturally without altering them. Ensure seamless face integration with perfect blending of skin tone, lighting, and shadows. I am styled in an Indian traditional lehenga look...
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('Black Lehenga Editorial - AI Prompt', 'Check out this amazing AI prompt for creating lehenga portraits!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Then generate a highly realistic full-body fashion editorial photo using my uploaded selfie as the exact face — preserve my facial identity, features, and proportions naturally without altering them. Ensure seamless face integration with perfect blending of skin tone, lighting, and shadows. I am styled in an Indian traditional lehenga look, evoking the elegance of a high-end ethnic fashion shoot. The outfit is a black lehenga with intricate golden floral embroidery and motifs across the skirt. The lehenga has a wide spread, creating a circular, regal flow around me as I sit. The blouse is red with gold detailing, a deep neckline, and short sleeves featuring embroidered borders. A sheer black dupatta with delicate floral embroidery is draped gracefully across my shoulder and arm, edged with golden borders and hints of navy detailing. I am sitting elegantly on the floor, lehenga spread out in a circular formation around me. My posture is upright yet relaxed, with one arm resting gently on my knee and the other hand placed naturally. My head is tilted slightly upward, looking softly at the camera, creating a graceful, poised, and captivating expression. The frame should capture me from head to toe, showing the full spread of the lehenga and centered composition. Smooth wooden flooring in natural daylight. The soft lighting enhances the richness of the fabric, embroidery, and my skin tone, adding depth and realism. Shadows should be crisp yet natural, evoking the polished look of a professional studio-like shoot set in a real environment. The overall feel should be cinematic, polished, and editorial-quality, as if shot for a luxury Indian bridal/fashion campaign. Ensure high realism, maintaining authenticity of fabric textures, embroidery details, skin, and face blending.",
                          "women-7"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "women-7" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 8 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Women</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwL5BqSZObUuOwQ3JFylTsXkfHctSMIBCxvrDj"
                    alt="Temple Saree Grace"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Temple Saree Grace</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Hyper-realistic portrait of a woman wearing a traditional green silk saree with a broad golden border, paired with temple jewelry and a waist belt. She stands in front of a South Indian temple gopuram, smiling gracefully while gently holding her saree pleats. Background features temple architecture in soft focus. Cinematic HDR, vintage traditional realism, 8K detail.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('Temple Saree Grace - AI Prompt', 'Check out this amazing AI prompt for creating temple portraits!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Hyper-realistic portrait of a woman wearing a traditional green silk saree with a broad golden border, paired with temple jewelry and a waist belt. She stands in front of a South Indian temple gopuram, smiling gracefully while gently holding her saree pleats. Background features temple architecture in soft focus. Cinematic HDR, vintage traditional realism, 8K detail.",
                          "women-8"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "women-8" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 9 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Women</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwQ2xoK9to4iDVqPSE2G8d0fgRysWrx9mC3vcY"
                    alt="Rainy Street Walk"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Rainy Street Walk</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Hyper-realistic cinematic portrait of a woman in a dark green traditional saree with golden and maroon borders. She walks barefoot on a wet street after rain, holding her saree pleats with one hand. Her hair is styled in a bun decorated with jasmine flowers, wearing gold earrings and bangles. Background is an old town street, softly blurred. Vintage cinematic realism, ultra-detailed 8K.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('Rainy Street Walk - AI Prompt', 'Check out this amazing AI prompt for creating rainy street portraits!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Hyper-realistic cinematic portrait of a woman in a dark green traditional saree with golden and maroon borders. She walks barefoot on a wet street after rain, holding her saree pleats with one hand. Her hair is styled in a bun decorated with jasmine flowers, wearing gold earrings and bangles. Background is an old town street, softly blurred. Vintage cinematic realism, ultra-detailed 8K.",
                          "women-9"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "women-9" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 10 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Women</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwGWpGTEBsXRletSyFPif3JqbwdE0nUhCmI89B"
                    alt="Pastel Barbie Gown"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Pastel Barbie Gown</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Front view, 4K HD realistic, a stunning portrait of a young Indian woman with the exact same face (no alteration, 100% identical to the uploaded reference). She has long, dark, wavy hair cascading over her shoulders. She is wearing a dreamy Barbie-style gown in pastel pink with soft shimmering layers, delicate floral details, and a flowing skirt...
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('Pastel Barbie Gown - AI Prompt', 'Check out this amazing AI prompt for creating Barbie-style portraits!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Front view, 4K HD realistic, a stunning portrait of a young Indian woman with the exact same face (no alteration, 100% identical to the uploaded reference). She has long, dark, wavy hair cascading over her shoulders. She is wearing a dreamy Barbie-style gown in pastel pink with soft shimmering layers, delicate floral details, and a flowing skirt. White flowers are tucked behind her right ear. She is looking slightly to her right, with a soft, serene, and graceful expression.",
                          "women-10"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "women-10" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 11 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Women</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwWQewbBUGn0A6bF5yLp2EtrRBMslG4CHkwIXm"
                    alt="Floral Wall Bouquet"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Floral Wall Bouquet</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    A captivating portrait of a young woman with a radiant smile, wearing a light pink knitted sweater. She holds a vibrant bouquet of orange, pink, and yellow flowers close to her chest, her gaze directed warmly at the viewer. She is positioned next to an old stone wall, which is richly covered in climbing flowers of similar hues, creating a beautiful floral backdrop...
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('Floral Wall Bouquet - AI Prompt', 'Check out this amazing AI prompt for creating floral portraits!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "A captivating portrait of a young woman with a radiant smile, wearing a light pink knitted sweater. She holds a vibrant bouquet of orange, pink, and yellow flowers close to her chest, her gaze directed warmly at the viewer. She is positioned next to an old stone wall, which is richly covered in climbing flowers of similar hues, creating a beautiful floral backdrop. The setting is outdoors with soft, warm golden hour lighting, suggesting either sunrise or sunset, with a hint of lush greenery and distant natural scenery blurred in the background, adding depth to the image. The overall mood is joyful, serene, and picturesque, with a shallow depth of field to keep the focus on the woman and the flowers.",
                          "women-11"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "women-11" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          )}

          {/* Men Category - Gallery */}
          {(selectedCategory === "All" || selectedCategory === "Men") && (
          <section className="space-y-6 mt-16">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Image 1 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Men</span>
                  </div>
                  <img
                  src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwKFQ67ApCEz9Sj47VuOge2ClmtwhGY5F1ALcP"
                    alt="Stylish Man Portrait"
                  loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Stylish Man Portrait</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Realistic ultra-clear close-up shot 120mm zoom lens portrait of a stylish young man sitting, right hand touching modern brown hanging swing chair. He has hair, face, eye mouths (same upload image generateland looking the camera conference. He is dressed in a light beige textured button-up shirt with sleeves rolled up, black baggy pants, and white and black color sneakers. A smartwatch. The background features outdoor chairs, greenery, and a colorful amusement park-like at sunsets time.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('Stylish Man Portrait - AI Prompt', 'Check out this amazing AI prompt for creating stylish male portraits!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                  <button
                    onClick={() =>
                      copyPromptLandingStyle(
                        "realistic ultra-clear close-up shot 120mm zoom lens portrait of a stylish young man sitting, right hand touching modern brown hanging swing chair. He has hair, face, eye mouths (same upload image generateland looking the camera conference. He is dressed in a light beige textured button-up shirt with sleeves rolled up, black baggy pants, and white and black color sneakers. A smartwatch. The background features outdoor chairs, greenery, and a colorful amusement park-like at sunsets time",
                        "men-1"
                      )
                    }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "men-1" ? "Copied!" : "Copy Prompt"}
                  </button>
                  </div>
                </div>
              </div>

              {/* Image 2 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Men</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwvVnSihqr4RWh2BzsnfQYAoV8uCFUqGg1k5lv"
                    alt="Cinematic Low-light Portrait"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Cinematic Low-light Portrait</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    A cinematic low-light portrait of a stylish South Asian man lounging on a vintage leather couch, wearing an open button silk shirt, layered necklace, and round sunglasses. He holds a cigar in one hand and a crystal glass of whiskey in the other. Warm golden light highlights the smoke around him, while the background stays dark and moody. Expression confident, exuding power and calm authority. Ultra photorealistic, cinematic shadows, 8K quality.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('Cinematic Low-light Portrait - AI Prompt', 'Check out this amazing AI prompt for creating cinematic male portraits!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "A cinematic low-light portrait of a stylish South Asian man lounging on a vintage leather couch, wearing an open button silk shirt, layered necklace, and round sunglasses. He holds a cigar in one hand and a crystal glass of whiskey in the other. Warm golden light highlights the smoke around him, while the background stays dark and moody. Expression confident, exuding power and calm authority. Ultra photorealistic, cinematic shadows, 8K quality.",
                          "men-2"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "men-2" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 3 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Men</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwpXSpWieNu726RMeTXDadHG1zIB3tvw84Ynxh"
                    alt="90s Vintage Editorial"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">90s Vintage Editorial</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    A 90s vintage editorial-style portrait of a young man (face reference from uploaded photo) leaning casually against an old rustic doorway. He poses with one hand gripping the chipped wooden door and the other tucked in his black pleated trousers, exuding effortless confidence.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('90s Vintage Editorial - AI Prompt', 'Check out this amazing AI prompt for creating vintage male portraits!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "A 90s vintage editorial-style portrait of a young man (face reference from uploaded photo) leaning casually against an old rustic doorway. He poses with one hand gripping the chipped wooden door and the other tucked in his black pleated trousers, exuding effortless confidence.",
                          "men-3"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "men-3" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 4 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Men</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwF3kNHbdIoRsHkT3nZS6YcalbweLB5izVrGJA"
                    alt="Rainy Street Portrait"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Rainy Street Portrait</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Create a cinematic portrait of the subject standing beneath a glowing streetlight on a rainy night. The subject holds an umbrella, raindrops glistening and wet reflections glowing on the ground. The outfit is casual but stylish, like a jacket and jeans. Background: dark rainy street with blurred neon signs and reflections. Lighting: warm-yellow streetlight combined with cooler bluish tones in the background. Mood: dreamy, melancholic, romantic, like a scene from an arthouse film. Style: realistic cinematic portrait, sharp focus on face and raindrops, soft bokeh lights in background.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('Rainy Street Portrait - AI Prompt', 'Check out this amazing AI prompt for creating rainy street portraits!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Create a cinematic portrait of the subject standing beneath a glowing streetlight on a rainy night. The subject holds an umbrella, raindrops glistening and wet reflections glowing on the ground. The outfit is casual but stylish, like a jacket and jeans. Background: dark rainy street with blurred neon signs and reflections. Lighting: warm-yellow streetlight combined with cooler bluish tones in the background. Mood: dreamy, melancholic, romantic, like a scene from an arthouse film. Style: realistic cinematic portrait, sharp focus on face and raindrops, soft bokeh lights in background.",
                          "men-4"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "men-4" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 5 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Men</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwXovxEO7Bt3KSY7wnDLHrzE2elpbQuU4OX9ax"
                    alt="Mysterious Pigeon Portrait"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Mysterious Pigeon Portrait</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    A mysterious black-and-white cinematic portrait of a young slim body man in a long dark trench coat, surrounded by pigeons flying dramatically around him. Some pigeons fly very close to the camera, wings blurred in motion, others perch on his shoulder. His expression is serious and enigmatic, half of his face obscured by a pigeon in the foreground. Moody lighting with strong shadows and highlights, high-contrast monochrome film style, grainy analog texture, surreal mystical fashion.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('Mysterious Pigeon Portrait - AI Prompt', 'Check out this amazing AI prompt for creating mysterious portraits!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "A mysterious black-and-white cinematic portrait of a young slim body man in a long dark trench coat, surrounded by pigeons flying dramatically around him. Some pigeons fly very close to the camera, wings blurred in motion, others perch on his shoulder. His expression is serious and enigmatic, half of his face obscured by a pigeon in the foreground. Moody lighting with strong shadows and highlights, high-contrast monochrome film style, grainy analog texture, surreal mystical fashion",
                          "men-5"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "men-5" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 6 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Men</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw6d6hpXR53SnutNYHFlcKhsWkDoeapCyiRLgf"
                    alt="Black and White Aesthetic Portrait"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Black and White Aesthetic Portrait</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Use my image with the face kept 100% accurate, exactly the same (do not alter my facial features, keep my identity intact). Create a black-and-white aesthetic portrait of me sitting on the floor in dramatic lighting. I am wearing an oversized dark coat. My pose is emotional and introspective, with one hand near my mouth and my head slightly turned to the side. Shadows from a window fall across the wall behind me, creating a moody and artistic atmosphere. The overall vibe is mysterious, emotional, and cinematic.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('Black and White Aesthetic Portrait - AI Prompt', 'Check out this amazing AI prompt for creating aesthetic portraits!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Use my image with the face kept 100% accurate, exactly the same (do not alter my facial features, keep my identity intact). Create a black-and-white aesthetic portrait of me sitting on the floor in dramatic lighting. I am wearing an oversized dark coat. My pose is emotional and introspective, with one hand near my mouth and my head slightly turned to the side. Shadows from a window fall across the wall behind me, creating a moody and artistic atmosphere. The overall vibe is mysterious, emotional, and cinematic.",
                          "men-6"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "men-6" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 7 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Men</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOweDNmcixc9HQ3GZfqXJBtES2vMxYF5pV0bsCO"
                    alt="Retro Futuristic Café Portrait"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Retro Futuristic Café Portrait</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Create a retro yet futuristic portrait of the subject sitting in a cozy café corner, styled in 90s vintage outfit with wired headphones, sipping coffee. Background: neon holographic menus glowing on café walls, soft vaporwave aesthetic. Lighting: mix of warm café light and glowing neon pink-blue reflections. Mood: nostalgic yet futuristic, cozy cyberpunk slice-of-life. Style: realistic cinematic portrait with Pinterest-like retro-futuristic tones.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('Retro Futuristic Café Portrait - AI Prompt', 'Check out this amazing AI prompt for creating retro-futuristic portraits!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Create a retro yet futuristic portrait of the subject sitting in a cozy café corner, styled in 90s vintage outfit with wired headphones, sipping coffee. Background: neon holographic menus glowing on café walls, soft vaporwave aesthetic. Lighting: mix of warm café light and glowing neon pink-blue reflections. Mood: nostalgic yet futuristic, cozy cyberpunk slice-of-life. Style: realistic cinematic portrait with Pinterest-like retro-futuristic tones.",
                          "men-7"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "men-7" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 8 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Men</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw1mYjRUIKKMiwgGY1SZHo49FzdOE8cbm0rJCs"
                    alt="90s Movie Hair Baddie"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">90s Movie Hair Baddie</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Create a retro vintage grainy but bright image of the reference picture but draped in a perfect black colour suit Pinteresty aesthetic retro pants. It must feel like a '90s movie hair baddie with a small flower bookey in hand and romanticising a windy environment. The man is standing against a solid deep shadow and contrast drama, creating a mysterious and artistic atmosphere where the lighting is warm with golden tones evoking a sunset or golden hour glow. The background is minimalist.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('90s Movie Hair Baddie - AI Prompt', 'Check out this amazing AI prompt for creating retro movie-style portraits!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Create a retro vintage grainy but bright image of the reference picture but draped in a perfect black colour suit Pinteresty aesthetic retro pants. It must feel like a '90s movie hair baddie with a small flower bookey in hand and romanticising a windy environment. The man is standing against a solid deep shadow and contrast drama, creating a mysterious and artistic atmosphere where the lighting is warm with golden tones evoking a sunset or golden hour glow. The background is minimalist",
                          "men-8"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "men-8" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 9 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Men</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw2YGGidPdNwuUS4GmpFVAx9MIeP0Cc38hkJ1T"
                    alt="Burning Newspaper Editorial"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Burning Newspaper Editorial</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Cinematic editorial photograph of person holding up a burning newspaper, flames curling dramatically around paper edges. Newspaper headline reads bold text with modern typography, editorial style layout, featuring black and white images and quotes. Subject is dressed in sharp black suit. Dark background enhances fires glow, creating contrast with warm highlights on subjects clothing. Use the reference image for the face to maintain likeness. Ultra-detailed, high-contrast lighting.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('Burning Newspaper Editorial - AI Prompt', 'Check out this amazing AI prompt for creating dramatic editorial portraits!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Cinematic editorial photograph of person holding up a burning newspaper, flames curling dramatically around paper edges. Newspaper headline reads bold text with modern typography, editorial style layout, featuring black and white images and quotes. Subject is dressed in sharp black suit. Dark background enhances fires glow, creating contrast with warm highlights on subjects clothing. Use the reference image for the face to maintain likeness. Ultra-detailed, high-contrast lighting,",
                          "men-9"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "men-9" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 10 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Men</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwuvNAbMyOx8QSKjRDgENotv2CseWp9U4PY7Hf"
                    alt="Moody Studio Portrait"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Moody Studio Portrait</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Prompt: moody studio portrait of the upload person, bethed in golden-orange spotlight that create glowing circular halo behind Thema on the wall. The warm light should sculpt the face and upper body with soft, sunset-like tones, while casting s strong head shadow to the right. Style the person. Her eye are closed and chin tilted slightly up.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('Moody Studio Portrait - AI Prompt', 'Check out this amazing AI prompt for creating moody studio portraits!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Prompt: moody studio portrait of the upload person, bethed in golden-orange spotlight that create glowing circular halo behind Thema on the wall. The warm light should sculpt the face and upper body with soft, sunset-like tones, while casting s strong head shadow to the right. Style the person. Her eye are closed and chin tilted slightly up",
                          "men-10"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "men-10" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 11 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Men</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwpV2VlaeNu726RMeTXDadHG1zIB3tvw84Ynxh"
                    alt="Red Wine Vintage Portrait"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Red Wine Vintage Portrait</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Create a retro vintage grainy but bright image of the reference picture but draped in a perfect red wine color Pinteresty aesthetic retro shirt with white pant and holding a rose flower in hands. It must feel like a 90s movie and romanticising windy environment. The boy is standing against a solid wall deep shadows and contrast drama, creating a mysterious and artistic atmosphere where the lighting is warm with a golden tones of evoking a sunset or golden hour glow. The background is minimalist and slightly textured. The expression on her face is moody, calm yet happy and introspective. Use the face from the uploaded reference image and preserve the same facial features — do not alter the face.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('Red Wine Vintage Portrait - AI Prompt', 'Check out this amazing AI prompt for creating vintage portraits!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Create a retro vintage grainy but bright image of the reference picture but draped in a perfect red wine color Pinteresty aesthetic retro shirt with white pant and holding a rose flower in hands. It must feel like a 90s movie and romanticising windy environment. The boy is standing against a solid wall deep shadows and contrast drama, creating a mysterious and artistic atmosphere where the lighting is warm with a golden tones of evoking a sunset or golden hour glow. The background is minimalist and slightly textured. The expression on her face is moody, calm yet happy and introspective. Use the face from the uploaded reference image and preserve the same facial features — do not alter the face.",
                          "men-11"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "men-11" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 12 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Men</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwsX0t1VrA9yP62t1XhHlQpzUKS8a4MNTRjOom"
                    alt="Luxury Yacht Portrait"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Luxury Yacht Portrait</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    The project involves creating an ultra-realistic 8K cinematic full-body portrait from an uploaded image, ensuring strict 100% face-reference alignment. A young Indian man reclines barefoot on a luxury yacht at sunset, confident and stylish. Outfit: a flowing black silk shirt, slightly unbuttoned, paired with tailored high-waist white trousers. His hair is tousled in the sea breeze, paired with sleek sunglasses, a minimal leather strap watch, and a sleek wallet by his side. Background: ocean.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('Luxury Yacht Portrait - AI Prompt', 'Check out this amazing AI prompt for creating luxury lifestyle portraits!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "The project involves creating an ultra-realistic 8K cinematic full-body portrait from an uploaded image, ensuring strict 100% face-reference alignment. A young Indian man reclines barefoot on a luxury yacht at sunset, confident and stylish. Outfit: a flowing black silk shirt, slightly unbuttoned, paired with tailored high-waist white trousers. His hair is tousled in the sea breeze, paired with sleek sunglasses, a minimal leather strap watch, and a sleek wallet by his side. Background: ocean",
                          "men-12"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "men-12" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 13 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Men</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwh9rSfonL1yHDPmZnwgCOA8EKibXWT0MBsc9U"
                    alt="Beige Wall Portrait"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Beige Wall Portrait</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    A South Asian man standing against a warm beige wall, dressed in a relaxed yet elegant outfit: an off-white linen shirt with rolled-up sleeves and slightly unbuttoned collar, tucked into high-waisted beige trousers with a belt. The lighting is soft and golden, casting dramatic shadows across the wall for a cinematic effect. His pose is calm and introspective, with one hand in his pocket and head slightly tilted down, giving a thoughtful and stylish atmosphere.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('Beige Wall Portrait - AI Prompt', 'Check out this amazing AI prompt for creating elegant wall portraits!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "A South Asian man standing against a warm beige wall, dressed in a relaxed yet elegant outfit: an off-white linen shirt with rolled-up sleeves and slightly unbuttoned collar, tucked into high-waisted beige trousers with a belt. The lighting is soft and golden, casting dramatic shadows across the wall for a cinematic effect. His pose is calm and introspective, with one hand in his pocket and head slightly tilted down, giving a thoughtful and stylish atmosphere.",
                          "men-13"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "men-13" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          )}

          {/* Baby Category - Gallery (Baby Girl) */}
          {(selectedCategory === "All" || selectedCategory === "Baby") && (
          <section className="space-y-6 mt-16">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {/* Image 1 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Baby</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwwAXWqTkNi0m4VxOsT8326pgFSDWGbXqnh5Bf"
                    alt="Garden Water Play"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Garden Water Play</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Create a retro vintage grainy but bright image of the reference picture, without changing the face, but dressed in a soft white summer dress KNEE LENGTH with delicate frills. The3.5-year-old baby girl is playing in a beautiful garden surrounded by flowers, greenery, and gentle sunlight. Her shoulder length curly hair flows naturally with a few tiny flowers tucked in, giving a dreamy and innocent charm. The atmosphere should feel whimsical and magical, with soft shadows, bright light, and a nostalgic, artistic aesthetic. Her pose should suggest that she is spraying water upwards in a hose pipe and playing, where deep shadows and dramatic contrasts add mystery and artistry to the scene, creating a moody yet enchanting cinematic effect. line a sunset or golden our time of the day. Fine droplets of water clearly visible on her face eyelashes and skin making her look radiant and cute in the rain. she can be facing upwards with a naughty and cute expression. the atmosphere is dreamy and vibrant, not dull with a soft golden touch.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Garden Water Play - AI Prompt',
                        'Check out this amazing AI prompt for creating adorable baby garden photos!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Create a retro vintage grainy but bright image of the reference picture, without changing the face, but dressed in a soft white summer dress KNEE LENGTH with delicate frills. The3.5-year-old baby girl is playing in a beautiful garden surrounded by flowers, greenery, and gentle sunlight. Her shoulder length curly hair flows naturally with a few tiny flowers tucked in, giving a dreamy and innocent charm. The atmosphere should feel whimsical and magical, with soft shadows, bright light, and a nostalgic, artistic aesthetic. Her pose should suggest that she is spraying water upwards in a hose pipe and playing, where deep shadows and dramatic contrasts add mystery and artistry to the scene, creating a moody yet enchanting cinematic effect. line a sunset or golden our time of the day. Fine droplets of water clearly visible on her face eyelashes and skin making her look radiant and cute in the rain. she can be facing upwards with a naughty and cute expression. the atmosphere is dreamy and vibrant, not dull with a soft golden touch.",
                          "baby-girl-1"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "baby-girl-1" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 2 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Baby</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwmiaj6vFQsyraRhvPnxS68Ajwm5eEfOL4H31D"
                    alt="Garden Swing"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Garden Swing</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Create a 3 year baby girl from this uploaded photo. She has long, flowing hair styled in loose waves, and a fresh, clean look. She is wearing a beautifully embroidered frock in a vibrant orange hue, with delicate mirror work. She is gracefully seated on a wooden swing, holding small yellow flowers in both hands, offering one towards with a warm smile. The background is a lush, vibrant garden filled with colorful marigolds and blooming flowers with a golden hour glow.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('Garden Swing - AI Prompt', 'Check out this amazing AI prompt for creating beautiful baby swing photos!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Create a 3 year baby girl from this uploaded photo. She has long, flowing hair styled in loose waves, and a fresh, clean look. She is wearing a beautifully embroidered frock in a vibrant orange hue, with delicate mirror work. She is gracefully seated on a wooden swing, holding small yellow flowers in both hands, offering one towards with a warm smile. The background is a lush, vibrant garden filled with colorful marigolds and blooming flowers with a golden hour glow.",
                          "baby-girl-2"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "baby-girl-2" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 3 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Baby</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw4Fj3loaYFX86A5gi7HbrqUwvNzJdpP9B4RST"
                    alt="Happy Clapping"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Happy Clapping</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Create a retro vintage grainy but bright image of the reference picture, without changing the face, but dressed in a soft white summer dress KNEE LENGTH with delicate frills. The 3.5-year-old baby girl is PLAYING in a beautiful garden surrounded by flowers, greenery, and gentle sunlight. Her shoulder length curly hair flows naturally with a few tiny flowers tucked in, giving a dreamy and innocent charm. The atmosphere should feel whimsical and magical, with soft shadows, bright light, and a nostalgic, artistic aesthetic. Her pose should suggest that she is CLAPPING HER HANDS HAPPILY. It drizzles softy, where deep shadows and dramatic contrasts add mystery and artistry to the scene, creating a moody yet enchanting cinematic effect. line a sunset or golden our time of the day. Fine rain drops clearly visible on her face eyelashes and skin making her look radiant and cute in the rain. the atmosphere is dreamy and vibrant, not dull. with a soft golden touch.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('Happy Clapping - AI Prompt', 'Check out this amazing AI prompt for creating joyful baby photos!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Create a retro vintage grainy but bright image of the reference picture, without changing the face, but dressed in a soft white summer dress KNEE LENGTH with delicate frills. The 3.5-year-old baby girl is PLAYING in a beautiful garden surrounded by flowers, greenery, and gentle sunlight. Her shoulder length curly hair flows naturally with a few tiny flowers tucked in, giving a dreamy and innocent charm. The atmosphere should feel whimsical and magical, with soft shadows, bright light, and a nostalgic, artistic aesthetic. Her pose should suggest that she is CLAPPING HER HANDS HAPPILY. It drizzles softy, where deep shadows and dramatic contrasts add mystery and artistry to the scene, creating a moody yet enchanting cinematic effect. line a sunset or golden our time of the day. Fine rain drops clearly visible on her face eyelashes and skin making her look radiant and cute in the rain. the atmosphere is dreamy and vibrant, not dull. with a soft golden touch.",
                          "baby-girl-3"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "baby-girl-3" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 4 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Baby</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwTjllYXpH8xseo7JY4wrVvp9IzPcy3ZjtRUFM"
                    alt="Fountain Play"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Fountain Play</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Create a retro vintage grainy but bright image of the reference picture, without changing the face, but dressed in a soft white summer dress KNEE LENGTH with delicate frills. The 3.5-year-old baby girl is sitting in a beautiful garden surrounded by flowers, greenery, and gentle sunlight. Her shoulder length curly hair flows naturally with a few tiny flowers tucked in, giving a dreamy and innocent charm. The atmosphere should feel whimsical and magical, with soft shadows, bright light, and a nostalgic, artistic aesthetic. Her pose should suggest that she is sitting down near a fountain with her legs immersed in the fountain water. It drizzles softy, where deep shadows and dramatic contrasts add mystery and artistry to the scene, creating a moody yet enchanting cinematic effect. line a sunset or golden our time of the day. Fine rain drops clearly visible on her face eyelashes and skin making her look radiant and cute in the rain. the atmosphere is dreamy and vibrant, not dull. with a soft golden touch. make the lighting as dreamy as possible.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('Fountain Play - AI Prompt', 'Check out this amazing AI prompt for creating magical baby fountain photos!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Create a retro vintage grainy but bright image of the reference picture, without changing the face, but dressed in a soft white summer dress KNEE LENGTH with delicate frills. The 3.5-year-old baby girl is sitting in a beautiful garden surrounded by flowers, greenery, and gentle sunlight. Her shoulder length curly hair flows naturally with a few tiny flowers tucked in, giving a dreamy and innocent charm. The atmosphere should feel whimsical and magical, with soft shadows, bright light, and a nostalgic, artistic aesthetic. Her pose should suggest that she is sitting down near a fountain with her legs immersed in the fountain water. It drizzles softy, where deep shadows and dramatic contrasts add mystery and artistry to the scene, creating a moody yet enchanting cinematic effect. line a sunset or golden our time of the day. Fine rain drops clearly visible on her face eyelashes and skin making her look radiant and cute in the rain. the atmosphere is dreamy and vibrant, not dull. with a soft golden touch. make the lighting as dreamy as possible.",
                          "baby-girl-4"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "baby-girl-4" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          )}

          {/* Baby Category - Gallery (Baby Boy) */}
          {(selectedCategory === "All" || selectedCategory === "Baby") && (
          <section className="space-y-6 mt-16">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {/* Image 1 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Baby</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwLgBpIwObUuOwQ3JFylTsXkfHctSMIBCxvrDj"
                    alt="Vintage Studio Portrait"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Vintage Studio Portrait</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Use the exact face of the baby in the reference photo without altering facial features or identity. Photorealistic baby portrait in a vintage-inspired indoor studio. A baby with soft features, short dark hair, and expressive eyes is sitting on a wooden floor, wearing a light blue knit romper with a cream collar and button details. The baby is holding a fluffy brown teddy bear and gazing slightly upward with a curious expression.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('Vintage Studio Portrait - AI Prompt', 'Check out this amazing AI prompt for creating adorable baby studio photos!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Use the exact face of the baby in the reference photo without altering facial features or identity. Photorealistic baby portrait in a vintage-inspired indoor studio. A baby with soft features, short dark hair, and expressive eyes is sitting on a wooden floor, wearing a light blue knit romper with a cream collar and button details. The baby is holding a fluffy brown teddy bear and gazing slightly upward with a curious expression.",
                          "baby-boy-1"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "baby-boy-1" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 2 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Baby</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwljgd1Wq04S3xi5AcUH7YKGTCQzhJXPnpgo2V"
                    alt="White Fashion Editorial"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">White Fashion Editorial</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Take the face from the attached photo , same 100% same , he is a kid A stylish kid in a sleek, all-white outfit poses confidently against a pitch-white house background. He wears a tailored white suit, a white shirt with the top buttons open, and a subtle silver chain around his neck. He sports white sunglasses , exuding charisma and mystery. A luxury wristwatch glints on his left wrist. The lighting is dramatic, highlighting his facial features and casting soft shadows, creating a bold, high-fashion editorial look.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('White Fashion Editorial - AI Prompt', 'Check out this amazing AI prompt for creating stylish baby fashion photos!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Take the face from the attached photo , same 100% same , he is a kid A stylish kid in a sleek, all-white outfit poses confidently against a pitch-white house background. He wears a tailored white suit, a white shirt with the top buttons open, and a subtle silver chain around his neck. He sports white sunglasses , exuding charisma and mystery. A luxury wristwatch glints on his left wrist. The lighting is dramatic, highlighting his facial features and casting soft shadows, creating a bold, high-fashion editorial look.",
                          "baby-boy-2"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "baby-boy-2" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 3 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Baby</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwEJqpPmjCfTambo7hxXWv36wH15tjIge0iBdr"
                    alt="Vintage Suitcase Portrait"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Vintage Suitcase Portrait</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Take the face from the attached photo , same 100% same , he is a kid A stylish kid, facial will be the same as the reference image, with sharp features and dark tousled hair parted naturally. He is leaning casually against a vintage suitcase. He wears a textured brown blazer over an open-collar dark brown shirt, slightly unbuttoned at the top, paired with high-waisted light beige pleated trousers and a dark belt. The aesthetic is elegant and retro-inspired, with earthy tones. Minimalistic indoor background, cinematic warm natural lighting.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('Vintage Suitcase Portrait - AI Prompt', 'Check out this amazing AI prompt for creating stylish baby vintage photos!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Take the face from the attached photo , same 100% same , he is a kid A stylish kid, facial will be the same as the reference image, with sharp features and dark tousled hair parted naturally. He is leaning casually against a vintage suitcase. He wears a textured brown blazer over an open-collar dark brown shirt, slightly unbuttoned at the top, paired with high-waisted light beige pleated trousers and a dark belt. The aesthetic is elegant and retro-inspired, with earthy tones. Minimalistic indoor background, cinematic warm natural lighting.",
                          "baby-boy-3"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "baby-boy-3" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 4 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Baby</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwLAoxGoObUuOwQ3JFylTsXkfHctSMIBCxvrDj"
                    alt="90s Movie Style"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">90s Movie Style</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Take the face from the attached reference photo exactly 100% the same (do not alter his facial features, keep his identity intact). He is a kid. Create a retro, vintage-inspired, grainy yet bright image where the boy is dressed in a perfect black suit with Pinterest-style retro pants. The mood should feel like a 90s movie hair baddie. He holds a bunch of red roses in one hand while the other hand rests in his pocket, romanticizing a windy environment. The young boy stands against a solid deep shadow with dramatic contrast, evoking mystery and artistry. The lighting must be warm and golden, resembling a sunset or golden hour glow.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare('90s Movie Style - AI Prompt', 'Check out this amazing AI prompt for creating retro baby movie-style photos!')}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Take the face from the attached reference photo exactly 100% the same (do not alter his facial features, keep his identity intact). He is a kid. Create a retro, vintage-inspired, grainy yet bright image where the boy is dressed in a perfect black suit with Pinterest-style retro pants. The mood should feel like a 90s movie hair baddie. He holds a bunch of red roses in one hand while the other hand rests in his pocket, romanticizing a windy environment. The young boy stands against a solid deep shadow with dramatic contrast, evoking mystery and artistry. The lighting must be warm and golden, resembling a sunset or golden hour glow.",
                          "baby-boy-4"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "baby-boy-4" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          )}

          {/* Navratri Special Category - Gallery */}
          {(selectedCategory === "All" || selectedCategory === "Navratri Special") && (
          <section className="space-y-6 mt-16">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {/* Image 1 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Navratri Special</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwHNAjCBvcTbexiRGQSaVPyjDLoh0Nw7C31uA2"
                    alt="Night Festival Editorial"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Night Festival Editorial</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Generate a highly realistic night-time editorial photo using my uploaded selfie as the exact face—preserve my facial identity, features, undertones, and proportions without altering them. Match lighting, shadows, and makeup to the scene; keep natural skin texture. Nothing changes except the face. Create an outdoor festive setting at night with rows of warm fairy lights stretching horizontally across the background as soft bokeh. Distant practicals glow near the horizon. Ground is an open sandy/paved courtyard with subtle repeating texture; long, soft shadows. Wardrobe and styling (match exactly): black spaghetti-strap crop top; rich black lehenga with gold brocade motifs; a deep maroon dupatta with gold border draped from the right shoulder and falling down the front; oxidized silver jewelry—statement choker, large earrings, stacked bangles/bracelet; a slim silver floral waist chain (kamarbandh). No bindi, no sindoor, no extra jewelry or props. Pose and expression: full-length, centered. Both elbows raised; hands near the ears/neck as if adjusting jewelry. Torso open and relaxed; head turned slightly left with a soft, content smile and eyes looking into the distance. Keep hands/fingers and garment folds anatomically correct. Lighting and mood: warm ambient tungsten from the string lights with gentle front fill; clean highlights on jewelry; subtle rim on hair/shoulders; shallow depth of field so the lights blur while I stay sharp. Add a light filmic grain for realism. Identity rules: use ONLY my selfie to lock identity; preserve exact facial geometry and natural asymmetry. Remove any selfie accessories (glasses, cap, earbuds). Negative instructions: no plastic skin or harsh HDR/oversharpening, no warped hands/waist chain/dupattā, no text or watermark, no outfit or background changes, no cartoon/AI look, and no mismatched tones between face, neck, and midriff. Output: high-resolution color image matching this composition and styling with my exact face seamlessly integrated.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Night Festival Editorial - AI Prompt',
                        'Check out this amazing AI prompt for creating festive night portraits!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Generate a highly realistic night-time editorial photo using my uploaded selfie as the exact face—preserve my facial identity, features, undertones, and proportions without altering them. Match lighting, shadows, and makeup to the scene; keep natural skin texture. Nothing changes except the face. Create an outdoor festive setting at night with rows of warm fairy lights stretching horizontally across the background as soft bokeh. Distant practicals glow near the horizon. Ground is an open sandy/paved courtyard with subtle repeating texture; long, soft shadows. Wardrobe and styling (match exactly): black spaghetti-strap crop top; rich black lehenga with gold brocade motifs; a deep maroon dupatta with gold border draped from the right shoulder and falling down the front; oxidized silver jewelry—statement choker, large earrings, stacked bangles/bracelet; a slim silver floral waist chain (kamarbandh). No bindi, no sindoor, no extra jewelry or props. Pose and expression: full-length, centered. Both elbows raised; hands near the ears/neck as if adjusting jewelry. Torso open and relaxed; head turned slightly left with a soft, content smile and eyes looking into the distance. Keep hands/fingers and garment folds anatomically correct. Lighting and mood: warm ambient tungsten from the string lights with gentle front fill; clean highlights on jewelry; subtle rim on hair/shoulders; shallow depth of field so the lights blur while I stay sharp. Add a light filmic grain for realism. Identity rules: use ONLY my selfie to lock identity; preserve exact facial geometry and natural asymmetry. Remove any selfie accessories (glasses, cap, earbuds). Negative instructions: no plastic skin or harsh HDR/oversharpening, no warped hands/waist chain/dupattā, no text or watermark, no outfit or background changes, no cartoon/AI look, and no mismatched tones between face, neck, and midriff. Output: high-resolution color image matching this composition and styling with my exact face seamlessly integrated.",
                          "navratri-1"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "navratri-1" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 2 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Navratri Special</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwq6fPjCNU4BmMWfYHFOxGdgRar1D06t8NZlQj"
                    alt="Dhunuchi Naach"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Dhunuchi Naach</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Create an ultra-realistic 8K image of a uploaded young Indian woman performing Dhunuchi Naach during Durga Puja. She is wearing a traditional red saree with golden borders, silver bangles, and testive jewelry. She holds o clay incense pot (dhunuchi) in both hands with smoke rising gracefully around her. Her expression is joyful, immersed in devotion, as she dances in front of a grand Durga idol decorated with flowers and garlands. Behind her, drummers and women in colorful sarees are watching, creating a festive and vibrant atmosphere. Natural soft sunlight enhances the smoke and golden tones of the scene.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Dhunuchi Naach - AI Prompt',
                        'Check out this amazing AI prompt for creating traditional dance portraits!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Create an ultra-realistic 8K image of a uploaded young Indian woman performing Dhunuchi Naach during Durga Puja. She is wearing a traditional red saree with golden borders, silver bangles, and testive jewelry. She holds o clay incense pot (dhunuchi) in both hands with smoke rising gracefully around her. Her expression is joyful, immersed in devotion, as she dances in front of a grand Durga idol decorated with flowers and garlands. Behind her, drummers and women in colorful sarees are watching, creating a festive and vibrant atmosphere. Natural soft sunlight enhances the smoke and golden tones of the scene.",
                          "navratri-2"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "navratri-2" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 3 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Navratri Special</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwkbbMX54nfFMYyIDuqjoX73E4dcxeWPzgvlHr"
                    alt="Garbo Portrait"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Garbo Portrait</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Highly realistic cinematic portrait of c joung Gujarati woman in a traditional Garbo outfit. She is wearing a vibrant chaniya choli with mirror work, colortul embroidery, and a gracetully dupatta in authentic Gujarati style. She is adorned with oxidized silver jewelry - bangles, jhumka earrings, necklace, and maang tikka - completing the festive look. Inspired by the uploaded reference image, her pose is elegant and her expression warm and graceful. The background has a dramatic cinematic effect similar to the reference photo: a dark moody backdrop with a diagonal beam of golden light falling on her, creating depth and highlighting her features. The overall grading is warm with subtle film grain, giving a professional retro-cinematic Gujarati festive atmosphere.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Garbo Portrait - AI Prompt',
                        'Check out this amazing AI prompt for creating traditional Garbo portraits!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Highly realistic cinematic portrait of c joung Gujarati woman in a traditional Garbo outfit. She is wearing a vibrant chaniya choli with mirror work, colortul embroidery, and a gracetully dupatta in authentic Gujarati style. She is adorned with oxidized silver jewelry - bangles, jhumka earrings, necklace, and maang tikka - completing the festive look. Inspired by the uploaded reference image, her pose is elegant and her expression warm and graceful. The background has a dramatic cinematic effect similar to the reference photo: a dark moody backdrop with a diagonal beam of golden light falling on her, creating depth and highlighting her features. The overall grading is warm with subtle film grain, giving a professional retro-cinematic Gujarati festive atmosphere.",
                          "navratri-3"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "navratri-3" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 4 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Navratri Special</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwLiWVa7ObUuOwQ3JFylTsXkfHctSMIBCxvrDj"
                    alt="Dandiya Dance"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Dandiya Dance</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Beautiful woman extract face from image playing dandiya with joyful abandon. She has a bright smile, her hair flying as she twirls, holding decorated dandiya sticks, dressed in a colorful, traditional ghagra choli with intricate embroidery and mirror work. The background is a lively blurred scene of a nighttime Navratri festival with other dancers, twinkling lights, and festive decorations. The image is captured trom a slightly low angle, emphasizing her dynamic movement.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Dandiya Dance - AI Prompt',
                        'Check out this amazing AI prompt for creating traditional Dandiya dance portraits!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Beautiful woman extract face from image playing dandiya with joyful abandon. She has a bright smile, her hair flying as she twirls, holding decorated dandiya sticks, dressed in a colorful, traditional ghagra choli with intricate embroidery and mirror work. The background is a lively blurred scene of a nighttime Navratri festival with other dancers, twinkling lights, and festive decorations. The image is captured trom a slightly low angle, emphasizing her dynamic movement.",
                          "navratri-4"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "navratri-4" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 5 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Navratri Special</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwzsVOKUEuOU5j7RGPoWnLZQwFJb69v1KaNVlt"
                    alt="Retro Garba Style"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Retro Garba Style</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Retro pinterest-inspired aesthetic portrait of the same girl (face exactly same), wearing a bright green and yellow garba dress with embroidery and traditional silver jewellery. Her wavy curly long hair with a flower tucked in moves slightly in the wind. She stands leaning gently against a wall, looking slightly to her right with an introspective happy mood. The lighting is golden hour, high contrast shadows, 90s Bollywood retro grain, cinematic mysterious vibe.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Retro Garba Style - AI Prompt',
                        'Check out this amazing AI prompt for creating retro Garba style portraits!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Retro pinterest-inspired aesthetic portrait of the same girl (face exactly same), wearing a bright green and yellow garba dress with embroidery and traditional silver jewellery. Her wavy curly long hair with a flower tucked in moves slightly in the wind. She stands leaning gently against a wall, looking slightly to her right with an introspective happy mood. The lighting is golden hour, high contrast shadows, 90s Bollywood retro grain, cinematic mysterious vibe.",
                          "navratri-5"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "navratri-5" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 6 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Navratri Special</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw1tTtc6KKMiwgGY1SZHo49FzdOE8cbm0rJCsU"
                    alt="Vintage Garba Back Pose"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Vintage Garba Back Pose</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Start with the original image ensuring the facial features remain unchanged Garba dress: overlay a digital image of a traditional garba dress choose a design with intricate embroidery and vibrant colors typical of the 90s aesthetic. Jewellery: add statement piece like a choker bangles and earrings opt tor complement the dress Hairs: replace the original hair with a digital images of dark brown wavy curly long hair tick a small flower into the curly for a romantic touch. Background: use a solid wall background with deep shadows and contrast add a slight texture to the wall to enhance the vintage feel. Lighting: apply a warm golden tone to mimic the glow of sunset or golden hour ensure the lighting is dramatic to create a moody atmosphere Expression: keep the original expression intact maintaining the mood. Hand: keep the dandiya in hand Full pic back pose.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Vintage Garba Back Pose - AI Prompt',
                        'Check out this amazing AI prompt for creating vintage Garba back pose portraits!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Start with the original image ensuring the facial features remain unchanged Garba dress: overlay a digital image of a traditional garba dress choose a design with intricate embroidery and vibrant colors typical of the 90s aesthetic. Jewellery: add statement piece like a choker bangles and earrings opt tor complement the dress Hairs: replace the original hair with a digital images of dark brown wavy curly long hair tick a small flower into the curly for a romantic touch. Background: use a solid wall background with deep shadows and contrast add a slight texture to the wall to enhance the vintage feel. Lighting: apply a warm golden tone to mimic the glow of sunset or golden hour ensure the lighting is dramatic to create a moody atmosphere Expression: keep the original expression intact maintaining the mood. Hand: keep the dandiya in hand Full pic back pose.",
                          "navratri-6"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "navratri-6" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 7 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Navratri Special</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwaLHoMxiRDNb3IhfgrKEmuyxs7vH80dATFPYa"
                    alt="Bandhani Dupatta Portrait"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Bandhani Dupatta Portrait</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    cinematic portrait of a young Indian woman during Navratri festival, wearing a traditional colorful Bandhani dupatta with intricate patterns, silver jhumkas, and bangles. She holds a dandiya stick gracefully in her hands. Her long wavy hair flows naturally, glowing softly in warm golden hour lighting. Festive lights twinkle in the blurred background, creating a dreamy and cultural celebration atmosphere. Ultra realistic, high detail, cinematic photography style.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Bandhani Dupatta Portrait - AI Prompt',
                        'Check out this amazing AI prompt for creating Bandhani dupatta portraits!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "cinematic portrait of a young Indian woman during Navratri festival, wearing a traditional colorful Bandhani dupatta with intricate patterns, silver jhumkas, and bangles. She holds a dandiya stick gracefully in her hands. Her long wavy hair flows naturally, glowing softly in warm golden hour lighting. Festive lights twinkle in the blurred background, creating a dreamy and cultural celebration atmosphere. Ultra realistic, high detail, cinematic photography style.",
                          "navratri-7"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "navratri-7" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          )}

          {/* Couple Category - Gallery */}
          {(selectedCategory === "All" || selectedCategory === "Couple") && (
          <section className="space-y-6 mt-16">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {/* Image 1 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Couple</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwwa3f2KAkNi0m4VxOsT8326pgFSDWGbXqnh5B"
                    alt="Red Saree Couple"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Red Saree Couple</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Create a retro, vintage-inspired image – grainy yet bright – based on the reference picture. The girl should be draped in a perfect red, Pinterest-style aesthetic retro saree, and the guy should be wearing a white kurta with a Pinterest-style Chinese collar in a retro look. The vibe must capture the essence of a 90s movie brown-haired baddie, with wavy curls and a small flower tucked visibly into her hair, and the hair should fly enhanced by a windy, romantic atmosphere. The guy should be holding her waist and looking deep into her eyes. They stand against a solid wall, where deep shadows and dramatic contrasts add mystery and artistry to the scene, creating a moody yet enchanting cinematic effect. They should be looking at each other.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Red Saree Couple - AI Prompt',
                        'Check out this amazing AI prompt for creating romantic couple portraits!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Create a retro, vintage-inspired image – grainy yet bright – based on the reference picture. The girl should be draped in a perfect red, Pinterest-style aesthetic retro saree, and the guy should be wearing a white kurta with a Pinterest-style Chinese collar in a retro look. The vibe must capture the essence of a 90s movie brown-haired baddie, with wavy curls and a small flower tucked visibly into her hair, and the hair should fly enhanced by a windy, romantic atmosphere. The guy should be holding her waist and looking deep into her eyes. They stand against a solid wall, where deep shadows and dramatic contrasts add mystery and artistry to the scene, creating a moody yet enchanting cinematic effect. They should be looking at each other.",
                          "couple-1"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "couple-1" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 2 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Couple</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwsHUkQbrA9yP62t1XhHlQpzUKS8a4MNTRjOom"
                    alt="Purple Chiffon Couple"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Purple Chiffon Couple</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Create a retro, vintage-inspired image - grainy yet bright - based on the reference picture. The girl should be draped in a perfect purple chiffon, Pinterest-style aesthetic saree. The vibe must capture the essence of a 90s movie dark-brown-haired baddie, with silky hair and a small flower tucked visibly into her hair, enhanced by a windy, romantic atmosphere. She is standing against a wall with the shadow of a tree, where deep shadows and dramatic contrasts add mystery and artistry to the scene, creating a moody yet enchanting cinematic effect. Her pose should suggest that she is adjusting her hair. And the boy must wear black shirt with suitable pants add watch he must be behind the girl.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Purple Chiffon Couple - AI Prompt',
                        'Check out this amazing AI prompt for creating romantic couple portraits!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Create a retro, vintage-inspired image - grainy yet bright - based on the reference picture. The girl should be draped in a perfect purple chiffon, Pinterest-style aesthetic saree. The vibe must capture the essence of a 90s movie dark-brown-haired baddie, with silky hair and a small flower tucked visibly into her hair, enhanced by a windy, romantic atmosphere. She is standing against a wall with the shadow of a tree, where deep shadows and dramatic contrasts add mystery and artistry to the scene, creating a moody yet enchanting cinematic effect. Her pose should suggest that she is adjusting her hair. And the boy must wear black shirt with suitable pants add watch he must be behind the girl.",
                          "couple-2"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "couple-2" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 3 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Couple</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwNaSgigbTHRAxyeo1PknU9XO4BQqv67SVLbKa"
                    alt="Brown Saree Couple"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Brown Saree Couple</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Create a retro vintage grainy but bright image of the reference picture but draped in a perfect brown Pinterest aesthetic retro saree for girl and suite for boy. It must feel like a 90s movie black hair baddie with A small flower tucked visibly in long wavy hair and romanticising windy environment. The girl and boy standing against a solid wall deep shadows and contrast drama, creating a mysterious and artistic atmosphere where the lighting is warm with a golden tones of evoking a sunset or golden hour glow. The background is minimalist and slightly textured the expression on her face is moody, calm yet happy and introspective.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Brown Saree Couple - AI Prompt',
                        'Check out this amazing AI prompt for creating romantic couple portraits!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Create a retro vintage grainy but bright image of the reference picture but draped in a perfect brown Pinterest aesthetic retro saree for girl and suite for boy. It must feel like a 90s movie black hair baddie with A small flower tucked visibly in long wavy hair and romanticising windy environment. The girl and boy standing against a solid wall deep shadows and contrast drama, creating a mysterious and artistic atmosphere where the lighting is warm with a golden tones of evoking a sunset or golden hour glow. The background is minimalist and slightly textured the expression on her face is moody, calm yet happy and introspective.",
                          "couple-3"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "couple-3" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 4 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Couple</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwODJq0k891UNau7cYf2wMep30kjvxyXARgPFr"
                    alt="Red Kurta Couple"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Red Kurta Couple</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Create a retro, vintage-inspired image – grainy yet bright – based on the reference picture. The girl should be draped in a perfect red, Pinterest-style aesthetic retro saree, and the guy should be wearing a white kurta with a Pinterest-style Chinese collar in a retro look. The vibe must capture the essence of a 90s movie brown-haired baddie, with wavy curls and a small flower tucked visibly into her hair, and the hair should fly enhanced by a windy, romantic atmosphere. The guy should be holding her waist and looking deep into her eyes. They stand against a solid wall, where deep shadows and dramatic contrasts add mystery and artistry to the scene, creating a moody yet enchanting cinematic effect. They should be looking at each other.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Red Kurta Couple - AI Prompt',
                        'Check out this amazing AI prompt for creating romantic couple portraits!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Create a retro, vintage-inspired image – grainy yet bright – based on the reference picture. The girl should be draped in a perfect red, Pinterest-style aesthetic retro saree, and the guy should be wearing a white kurta with a Pinterest-style Chinese collar in a retro look. The vibe must capture the essence of a 90s movie brown-haired baddie, with wavy curls and a small flower tucked visibly into her hair, and the hair should fly enhanced by a windy, romantic atmosphere. The guy should be holding her waist and looking deep into her eyes. They stand against a solid wall, where deep shadows and dramatic contrasts add mystery and artistry to the scene, creating a moody yet enchanting cinematic effect. They should be looking at each other.",
                          "couple-4"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "couple-4" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 5 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Couple</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwFGAp856dIoRsHkT3nZS6YcalbweLB5izVrGJ"
                    alt="Brown Suite Couple"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Brown Suite Couple</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Create a retro vintage grainy but bright image of the reference picture but draped in a perfect brown Pinterest y aesthetic retro saree for girl and 582 suite for boy. It must feel like a 90s movie red hair baddie with a small flower tuck visibly in the curls and windy environment romanticising for girl. The girl and boy is standing against a solid wall deep shadows and contrast drama, creating a mysterious and artistic atmosphere.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Brown Suite Couple - AI Prompt',
                        'Check out this amazing AI prompt for creating romantic couple portraits!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Create a retro vintage grainy but bright image of the reference picture but draped in a perfect brown Pinterest y aesthetic retro saree for girl and 582 suite for boy. It must feel like a 90s movie red hair baddie with a small flower tuck visibly in the curls and windy environment romanticising for girl. The girl and boy is standing against a solid wall deep shadows and contrast drama, creating a mysterious and artistic atmosphere.",
                          "couple-5"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "couple-5" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 6 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Couple</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwE8LzzUjCfTambo7hxXWv36wH15tjIge0iBdr"
                    alt="Blue Cotton Couple"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Blue Cotton Couple</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    First ask me to upload my selfie. Then Create a retro, vintage-inspired image - grainy yet right - based on the reference picture. The girl should be draped in a perfect blue cotton saree with small white flower prints, paired with a white blouse with sleeves above the elbow, styled in a Pinterest-inspired aesthetic. The guy should be in a cotton shirt and pant with a flower bouquet in hand. The vibe must capture the essence of a 90s movies dark- brown-haired baddie, with silky hair and a small flower tucked visibly into her hair, enhanced by a windy, romantic atmosphere. She is sitting on a wooden bench as a few leaves blow in the air, while dramatic contrasts add mystery and artistry to the scene while the guy is bending in the wooden bench behind her smiling at her, creating a moody yet enchanting cinematic effect.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Blue Cotton Couple - AI Prompt',
                        'Check out this amazing AI prompt for creating romantic couple portraits!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "First ask me to upload my selfie. Then Create a retro, vintage-inspired image - grainy yet right - based on the reference picture. The girl should be draped in a perfect blue cotton saree with small white flower prints, paired with a white blouse with sleeves above the elbow, styled in a Pinterest-inspired aesthetic. The guy should be in a cotton shirt and pant with a flower bouquet in hand. The vibe must capture the essence of a 90s movies dark- brown-haired baddie, with silky hair and a small flower tucked visibly into her hair, enhanced by a windy, romantic atmosphere. She is sitting on a wooden bench as a few leaves blow in the air, while dramatic contrasts add mystery and artistry to the scene while the guy is bending in the wooden bench behind her smiling at her, creating a moody yet enchanting cinematic effect.",
                          "couple-6"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "couple-6" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 7 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Couple</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw70ErklgrCexzG3sdp8WYDicNkoUbPOmTa0nI"
                    alt="Off White Couple"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Off White Couple</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    First ask me to upload my selfie. Then Create a retro, vintage - inspired image-grainy yet right- based on the reference picture Triea the google gemini as a couple The girl should be draped in a perfect Off white cotton saree With a red blouse. Pinterest styles aesthetic saree. The vibe must capture the essence of a 90s movie dark brown -haired baddie, enhanced by a windy, romantic atmosphere and the guy should be wearing an off white shirt kurta. She stands against an old wooden door, where deep shadows and dramatic contrast add mystery and artistry to the scene, creating a moody yet enchanting cinematic effect. Make the girl pose like she's walking and looking back while the guys is holding her saree pallu very evidently and the guy should be looking at the girl.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Off White Couple - AI Prompt',
                        'Check out this amazing AI prompt for creating romantic couple portraits!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "First ask me to upload my selfie. Then Create a retro, vintage - inspired image-grainy yet right- based on the reference picture Triea the google gemini as a couple The girl should be draped in a perfect Off white cotton saree With a red blouse. Pinterest styles aesthetic saree. The vibe must capture the essence of a 90s movie dark brown -haired baddie, enhanced by a windy, romantic atmosphere and the guy should be wearing an off white shirt kurta. She stands against an old wooden door, where deep shadows and dramatic contrast add mystery and artistry to the scene, creating a moody yet enchanting cinematic effect. Make the girl pose like she's walking and looking back while the guys is holding her saree pallu very evidently and the guy should be looking at the girl.",
                          "couple-7"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "couple-7" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 8 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Couple</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw0XqANnvEiYx46uGItXmDjA3PwKcqrgvpnF7H"
                    alt="Yellow Chiffon Couple"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Yellow Chiffon Couple</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    First ask me to upload a couple photo or upload 2 photos of a girl and a boy. He will be holding my hand from behind dressed in retro style with a black shirt, carrying a I will be in perfect plain chiffon saree, yellow in color, giving a Pinterest y aesthetic retro vibe. Think of a 90s movie feel-dark brown wavy curly hair with a small flower tucked visibly into the curls, romanticizing in a windy environment. I'll be standing against a solid wall with deep shadows and contrast drama, creating mysterious and artistic atmosphere. The lighting will be warm with golden tones, evoking a sunset or golden hour glow. The background will stay minimalistic and slightly textured, while my expression will be moody, calm yet happy and introspective.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Yellow Chiffon Couple - AI Prompt',
                        'Check out this amazing AI prompt for creating romantic couple portraits!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "First ask me to upload a couple photo or upload 2 photos of a girl and a boy. He will be holding my hand from behind dressed in retro style with a black shirt, carrying a I will be in perfect plain chiffon saree, yellow in color, giving a Pinterest y aesthetic retro vibe. Think of a 90s movie feel-dark brown wavy curly hair with a small flower tucked visibly into the curls, romanticizing in a windy environment. I'll be standing against a solid wall with deep shadows and contrast drama, creating mysterious and artistic atmosphere. The lighting will be warm with golden tones, evoking a sunset or golden hour glow. The background will stay minimalistic and slightly textured, while my expression will be moody, calm yet happy and introspective.",
                          "couple-8"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "couple-8" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 9 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Couple</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwOidm8k91UNau7cYf2wMep30kjvxyXARgPFrB"
                    alt="Red Chiffon Couple"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Red Chiffon Couple</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    First ask me to upload a couple photo or upload 2 photos of a girl and a boy. He will be sitting & giving me flower seeing me. in a romantic way dressed in a retro style with a black shirt. I will be in a perfect plain chiffon saree, red in color, giving a Pinterest y aesthetic retro vibe. Think of a 90s movie feel-dark brown wavy curly hair with a small flower tucked visibly into the curls, romanticizing in a windy environment. I'll be sitting against the retro wall. with deep shadows and contrast drama, creating a mysterious and artistic.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Red Chiffon Couple - AI Prompt',
                        'Check out this amazing AI prompt for creating romantic couple portraits!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "First ask me to upload a couple photo or upload 2 photos of a girl and a boy. He will be sitting & giving me flower seeing me. in a romantic way dressed in a retro style with a black shirt. I will be in a perfect plain chiffon saree, red in color, giving a Pinterest y aesthetic retro vibe. Think of a 90s movie feel-dark brown wavy curly hair with a small flower tucked visibly into the curls, romanticizing in a windy environment. I'll be sitting against the retro wall. with deep shadows and contrast drama, creating a mysterious and artistic.",
                          "couple-9"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "couple-9" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 10 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Couple</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOweff96hxc9HQ3GZfqXJBtES2vMxYF5pV0bsCO"
                    alt="Blue Winter Couple"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Blue Winter Couple</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Create a retro vintage grainy but bright image of the reference picture with the girl draped in a perfect plain blue chiffon saree and the boy in a black Winter wear, Pinteresty aesthetic retro saree vibe, feeling like a 90s movie with dark brown wavy curly hair and a small flower tucked visibly into her curls, romanticising a Snowy environment; the girl is making snow ball and throwing at him. The scene look like they are playing and enjoying each other company. Preserve the face and it's facial details.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Blue Winter Couple - AI Prompt',
                        'Check out this amazing AI prompt for creating romantic couple portraits!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Create a retro vintage grainy but bright image of the reference picture with the girl draped in a perfect plain blue chiffon saree and the boy in a black Winter wear, Pinteresty aesthetic retro saree vibe, feeling like a 90s movie with dark brown wavy curly hair and a small flower tucked visibly into her curls, romanticising a Snowy environment; the girl is making snow ball and throwing at him. The scene look like they are playing and enjoying each other company. Preserve the face and it's facial details.",
                          "couple-10"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "couple-10" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          )}

          {/* Ads Category - Gallery */}
          {(selectedCategory === "All" || selectedCategory === "Ads") && (
          <section className="space-y-6 mt-16">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {/* Image 1 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Ads</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwp3zTc6eNu726RMeTXDadHG1zIB3tvw84Ynxh"
                    alt="Monumental Product City Ad"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Monumental Product City Ad</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    hyper-realistic cinematic advertisement scene featuring [PRODUCT PHOTO]. The product is placed oversized in the middle of a famous cityscape aerial view, blending naturally with perspective and lighting. Surrounding environment: [CITY/LOCATION], iconic landmarks visible, realistic shadows and reflections on streets, cars, and buildings. The product looks monumental, as if it's part of the city. Golden hour lighting, detailed textures, ultra-sharp focus, commercial photography style.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Monumental Product City Ad - AI Prompt',
                        'Check out this amazing AI prompt for creating cinematic product advertisements!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "hyper-realistic cinematic advertisement scene featuring [PRODUCT PHOTO]. The product is placed oversized in the middle of a famous cityscape aerial view, blending naturally with perspective and lighting. Surrounding environment: [CITY/LOCATION], iconic landmarks visible, realistic shadows and reflections on streets, cars, and buildings. The product looks monumental, as if it's part of the city. Golden hour lighting, detailed textures, ultra-sharp focus, commercial photography style.",
                          "ads-1"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "ads-1" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 2 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Ads</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwTr1m2epH8xseo7JY4wrVvp9IzPcy3ZjtRUFM"
                    alt="Giant Product CGI"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Giant Product CGI</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Ultra-realistic CGI shot of a giant [PRODUCT NAME HERE], seamlessly integrated into a matching real-world environment that reflects the product's identity, surrounded by context-specific city or nature elements, cinematic composition with natural shadows and photorealistic reflections, high Kelvin sunlight for neutral lighting, captured in HDR 8K DSLR quality, surreal yet believable visual integration, brand logo clearly visible, slogan dynamically adapted to the product's character, dramatic and immersive atmosphere.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Giant Product CGI - AI Prompt',
                        'Check out this amazing AI prompt for creating cinematic product advertisements!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Ultra-realistic CGI shot of a giant [PRODUCT NAME HERE], seamlessly integrated into a matching real-world environment that reflects the product's identity, surrounded by context-specific city or nature elements, cinematic composition with natural shadows and photorealistic reflections, high Kelvin sunlight for neutral lighting, captured in HDR 8K DSLR quality, surreal yet believable visual integration, brand logo clearly visible, slogan dynamically adapted to the product's character, dramatic and immersive atmosphere.",
                          "ads-2"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "ads-2" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 3 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Ads</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwLZ3fqQGObUuOwQ3JFylTsXkfHctSMIBCxvrD"
                    alt="Explosive Motion Ad"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Explosive Motion Ad</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    breathtaking, cinematic 3D advertisement for [PRODUCT]. Frame a dramatic mid-motion scene that captures its explosive energy in a single, frozen moment. The lighting is high-key and bold, with glistening specular highlights and deep, inky shadows that sculpt the product. The scene is saturated with dynamic, chaotic particles—like shattering glass or a burst of cosmic dust—that trails behind the product in a hyper-detailed slow-motion blur. The environment is a surreal, hyperrealistic landscape that mirrors the product's core essence. The brand logo, meticulously constructed from the product's own elements, appears to be forged from the motion itself. Below it, a bold, minimalist slogan is rendered in a sleek font. 1:1 aspect ratio, hyper-detailed, crystal-sharp focus, vibrantly bold colors.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Explosive Motion Ad - AI Prompt',
                        'Check out this amazing AI prompt for creating cinematic product advertisements!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "breathtaking, cinematic 3D advertisement for [PRODUCT]. Frame a dramatic mid-motion scene that captures its explosive energy in a single, frozen moment. The lighting is high-key and bold, with glistening specular highlights and deep, inky shadows that sculpt the product. The scene is saturated with dynamic, chaotic particles—like shattering glass or a burst of cosmic dust—that trails behind the product in a hyper-detailed slow-motion blur. The environment is a surreal, hyperrealistic landscape that mirrors the product's core essence. The brand logo, meticulously constructed from the product's own elements, appears to be forged from the motion itself. Below it, a bold, minimalist slogan is rendered in a sleek font. 1:1 aspect ratio, hyper-detailed, crystal-sharp focus, vibrantly bold colors.",
                          "ads-3"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "ads-3" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 4 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Ads</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw6SkmG4R53SnutNYHFlcKhsWkDoeapCyiRLgf"
                    alt="Iconic Landmark Takeover"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Iconic Landmark Takeover</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    A hyper-realistic, cinematic advertisement featuring [PRODUCT PHOTO] enlarged to a massive scale, rising out of the center of [ICONIC LANDMARK / STADIUM / FAMOUS PLACE]. Surrounding the product, dramatic clouds and sunlight enhance its grand presence, with birds flying around for added realism. The cityscape below is detailed and expansive, giving a larger-than-life impression. Photorealistic textures, sharp shadows, and global ad campaign style — bold, epic, and eye-catching.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Iconic Landmark Takeover - AI Prompt',
                        'Check out this amazing AI prompt for creating cinematic product advertisements!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "A hyper-realistic, cinematic advertisement featuring [PRODUCT PHOTO] enlarged to a massive scale, rising out of the center of [ICONIC LANDMARK / STADIUM / FAMOUS PLACE]. Surrounding the product, dramatic clouds and sunlight enhance its grand presence, with birds flying around for added realism. The cityscape below is detailed and expansive, giving a larger-than-life impression. Photorealistic textures, sharp shadows, and global ad campaign style — bold, epic, and eye-catching.",
                          "ads-4"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "ads-4" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 5 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Ads</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw8Zu4mDItMKwFVUYDbLaHvXOZicJ5BW2ejC6h"
                    alt="Helicopter Product Ad"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Helicopter Product Ad</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    A small helicopter carrying a giant [PRODUCT NAME] iconic product, the helicopter is painted with designed brand theme, against blue sky, white cloud, lens flare, a product ad with a logo and tiny brand slogan on the bottom
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Helicopter Product Ad - AI Prompt',
                        'Check out this amazing AI prompt for creating cinematic product advertisements!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "A small helicopter carrying a giant [PRODUCT NAME] iconic product, the helicopter is painted with designed brand theme, against blue sky, white cloud, lens flare, a product ad with a logo and tiny brand slogan on the bottom",
                          "ads-5"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "ads-5" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 6 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Ads</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwSYqfTM6nmCYFOsxWu9vc4SaBoGgfT3Rb5N0l"
                    alt="Ice Block Product"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Ice Block Product</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Create a hyperrealistic 3D render of the provided object, (bottle) fully encased in a naturally-formed, melting block of ice. The object must retain 100% fidelity to its original form, color, gloss, surface finish, proportions, and all visible details or labels. The result must resemble a real-world photo of the object physically frozen inside ice-not digitally overlaid or placed in a void...... aspect ration 1:1.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Ice Block Product - AI Prompt',
                        'Check out this amazing AI prompt for creating cinematic product advertisements!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Create a hyperrealistic 3D render of the provided object, (bottle) fully encased in a naturally-formed, melting block of ice. The object must retain 100% fidelity to its original form, color, gloss, surface finish, proportions, and all visible details or labels. The result must resemble a real-world photo of the object physically frozen inside ice-not digitally overlaid or placed in a void...... aspect ration 1:1.",
                          "ads-6"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "ads-6" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 7 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Ads</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwNEeNP7bTHRAxyeo1PknU9XO4BQqv67SVLbKa"
                    alt="Vacuum Sealed Package"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Vacuum Sealed Package</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    A real industrial vacuum-sealed package with a compressed, wrinkled plastic bag in the freezer. Inside the transparent packaging is the subject from my uploaded photo, tightly packed and preserved. The background is simple, with strong color contrast that emphasizes the sealed object. Isolated focus on the vacuum-packed subject, realistic and detailed. Aspect ration 1:1.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Vacuum Sealed Package - AI Prompt',
                        'Check out this amazing AI prompt for creating cinematic product advertisements!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "A real industrial vacuum-sealed package with a compressed, wrinkled plastic bag in the freezer. Inside the transparent packaging is the subject from my uploaded photo, tightly packed and preserved. The background is simple, with strong color contrast that emphasizes the sealed object. Isolated focus on the vacuum-packed subject, realistic and detailed. Aspect ration 1:1.",
                          "ads-7"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "ads-7" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 8 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Ads</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwFVcK2OdIoRsHkT3nZS6YcalbweLB5izVrGJA"
                    alt="Jungle Product Ad"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Jungle Product Ad</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Create a cinematic product ad for [PRODUCT NAME ], set deep in a lush tropical jungle.Their classic product rests on a textured stone surface, surrounded by brand-aligned plants or floral. Subtle symbolic elements like brand animal or nature motif are integrated into the scene. Lighting is soft and diffused, simulating golden hour rays filtering through the canopy with ambient backlight. Color palette: Brand colors. Style: cinematic, moody, nature-infused luxury. Aspect ratio: 1:1.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Jungle Product Ad - AI Prompt',
                        'Check out this amazing AI prompt for creating cinematic product advertisements!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Create a cinematic product ad for [PRODUCT NAME ], set deep in a lush tropical jungle.Their classic product rests on a textured stone surface, surrounded by brand-aligned plants or floral. Subtle symbolic elements like brand animal or nature motif are integrated into the scene. Lighting is soft and diffused, simulating golden hour rays filtering through the canopy with ambient backlight. Color palette: Brand colors. Style: cinematic, moody, nature-infused luxury. Aspect ratio: 1:1.",
                          "ads-8"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "ads-8" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 9 - Modern Card Style */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Ads</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwh96YowCL1yHDPmZnwgCOA8EKibXWT0MBsc9U"
                    alt="Giant Statue in Bangalore"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Giant Statue in Bangalore</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Create a giant hyper-realistic statue based on the given photo. keeping the original face exactly the same without changes. The statue stands tall in the middle of a roundabout in Banglore, near a famous historical landmark. The statue is 70% completed, with most of its structure detailed and finished, while the remaining 10% is still under construction, surrounded by scaffolding. A few construction workers in yellow helmets and orange vests are welding, climbing, and finishing the final sections. Only some small exposed metal framework is visible on the unfinished part. The background shows the realistic atmosphere of Bangalore City: crowded streets with colorful rickshaws, packed buses, and small cars circling the roundabout. Street vendors with tea stalls, fruit carts, and colorful umbrellas line the roadside. Shop signs, big billboards, and messy hanging electric wires crisscross above the streets, creating the typical Bangalore city vibe. The bright daytime sky shines above, with tropical trees and a bustling, lively atmosphere.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Giant Statue in Bangalore - AI Prompt',
                        'Check out this amazing AI prompt for creating cinematic product advertisements!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Create a giant hyper-realistic statue based on the given photo. keeping the original face exactly the same without changes. The statue stands tall in the middle of a roundabout in Banglore, near a famous historical landmark. The statue is 70% completed, with most of its structure detailed and finished, while the remaining 10% is still under construction, surrounded by scaffolding. A few construction workers in yellow helmets and orange vests are welding, climbing, and finishing the final sections. Only some small exposed metal framework is visible on the unfinished part. The background shows the realistic atmosphere of Bangalore City: crowded streets with colorful rickshaws, packed buses, and small cars circling the roundabout. Street vendors with tea stalls, fruit carts, and colorful umbrellas line the roadside. Shop signs, big billboards, and messy hanging electric wires crisscross above the streets, creating the typical Bangalore city vibe. The bright daytime sky shines above, with tropical trees and a bustling, lively atmosphere.",
                          "ads-9"
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "ads-9" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          )}

          {/* Diwali Special Section */}
          {(selectedCategory === "All" || selectedCategory === "Diwali") && (
          <section className="mb-16">
            <div className="text-center mb-8">
              <div className="inline-block">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2 relative">
                  🪔 Diwali Special Prompts ✨
                  <div className="absolute -top-2 -right-6 text-yellow-400 animate-pulse">✦</div>
                  <div className="absolute -bottom-1 -left-4 text-orange-400 animate-pulse delay-100">✦</div>
                </h2>
                <div className="h-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 rounded-full"></div>
              </div>
            </div>

            {/* Diwali Filter Buttons */}
            <div className="flex justify-center gap-2 md:gap-4 mb-8">
              <button
                onClick={() => setSelectedDiwaliFilter("Women")}
                className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 flex items-center gap-1 md:gap-2 ${
                  selectedDiwaliFilter === "Women"
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg transform scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-pink-300"
                }`}
              >
                👸 Women
              </button>
              <button
                onClick={() => setSelectedDiwaliFilter("Men")}
                className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 flex items-center gap-1 md:gap-2 ${
                  selectedDiwaliFilter === "Men"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-blue-300"
                }`}
              >
                🤵 Men
              </button>
            </div>

            {/* Women Subsection */}
            {selectedDiwaliFilter === "Women" && (
            <div className="mb-12">
              <div className="text-center mb-8">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 relative">
                  👸 Women's Diwali Collection
                  <div className="absolute -top-1 -right-4 text-pink-400 animate-pulse">✨</div>
                </h3>
                <div className="h-0.5 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 rounded-full w-48 mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Diwali Image 1 - Vintage Bollywood Festive Portrait */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Diwali</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwxmYkczh9UxDkIBG1gfyXrmvT7WEZC2uRJ64h"
                    alt="Vintage Bollywood Festive Portrait"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Vintage Bollywood Festive Portrait</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Vintage Bollywood festive portrait — graceful woman in red and gold saree, dupatta elegantly draped, smiling softly with diya and sparkler in hand, surrounded by glowing diyas and fireworks.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Vintage Bollywood Festive Portrait - Diwali AI Prompt',
                        'Create stunning Diwali images with this AI prompt!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Vintage Bollywood festive portrait — graceful woman in red and gold saree, dupatta elegantly draped, smiling softly with diya and sparkler in hand, surrounded by glowing diyas and fireworks.",
                          "diwali-1"
                        )
                      }
                      className="bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "diwali-1" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Diwali Image 2 - Rooftop Diya Lighting */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Diwali</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwp6midieNu726RMeTXDadHG1zIB3tvw84Ynxh"
                    alt="Rooftop Diya Lighting"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Rooftop Diya Lighting</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Cinematic, ultra-hyper-realistic 4K full-body portrait of a young Girl with the same facial features as the provided reference image, Keep her exact same face and expression with 100% accuracy. standing atop a rooftop at the transition from day to night. She is posing fashionably while sporting a lovely smile and wearing a golden and silver lehenga. She is illuminating rooftop diyas. The background features a creamy and gentle bokeh effect of light lamps and flare lights, rich in dramatic and cinematic elements.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Rooftop Diya Lighting - Diwali AI Prompt',
                        'Create stunning Diwali images with this AI prompt!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Cinematic, ultra-hyper-realistic 4K full-body portrait of a young Girl with the same facial features as the provided reference image, Keep her exact same face and expression with 100% accuracy. standing atop a rooftop at the transition from day to night. She is posing fashionably while sporting a lovely smile and wearing a golden and silver lehenga. She is illuminating rooftop diyas. The background features a creamy and gentle bokeh effect of light lamps and flare lights, rich in dramatic and cinematic elements.",
                          "diwali-2"
                        )
                      }
                      className="bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "diwali-2" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Diwali Image 3 - Purple Saree Celebration */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Diwali</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwZFA7h8DjHWxIy2TDUNvSzZfpOEbKc1QAJmt6"
                    alt="Purple Saree Celebration"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Purple Saree Celebration</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Create a high-quality 4K cinematic portrait of a traditional Indian woman celebrating Diwali. She is not a married woman, so do not use sindoor or mangalsutra on her. She is wearing a beautiful purple saree with subtle golden shimmer lines and soft natural light reflections on the fabric to enhance its realistic texture. She is adorned with traditional gold jewelry — including dangling earrings, elegant bangles, and a small bindi on her forehead. The woman is sitting gracefully in a festive Diwali setup with a deep red draped background decorated with yellow marigold garlands and a basket of flowers on one side. She is holding a single decorated clay diya (oil lamp) with only one burning flame, positioned close to the camera to create a glowing foreground effect.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Purple Saree Celebration - Diwali AI Prompt',
                        'Create stunning Diwali images with this AI prompt!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Create a high-quality 4K cinematic portrait of a traditional Indian woman celebrating Diwali. She is not a married woman, so do not use sindoor or mangalsutra on her. She is wearing a beautiful purple saree with subtle golden shimmer lines and soft natural light reflections on the fabric to enhance its realistic texture. She is adorned with traditional gold jewelry — including dangling earrings, elegant bangles, and a small bindi on her forehead. The woman is sitting gracefully in a festive Diwali setup with a deep red draped background decorated with yellow marigold garlands and a basket of flowers on one side. She is holding a single decorated clay diya (oil lamp) with only one burning flame, positioned close to the camera to create a glowing foreground effect. The background should have a warm blur bokeh lighting effect, adding a soft, glowing, festive mood. The lighting should be warm and soft, casting natural highlights on her face, jewelry, and saree, while maintaining a cinematic depth and festive atmosphere. Her expression should be gentle, confident, and welcoming, with a soft smile and warm eyes. Use 4K ultra-realistic lighting, natural skin texture, shallow depth of field, warm bokeh in the background, and cinematic tones to enhance the visual quality. The overall mood should represent Diwali celebration warmth and elegance. For facial expression use uploaded image for facial expression",
                          "diwali-3"
                        )
                      }
                      className="bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "diwali-3" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Diwali Image 4 - Blue Saree Fireworks */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Diwali</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw6Hnw77R53SnutNYHFlcKhsWkDoeapCyiRLgf"
                    alt="Blue Saree Fireworks"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Blue Saree Fireworks</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Ultra realistic 4K cinematic portrait of the same young woman, wearing a royal blue silk saree with silver borders and traditional jewelry — jhumkas, bangles, and a bindi. She is lighting a diya placed on the terrace wall, her face glowing from the warm light. The background shows fireworks in the sky and fairy lights around. Metallic glowing text in background says Happy Diwali.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Blue Saree Fireworks - Diwali AI Prompt',
                        'Create stunning Diwali images with this AI prompt!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Ultra realistic 4K cinematic portrait of the same young woman, wearing a royal blue silk saree with silver borders and traditional jewelry — jhumkas, bangles, and a bindi. She is lighting a diya placed on the terrace wall, her face glowing from the warm light. The background shows fireworks in the sky and fairy lights around. Metallic glowing text in background says Happy Diwali.",
                          "diwali-4"
                        )
                      }
                      className="bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "diwali-4" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Diwali Image 5 - Fairy Lights Lehenga */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Diwali</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw9wViidZ7EfX8npDc3ogZOmLu4UtJayY2dqwK"
                    alt="Fairy Lights Lehenga"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Fairy Lights Lehenga</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Beautiful young woman with black and brown hair is standing outdoors at night, holding onto decorative tree branches wrapped with glowing fairy lights. She is wearing a festive Diwali outfit — a stylish lehenga with a shimmering blouse and a matching dupatta draped gracefully. Her look is accessorized with layered rings, earrings, and elegant bangles, and subtle henna designs are visible on her hand. She poses casually with both arms resting on the branches, leaning slightly forward, giving a friendly, confident expression. The face from the original image must be maintained.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Fairy Lights Lehenga - Diwali AI Prompt',
                        'Create stunning Diwali images with this AI prompt!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Beautiful young woman with black and brown hair is standing outdoors at night, holding onto decorative tree branches wrapped with glowing fairy lights. She is wearing a festive Diwali outfit — a stylish lehenga with a shimmering blouse and a matching dupatta draped gracefully. Her look is accessorized with layered rings, earrings, and elegant bangles, and subtle henna designs are visible on her hand. She poses casually with both arms resting on the branches, leaning slightly forward, giving a friendly, confident expression. The face from the original image must be maintained.",
                          "diwali-5"
                        )
                      }
                      className="bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "diwali-5" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Diwali Image 6 - Sparkler Dance */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Diwali</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwap9eVwQiRDNb3IhfgrKEmuyxs7vH80dATFPY"
                    alt="Sparkler Dance"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Sparkler Dance</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    A cinematic, ultra-hyper-realistic 4K portrait of a young Girl with the same facial features as the provided reference image, Keep her exact same face and expression with 100% accuracy at Diwali night, dressed in a purple and silver ghagra choli with intricate mirror work and a bright dupatta. She is dancing joyfully with sparklers in both hands, her jewelry sparkling in the light. Terrace decorated with rangoli, diyas, and lanterns. Metallic golden text in background says Happy Diwali.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Sparkler Dance - Diwali AI Prompt',
                        'Create stunning Diwali images with this AI prompt!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "A cinematic, ultra-hyper-realistic 4K portrait of a young Girl with the same facial features as the provided reference image, Keep her exact same face and expression with 100% accuracy at Diwali night, dressed in a purple and silver ghagra choli with intricate mirror work and a bright dupatta. She is dancing joyfully with sparklers in both hands, her jewelry sparkling in the light. Terrace decorated with rangoli, diyas, and lanterns. Metallic golden text in background says Happy Diwali.",
                          "diwali-6"
                        )
                      }
                      className="bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "diwali-6" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Diwali Image 7 - Pink Anarkali with Diyas */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Diwali</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwZmSiHcDjHWxIy2TDUNvSzZfpOEbKc1QAJmt6"
                    alt="Pink Anarkali with Diyas"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Pink Anarkali with Diyas</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Ultra realistic 4K cinematic portrait of the same young woman, wearing a pastel pink Anarkali suit with delicate golden embroidery and flowing dupatta. She is holding a plate full of lit diyas in both hands, looking down gracefully. The terrace wall glows with rows of diyas, and colorful fireworks burst in the sky.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Pink Anarkali with Diyas - Diwali AI Prompt',
                        'Create stunning Diwali images with this AI prompt!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Ultra realistic 4K cinematic portrait of the same young woman, wearing a pastel pink Anarkali suit with delicate golden embroidery and flowing dupatta. She is holding a plate full of lit diyas in both hands, looking down gracefully. The terrace wall glows with rows of diyas, and colorful fireworks burst in the sky.",
                          "diwali-7"
                        )
                      }
                      className="bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "diwali-7" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>
              </div>
            </div>
            )}

            {/* Men Subsection */}
            {selectedDiwaliFilter === "Men" && (
            <div className="mb-12">
              <div className="text-center mb-8">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 relative">
                  🤵 Men's Diwali Collection
                  <div className="absolute -top-1 -right-4 text-blue-400 animate-pulse">✨</div>
                </h3>
                <div className="h-0.5 bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 rounded-full w-48 mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Diwali Image 8 - Man in Maroon Kurta */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Diwali</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwOshuUG91UNau7cYf2wMep30kjvxyXARgPFrB"
                    alt="Man in Maroon Kurta"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Traditional Festive Setup</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Generate an ultra-realistic 4K DSLR-quality festive portrait photo of a man standing in a traditional Indian festive setup. The man should be wearing a rich maroon-red silk kurta with subtle golden embroidered patterns. The background should have a warm orange-red festive tone with gold hanging floral garlands and traditional diyas suspended elegantly, softly glowing to create a festive atmosphere. Add a soft, warm light setup highlighting the face and outfit — the lighting should create a cinematic Diwali feel with gentle shadows and glow. The background should also include a blurred "Happy Diwali" text in warm neon light.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Traditional Festive Setup - Diwali AI Prompt',
                        'Create stunning Diwali images with this AI prompt!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Generate an ultra-realistic 4K DSLR-quality festive portrait photo of a man standing in a traditional Indian festive setup, inspired by the reference image. The man should be wearing a rich maroon-red silk kurta with subtle golden embroidered patterns, just like in the reference. His pose, body posture, and hand position should exactly match the reference image — natural, cheerful, and festive. The background should have a warm orange-red festive tone with gold hanging floral garlands and traditional diyas (lamps) suspended elegantly, softly glowing to create a festive atmosphere. On the side, there should be a decorative plate filled with rose petals and lit diyas, placed on a small stand, matching the aesthetic of the reference. Add a soft, warm light setup highlighting the face and outfit — the lighting should create a cinematic Diwali feel with gentle shadows and glow. The background should also include a blurred 'Happy Diwali' text in warm neon light, subtly visible to add depth and celebration mood without overpowering the subject. Make sure the facial structure, hairstyle, and expression exactly match the uploaded reference image. Add a natural smile on the face to maintain a pleasant and festive expression. For facial expression use uploaded image for facial expression",
                          "diwali-8"
                        )
                      }
                      className="bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "diwali-8" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Diwali Image 9 - Man with Fairy Lights */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Diwali</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwHg6uhWvcTbexiRGQSaVPyjDLoh0Nw7C31uA2"
                    alt="Man with Fairy Lights"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Fairy Lights Portrait</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Ultra-realistic 8K DSLR festive portrait of the same young man (face must remain 100% identical to the reference without changes). He is dressed in a rich deep maroon kurta with subtle embroidered texture, wearing a round black smartwatch. Shot waist-up, one hand rests lightly on glowing fairy lights while the other stays relaxed by his side. He gives a wide confident smile, looking directly at the camera. The background is filled with soft glowing diyas, blurred fairy lights, and warm Diwali bokeh for a rich festive ambiance. Cinematic low-angle framing, natural skin tones, sharp realistic textures, professional 8K DSLR clarity.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Fairy Lights Portrait - Diwali AI Prompt',
                        'Create stunning Diwali images with this AI prompt!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Ultra-realistic 8K DSLR festive portrait of the same young man (face must remain 100% identical to the reference without changes). He is dressed in a rich deep maroon kurta with subtle embroidered texture, wearing a round black smartwatch. Shot waist-up, one hand rests lightly on glowing fairy lights while the other stays relaxed by his side. He gives a wide confident smile, looking directly at the camera. The background is filled with soft glowing diyas (lamps), blurred fairy lights, and warm Diwali bokeh for a rich festive ambiance. Cinematic low-angle framing, natural skin tones, sharp realistic textures, professional 8K DSLR clarity. Make sure the face remains the same and 100% preserve for facial expression use uploaded image for facial expression",
                          "diwali-9"
                        )
                      }
                      className="bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "diwali-9" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Diwali Image 10 - Moody Fairy Lights */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Diwali</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwLwHQvUObUuOwQ3JFylTsXkfHctSMIBCxvrDj"
                    alt="Moody Fairy Lights"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Artistic Low-Light Portrait</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Cinematic portrait of a young man sitting in a dimly lit room, holding a warm yellow fairy light string close to his face. The light softly illuminates his face and hand, creating a moody and artistic low-light aesthetic. The subject is wearing a dark maroon shirt with small printed patterns. The background is dark and blurred to emphasize the glowing lights and the subject's expression. The composition should show the fairy lights wrapped around his hand and slightly leading toward the camera in a beautiful bokeh effect. The lighting should highlight the contours of the face and the reflections in the eyes for a dramatic look.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Artistic Low-Light Portrait - Diwali AI Prompt',
                        'Create stunning Diwali images with this AI prompt!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Cinematic portrait of a young man sitting in a dimly lit room, holding a warm yellow fairy light string close to his face. The light softly illuminates his face and hand, creating a moody and artistic low-light aesthetic. The subject is wearing a dark maroon shirt with small printed patterns. The background is dark and blurred to emphasize the glowing lights and the subject's expression. The composition should show the fairy lights wrapped around his hand and slightly leading toward the camera in a beautiful bokeh effect. The lighting should highlight the contours of the face and the reflections in the eyes for a dramatic look. The model's pose must be exactly the same as in the reference image — sitting posture, right hand near face, fairy lights wrapped around hand and glowing warmly. The facial expression must match the uploaded reference image precisely. Use the uploaded image for facial expression and facial structure. Generate in ultra-realistic, 4K, cinematic portrait style with soft shadows, warm tones, and smooth background blur (bokeh)",
                          "diwali-10"
                        )
                      }
                      className="bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "diwali-10" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Diwali Image 11 - Terrace Sparkler */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Diwali</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOw4LRYffaYFX86A5gi7HbrqUwvNzJdpP9B4RST"
                    alt="Terrace Sparkler"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Mumbai Terrace Celebration</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Ultra realistic 4K cinematic portrait of the same young man, face exactly like the reference photo. He is standing on a terrace at Diwali night, wearing a white kurta. One hand holds a lit phooljhadi and he looks at it happily, the other hand in pajama pocket. Background shows night sky with fireworks and a terrace wall decorated with glowing diyas. Natural, festive, and highly realistic. And add a metallic text in background Happy diwali. A young man in traditional Indian attire, holding a sparkler, celebrating Diwali on a balcony overlooking the Mumbai skyline at night, with fireworks illuminating the sky.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Mumbai Terrace Celebration - Diwali AI Prompt',
                        'Create stunning Diwali images with this AI prompt!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Ultra realistic 4K cinematic portrait of the same young man, face exactly like the reference photo. He is standing on a terrace at Diwali night, wearing a white kurta. One hand holds a lit phooljhadi and he looks at it happily, the other hand in pajama pocket. Background shows night sky with fireworks and a terrace wall decorated with glowing diyas. Natural, festive, and highly realistic. And add a metallic text in background Happy diwali. A young man in traditional Indian attire, holding a sparkler, celebrating Diwali on a balcony overlooking the Mumbai skyline at night, with fireworks illuminating the sky and decorative lanterns hanging around him. The city lights of Mumbai are visible in the background.",
                          "diwali-11"
                        )
                      }
                      className="bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "diwali-11" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Diwali Image 12 - Ravan Background */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200 group">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">Diwali</span>
                  </div>
                  <img
                    src="https://lsn12plqor.ufs.sh/f/LXPMWJObUuOwqkze0JNU4BmMWfYHFOxGdgRar1D06t8NZlQj"
                    alt="Ravan Background"
                    loading="lazy"
                    className="w-full aspect-[394/493] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Dramatic Ravan Background</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    Full-length, low-angle cinematic shot of a man looks exactly 100% same as the man in the uploaded image, face, hair, body every detail is same as the uploaded image. serious expression, walking straight toward the camera. He's wearing a Black Suit and dark shadow, a black pant, with open Hands, walking in style wearing black glasses. His right wrist shows a classic round-dial watch, with intense expression. The background is a dramatic, ravana with 9 face statue is burning, smoky scene bathed in an intense warm orange backlight, filled with drifting ember. Generate 8K Ultra hyperealistic image.
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShare(
                        'Dramatic Ravan Background - Diwali AI Prompt',
                        'Create stunning Diwali images with this AI prompt!'
                      )}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() =>
                        copyPromptLandingStyle(
                          "Full-length, low-angle cinematic shot of a man looks exactly 100% same as the man in the uploaded image, face, hair, body every detail is same as the uploaded image. serious expression, walking straight toward the camera. He's wearing a Black Suit and dark shadow, a black pant, with open Hands, walking in style wearing black glasses. His right wrist shows a classic round-dial watch, with intense expression. The background is a dramatic, ravana with 9 face statue is burning, smoky scene bathed in an intense warm orange backlight, filled with drifting ember. Generate 8K Ultra hyperealistic image.",
                          "diwali-12"
                        )
                      }
                      className="bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copiedKey === "diwali-12" ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>
              </div>
            </div>
            )}
          </section>
          )}

          {/* Navigation Links Section - Responsive Layout */}
          <section className="mt-20 mb-16">
            <div className="max-w-6xl mx-auto">
              
              {/* Desktop Layout - Multi-column */}
              <div className="hidden md:grid md:grid-cols-4 gap-8">
                
                {/* Brand Section */}
                <div className="col-span-2">
                  <h2 className="text-2xl font-bold text-foreground mb-4">SuperPrompts</h2>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Unlock the full potential of AI with our curated collection of high-quality prompts.
                    From beginners to experts, we help you achieve better results with artificial intelligence.
                  </p>
                </div>

                {/* Links Section */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">LINKS</h3>
                  <div className="space-y-2">
                    <a href="/about" className="block text-muted-foreground hover:text-foreground transition-colors">
                      About Us
                    </a>
                    <a href="/blog" className="block text-muted-foreground hover:text-foreground transition-colors">
                      Blog
                    </a>
                    <a href="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                      Contact
                    </a>
                  </div>
                </div>

                {/* Legal Section */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">LEGAL</h3>
                  <div className="space-y-2">
                    <a href="/privacy-policy" className="block text-muted-foreground hover:text-foreground transition-colors">
                      Privacy Policy
                    </a>
                    <a href="/terms-conditions" className="block text-muted-foreground hover:text-foreground transition-colors">
                      Terms & Conditions
                    </a>
                  </div>
                </div>

              </div>

              {/* Mobile Layout - Single Column */}
              <div className="md:hidden space-y-8">
                
                {/* Brand Section */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-4">SuperPrompts</h2>
                  <p className="text-muted-foreground mb-6">
                    Unlock the full potential of AI with our curated collection of high-quality prompts.
                  </p>
                </div>

                {/* Links Section */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 text-center">LINKS</h3>
                  <div className="space-y-2 text-center">
                    <a href="/about" className="block text-muted-foreground hover:text-foreground transition-colors">
                      About Us
                    </a>
                    <a href="/blog" className="block text-muted-foreground hover:text-foreground transition-colors">
                      Blog
                    </a>
                    <a href="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                      Contact
                    </a>
                  </div>
                </div>

                {/* Legal Section */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 text-center">LEGAL</h3>
                  <div className="space-y-2 text-center">
                    <a href="/privacy-policy" className="block text-muted-foreground hover:text-foreground transition-colors">
                      Privacy Policy
                    </a>
                    <a href="/terms-conditions" className="block text-muted-foreground hover:text-foreground transition-colors">
                      Terms & Conditions
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </section>

          {/* Copyright Notice */}
          <div className="text-center py-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              © 2025 superprompts all rights reserved
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
