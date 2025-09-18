import { Card } from "@/components/ui/card"

const steps = [
  {
    number: 1,
    title: "Copy the Prompt",
    description:
      "Click on any image to instantly copy its detailed AI prompt to your clipboard.",
  },
  {
    number: 2,
    title: "Choose Your AI Tool",
    description:
      "Use the prompt in your favorite AI generator like Midjourney, DALL-E, Stable Diffusion, or Gemini.",
  },
  {
    number: 3,
    title: "Generate & Create",
    description:
      "Watch as your AI tool transforms the prompt into stunning, unique artwork.",
  },
]

export function InstructionsSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] bg-background px-4 flex items-center justify-center">
      <div className="container max-w-screen-xl">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-8 sm:gap-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-muted-foreground">Three simple steps to create amazing AI art</p>
          </div>

          <div className="w-full grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3 md:gap-8">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="relative p-8 text-center border-border bg-card/40 hover:bg-card/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/10 rounded-xl"
              >
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-accent bg-accent/10 text-accent font-extrabold">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </Card>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
