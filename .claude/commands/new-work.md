# 新しいWorks記事を作成

ツイート/ポストのURLから新しい作品記事を作成します。

## 入力情報

- ツイートURL: $ARGUMENTS

## 手順

1. 指定されたツイートURLの内容を確認してください
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
title: "作品タイトル"
slug: "file-name"
date: "YYYY-MM-DD"
tags: ["タグ1", "タグ2"]
description: "作品の説明文"
image: "/images/works/slug.png"
---

ここに本文を書く。

（ツイートの埋め込み）

### 使用技術
技術1, 技術2, 技術3
```

4. 作成後、ユーザーに以下を確認してください：
   - 内容の確認
   - サムネイル画像を `public/images/works/` に配置する必要があること
