import type { Plugin } from 'unified'
import type { Root, Paragraph, Link, Text } from 'mdast'
import { visit } from 'unist-util-visit'
import { fetchOgp, type OgpData } from './ogp'

// OGPデータからブログカードHTMLを生成
function createBlogCardHtml(ogp: OgpData): string {
  if (ogp.isUnavailable) {
    return `<div class="blogcard blogcard-unavailable not-prose">
  <div class="blogcard-content">
    <div class="blogcard-title">${escapeHtml(ogp.title)}</div>
    <div class="blogcard-description">${escapeHtml(ogp.description)}</div>
    <div class="blogcard-meta">
      <span class="blogcard-site">${escapeHtml(ogp.url)}</span>
    </div>
  </div>
</div>`
  }

  const imageHtml = ogp.image
    ? `<div class="blogcard-image"><img src="${ogp.image}" alt="" loading="lazy" /></div>`
    : ''

  const descriptionHtml = ogp.description
    ? `<div class="blogcard-description">${escapeHtml(ogp.description)}</div>`
    : ''

  return `<a href="${ogp.url}" class="blogcard not-prose" target="_blank" rel="noopener noreferrer">
  ${imageHtml}
  <div class="blogcard-content">
    <div class="blogcard-title">${escapeHtml(ogp.title)}</div>
    ${descriptionHtml}
    <div class="blogcard-meta">
      <img src="${ogp.favicon}" alt="" class="blogcard-favicon" width="16" height="16" />
      <span class="blogcard-site">${escapeHtml(ogp.siteName)}</span>
    </div>
  </div>
</a>`
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// URLのみの行かどうかを判定
function isStandaloneUrl(node: Paragraph): string | null {
  // 子要素が1つだけ
  if (node.children.length !== 1) return null

  const child = node.children[0]

  // Linkノードの場合（autolink形式: <https://...>）
  if (child.type === 'link') {
    const link = child as Link
    // リンクテキストがURLと同じ（自動リンク）
    if (
      link.children.length === 1 &&
      link.children[0].type === 'text' &&
      (link.children[0] as Text).value === link.url
    ) {
      return link.url
    }
  }

  // Textノードの場合（生のURL）
  if (child.type === 'text') {
    const text = (child as Text).value.trim()
    if (/^https?:\/\/[^\s]+$/.test(text)) {
      return text
    }
  }

  return null
}

// Markdown内のすべてのブログカードURLを抽出
export function extractBlogcardUrls(content: string): string[] {
  const urls: string[] = []
  // URLのみの行を検出（行頭から行末まで）
  const urlRegex = /^https?:\/\/[^\s]+$/gm
  let match
  while ((match = urlRegex.exec(content)) !== null) {
    urls.push(match[0])
  }
  return urls
}

// ビルド時にOGPを事前取得
export async function prefetchOgpData(
  urls: string[]
): Promise<Map<string, OgpData>> {
  const uniqueUrls = [...new Set(urls)]
  const results = new Map<string, OgpData>()

  for (const url of uniqueUrls) {
    const ogp = await fetchOgp(url)
    results.set(url, ogp)
  }

  return results
}

// Twitter埋め込みからscriptタグを除去
const TWITTER_SCRIPT_REGEX =
  /<script[^>]*src="https:\/\/platform\.twitter\.com\/widgets\.js"[^>]*><\/script>/g

// remarkプラグイン: URLのみの行をブログカードに変換
export const remarkBlogcard: Plugin<
  [{ ogpCache: Map<string, OgpData> }],
  Root
> = (options) => {
  const { ogpCache } = options

  return (tree) => {
    // Paragraph内のURL-onlyをブログカードに変換
    visit(tree, 'paragraph', (node: Paragraph, index, parent) => {
      const url = isStandaloneUrl(node)
      if (url && parent && typeof index === 'number') {
        const ogp = ogpCache.get(url)
        if (ogp) {
          const blogcardHtml = createBlogCardHtml(ogp)
          // ParagraphをHTMLノードに置き換え
          ;(parent.children as unknown[])[index] = {
            type: 'html',
            value: blogcardHtml,
          }
        }
      }
    })

    // Twitter widgets.js の script タグを除去
    visit(tree, 'html', (node: { value: string }) => {
      node.value = node.value.replace(TWITTER_SCRIPT_REGEX, '')
    })
  }
}
