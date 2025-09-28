'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Mail, Phone, MapPin, Clock, MessageSquare, Send } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))

    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    })

    setFormData({ name: '', email: '', message: '' })
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Have questions about our AI prompts? Need help getting started? We're here to help you unlock the full potential of AI with our curated prompt library.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Send us a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  We're here to help you succeed with AI prompts.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">Email Us</h3>
                    <p className="text-slate-600 dark:text-slate-400">support@superprompts.com</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">We respond within 24 hours</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">Call Us</h3>
                    <p className="text-slate-600 dark:text-slate-400">+1 (555) 123-4567</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">Mon-Fri 9AM-6PM PST</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">Visit Us</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      123 Innovation Drive<br />
                      Tech City, TC 12345<br />
                      United States
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">Business Hours</h3>
                    <div className="text-slate-600 dark:text-slate-400 space-y-1">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                      <p>Saturday: 10:00 AM - 4:00 PM PST</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Quick answers to common questions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                    How do I get started with AI prompts?
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Simply browse our curated collection, find prompts that match your needs, and copy them to your AI tool of choice.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                    Are the prompts free to use?
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Yes! Our basic prompt library is completely free. Premium features and advanced prompts are available with our subscription plans.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                    Can I request specific prompts?
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Absolutely! We love hearing from our community. Use the contact form above to suggest new prompts or categories.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Connect With Us</CardTitle>
                <CardDescription>
                  Follow us for updates, tips, and new prompts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1">
                    Twitter
                  </Button>
                  <Button variant="outline" className="flex-1">
                    LinkedIn
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Discord
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Find Us</CardTitle>
              <CardDescription>
                Visit our office in the heart of Tech City.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-200 dark:bg-slate-700 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-400">
                    Interactive map would be displayed here
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                    (Google Maps integration can be added)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
