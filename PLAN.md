# PLAN.md — TOPIK 문제은행 앱 와이어프레임 → 프로토타입 전환

> Claude Code에서 이어받을 작업 계획입니다.
> CLAUDE.md를 먼저 읽고 이 파일을 참고하세요.

---

## 현재 상태

- [x] 전체 UX 확정 (유저플로우 v6, IA, 화면별 결정사항)
- [x] 와이어프레임 SVG 10개 완성
- [x] PPTX 기획서 13슬라이드 완성
- [ ] SVG → HTML 고품질 변환
- [ ] 인터랙티브 프로토타입 제작
- [ ] 남은 화면 추가 (실전모드 실제 UI 등)

---

## Phase 1 — SVG → HTML 변환 (품질 통일)

### 목표
기존 SVG 와이어프레임을 HTML/CSS로 재작성해서 품질을 통일합니다.
Playwright로 캡처하면 채팅창 렌더링과 동일한 선명한 PNG를 얻을 수 있습니다.

### 작업 순서
각 SVG를 HTML로 변환 → Playwright PNG 캡처 → 확인

```
01_온보딩          → wf_onboarding.html
02_로그인_회원가입  → wf_login.html
03_대시보드        → wf_dashboard.html  (기존 고품질 HTML 있음)
04_기출문제        → wf_gichul.html
05_실전모드_회차   → wf_realmode_rounds.html
06_문제풀기_피드백  → wf_solving.html   (기존 고품질 HTML 있음)
07_실전모드        → wf_realmode.html   (기존 고품질 HTML 있음)
08_결과_해설       → wf_result.html     (기존 고품질 HTML 있음)
09_연습문제        → wf_practice.html
10_마이페이지      → wf_mypage.html     (기존 고품질 HTML 있음)
```

### Playwright 캡처 스크립트 패턴
```javascript
const { chromium } = require('playwright');
// 각 HTML 파일을 열어 fullPage screenshot
// scale: 'device', width: 콘텐츠에 맞게 자동 조정
```

---

## Phase 2 — 인터랙티브 프로토타입

### 목표
단일 HTML 파일에서 화면 클릭 시 다음 화면으로 전환되는 프로토타입을 제작합니다.
모바일/웹 브라우저 모두 지원, 별도 서버 불필요.

### 구조
```
prototype.html (단일 파일)
├── 화면 데이터: 모든 와이어프레임 화면을 JS 객체로 정의
├── 라우터: 현재 화면 상태 관리 (history API)
├── 트랜지션: 슬라이드 애니메이션
└── 네비게이션: 탭바 · 뒤로가기 · 브레드크럼
```

### 화면 전환 맵
```
스플래시 → 홍보1 → 홍보2 → 홍보3 → 언어선택 → 목표레벨 → 완료
완료 → 로그인 or 대시보드
로그인 → 회원가입 or 대시보드

대시보드
  └─ 바로풀기 → 문제풀기
  └─ 취약유형풀기 → 문제풀기

기출문제
  └─ 유형선택풀기 → 필터 → 문제풀기
  └─ 실전모드 → 회차선택 → 실전실행 → 실전결과

연습문제
  └─ 유형선택풀기 → 필터 → 문제풀기
  └─ 실전모드 → 실전실행 → 실전결과

문제풀기
  └─ 선택 → 즉시피드백 → 다음문제
  └─ 결과 → 해설 or 대시보드 or 다시풀기
```

---

## Phase 3 — 남은 화면 추가

### 미완성 화면
- [ ] Q3: 실전모드 실제 TOPIK 시험 화면 (문항이동 방식 등 실제 UI 검토 필요)
- [ ] 구독 결제 화면 (현재 범위 외, 추후)
- [ ] 모의고사 화면 (추후)

---

## 파일 구조 제안

```
topik-wireframes/
├── CLAUDE.md                  # 프로젝트 컨텍스트 (이 파일)
├── PLAN.md                    # 작업 계획 (이 파일)
├── wireframes/
│   ├── svg/                   # 원본 SVG (10개)
│   ├── html/                  # HTML 변환본
│   ├── png/                   # Playwright 캡처 PNG
│   └── prototype.html         # 인터랙티브 프로토타입
└── assets/
    └── design-tokens.json     # 컬러·폰트 토큰
```

---

## 디자인 토큰 (design-tokens.json)

```json
{
  "color": {
    "primary": "#534AB7",
    "primaryLight": "#EEEDFE",
    "primaryDark": "#26215C",
    "teal": "#0F6E56",
    "tealLight": "#E1F5EE",
    "coral": "#993C1D",
    "coralLight": "#FAECE7",
    "amber": "#854F0B",
    "amberLight": "#FAEEDA",
    "gray": "#888780",
    "grayLight": "#F1EFE8",
    "grayBase": "#F8F7F4",
    "border": "#D3D1C7",
    "dark": "#1a1a1a"
  },
  "radius": {
    "sm": "6px",
    "md": "8px",
    "lg": "12px",
    "xl": "20px",
    "pill": "20px",
    "phone": "32px"
  },
  "font": {
    "family": "-apple-system, BlinkMacSystemFont, 'Noto Sans KR', sans-serif",
    "size": {
      "xs": "9px",
      "sm": "10px",
      "base": "12px",
      "md": "13px",
      "lg": "16px",
      "xl": "20px"
    }
  }
}
```

---

## 주의사항

- **다국어 피드백 예시**: 베트남어 "Sai rồi!" (오답) / "Chính xác!" (정답)
- **기출문제 상단 칩**: "102회 · TOPIK I · 실전모드" 형태로 현재 선택 요약
- **연습문제 상단 칩**: "TOPIK I · 듣기 · 대화 유형" 형태
- **건너뜀 처리**: 버튼 없음, 다음 문제 이동 시 내부 기록
- **실전모드 헤더 배경**: #26215C (진한 보라)
- **AI 힌트 기능**: 없음 (제거됨)
- **오답 노트 탭**: 없음 (대시보드 취약유형으로 통합)
