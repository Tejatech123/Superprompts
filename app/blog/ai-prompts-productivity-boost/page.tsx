import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Calendar, Clock, ArrowLeft, Share2, BookOpen, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: '10 AI Prompts That Will Transform Your Daily Productivity - Superprompts Blog',
  description: 'Explore proven prompt templates that can streamline your workflow and boost efficiency across various tasks.',
}

export default function ProductivityPromptsPage() {
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
            <Badge variant="secondary">Productivity</Badge>
            <span className="text-slate-500 dark:text-slate-400">•</span>
            <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
              <Calendar className="h-4 w-4" />
              January 5, 2024
            </div>
            <span className="text-slate-500 dark:text-slate-400">•</span>
            <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
              <Clock className="h-4 w-4" />
              6 min read
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            10 AI Prompts That Will Transform Your Daily Productivity
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            Explore proven prompt templates that can streamline your workflow and boost efficiency across various tasks.
          </p>
        </div>

        {/* Article Content */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                In today's fast-paced world, productivity isn't just about working harder—it's about working smarter. AI-powered tools have revolutionized how we approach daily tasks, but the key to unlocking their full potential lies in crafting the right prompts. Here are ten battle-tested prompts that can transform your daily workflow.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                1. The Daily Planning Power Prompt
              </h2>
              
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
                <p className="text-slate-600 dark:text-slate-400 text-sm font-mono">
                  "Create a prioritized daily schedule for [DATE] based on these tasks: [LIST YOUR TASKS]. Consider my energy levels throughout the day, include buffer time between meetings, and suggest the optimal order for maximum productivity. Also recommend 2-3 quick wins I can tackle first."
                </p>
              </div>

              <p className="text-slate-600 dark:text-slate-400 mb-6">
                This prompt transforms chaotic task lists into structured, actionable daily plans. It considers human factors like energy levels and provides psychological wins through quick tasks, setting you up for a productive day.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                2. The Email Efficiency Booster
              </h2>

              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
                <p className="text-slate-600 dark:text-slate-400 text-sm font-mono">
                  "Draft a professional email to [RECIPIENT] about [TOPIC]. The tone should be [FRIENDLY/PROFESSIONAL/URGENT]. Include a clear subject line, opening greeting, main message with bullet points if needed, and a clear call-to-action. Keep it under 150 words."
                </p>
              </div>

              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Email can be a productivity killer. This prompt helps you craft clear, concise emails that get responses, reducing back-and-forth communication and saving precious time.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                3. The Meeting Preparation Master
              </h2>

              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
                <p className="text-slate-600 dark:text-slate-400 text-sm font-mono">
                  "Prepare me for a [MEETING TYPE] meeting about [TOPIC] with [PARTICIPANTS]. Generate 5 key questions to ask, 3 potential challenges to anticipate, and a one-page summary of relevant background information. Also suggest 2-3 action items I should propose."
                </p>
              </div>

              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Walking into meetings unprepared is a productivity drain. This prompt ensures you're always ready to contribute meaningfully and drive outcomes.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                4. The Decision-Making Accelerator
              </h2>

              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
                <p className="text-slate-600 dark:text-slate-400 text-sm font-mono">
                  "Help me make a decision about [DECISION]. Present 3 options with pros and cons for each. Consider short-term and long-term implications, potential risks, and required resources. End with a recommendation and the reasoning behind it."
                </p>
              </div>

              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Decision paralysis can halt productivity. This prompt provides structured analysis that helps you make informed decisions quickly and confidently.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                5. The Learning Accelerator
              </h2>

              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
                <p className="text-slate-600 dark:text-slate-400 text-sm font-mono">
                  "Create a 30-minute learning plan for [TOPIC]. Include: 3 key concepts to focus on, 2 practical exercises, and 1 real-world application. Format it as a step-by-step guide with time allocations for each section."
                </p>
              </div>

              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Continuous learning is essential for productivity, but finding time can be challenging. This prompt creates focused, time-boxed learning sessions that maximize knowledge acquisition.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                6. The Problem-Solving Framework
              </h2>

              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
                <p className="text-slate-600 dark:text-slate-400 text-sm font-mono">
                  "Apply a structured problem-solving approach to [PROBLEM]. Break it down into: problem definition, root cause analysis, potential solutions, evaluation criteria, and recommended action plan with timeline."
                </p>
              </div>

              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Complex problems can derail productivity. This prompt provides a systematic approach that ensures nothing is overlooked and solutions are comprehensive.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                7. The Content Creation Catalyst
              </h2>

              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
                <p className="text-slate-600 dark:text-slate-400 text-sm font-mono">
                  "Generate a [CONTENT TYPE] about [TOPIC] for [AUDIENCE]. Include: compelling headline, 3-5 key points with supporting details, engaging introduction and conclusion, and a clear call-to-action. Target [WORD COUNT] words."
                </p>
              </div>

              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Content creation can be time-consuming. This prompt streamlines the process by providing structure and ensuring all essential elements are included from the start.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                8. The Time Management Optimizer
              </h2>

              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
                <p className="text-slate-600 dark:text-slate-400 text-sm font-mono">
                  "Analyze my current time usage: [DESCRIBE YOUR TYPICAL DAY]. Identify 3 time-wasting activities, suggest 2 time-blocking strategies, and recommend 1 new habit that could save me 30+ minutes daily. Include specific implementation steps."
                </p>
              </div>

              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Time management is the foundation of productivity. This prompt provides personalized insights and actionable strategies for optimizing your daily schedule.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                9. The Communication Clarity Enhancer
              </h2>

              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
                <p className="text-slate-600 dark:text-slate-400 text-sm font-mono">
                  "Help me communicate [MESSAGE] to [AUDIENCE]. Create 3 different versions: one for executives (high-level), one for peers (detailed), and one for direct reports (actionable). Each should be under 100 words and include the key takeaway."
                </p>
              </div>

              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Miscommunication wastes time and creates confusion. This prompt ensures your message is tailored to your audience, reducing the need for clarification and follow-up conversations.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                10. The Weekly Review Generator
              </h2>

              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
                <p className="text-slate-600 dark:text-slate-400 text-sm font-mono">
                  "Conduct a weekly productivity review based on: [LIST YOUR ACCOMPLISHMENTS, CHALLENGES, AND LEARNINGS]. Identify 2 wins to celebrate, 1 area for improvement, and 3 priorities for next week. End with a motivational insight."
                </p>
              </div>

              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Regular reflection is crucial for continuous improvement. This prompt creates a structured review process that helps you learn from the past and plan for the future.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                Implementing These Prompts for Maximum Impact
              </h2>

              <p className="text-slate-600 dark:text-slate-400 mb-4">
                To get the most out of these productivity prompts, consider these implementation strategies:
              </p>

              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 mb-6 ml-4">
                <li><strong>Start small:</strong> Choose 2-3 prompts that address your biggest productivity challenges</li>
                <li><strong>Create templates:</strong> Save your most-used prompts as templates for quick access</li>
                <li><strong>Customize regularly:</strong> Adapt prompts based on your specific needs and feedback</li>
                <li><strong>Track results:</strong> Monitor how these prompts impact your daily productivity</li>
                <li><strong>Share with team:</strong> Introduce effective prompts to your colleagues for team-wide benefits</li>
              </ul>

              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Remember, the goal isn't to use all these prompts every day, but to have them ready when you need them. The right prompt at the right time can save hours of work and significantly boost your productivity. Start experimenting with these templates and watch your efficiency soar.
              </p>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-lg border-l-4 border-l-green-500">
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Ready to Boost Your Productivity?
                </h3>
                <p className="text-green-800 dark:text-green-200 text-sm mb-4">
                  These prompts are just the beginning. Which one will you try first to transform your daily workflow?
                </p>
                <Button asChild>
                  <Link href="/">
                    Explore More Productivity Prompts
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
