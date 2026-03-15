#!/usr/bin/env bash
# daily_blog_post.sh
# 매일 23:00 KST에 실행: 오늘의 개발 기록을 블로그 포스트로 자동 생성 후 GitHub 푸시
# launchd plist: ~/Library/LaunchAgents/com.seodongok.daily-blog.plist

set -euo pipefail

BLOG_REPO="/Users/seodong-og/portfolio/SeoDongOk.github.io"
TRADER_REPO="/Users/seodong-og/project_vs/sdo_auto_trader_crypto"
LOG_FILE="$BLOG_REPO/scripts/daily_blog_post.log"

# ── 로그 함수 ─────────────────────────────────────────────────────
log() { echo "[$(TZ='Asia/Seoul' date '+%Y-%m-%d %H:%M:%S KST')] $*" | tee -a "$LOG_FILE"; }

log "====== 일일 블로그 포스트 생성 시작 ======"

# ── 날짜 ──────────────────────────────────────────────────────────
DATE=$(TZ='Asia/Seoul' date '+%Y-%m-%d')
FILENAME="$BLOG_REPO/data/blog/${DATE}-quant-dev-log.mdx"

# ── 오늘 이미 포스트가 있으면 스킵 ────────────────────────────────
if [ -f "$FILENAME" ]; then
    log "오늘 포스트 이미 존재: $FILENAME — 스킵"
    exit 0
fi

# ── 트레이더 봇 오늘의 커밋 수집 ──────────────────────────────────
TRADER_COMMITS=""
if [ -d "$TRADER_REPO/.git" ]; then
    TRADER_COMMITS=$(
        git -C "$TRADER_REPO" log \
            --after="${DATE} 00:00:00" \
            --before="${DATE} 23:59:59" \
            --format="- %s" \
            --no-merges 2>/dev/null || true
    )
fi

# ── 트레이더 봇 오늘 변경된 파일 목록 ────────────────────────────
CHANGED_FILES=""
if [ -d "$TRADER_REPO/.git" ]; then
    CHANGED_FILES=$(
        git -C "$TRADER_REPO" diff \
            --name-only \
            "$(git -C "$TRADER_REPO" rev-list --after="${DATE} 00:00:00" --before="${DATE} 23:59:59" HEAD 2>/dev/null | tail -1 2>/dev/null)..HEAD" \
            2>/dev/null | head -20 || true
    )
fi

# ── 커밋 섹션 구성 ────────────────────────────────────────────────
if [ -n "$TRADER_COMMITS" ]; then
    COMMIT_SECTION="$TRADER_COMMITS"
else
    COMMIT_SECTION="오늘 커밋 없음 — 코드 리뷰 또는 학습 날"
fi

# ── 변경 파일 섹션 구성 ───────────────────────────────────────────
if [ -n "$CHANGED_FILES" ]; then
    FILES_SECTION=$(echo "$CHANGED_FILES" | sed 's/^/- `/' | sed 's/$/`/')
else
    FILES_SECTION="변경 없음"
fi

# ── MDX 파일 생성 ─────────────────────────────────────────────────
cat > "$FILENAME" << MDXEOF
---
title: '[퀀트 개발 일지] ${DATE}'
date: '${DATE}'
tags: ['quantitative-trading', 'python', 'binance', 'algorithm', 'daily-log']
draft: false
summary: '${DATE} — 바이낸스 선물 자동매매 봇 개발 일지'
---

> 퀀트 개발자를 향한 여정. 매일 한 줄씩.

## 오늘의 커밋

${COMMIT_SECTION}

## 변경된 파일

${FILES_SECTION}

## 회고

_오늘 배운 것, 막혔던 것, 다음에 할 것을 여기에 기록하세요._

---

*SDO Auto Trader Crypto — Binance Futures 자동매매 봇 개발 중*
MDXEOF

log "포스트 생성 완료: $FILENAME"

# ── 블로그 저장소 커밋 & 푸시 ────────────────────────────────────
cd "$BLOG_REPO"

git add "$FILENAME"

if git diff --cached --quiet; then
    log "커밋할 변경사항 없음 — 종료"
    exit 0
fi

git commit -m "blog: ${DATE} 퀀트 개발 일지 자동 포스팅"
log "커밋 완료"

# dev 브랜치 푸시
git push origin dev
log "dev 푸시 완료"

# main 브랜치에 머지 후 배포
git checkout main
git pull origin main
git merge dev --no-edit
git push origin main
log "main 배포 완료"

# dev 브랜치로 복귀
git checkout dev
log "dev 브랜치 복귀"

log "====== 완료 ======"
