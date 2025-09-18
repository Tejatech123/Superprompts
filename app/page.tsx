import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ImageGallery } from "@/components/image-gallery"
import { InstructionsSection } from "@/components/instructions-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ImageGallery />
        <InstructionsSection />
      </main>
      <Footer />
    </div>
  )
}
