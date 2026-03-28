# DongOk Seo Portfolio

개인 포트폴리오 및 작업 기록 사이트입니다.

## Stack

- Next.js 15
- Tailwind CSS
- Contentlayer
- MDX

## Main Pages

- `/` : 포트폴리오 메인
- `/blog` : 글과 작업 기록
- `/projects` : GitHub 저장소 기반 프로젝트 목록
- `/about` : 프로필 소개
- `/tags` : 태그 모음

## Development

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 열면 됩니다.

## Build

```bash
npm run build
```

## Deploy

`main` 브랜치에 푸시하면 GitHub Pages 워크플로를 통해 배포됩니다.

## Content

- 글: `data/blog`
- 작성자 정보: `data/authors/default.mdx`
- 프로젝트 오버라이드: `data/projectsData.ts`
- 사이트 메타데이터: `data/siteMetadata.js`

## Notes

- UI 텍스트는 언어 토글에 맞춰 한국어, 일본어, 영어로 전환됩니다.
- 프로젝트 카드는 GitHub 공개 저장소 데이터를 기반으로 렌더링됩니다.
