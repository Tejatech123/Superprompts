import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface NextBlogButtonProps {
  href: string
  title: string
  className?: string
}

export default function NextBlogButton({ 
  href, 
  title, 
  className = "" 
}: NextBlogButtonProps) {
  return (
    <div className={`mt-8 ${className}`}>
      <Button asChild size="lg" className="w-full sm:w-auto text-sm sm:text-base">
        <Link href={href} className="flex items-center gap-2 justify-center">
          <span className="hidden sm:inline">Read Next: {title}</span>
          <span className="sm:hidden">Read Next</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}
