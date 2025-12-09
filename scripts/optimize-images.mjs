#!/usr/bin/env node
/**
 * 画像最適化スクリプト
 * PNG/JPG画像をWebP形式に変換し、ファイルサイズを削減
 */

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'images')
const WORKS_DIR = path.join(PUBLIC_DIR, 'works')
const ARTICLE_DIR = path.join(PUBLIC_DIR, 'article')

// 設定
const CONFIG = {
  quality: 80,
  maxWidth: 1200,
  skipIfSmaller: true, // 変換後が大きい場合スキップ
}

async function optimizeImage(inputPath) {
  const ext = path.extname(inputPath).toLowerCase()
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
    return null
  }

  const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp')
  const originalSize = fs.statSync(inputPath).size

  try {
    const image = sharp(inputPath)
    const metadata = await image.metadata()

    // リサイズが必要な場合
    let pipeline = image
    if (metadata.width && metadata.width > CONFIG.maxWidth) {
      pipeline = pipeline.resize(CONFIG.maxWidth, null, {
        withoutEnlargement: true,
      })
    }

    // WebPに変換
    const webpBuffer = await pipeline
      .webp({ quality: CONFIG.quality })
      .toBuffer()

    const newSize = webpBuffer.length

    // サイズが小さくなった場合のみ保存
    if (CONFIG.skipIfSmaller && newSize >= originalSize) {
      console.log(
        `⏭️  Skip: ${path.basename(inputPath)} (WebP larger: ${formatSize(originalSize)} -> ${formatSize(newSize)})`
      )
      return null
    }

    fs.writeFileSync(outputPath, webpBuffer)

    const savings = originalSize - newSize
    const percent = ((savings / originalSize) * 100).toFixed(1)

    console.log(
      `✅ ${path.basename(inputPath)} -> .webp (${formatSize(originalSize)} -> ${formatSize(newSize)}, -${percent}%)`
    )

    return {
      original: inputPath,
      optimized: outputPath,
      originalSize,
      newSize,
      savings,
    }
  } catch (error) {
    console.error(`❌ Error: ${path.basename(inputPath)}: ${error.message}`)
    return null
  }
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes}B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)}MB`
}

async function processDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory not found: ${dir}`)
    return []
  }

  const files = fs.readdirSync(dir)
  const results = []

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      const subResults = await processDirectory(filePath)
      results.push(...subResults)
    } else {
      const result = await optimizeImage(filePath)
      if (result) results.push(result)
    }
  }

  return results
}

async function main() {
  console.log('🖼️  画像最適化を開始します...\n')

  const allResults = []

  // worksディレクトリ
  console.log('📁 works/ ディレクトリを処理中...')
  const worksResults = await processDirectory(WORKS_DIR)
  allResults.push(...worksResults)

  // articleディレクトリ
  console.log('\n📁 article/ ディレクトリを処理中...')
  const articleResults = await processDirectory(ARTICLE_DIR)
  allResults.push(...articleResults)

  // 結果サマリー
  console.log('\n' + '='.repeat(50))
  console.log('📊 最適化結果サマリー')
  console.log('='.repeat(50))

  if (allResults.length === 0) {
    console.log('最適化された画像はありません')
  } else {
    const totalOriginal = allResults.reduce((sum, r) => sum + r.originalSize, 0)
    const totalNew = allResults.reduce((sum, r) => sum + r.newSize, 0)
    const totalSavings = totalOriginal - totalNew

    console.log(`処理ファイル数: ${allResults.length}`)
    console.log(`元のサイズ合計: ${formatSize(totalOriginal)}`)
    console.log(`最適化後サイズ: ${formatSize(totalNew)}`)
    console.log(
      `削減サイズ: ${formatSize(totalSavings)} (${((totalSavings / totalOriginal) * 100).toFixed(1)}%)`
    )
  }

  console.log('\n⚠️  注意: WebPファイルが作成されました。')
  console.log(
    'Markdownファイルの画像パスを .webp に更新する必要があります。'
  )
}

main().catch(console.error)
