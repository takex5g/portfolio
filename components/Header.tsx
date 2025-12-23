'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import OptimizedImage from '@/components/OptimizedImage'
import { IMAGES } from '@/lib/images'

export default function Header() {
  const pathname = usePathname()
  const currentPage = pathname === '/' ? 'works' : pathname?.split('/')[1] || ''

  const handleLogoClick = () => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <nav className="flex justify-end items-end mb-7 mt-3 text-base border-b-2 border-black font-display dark:border-white/70 sm:text-lg md:text-xl sm:mb-4">
      <Link
        href="/"
        onClick={handleLogoClick}
        className="mr-auto mb-1.5 ml-1 cursor-pointer md:w-10 md:h-10"
      >
        <OptimizedImage
          src={IMAGES.LOGO}
          sizePreset="LOGO"
          alt="まいにちものづくり"
          className="dark:invert"
        />
      </Link>
      <Link
        href="/"
        className="py-3 px-3 transition-all duration-300 relative inline-block no-underline hover:bg-black/[0.075] dark:hover:bg-white/10 sm:px-4 md:px-5"
      >
        <div className={currentPage === 'works' ? 'font-bold' : ''}>Works</div>
      </Link>
      <Link
        href="/client-works"
        className="py-3 px-3 transition-all duration-300 relative inline-block no-underline hover:bg-black/[0.075] dark:hover:bg-white/10 sm:px-4 md:px-5"
      >
        <div className={`whitespace-nowrap ${currentPage === 'client-works' ? 'font-bold' : ''}`}>
          Client Works
        </div>
      </Link>
      <Link
        href="/about"
        className="py-3 px-3 transition-all duration-300 relative inline-block no-underline hover:bg-black/[0.075] dark:hover:bg-white/10 sm:px-4 md:px-5"
      >
        <div className={currentPage === 'about' ? 'font-bold' : ''}>About</div>
      </Link>
    </nav>
  )
}
