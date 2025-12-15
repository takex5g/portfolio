---
title: '無限たんぽぽマシン'
slug: 'sashimitanpopo'
date: '2024-09-22'
tags: ['HARDWARE', 'BUZZ']
description: '刺身にたんぽぽを乗せる続ける仕事'
image: '/images/works/sashimitanpopo.webp'
---

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">刺身タンポポ乗せる仕事を作りました。 たくさん置くとエラーがでます <a href="https://twitter.com/hashtag/MFTokyo2024?src=hash&amp;ref_src=twsrc%5Etfw">#MFTokyo2024</a> <a href="https://t.co/Db0qxbK3uA">pic.twitter.com/Db0qxbK3uA</a></p>&mdash; ゆうもや (@takex5g) <a href="https://twitter.com/takex5g/status/1837678707311628352?ref_src=twsrc%5Etfw">September 22, 2024</a></blockquote>

ベルトコンベアで流れてくる刺身のパックに刺身たんぽぽを載せていくお仕事です。

Maker Faire Tokyo 2024にて展示しました。

<iframe width="560" height="315" src="https://www.youtube.com/embed/rY5XWuTMlnM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

2つ以上載せると画像認識で検知され、警告が表示されます。

![ERROR 刺身タンポポ2個検知](/images/works/sashimitanpopo-error.webp)

無限に刺身が流れるベルトコンベアを制作し、OpenCVで刺身たんぽぽの数を認識しています。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">タンポポ検知の様子 <a href="https://twitter.com/hashtag/MFTokyo2024?src=hash&amp;ref_src=twsrc%5Etfw">#MFTokyo2024</a> <a href="https://t.co/lWaw518lxB">pic.twitter.com/lWaw518lxB</a></p>&mdash; ゆうもや (@takex5g) <a href="https://twitter.com/takex5g/status/1837800021368229976?ref_src=twsrc%5Etfw">September 22, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## メディア掲載

https://nlab.itmedia.co.jp/cont/articles/3386576/

https://togetter.com/li/2439287

## 使用技術

### 設計

Fusion360, MISUMI Frames

### 認識・バックエンド

Python, OpenCV, Flask, シリアル通信

### 表示画面

Electron (Vite), React, REST API

### ハードウェア

XIAO RP2040 (Arduino), VL53L1X レーザー測距センサ
