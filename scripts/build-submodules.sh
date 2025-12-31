#!/bin/bash

# twitterXmachineとedo-rumをビルドしてpublic/にコピー

set -e

# submoduleを初期化・更新
echo "Initializing submodules..."
git submodule update --init --recursive --remote

echo "Building twitterXmachine..."

cd twitterXmachine
npm install --include=dev
npm run build
cd ..

# public/twitterXを作成してビルドファイルをコピー
rm -rf public/twitterX
cp -r twitterXmachine/dist public/twitterX

echo "Done! twitterXmachine built and copied to public/twitterX"

echo "Building edo-rum..."

cd edo-rum
npm install --include=dev
npm run build
cd ..

# public/edo-runを作成してビルドファイルをコピー
rm -rf public/edo-run
cp -r edo-rum/dist public/edo-run

echo "Done! edo-rum built and copied to public/edo-run"
