import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | まいにちものづくり',
  description: 'ゆうもやのプロフィールページ',
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
