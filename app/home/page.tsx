"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { HomeHeader } from "@/components/home-header";

export default function HomePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

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
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      } else {
        router.push("/sign-in");
      }
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        router.push("/sign-in");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);


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

  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />
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
                <img
                  src="https://i.imghippo.com/files/GtlF8325Bzs.jpg"
                  alt="Women gallery image 1"
                  className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
                />
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
                <img
                  src="https://i.imghippo.com/files/hxYf1576ftM.jpg"
                  alt="Women gallery image 2"
                  className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
                />
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
                <img
                  src="https://i.imghippo.com/files/KCM6165xNs.jpg"
                  alt="Women gallery image 3"
                  className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
                />
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
                <img
                  src="https://i.imghippo.com/files/MV7928wzM.png"
                  alt="Women gallery image 4"
                  className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
                />
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
                <img
                  src="https://i.imghippo.com/files/uEAG7823Fls.jpg"
                  alt="Women gallery image 5"
                  className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
                />
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
                <img
                  src="https://i.imghippo.com/files/OQc7675CTI.jpg"
                  alt="Women gallery image 6"
                  className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
                />
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
                <img
                  src="https://i.imghippo.com/files/owq1129Mg.jpg"
                  alt="Women gallery image 7"
                  className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
                />
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
                <img
                  src="https://i.imghippo.com/files/aj7493xRQ.jpg"
                  alt="Women gallery image 8"
                  className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
                />
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
                <img
                  src="https://i.imghippo.com/files/YIg6683WB.jpg"
                  alt="Women gallery image 9"
                  className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
                />
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
                <img
                  src="https://i.imghippo.com/files/MQv2320gzU.jpg"
                  alt="Women gallery image 10"
                  className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
                />
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
                <img
                  src="https://i.imghippo.com/files/GvES3471jGk.jpg"
                  alt="Women gallery image 11"
                  className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
                />
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

        </div>
      </main>
    </div>
  );
}
