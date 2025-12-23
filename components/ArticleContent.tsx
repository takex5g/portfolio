'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void
      }
    }
  }
}

interface ArticleContentProps {
  html: string
}

export default function ArticleContent({ html }: ArticleContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Twitter埋め込みがあるかチェック
    const hasTweets = containerRef.current.querySelector('.twitter-tweet')
    if (!hasTweets) return

    // Twitter widgets.js を読み込む
    const loadTwitterWidgets = () => {
      if (window.twttr) {
        window.twttr.widgets.load(containerRef.current!)
        return
      }

      // 既存のスクリプトがあるか確認
      const existingScript = document.querySelector(
        'script[src="https://platform.twitter.com/widgets.js"]'
      )
      if (existingScript) {
        // スクリプトは読み込み済みだが twttr がまだない場合は少し待つ
        const checkTwttr = setInterval(() => {
          if (window.twttr) {
            clearInterval(checkTwttr)
            window.twttr.widgets.load(containerRef.current!)
          }
        }, 100)
        return
      }

      const script = document.createElement('script')
      script.src = 'https://platform.twitter.com/widgets.js'
      script.async = true
      script.onload = () => {
        if (window.twttr) {
          window.twttr.widgets.load(containerRef.current!)
        }
      }
      document.body.appendChild(script)
    }

    loadTwitterWidgets()
  }, [html])

  return (
    <div
      ref={containerRef}
      className="prose prose-lg max-w-none dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
