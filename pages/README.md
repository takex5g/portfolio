# PAGES

**about.vue** プロフィール
**index.vue** 作品ページ一覧
**_works/_id.vue** 作品個別ページ

## index.vue メモ

### プロダクト読み込み時データの加工の流れ
Data:raw_products jsonから読み込んだ無加工データ
↓
cmputed:products() ソートを行う
↓
comuted:pickedproducts() タグによる絞り込みを行う

この順番にしないと絞り込んだ後にタグ変えたら微妙な絞り込みになっちゃう