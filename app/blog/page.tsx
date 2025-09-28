import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import BackButton from '@/components/back-button'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog - Superprompts',
  description: 'Discover the latest insights, tips, and techniques for mastering AI prompts and maximizing your productivity.',
}

const blogPosts = [
  {
    id: 'mastering-ai-prompts-beginners-guide',
    title: 'Mastering AI Prompts: A Complete Beginner\'s Guide',
    excerpt: 'Learn the fundamentals of crafting effective AI prompts that deliver consistent, high-quality results every time.',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Tutorial',
    image: '/api/placeholder/400/250'
  },
  {
    id: 'advanced-prompt-techniques',
    title: 'Advanced Prompt Engineering Techniques for Power Users',
    excerpt: 'Discover sophisticated prompt engineering strategies used by AI professionals to achieve complex, nuanced outputs.',
    date: '2024-01-10',
    readTime: '12 min read',
    category: 'Advanced',
    image: '/api/placeholder/400/250'
  },
  {
    id: 'ai-prompts-productivity-boost',
    title: '10 AI Prompts That Will Transform Your Daily Productivity',
    excerpt: 'Explore proven prompt templates that can streamline your workflow and boost efficiency across various tasks.',
    date: '2024-01-05',
    readTime: '6 min read',
    category: 'Productivity',
    image: '/api/placeholder/400/250'
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        
        {/* Back Button */}
        <div className="mb-8">
          <BackButton href="/" text="Back to Home" />
        </div>
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Superprompts Blog
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Stay updated with the latest insights, techniques, and best practices for mastering AI prompts and maximizing your productivity.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8">
            Latest Articles
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={post.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-t-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {index + 1}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Featured Article
                    </p>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/blog/${post.id}`}>
                      Read Article
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>



      </div>
    </div>
  )
}
