"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "대시보드", icon: "⊞" },
  { href: "/past-exam", label: "기출문제", icon: "📋" },
  { href: "/practice", label: "연습문제", icon: "✏️" },
  { href: "/wrong-notes", label: "오답노트", icon: "📝" },
  { href: "/mypage", label: "마이페이지", icon: "👤" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard")
      return pathname === "/" || pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside
      style={{
        width: "200px",
        minHeight: "100vh",
        backgroundColor: "var(--color-surface)",
        borderRight: "1px solid var(--color-border)",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      {/* 로고 */}
      <div style={{ padding: "24px 20px 32px" }}>
        <p
          style={{
            fontSize: "20px",
            fontWeight: 800,
            color: "var(--color-primary-dark)",
            margin: "0 0 2px 0",
            letterSpacing: "-0.5px",
          }}
        >
          TOPIK
        </p>
        <p
          style={{
            fontSize: "11px",
            color: "var(--color-text-tertiary)",
            margin: 0,
          }}
        >
          문제은행
        </p>
      </div>

      {/* 네비게이션 */}
      <nav
        aria-label="메인 네비게이션"
        style={{
          flex: 1,
          padding: "0 12px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "8px",
                backgroundColor: active
                  ? "var(--color-primary-light)"
                  : "transparent",
                color: active
                  ? "var(--color-primary)"
                  : "var(--color-text-secondary)",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: active ? 600 : 400,
                transition: "background-color 0.15s ease",
                minHeight: "40px",
              }}
            >
              <span
                style={{ fontSize: "18px", lineHeight: 1, width: "24px", textAlign: "center" }}
                aria-hidden="true"
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* 하단 */}
      <div
        style={{
          padding: "16px 20px",
          borderTop: "1px solid var(--color-divider)",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            color: "var(--color-text-tertiary)",
            margin: 0,
          }}
        >
          © 2026 TOPIK 문제은행
        </p>
      </div>
    </aside>
  );
}
