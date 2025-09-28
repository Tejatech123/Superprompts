'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface BackButtonProps {
  href?: string
  text?: string
  className?: string
}

export default function BackButton({ 
  href, 
  text = "Back", 
  className = "" 
}: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <Button 
      variant="outline" 
      onClick={handleClick}
      className={`flex items-center gap-2 text-sm sm:text-base ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="hidden sm:inline">{text}</span>
      <span className="sm:hidden">Back</span>
    </Button>
  )
}
