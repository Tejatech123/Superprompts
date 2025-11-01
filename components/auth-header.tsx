"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

export function AuthHeader() {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const { user, signOut } = useAuth()

  const isDark = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  const handleSignUp = () => {
    router.push("/sign-up")
  }

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
        {/* Left: logo with WhatsApp image */}
        <Link href={user ? "/home" : "/"} className="flex items-center gap-2">
          <img 
            src="/WhatsApp Image 2025-10-16 at 6.12.44 PM.jpeg" 
            alt="SuperPrompts Logo" 
            className="h-8 w-8 object-contain"
          />
          <span className="text-base sm:text-lg font-semibold tracking-tight text-foreground">superprompts.in</span>
        </Link>

        {/* Right: icons - theme toggle and sign up */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8 text-foreground" aria-label="Toggle theme">
            {isDark ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          {user ? (
            <Button onClick={handleSignOut} variant="ghost" className="h-8 px-2 text-foreground">
              Sign out
            </Button>
          ) : (
            <Button onClick={handleSignUp} variant="ghost" className="h-8 px-2 text-foreground">
              Sign up
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
