import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Calendar, Clock, ArrowLeft, Share2, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mastering AI Prompts: A Complete Beginner\'s Guide - Superprompts Blog',
  description: 'Learn the fundamentals of crafting effective AI prompts that deliver consistent, high-quality results every time.',
}

export default function BlogPostPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">Tutorial</Badge>
            <span className="text-slate-500 dark:text-slate-400">•</span>
            <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
              <Calendar className="h-4 w-4" />
              January 15, 2024
            </div>
            <span className="text-slate-500 dark:text-slate-400">•</span>
            <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
              <Clock className="h-4 w-4" />
              8 min read
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mastering AI Prompts: A Complete Beginner's Guide
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            Learn the fundamentals of crafting effective AI prompts that deliver consistent, high-quality results every time.
          </p>
        </div>

        {/* Article Content */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                In the rapidly evolving world of artificial intelligence, the ability to craft effective prompts has become an essential skill. Whether you're a content creator, business professional, or simply curious about AI, understanding how to communicate with AI systems can dramatically improve your results.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                What Makes a Great AI Prompt?
              </h2>
              
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                A well-crafted prompt is like a detailed instruction manual for AI. It should be clear, specific, and provide enough context for the AI to understand exactly what you want. The difference between a vague request and a detailed prompt can be the difference between mediocre and exceptional results.
              </p>

              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Think of it this way: if you were asking a human assistant to help you with a task, you wouldn't just say "help me write something." You'd provide context about the topic, the audience, the tone, and the specific requirements. AI systems work best when given the same level of detail.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                The Four Pillars of Effective Prompting
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Clarity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Use precise language and avoid ambiguity. Be specific about what you want the AI to do, how you want it done, and what format you prefer.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Context</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Provide relevant background information. Include details about your audience, the purpose of the content, and any constraints or requirements.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Constraints</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Set clear boundaries and limitations. Specify word count, tone, style, or any other parameters that will help guide the AI's output.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Examples</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      When possible, provide examples of the desired output. This helps the AI understand your expectations and maintain consistency.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                Common Prompting Mistakes to Avoid
              </h2>

              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Even experienced users can fall into common traps when crafting prompts. Here are the most frequent mistakes and how to avoid them:
              </p>

              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 mb-6 ml-4">
                <li><strong>Being too vague:</strong> "Write something about marketing" vs. "Write a 500-word blog post about digital marketing strategies for small businesses"</li>
                <li><strong>Overloading with information:</strong> Too much context can confuse the AI. Focus on the most relevant details.</li>
                <li><strong>Ignoring the output format:</strong> Always specify how you want the information presented (list, paragraph, table, etc.)</li>
                <li><strong>Not iterating:</strong> Great prompts often require refinement. Don't expect perfection on the first try.</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                Practical Prompt Templates
              </h2>

              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Here are some proven prompt templates you can adapt for different use cases:
              </p>

              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Content Creation Template:</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-mono">
                  "Write a [content type] about [topic] for [audience]. The tone should be [tone] and approximately [word count] words. Include [specific elements] and avoid [restrictions]."
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Problem-Solving Template:</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-mono">
                  "I need help with [specific problem]. My situation is [context]. I've tried [previous attempts]. What are [number] alternative approaches I could consider?"
                </p>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                Advanced Techniques for Better Results
              </h2>

              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Once you've mastered the basics, these advanced techniques can help you achieve even better results:
              </p>

              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 mb-6 ml-4">
                <li><strong>Chain of thought prompting:</strong> Ask the AI to explain its reasoning process step by step</li>
                <li><strong>Role-playing:</strong> Assign the AI a specific role or persona to improve context understanding</li>
                <li><strong>Few-shot learning:</strong> Provide several examples of input-output pairs to establish patterns</li>
                <li><strong>Iterative refinement:</strong> Use follow-up prompts to refine and improve initial outputs</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                Measuring Prompt Effectiveness
              </h2>

              <p className="text-slate-600 dark:text-slate-400 mb-4">
                How do you know if your prompts are working well? Here are some key metrics to consider:
              </p>

              <p className="text-slate-600 dark:text-slate-400 mb-6">
                <strong>Relevance:</strong> Does the output directly address what you asked for? <strong>Quality:</strong> Is the content well-structured and coherent? <strong>Consistency:</strong> Do similar prompts produce similar quality results? <strong>Efficiency:</strong> Are you getting the information you need without excessive back-and-forth?
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                Getting Started: Your First Week
              </h2>

              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Ready to start improving your prompting skills? Here's a practical week-long plan:
              </p>

              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 mb-6 ml-4">
                <li><strong>Day 1-2:</strong> Practice with simple, clear prompts for basic tasks</li>
                <li><strong>Day 3-4:</strong> Experiment with adding context and constraints</li>
                <li><strong>Day 5-6:</strong> Try role-playing and persona-based prompts</li>
                <li><strong>Day 7:</strong> Review your best prompts and create templates for future use</li>
              </ul>

              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Remember, mastering AI prompts is a skill that improves with practice. Start with simple, clear requests and gradually add complexity as you become more comfortable. The key is to be patient, experiment, and learn from each interaction.
              </p>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-l-blue-500">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Ready to Practice?</h3>
                <p className="text-blue-800 dark:text-blue-200 text-sm mb-4">
                  Now that you understand the fundamentals, it's time to put your knowledge into practice. What's the first prompt you'd like to try crafting?
                </p>
                <Button asChild>
                  <Link href="/">
                    Explore Our Prompt Library
                    <BookOpen className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Share Section */}
        <div className="mt-8 flex items-center justify-between">
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share Article
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/blog">← Back to All Articles</Link>
          </Button>
        </div>

      </div>
    </div>
  )
}
