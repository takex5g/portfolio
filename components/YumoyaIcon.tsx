'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function YumoyaIcon() {
  const [animePos, setAnimePos] = useState(0)

  const doAnime = () => {
    setAnimePos(Math.floor(Math.random() * 3))
  }

  useEffect(() => {
    const yumoanime = () => {
      const timeout = setTimeout(
        () => {
          doAnime()
          yumoanime()
        },
        (Math.floor(Math.random() * 6) + 5) * 1000
      )
      return timeout
    }

    const timeout = yumoanime()
    return () => clearTimeout(timeout)
  }, [])

  const getTransformY = () => {
    if (animePos === 0) return 0
    if (animePos === 1) return 40
    return 85
  }

  return (
    <div
      className="w-[100px] h-[100px] rounded-full overflow-hidden relative cursor-pointer"
      style={{ backgroundColor: '#b6d55d' }}
      onClick={doAnime}
    >
      <Image
        src="/images/takex5g_transparent.png"
        width={100}
        height={100}
        alt="ゆうもや"
        className="absolute left-0 transition-transform duration-[800ms]"
        style={{ transform: `translateY(${getTransformY()}px)` }}
      />
    </div>
  )
}
