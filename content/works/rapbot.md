---
title: "ラップBot"
slug: "rapbot"
date: "2021-09-16"
tags: ["BUZZ","SOFTWARE"]
description: "ラップで返信するTwitterBot"
image: "/images/works/rapbot.png"
---

CoeFont の API を使って、誰でもラップができる TwitterBot を作りました。
CoeFont APIの活用事例提示の良い例となりました。


<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ラップBot作りました。<br>セリフを引用リツイートするとラップ調で返信します。<br><br>色々なフレーズを引用RTして遊んでみてください!!<br><br>※返信には数分かかります。 <a href="https://twitter.com/hashtag/CoeFont?src=hash&amp;ref_src=twsrc%5Etfw">#CoeFont</a> <a href="https://t.co/BZ3juyrjxR">pic.twitter.com/BZ3juyrjxR</a></p>&mdash; ゆうもや (@takex5g) <a href="https://twitter.com/takex5g/status/1438440691202330624?ref_src=twsrc%5Etfw">September 16, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

このbotでおこなってる処理は次の通りです。
1. Twitter APIで引用リツイートの集計
1. CoeFontAPIで音声合成
1. 音声にスクラッチ音を合成
1. ループ動画を作成
1. Twitter APIでツイート



### 使用技術
Python, Twitter API