"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Header() {
  const { theme, setTheme } = useTheme()

  const isDark = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-xl items-center justify-between px-4">
        {/* Left: Brand */}
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold tracking-tight text-foreground transition-colors hover:text-accent">
            SuperPrompts
          </Link>
        </div>

        {/* Right: Navigation */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/sign-up">
            <Button variant="secondary" className="h-9 transition hover:opacity-90">Sign up</Button>
          </Link>
          <Link href="/sign-in">
            <Button className="h-9 px-4 transition shadow-sm hover:shadow">Sign in</Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9 transition-colors hover:bg-blue-500 hover:text-white" aria-label="Toggle theme">
            {isDark ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
