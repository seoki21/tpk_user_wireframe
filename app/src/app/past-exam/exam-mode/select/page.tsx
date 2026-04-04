"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";

type Level = "TOPIK I" | "TOPIK II";

interface Round {
  id: string;
  label: string;
}

const RECENT_ROUNDS: Round[] = [
  { id: "102", label: "102회" },
  { id: "101", label: "101회" },
  { id: "100", label: "100회" },
  { id: "99", label: "99회" },
  { id: "98", label: "98회" },
];

const EXAM_COMPOSITION: Record<
  Level,
  { area: string; count: number; time: number }[]
> = {
  "TOPIK I": [
    { area: "듣기", count: 30, time: 40 },
    { area: "읽기", count: 40, time: 60 },
  ],
  "TOPIK II": [
    { area: "듣기", count: 50, time: 60 },
    { area: "읽기", count: 50, time: 70 },
    { area: "쓰기", count: 4, time: 50 },
  ],
};

export default function ExamModeSelectPage() {
  const router = useRouter();
  const [selectedRound, setSelectedRound] = useState<string>("102");
  const [selectedLevel, setSelectedLevel] = useState<Level>("TOPIK I");

  const composition = EXAM_COMPOSITION[selectedLevel];

  return (
    <MobileFrame showTabBar={false}>
      <div
        style={{
          backgroundColor: "var(--color-background)",
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            backgroundColor: "var(--color-surface)",
            borderBottom: "1px solid var(--color-divider)",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <button
            onClick={() => router.push("/past-exam")}
            aria-label="기출문제로 뒤로 가기"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
              color: "var(--color-text-primary)",
              display: "flex",
              alignItems: "center",
              minWidth: "44px",
              minHeight: "44px",
              justifyContent: "center",
              padding: "0",
            }}
          >
            ←
          </button>
          <div>
            <p
              style={{
                fontSize: "12px",
                color: "var(--color-text-tertiary)",
                marginBottom: "1px",
              }}
            >
              기출문제
            </p>
            <h1
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                margin: 0,
              }}
            >
              실전모드
            </h1>
          </div>
        </div>

        {/* 요약 칩 */}
        <div
          style={{
            padding: "8px 16px",
            backgroundColor: "var(--color-primary-light)",
            borderBottom: "1px solid #C8CCFF",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
          aria-live="polite"
          aria-label="현재 선택 상태"
        >
          <Tag variant="primary" size="sm">
            {selectedRound}회
          </Tag>
          <Tag variant="primary" size="sm">{selectedLevel}</Tag>
          <Tag variant="primary" size="sm">실전모드</Tag>
        </div>

        {/* 스크롤 콘텐츠 */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* 회차 선택 */}
          <section aria-labelledby="round-label">
            <p
              id="round-label"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--color-text-secondary)",
                marginBottom: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              회차
            </p>
            {/* 가로 스크롤 칩 행 */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                overflowX: "auto",
                paddingBottom: "4px",
                scrollbarWidth: "none",
              }}
              role="group"
              aria-label="회차 선택"
            >
              {RECENT_ROUNDS.map((round) => {
                const isSelected = selectedRound === round.id;
                return (
                  <button
                    key={round.id}
                    onClick={() => setSelectedRound(round.id)}
                    aria-pressed={isSelected}
                    style={{
                      flexShrink: 0,
                      height: "38px",
                      padding: "0 16px",
                      borderRadius: "var(--radius-pill)",
                      border: isSelected
                        ? "2px solid var(--color-primary)"
                        : "1.5px solid var(--color-border)",
                      backgroundColor: isSelected
                        ? "var(--color-primary)"
                        : "var(--color-surface)",
                      color: isSelected ? "#fff" : "var(--color-text-secondary)",
                      fontSize: "14px",
                      fontWeight: isSelected ? 700 : 400,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      minWidth: "72px",
                      minHeight: "44px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {round.label}
                  </button>
                );
              })}
            </div>
            {/* 전체 회차 링크 */}
            <button
              aria-label="전체 회차 목록 보기"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px 0 0",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "var(--color-primary)",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                전체 회차
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "var(--color-primary)",
                }}
                aria-hidden="true"
              >
                ›
              </span>
            </button>
          </section>

          {/* 등급 선택 */}
          <section aria-labelledby="level-label">
            <p
              id="level-label"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--color-text-secondary)",
                marginBottom: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              등급
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {(["TOPIK I", "TOPIK II"] as Level[]).map((level) => {
                const isSelected = selectedLevel === level;
                return (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    aria-pressed={isSelected}
                    style={{
                      flex: 1,
                      height: "52px",
                      borderRadius: "var(--radius-pill)",
                      border: isSelected
                        ? "2px solid var(--color-primary)"
                        : "1.5px solid var(--color-border)",
                      backgroundColor: isSelected
                        ? "var(--color-primary)"
                        : "var(--color-surface)",
                      color: isSelected ? "#fff" : "var(--color-text-secondary)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "2px",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      minHeight: "44px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                      }}
                    >
                      {level}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 400,
                        opacity: 0.8,
                      }}
                    >
                      {level === "TOPIK I" ? "1~2급" : "3~6급"}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 시험 구성 정보 */}
          <section aria-labelledby="composition-label">
            <p
              id="composition-label"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--color-text-secondary)",
                marginBottom: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              시험 구성
            </p>
            <div
              style={{
                backgroundColor: "var(--color-surface)",
                borderRadius: "var(--radius-card)",
                border: "0.5px solid var(--color-border)",
                overflow: "hidden",
              }}
              role="list"
              aria-label="시험 구성 정보"
            >
              {composition.map((item, i) => (
                <div
                  key={item.area}
                  role="listitem"
                  style={{
                    padding: "14px 16px",
                    borderBottom:
                      i < composition.length - 1
                        ? "1px solid var(--color-divider)"
                        : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span
                      style={{
                        fontSize: "16px",
                      }}
                      aria-hidden="true"
                    >
                      {item.area === "듣기"
                        ? "🎧"
                        : item.area === "읽기"
                        ? "📖"
                        : "✏️"}
                    </span>
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {item.area}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {item.count}문항
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        color: "var(--color-primary)",
                        fontWeight: 600,
                        backgroundColor: "var(--color-primary-light)",
                        padding: "3px 10px",
                        borderRadius: "var(--radius-pill)",
                      }}
                    >
                      {item.time}분
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 실전 환경 안내 */}
          <div
            style={{
              backgroundColor: "var(--color-warning-light)",
              borderRadius: "var(--radius-card)",
              border: "0.5px solid var(--color-warning)",
              padding: "16px",
              display: "flex",
              gap: "12px",
              alignItems: "flex-start",
            }}
            role="note"
            aria-label="실전모드 안내"
          >
            {/* 아이콘 원 */}
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "var(--color-warning)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              <span style={{ fontSize: "16px" }}>⏱</span>
            </div>
            <div>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "var(--color-warning-dark)",
                  marginBottom: "4px",
                }}
              >
                타이머가 자동으로 시작돼요
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--color-warning-dark)",
                  lineHeight: 1.5,
                  opacity: 0.85,
                }}
              >
                시작 버튼을 누르면 실전과 동일하게 타이머가 작동합니다. 시간
                종료 시 자동 제출됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* 하단 CTA */}
        <div
          style={{
            padding: "12px 16px",
            borderTop: "1px solid var(--color-divider)",
            backgroundColor: "var(--color-surface)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Button
            fullWidth
            variant="primary"
            size="lg"
            onClick={() =>
              router.push(
                `/past-exam/exam-mode?round=${selectedRound}&level=${encodeURIComponent(selectedLevel)}`
              )
            }
            aria-label={`${selectedRound}회 ${selectedLevel} 실전 시작`}
            style={{ backgroundColor: "var(--color-primary-dark)" }}
          >
            실전 시작
          </Button>
          <Button
            fullWidth
            variant="ghost"
            size="md"
            onClick={() => router.push("/past-exam/select")}
            aria-label="선택풀기로 전환"
          >
            선택풀기로 전환
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
}
