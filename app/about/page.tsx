import type { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Target, 
  Users, 
  Lightbulb, 
  Award, 
  Globe, 
  Heart,
  Zap,
  Shield,
  Star,
  TrendingUp
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us - Superprompts',
  description: 'Learn about Superprompts mission to democratize AI through curated, high-quality prompts for everyone.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            About Superprompts
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to democratize AI by making powerful, effective prompts accessible to everyone. 
            From beginners to experts, we believe that great AI interactions start with great prompts.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="h-6 w-6 text-blue-600" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                To empower individuals and organizations with the knowledge and tools needed to harness the full potential of AI. 
                We believe that everyone should have access to high-quality prompts that can transform their productivity, 
                creativity, and problem-solving capabilities.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Globe className="h-6 w-6 text-green-600" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                A world where AI is not just a tool for the tech-savvy, but an accessible companion for everyone. 
                We envision a future where our curated prompt library helps millions of people unlock their potential 
                and achieve their goals through the power of artificial intelligence.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Story */}
        <Card className="shadow-lg mb-16">
          <CardHeader>
            <CardTitle className="text-2xl">Our Story</CardTitle>
            <CardDescription>
              How Superprompts came to be
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Superprompts was born from a simple observation: while AI technology was advancing rapidly, 
              most people were struggling to get meaningful results from their AI interactions. The problem wasn't 
              the technology—it was the prompts.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Our founders, a team of AI researchers and prompt engineers, spent countless hours experimenting 
              with different prompt structures, techniques, and approaches. They discovered that the difference 
              between mediocre and exceptional AI outputs often came down to just a few carefully chosen words.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Realizing that this knowledge shouldn't be locked away in research papers or expensive consulting 
              services, they created Superprompts—a comprehensive library of tested, optimized prompts that anyone 
              can use to unlock the full potential of AI.
            </p>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-slate-100 mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  Innovation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  We continuously research and develop new prompt techniques to stay at the forefront of AI interaction design.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Users className="h-5 w-5 text-blue-500" />
                  Accessibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  AI should be accessible to everyone, regardless of technical background or experience level.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Shield className="h-5 w-5 text-green-500" />
                  Quality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Every prompt in our library is tested, refined, and optimized to deliver consistent, high-quality results.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Heart className="h-5 w-5 text-red-500" />
                  Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  We foster a collaborative environment where users can share, learn, and grow together.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Zap className="h-5 w-5 text-purple-500" />
                  Efficiency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Our prompts are designed to save time and maximize productivity in every interaction.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Star className="h-5 w-5 text-orange-500" />
                  Excellence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  We strive for excellence in everything we do, from prompt design to user experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-slate-100 mb-12">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-lg text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">AS</span>
                </div>
                <CardTitle>Alex Smith</CardTitle>
                <CardDescription>Co-Founder & CEO</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  AI researcher with 10+ years of experience in natural language processing and prompt engineering.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">MJ</span>
                </div>
                <CardTitle>Maria Johnson</CardTitle>
                <CardDescription>Co-Founder & CTO</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Former Google AI engineer specializing in large language models and human-AI interaction design.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">DC</span>
                </div>
                <CardTitle>David Chen</CardTitle>
                <CardDescription>Head of Product</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Product strategist with a passion for making complex AI tools accessible to everyday users.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Achievements */}
        <Card className="shadow-lg mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Our Achievements</CardTitle>
            <CardDescription className="text-center">
              Milestones we're proud of
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                <p className="text-slate-600 dark:text-slate-400">Active Users</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                <p className="text-slate-600 dark:text-slate-400">Curated Prompts</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                <p className="text-slate-600 dark:text-slate-400">Categories</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">99%</div>
                <p className="text-slate-600 dark:text-slate-400">User Satisfaction</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
            <CardDescription className="text-blue-100">
              Join thousands of users who are already unlocking their potential with Superprompts
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                <TrendingUp className="h-4 w-4 mr-2" />
                Explore Prompts
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Users className="h-4 w-4 mr-2" />
                Join Community
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Have Questions?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            We'd love to hear from you. Get in touch with our team.
          </p>
          <Button size="lg" asChild>
            <a href="/contact">Contact Us</a>
          </Button>
        </div>

      </div>
    </div>
  )
}
