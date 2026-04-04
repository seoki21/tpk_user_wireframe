---
name: Project Overview
description: TOPIK 문제은행 Next.js 앱 라우트 맵과 구현 완료 현황
type: project
---

Next.js 14 App Router 기반 모바일 웹 앱.
작업 디렉토리: `D:/works/Projects/tpk_user_wireframe/app/src/`

## 완료된 라우트 (2026-04-04 기준)

| 라우트 | 설명 |
|--------|------|
| / | 대시보드 (탭1) |
| /past-exam | 기출문제 방식 선택 |
| /past-exam/select | 기출문제 유형 선택풀기 퍼널 |
| /past-exam/exam-mode/select | 실전모드 회차·등급 선택 (신규) |
| /past-exam/exam-mode | 실전모드 문제 풀기 |
| /past-exam/exam-mode/result | 실전모드 결과 |
| /practice | 연습문제 방식 선택 |
| /practice/select | 연습문제 유형 선택풀기 퍼널 (신규, 난이도 필터 추가) |
| /practice/exam-mode | 연습 실전모드 |
| /quiz | 문제 풀기 공통 |
| /quiz/feedback | 즉시 피드백 (베트남어, 접이식 한국어 해설) |
| /quiz/result | 선택풀기 결과 요약 (신규) |
| /quiz/result/explain | 문제 해설 + AI 해설 (신규) |
| /login | 로그인 |
| /signup | 회원가입 |
| /onboarding | 온보딩 퍼널 |
| /mypage | 마이페이지 |
| /dashboard | 대시보드 |

## 핵심 네비게이션 플로우

- /past-exam → 실전모드 선택 → /past-exam/exam-mode/select → /past-exam/exam-mode
- /past-exam/select → /quiz → /quiz/feedback → /quiz → ... → /quiz/result → /quiz/result/explain
- /practice → 유형선택풀기 → /practice/select → /quiz
- /practice → 실전모드 → /practice/exam-mode

**Why:** 실전모드 회차 선택을 별도 화면으로 분리해서 UX 퍼널을 명확하게 구분.

**How to apply:** 새 화면 추가 시 위 라우트 맵을 먼저 확인하고 기존 네비게이션 일관성 유지.
