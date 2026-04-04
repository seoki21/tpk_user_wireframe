---
name: Phase 1 Publishing Status
description: Phase 1 퍼블리싱 완료 상태 — 구현된 화면, 기술 스택, 설계 결정사항
type: project
---

Phase 1 퍼블리싱 완료 (2026-04-04). Next.js 16.2.2 + Tailwind v4 + TypeScript strict 모드 기준 빌드 성공.

**Why:** 와이어프레임 기반 모바일 우선 UI 퍼블리싱. 목데이터 사용, 클릭으로 화면 전환만 필요. 백엔드 없음.

**구현된 화면:**
- `/` → `/dashboard` redirect
- `/dashboard` — 대시보드 (시험목표, 추천학습, 스트릭, 약점분석, 취약유형Top3)
- `/past-exam` — 기출문제 방식 선택 (유형선택풀기 / 실전모드)
- `/past-exam/select` — 유형 선택풀기 (등급→영역→유형 Funnel)
- `/past-exam/exam-mode` — 기출문제 실전모드 (다크헤더, 타이머, 문항이동 그리드)
- `/past-exam/exam-mode/result` — 기출문제 실전모드 결과 (점수, 4통계카드, 도트그리드)
- `/quiz` — 문제 풀기 (선택 전 상태)
- `/quiz/feedback` — 즉시 피드백 (정답/오답/건너뜀 구분, 베트남어 피드백 예시)
- `/practice` — 연습문제 방식 선택 (난이도·문항수 설정 포함)
- `/practice/exam-mode` — 연습문제 실전모드 (기출문제 실전모드와 동일 구조, teal 색상 사용)
- `/practice/exam-mode/result` — 연습문제 실전모드 결과 (성적 피드백 카드 추가)
- `/mypage` — 마이페이지 (프로필, 구독관리, 설정, 로그아웃)

**공통 컴포넌트:**
- `MobileFrame` — 375px 모바일 프레임, StatusBar + 스크롤 콘텐츠 + TabBar
- `StatusBar` — 시간 표시 + 배터리/신호 아이콘 (aria-hidden)
- `TabBar` — 4탭 (대시보드·기출문제·연습문제·마이페이지), usePathname 기반 활성 탭
- `Button` — primary/secondary/ghost/danger 변형
- `Card` — selected prop으로 선택 상태 표현
- `Tag` — default/primary/success/error/warning/outline 변형
- `ProgressBar` — 0-100 value, color/trackColor 커스터마이징 가능

**How to apply:** 새 화면 추가 시 동일한 MobileFrame 래퍼 사용. TabBar가 필요 없는 화면(quiz 등)은 showTabBar={false} 전달.
