---
name: Onboarding & Login Implementation
description: Onboarding flow (splash/intro/language/level/complete) and login/signup pages implementation status and patterns used
type: project
---

Onboarding flow (`/onboarding/*`) and login/signup screens have been implemented.

**Routes implemented:**
- `/onboarding` — Splash with animated loading bar, auto-redirects to /onboarding/intro after 2s
- `/onboarding/intro` — 3-slide promo carousel with page indicator dots, skip button
- `/onboarding/language` — 2-column language grid (8 languages), single-select with PrimaryLight highlight
- `/onboarding/level` — 5 radio-card options (TOPIK I 1급/2급, II 3~4급/5~6급, 아직 모르겠어요), skip link
- `/onboarding/complete` — Confirmation screen with settings summary card
- `/login` — Social (G/A) + email/password login, links to /signup
- `/signup` — Social (G/A) + name/email/password form

**Key patterns:**
- All onboarding/login pages use `showTabBar={false}`
- Splash uses `showStatusBar={false}` in addition
- Input fields use inline style constant `INPUT_STYLE` (no separate component)
- Focus state handled via `useState` + `onFocus`/`onBlur` for outline
- Social buttons use background (#F8F9FC = var(--color-background)) with border style

**Why:** Entry point changed from /dashboard to /onboarding in `src/app/page.tsx`.

**How to apply:** When adding more onboarding steps or modifying login, follow the same pattern of inline styles + CSS variables, no hardcoded hex values.
