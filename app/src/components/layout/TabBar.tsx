"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabItem {
  href: string;
  label: string;
  icon: string;
  activeIcon: string;
}

const TABS: TabItem[] = [
  {
    href: "/dashboard",
    label: "대시보드",
    icon: "⊞",
    activeIcon: "⊞",
  },
  {
    href: "/past-exam",
    label: "기출문제",
    icon: "📋",
    activeIcon: "📋",
  },
  {
    href: "/practice",
    label: "연습문제",
    icon: "✏️",
    activeIcon: "✏️",
  },
  {
    href: "/wrong-notes",
    label: "오답노트",
    icon: "📝",
    activeIcon: "📝",
  },
  {
    href: "/mypage",
    label: "마이페이지",
    icon: "👤",
    activeIcon: "👤",
  },
];

export default function TabBar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/" || pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <nav
      aria-label="메인 탭 네비게이션"
      style={{
        borderTop: "1px solid var(--color-border)",
        backgroundColor: "var(--color-surface)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="flex items-stretch">
        {TABS.map((tab) => {
          const active = isActive(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-label={tab.label}
              aria-current={active ? "page" : undefined}
              className="flex flex-col items-center justify-center flex-1 py-2 gap-1 min-h-[56px] transition-colors"
              style={{
                color: active
                  ? "var(--color-primary)"
                  : "var(--color-text-tertiary)",
                textDecoration: "none",
              }}
            >
              <span style={{ fontSize: "20px", lineHeight: 1 }} aria-hidden="true">
                {active ? tab.activeIcon : tab.icon}
              </span>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: active ? 600 : 400,
                  lineHeight: 1,
                }}
              >
                {tab.label}
              </span>
              {active && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    width: "24px",
                    height: "2px",
                    backgroundColor: "var(--color-primary)",
                    borderRadius: "1px 1px 0 0",
                  }}
                  aria-hidden="true"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
