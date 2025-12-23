import type { Metadata } from 'next'
import { Noto_Sans_JP, Montserrat } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mononichi.com'),
  title: 'まいにちものづくり | Portfolio',
  description: 'まいにちものづくりのポートフォリオサイト',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'まいにちものづくり | Portfolio',
    description: 'まいにちものづくりのポートフォリオサイト',
    url: 'https://mononichi.com',
    siteName: 'まいにちものづくり',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/ogpimg.png',
        width: 1200,
        height: 630,
        alt: 'まいにちものづくり',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'まいにちものづくり | Portfolio',
    description: 'まいにちものづくりのポートフォリオサイト',
    images: ['/ogpimg.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${montserrat.variable}`}>
      <body>
        <div className="max-w-6xl mx-auto px-4">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
