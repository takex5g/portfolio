import Image from 'next/image'
import { IMAGE_SIZES, IMAGES } from '@/lib/images'

type ImageSizePreset = keyof typeof IMAGE_SIZES

interface OptimizedImageProps {
  src: string
  alt: string
  // サイズ指定方法
  sizePreset?: ImageSizePreset
  width?: number
  height?: number
  fill?: boolean
  // レスポンシブ
  sizes?: string
  // スタイリング
  className?: string
  style?: React.CSSProperties
  // 読み込み
  priority?: boolean
  loading?: 'lazy' | 'eager'
  // フォールバック
  fallbackSrc?: string
}

export default function OptimizedImage({
  src,
  alt,
  sizePreset,
  width,
  height,
  fill,
  sizes,
  className,
  style,
  priority,
  loading = 'lazy',
  fallbackSrc = IMAGES.WORKS_DEFAULT,
}: OptimizedImageProps) {
  // サイズの決定
  const resolvedSize = sizePreset ? IMAGE_SIZES[sizePreset] : { width, height }

  // fillモードの場合
  if (fill) {
    return (
      <Image
        src={src || fallbackSrc}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        style={style}
        priority={priority}
        loading={priority ? undefined : loading}
      />
    )
  }

  // 固定サイズモードの場合
  return (
    <Image
      src={src || fallbackSrc}
      alt={alt}
      width={resolvedSize.width}
      height={resolvedSize.height}
      className={className}
      style={style}
      priority={priority}
      loading={priority ? undefined : loading}
    />
  )
}

// SNSアイコン専用コンポーネント
interface SocialIconProps {
  platform: 'twitter' | 'github' | 'tiktok' | 'note' | 'instagram'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const SOCIAL_ICONS = {
  twitter: IMAGES.TWITTER,
  github: IMAGES.GITHUB,
  tiktok: IMAGES.TIKTOK,
  note: IMAGES.NOTE,
  instagram: IMAGES.INSTAGRAM,
} as const

const SOCIAL_SIZES = {
  sm: IMAGE_SIZES.ICON_SM,
  md: IMAGE_SIZES.ICON_MD,
  lg: IMAGE_SIZES.ICON_LG,
} as const

export function SocialIcon({
  platform,
  size = 'md',
  className,
}: SocialIconProps) {
  const src = SOCIAL_ICONS[platform]
  const { width, height } = SOCIAL_SIZES[size]
  const alt = platform.charAt(0).toUpperCase() + platform.slice(1)

  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={className}
    />
  )
}
