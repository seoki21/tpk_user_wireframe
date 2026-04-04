---
name: Dashboard Language Dropdown
description: Client component LanguageDropdown added to dashboard header for language switching UI (no actual i18n logic)
type: project
---

`LanguageDropdown` client component lives at `src/components/dashboard/LanguageDropdown.tsx`.

It's rendered in the dashboard header (`src/app/dashboard/page.tsx`) next to the profile avatar.

**Behavior:**
- Shows current language flag + short code (e.g. 🇻🇳 VI)
- Click to open listbox dropdown (Surface bg, Border border, 12px radius, shadow)
- 5 languages: KO/EN/ZH/JA/VI
- Selected item shows PrimaryLight bg + checkmark + Primary text
- Click outside closes via `useEffect` + `mousedown` listener on `document`

**Why:** Dashboard is a server component; dropdown extracted as separate client component to avoid making the whole page a client component.

**How to apply:** Same pattern for any interactive widget added to server-component pages — extract to a `"use client"` component in `src/components/`.
