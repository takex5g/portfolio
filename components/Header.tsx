'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const currentPage = pathname === '/' ? 'works' : pathname?.split('/')[1] || ''

  const handleLogoClick = () => {
    // ロゴクリック時の処理（必要に応じて）
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <nav className="flex justify-end items-end mb-7 mt-3 text-2xl border-b-2 border-black font-display md:text-base sm:mb-4">
      <Image
        src="/images/monologo.png"
        width={50}
        height={50}
        alt="まいにちものづくり"
        className="mr-auto mb-1.5 ml-1 cursor-pointer md:w-10 md:h-10"
        onClick={handleLogoClick}
      />
      <Link
        href="/"
        className="py-3 px-5 transition-all duration-300 relative inline-block no-underline hover:bg-black/[0.075] xs:px-3"
      >
        <div className={currentPage === 'works' ? 'font-bold' : ''}>Works</div>
      </Link>
      <Link
        href="/about"
        className="py-3 px-5 transition-all duration-300 relative inline-block no-underline hover:bg-black/[0.075] xs:px-3"
      >
        <div className={currentPage === 'about' ? 'font-bold' : ''}>About</div>
      </Link>
      <a
        href="https://mononichi.com/blog"
        className="py-3 px-5 transition-all duration-300 relative inline-block no-underline hover:bg-black/[0.075] xs:px-3"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div>BLOG</div>
      </a>
    </nav>
  )
}
