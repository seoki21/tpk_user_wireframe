"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Button from "@/components/ui/Button";

interface LevelOption {
  id: string;
  title: string;
  desc: string;
}

const LEVEL_OPTIONS: LevelOption[] = [
  { id: "topik1-1", title: "TOPIK I  1급", desc: "한국어 기초 · 입문" },
  { id: "topik1-2", title: "TOPIK I  2급", desc: "일상 대화 · 기본 문장" },
  { id: "topik2-34", title: "TOPIK II  3~4급", desc: "일반 업무 · 대학 진학" },
  { id: "topik2-56", title: "TOPIK II  5~6급", desc: "고급 표현 · 전문 한국어" },
  { id: "unknown", title: "아직 모르겠어요", desc: "앱을 먼저 탐색할게요" },
];

export default function LevelPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string>("topik1-2");

  const handleNext = () => {
    router.push("/onboarding/complete");
  };

  const handleSkip = () => {
    router.push("/onboarding/complete");
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
            목표 레벨을
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
            맞춤 학습 콘텐츠를 추천해드려요.
          </p>
        </div>

        {/* 레벨 목록 */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}
          role="radiogroup"
          aria-label="목표 레벨 선택"
        >
          {LEVEL_OPTIONS.map((option) => {
            const isSelected = selected === option.id;
            return (
              <button
                key={option.id}
                role="radio"
                aria-checked={isSelected}
                aria-label={`${option.title} - ${option.desc}`}
                onClick={() => setSelected(option.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: isSelected
                    ? "1.5px solid var(--color-primary)"
                    : "1px solid var(--color-border)",
                  backgroundColor: isSelected
                    ? "var(--color-primary-light)"
                    : "var(--color-surface)",
                  cursor: "pointer",
                  minHeight: "60px",
                  transition:
                    "border-color 0.15s ease, background-color 0.15s ease",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: isSelected
                        ? "var(--color-primary)"
                        : "var(--color-text-primary)",
                      margin: "0 0 3px 0",
                    }}
                  >
                    {option.title}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "var(--color-text-secondary)",
                      margin: 0,
                    }}
                  >
                    {option.desc}
                  </p>
                </div>
                {/* 라디오 원 */}
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    border: isSelected
                      ? "1.5px solid var(--color-primary)"
                      : "1.5px solid var(--color-border)",
                    backgroundColor: isSelected
                      ? "var(--color-primary-light)"
                      : "var(--color-surface)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  {isSelected && (
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "var(--color-primary)",
                      }}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* 건너뛰기 텍스트 링크 */}
        <button
          onClick={handleSkip}
          style={{
            background: "none",
            border: "none",
            fontSize: "13px",
            color: "var(--color-text-secondary)",
            cursor: "pointer",
            padding: "8px",
            minHeight: "44px",
            display: "block",
            margin: "0 auto",
            textDecoration: "underline",
            textDecorationColor: "var(--color-border)",
            textUnderlineOffset: "3px",
          }}
          aria-label="목표 레벨 설정 건너뛰기"
        >
          목표 설정 건너뛰기
        </button>

        {/* 스페이서 */}
        <div style={{ flex: 1 }} />

        {/* 다음 버튼 */}
        <div style={{ padding: "16px 0 40px" }}>
          <Button
            variant="primary"
            fullWidth
            size="lg"
            onClick={handleNext}
            aria-label="설정 완료로 이동"
          >
            다음
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
}
