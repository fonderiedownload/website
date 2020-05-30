#!/bin/bash

TARGET_BRANCH="master-test"
DATE=$(date --iso-8601=seconds)

git config --local user.email "action@github.com"
git config --local user.name "GitHub Action"

git checkout -B "$TARGET_BRANCH"
git add -A
git commit --no-verify -m "Release-$DATE" --allow-empty
git push origin $TARGET_BRANCH:$TARGET_BRANCH --force-with-lease
