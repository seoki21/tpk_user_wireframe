---
name: Tech Stack Details
description: 실제 사용 중인 기술 스택 버전과 Tailwind v4 설정 방식
type: project
---

Next.js 16.2.2 + React 19.2.4 + TypeScript 5 + Tailwind CSS 4 + @tailwindcss/postcss.

**Critical:** Tailwind v4는 `tailwind.config.ts` 파일 없음. `globals.css`의 `@theme {}` 블록에서 CSS 변수로 디자인 토큰 설정.

**CSS 변수 네이밍:** `--color-primary`, `--color-success` 등. Tailwind 유틸리티 클래스(bg-primary 등)는 현재 미사용, 인라인 style에서 `var(--color-primary)` 직접 참조.

**폰트:** Geist 폰트 제거하고 `-apple-system, 'Noto Sans KR', sans-serif` 사용.

**Why:** AGENTS.md 경고에 따라 Node modules docs 확인 후 v4 방식 적용. tailwind.config.ts 생성하면 v4에서 무시될 수 있음.

**How to apply:** 새 색상 토큰 추가 시 `globals.css`의 `@theme {}` 블록에만 추가. Tailwind 클래스가 아닌 `var()` 참조 사용.
