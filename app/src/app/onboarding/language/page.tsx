"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Button from "@/components/ui/Button";
import FlagIcon from "@/components/ui/FlagIcon";

interface Language {
  code: string;
  name: string;
}

const LANGUAGES: Language[] = [
  { code: "vi", name: "Tiếng Việt" },
  { code: "zh", name: "中文" },
  { code: "ja", name: "日本語" },
  { code: "uz", name: "Oʻzbek" },
  { code: "mn", name: "Монгол" },
  { code: "en", name: "English" },
  { code: "fil", name: "Filipino" },
  { code: "th", name: "ภาษาไทย" },
];

export default function LanguagePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string>("vi");

  const handleNext = () => {
    router.push("/onboarding/level");
  };

  return (
    <MobileFrame showTabBar={false}>
      <div
        style={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--color-surface)",
          padding: "32px 20px 0",
        }}
      >
        {/* 제목 */}
        <div style={{ marginBottom: "24px" }}>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              margin: "0 0 8px 0",
              lineHeight: 1.3,
              letterSpacing: "-0.3px",
            }}
          >
            학습 언어를
            <br />
            선택해주세요
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "var(--color-text-secondary)",
              margin: 0,
            }}
          >
            모국어로 AI 피드백을 받아요.
          </p>
        </div>

        {/* 언어 그리드 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            marginBottom: "16px",
          }}
          role="radiogroup"
          aria-label="학습 언어 선택"
        >
          {LANGUAGES.map((lang) => {
            const isSelected = selected === lang.code;
            return (
              <button
                key={lang.code}
                role="radio"
                aria-checked={isSelected}
                aria-label={`${lang.name} 선택`}
                onClick={() => setSelected(lang.code)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: isSelected
                    ? "1.5px solid var(--color-primary)"
                    : "1px solid var(--color-border)",
                  backgroundColor: isSelected
                    ? "var(--color-primary-light)"
                    : "var(--color-surface)",
                  cursor: "pointer",
                  minHeight: "44px",
                  transition:
                    "border-color 0.15s ease, background-color 0.15s ease",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                <FlagIcon code={lang.code} size={24} />
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: isSelected ? 700 : 500,
                    color: isSelected
                      ? "var(--color-primary)"
                      : "var(--color-text-primary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {lang.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* 안내 문구 */}
        <div
          style={{
            backgroundColor: "var(--color-background)",
            borderRadius: "8px",
            border: "1px solid var(--color-border)",
            padding: "12px 14px",
            marginBottom: "24px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "var(--color-text-secondary)",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            ⓘ 마이페이지 → 설정에서 언제든 변경 가능해요.
          </p>
        </div>

        {/* 스페이서 */}
        <div style={{ flex: 1 }} />

        {/* 다음 버튼 */}
        <div style={{ padding: "0 0 40px" }}>
          <Button
            variant="primary"
            fullWidth
            size="lg"
            onClick={handleNext}
            aria-label="목표 레벨 선택으로 이동"
          >
            다음
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
}
