# portfolio

> まいにちものづくりのポートフォリオ
> https://mononichi.com/

## Setup

```bash
# install dependencies
yarn install

# serve with hot reload at localhost:3000
yarn dev

# build for production
yarn build
```

## 記事の更新方法

### Works（個人制作）

`content/works/` にMarkdownファイルを追加します。

```markdown
---
title: "作品タイトル"
slug: "file-name"
date: "2024-01-01"
tags: ["HARDWARE", "Web"]
description: "作品の説明文"
image: "/images/works/sample.png"
---

本文をここに書きます。
```

- 画像は `public/images/works/` に配置
- タグは複数指定可能

### Client Works（クライアントワーク）

`content/client-works/` にMarkdownファイルを追加します。

```markdown
---
title: "プロジェクト名"
date: "2024-01-01"
tags: ["Web", "AI"]
description: "プロジェクトの説明文"
image: "/images/client-works/sample.png"
---

本文をここに書きます。
```

- 画像は `public/images/client-works/` に配置

### Claude Codeで記事を作成

ツイートURLから記事を自動生成できます。

```bash
# Works（個人制作）の記事を作成
/new-work https://twitter.com/takex5g/status/xxxxx

# Client Worksの記事を作成
/new-client-work https://twitter.com/takex5g/status/xxxxx
```

ツイートの内容から記事のMarkdownファイルが自動生成されます。
作成後、サムネイル画像を該当フォルダに配置してください。
