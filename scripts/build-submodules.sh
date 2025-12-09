#!/bin/bash

# twitterXmachineをビルドしてpublic/twitterXにコピー

set -e

# submoduleを初期化・更新
echo "Initializing submodules..."
git submodule update --init --recursive

echo "Building twitterXmachine..."

cd twitterXmachine
npm install
npm run build
cd ..

# public/twitterXを作成してビルドファイルをコピー
rm -rf public/twitterX
cp -r twitterXmachine/dist public/twitterX

echo "Done! twitterXmachine built and copied to public/twitterX"
