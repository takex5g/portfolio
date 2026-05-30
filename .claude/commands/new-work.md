# 新しいWorks記事を作成

ツイート/ポストのURLから新しい作品記事を作成します。

## 入力情報

- ツイートURL: $ARGUMENTS

## 手順

1. 指定されたツイートURLの内容を取得してください
   - URL末尾の status ID を使い、**syndication endpoint** からJSONで本文・投稿日・メディアを取得するのが確実です（ログイン不要）：
     - `https://cdn.syndication.twimg.com/tweet-result?id=<TWEET_ID>&lang=ja&token=a`
   - 埋め込み用の `<blockquote>` HTMLが必要な場合は oEmbed が便利：
     - `https://publish.twitter.com/oembed?url=<TWEET_URL>&lang=ja&omit_script=true`
   - 取得できない場合のみ、WebFetch等でツイートページから推測してください

2. ツイートの内容から以下の情報を抽出・推測してください：
   - 作品タイトル
   - 作品の説明文（1-2文で簡潔に）
   - 適切なタグ（既存タグ: HARDWARE, Web, MOVIE, MUSIC, GAME, AR, AI など）
   - 投稿日（ツイートの日付）

3. `content/works/` に新しいMarkdownファイルを作成してください
   - ファイル名はslug（英数字、ハイフン）で
   - 以下のフォーマットで作成：

```markdown
---
title: '作品タイトル'
slug: 'file-name'
date: 'YYYY-MM-DD'
tags: ['タグ1', 'タグ2']
description: '作品の説明文'
image: '/images/works/slug.webp'
---

ここに本文を書く（作品の説明、展示イベント名など）。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ツイート本文 <a href="...">#ハッシュタグ</a></p>&mdash; 表示名 (@account) <a href="https://twitter.com/account/status/TWEET_ID?ref_src=twsrc%5Etfw">投稿日</a></blockquote>

### 使用技術

技術1, 技術2, 技術3
```

- ツイート埋め込みは oEmbed で取得した `<blockquote class="twitter-tweet">…</blockquote>` をそのまま貼り付けてください（複数貼ってもOK）
- 画像は `.webp` を使用します（既存記事は全て `.webp`）

4. 作成後、ユーザーに以下を確認してください：
   - 内容の確認
   - サムネイル画像（`.webp`）を `public/images/works/` に配置する必要があること
