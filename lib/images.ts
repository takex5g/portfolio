/**
 * 画像パスの一元管理
 */

// 静的画像パス
export const IMAGES = {
  // ロゴ
  LOGO: '/images/monologo.png',

  // プロフィール
  PROFILE: '/images/takex5g.png',
  PROFILE_TRANSPARENT: '/images/takex5g_transparent.png',

  // 企業ロゴ
  KAYAC: '/images/kayac.png',

  // SNSアイコン
  TWITTER: '/images/twitter.svg',
  GITHUB: '/images/github.svg',
  TIKTOK: '/images/tiktok.svg',
  NOTE: '/images/note.png',
  INSTAGRAM: '/images/instagram.svg',

  // その他アイコン
  CLOCK: '/images/clock.svg',

  // デフォルト画像
  WORKS_DEFAULT: '/images/works/default.png',
} as const

// 画像パスの型
export type ImagePath = (typeof IMAGES)[keyof typeof IMAGES]

// 画像サイズのプリセット
export const IMAGE_SIZES = {
  ICON_SM: { width: 24, height: 24 },
  ICON_MD: { width: 48, height: 48 },
  ICON_LG: { width: 64, height: 64 },
  LOGO: { width: 50, height: 50 },
  PROFILE: { width: 100, height: 100 },
  COMPANY_LOGO: { width: 250, height: 120 },
} as const

// レスポンシブsizes属性のプリセット
export const RESPONSIVE_SIZES = {
  WORK_CARD: '(max-width: 450px) 160px, 250px',
  THUMBNAIL: '(max-width: 640px) 100vw, 640px',
} as const
