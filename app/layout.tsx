import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/contexts/AuthContext'
import CookiesBanner from '@/components/cookies-banner'
import '../styles/globals.css'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'SuperPrompts - the ultimate prompt library for stunning AI images 🖼️✨',
  description: 'Superprompts',
  generator: 'Superprompts',
  icons: {
    icon: '/WhatsApp Image 2025-10-16 at 6.12.44 PM.jpeg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AuthProvider>
            {children}
            <Analytics />
            <Toaster />
            <CookiesBanner />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
