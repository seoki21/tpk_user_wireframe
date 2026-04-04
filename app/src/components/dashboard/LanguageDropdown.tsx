"use client";

import { useState, useRef, useEffect } from "react";
import FlagIcon from "@/components/ui/FlagIcon";

interface Language {
  code: string;
  shortCode: string;
  name: string;
}

const LANGUAGES: Language[] = [
  { code: "ko", shortCode: "KO", name: "한국어" },
  { code: "en", shortCode: "EN", name: "English" },
  { code: "zh", shortCode: "ZH", name: "中文" },
  { code: "ja", shortCode: "JA", name: "日本語" },
  { code: "vi", shortCode: "VI", name: "Tiếng Việt" },
];

export default function LanguageDropdown() {
  const [selected, setSelected] = useState<string>("vi");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const current = LANGUAGES.find((l) => l.code === selected) ?? LANGUAGES[4];

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {/* 트리거 버튼 */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={`현재 언어: ${current.name}. 언어 변경 메뉴 열기`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 10px",
          borderRadius: "8px",
          border: "1px solid var(--color-border)",
          backgroundColor: "var(--color-background)",
          cursor: "pointer",
          fontSize: "13px",
          color: "var(--color-text-primary)",
          fontFamily: "inherit",
          minHeight: "44px",
          minWidth: "44px",
          transition: "background-color 0.15s ease",
        }}
      >
        <FlagIcon code={current.code} size={20} />
        <span
          style={{
            fontSize: "10px",
            color: "var(--color-text-tertiary)",
            lineHeight: 1,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            display: "inline-block",
          }}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="언어 선택"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            minWidth: "160px",
            zIndex: 50,
            overflow: "hidden",
            padding: "4px",
          }}
        >
          {LANGUAGES.map((lang) => {
            const isSelected = selected === lang.code;
            return (
              <button
                key={lang.code}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  setSelected(lang.code);
                  setIsOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  width: "100%",
                  border: "none",
                  backgroundColor: isSelected
                    ? "var(--color-primary-light)"
                    : "transparent",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontFamily: "inherit",
                  transition: "background-color 0.1s ease",
                }}
                aria-label={`${lang.name} 선택`}
              >
                <FlagIcon code={lang.code} size={20} />
                <span
                  style={{
                    fontSize: "13px",
                    color: isSelected
                      ? "var(--color-primary)"
                      : "var(--color-text-primary)",
                    fontWeight: isSelected ? 600 : 400,
                    flex: 1,
                    textAlign: "left",
                  }}
                >
                  {lang.name}
                </span>
                {isSelected && (
                  <span
                    style={{
                      fontSize: "13px",
                      color: "var(--color-primary)",
                      fontWeight: 700,
                    }}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
