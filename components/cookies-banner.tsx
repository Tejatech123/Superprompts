'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { X, Cookie, Settings, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

export default function CookiesBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    preferences: false
  })

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      setIsVisible(true)
    } else {
      // Load saved preferences
      const savedPreferences = localStorage.getItem('cookiePreferences')
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences))
      }
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true
    }
    setPreferences(allAccepted)
    localStorage.setItem('cookieConsent', 'accepted')
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted))
    setIsVisible(false)
    
    // Initialize analytics and other services
    initializeServices(allAccepted)
  }

  const handleRejectAll = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false
    }
    setPreferences(onlyEssential)
    localStorage.setItem('cookieConsent', 'rejected')
    localStorage.setItem('cookiePreferences', JSON.stringify(onlyEssential))
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', 'custom')
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences))
    setIsVisible(false)
    
    // Initialize services based on preferences
    initializeServices(preferences)
  }

  const initializeServices = (prefs: CookiePreferences) => {
    // Initialize analytics if accepted
    if (prefs.analytics) {
      // Initialize Google Analytics or other analytics tools
      console.log('Analytics initialized')
    }
    
    // Initialize marketing tools if accepted
    if (prefs.marketing) {
      // Initialize marketing pixels, etc.
      console.log('Marketing tools initialized')
    }
    
    // Initialize preference storage if accepted
    if (prefs.preferences) {
      // Initialize preference storage
      console.log('Preference storage initialized')
    }
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return // Can't disable essential cookies
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="max-w-4xl mx-auto shadow-2xl border-2">
        <CardContent className="p-6">
          {!showSettings ? (
            // Main banner
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Cookie className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    We use cookies to enhance your experience
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    We use cookies and similar technologies to improve your browsing experience, personalize content, 
                    analyze our traffic, and provide social media features. By continuing to use our website, 
                    you consent to our use of cookies as described in our{' '}
                    <a 
                      href="/privacy-policy" 
                      className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                    >
                      Privacy Policy
                      <ExternalLink className="h-3 w-3" />
                    </a>.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsVisible(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleAcceptAll} className="flex-1">
                  Accept All Cookies
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleRejectAll}
                  className="flex-1"
                >
                  Reject All
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowSettings(true)}
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Customize
                </Button>
              </div>
            </div>
          ) : (
            // Settings panel
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Cookie Preferences
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {/* Essential Cookies */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Label className="font-medium text-slate-900 dark:text-slate-100">
                        Essential Cookies
                      </Label>
                      <Badge variant="secondary">Always Active</Badge>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Required for basic website functionality, authentication, and security.
                    </p>
                  </div>
                  <Switch checked={true} disabled />
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <Label className="font-medium text-slate-900 dark:text-slate-100 mb-1 block">
                      Analytics Cookies
                    </Label>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Help us understand how visitors interact with our website to improve performance.
                    </p>
                  </div>
                  <Switch 
                    checked={preferences.analytics} 
                    onCheckedChange={() => togglePreference('analytics')}
                  />
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <Label className="font-medium text-slate-900 dark:text-slate-100 mb-1 block">
                      Marketing Cookies
                    </Label>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Used to deliver relevant advertisements and measure campaign effectiveness.
                    </p>
                  </div>
                  <Switch 
                    checked={preferences.marketing} 
                    onCheckedChange={() => togglePreference('marketing')}
                  />
                </div>

                {/* Preference Cookies */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <Label className="font-medium text-slate-900 dark:text-slate-100 mb-1 block">
                      Preference Cookies
                    </Label>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Remember your settings and preferences for a personalized experience.
                    </p>
                  </div>
                  <Switch 
                    checked={preferences.preferences} 
                    onCheckedChange={() => togglePreference('preferences')}
                  />
                </div>
              </div>

              <Separator />

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleSavePreferences} className="flex-1">
                  Save Preferences
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleAcceptAll}
                  className="flex-1"
                >
                  Accept All
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={handleRejectAll}
                  className="flex-1"
                >
                  Reject All
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
