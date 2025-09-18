import { Card } from "@/components/ui/card"
import { Copy, Wand2, Sparkles } from "lucide-react"

const steps = [
  {
    icon: Copy,
    title: "Copy the Prompt",
    description: "Click on any image to instantly copy its detailed AI prompt to your clipboard.",
  },
  {
    icon: Wand2,
    title: "Choose Your AI Tool",
    description: "Use the prompt in your favorite AI generator like Midjourney, DALL-E, Stable Diffusion, or Gemini.",
  },
  {
    icon: Sparkles,
    title: "Generate & Create",
    description: "Watch as your AI tool transforms the prompt into stunning, unique artwork.",
  },
]

export function InstructionsSection() {
  return (
    <section className="py-24 bg-card/20">
      <div className="container max-w-screen-xl px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">How It Works</h2>
          <p className="mt-4 text-lg text-muted-foreground">Three simple steps to create amazing AI art</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative p-8 text-center border-border bg-card hover:bg-card/80 transition-colors"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <step.icon className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm font-bold">
                {index + 1}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Tap an image to copy its prompt. Use it in your favorite AI tool (Gemini, Stable Diffusion, Midjourney,
            etc.) to recreate the look.
          </p>
        </div>
      </div>
    </section>
  )
}
