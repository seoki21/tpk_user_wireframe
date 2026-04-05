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

const ALL_ROUNDS: { id: string; label: string; date: string; levels: string }[] = [
  { id: "102", label: "102회", date: "2025.10", levels: "TOPIK I · II" },
  { id: "101", label: "101회", date: "2025.04", levels: "TOPIK I · II" },
  { id: "100", label: "100회", date: "2024.10", levels: "TOPIK I · II" },
  { id: "99", label: "99회", date: "2024.04", levels: "TOPIK I · II" },
  { id: "98", label: "98회", date: "2023.10", levels: "TOPIK I · II" },
  { id: "97", label: "97회", date: "2023.04", levels: "TOPIK I · II" },
  { id: "96", label: "96회", date: "2022.10", levels: "TOPIK I · II" },
  { id: "95", label: "95회", date: "2022.04", levels: "TOPIK I · II" },
  { id: "94", label: "94회", date: "2021.10", levels: "TOPIK I · II" },
  { id: "93", label: "93회", date: "2021.04", levels: "TOPIK I" },
  { id: "92", label: "92회", date: "2020.10", levels: "TOPIK I · II" },
  { id: "91", label: "91회", date: "2020.04", levels: "TOPIK I" },
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
  const [showAllRounds, setShowAllRounds] = useState(false);

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
            {/* 칩 행 (가로 스크롤 없음) */}
            <div
              style={{
                display: "flex",
                flexWrap: "nowrap",
                gap: "6px",
                alignItems: "center",
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
                      padding: "6px 10px",
                      lineHeight: "20px",
                      borderRadius: "var(--radius-pill)",
                      border: isSelected
                        ? "2px solid var(--color-primary)"
                        : "1.5px solid var(--color-border)",
                      backgroundColor: isSelected
                        ? "var(--color-primary)"
                        : "var(--color-surface)",
                      color: isSelected ? "#fff" : "var(--color-text-secondary)",
                      fontSize: "13px",
                      fontWeight: isSelected ? 700 : 400,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {round.label}
                  </button>
                );
              })}
              {/* 전체 회차 버튼 */}
              <button
                onClick={() => setShowAllRounds(true)}
                aria-label="전체 회차 목록 보기"
                style={{
                  width: "36px",
                  padding: "6px 0",
                  lineHeight: "20px",
                  borderRadius: "var(--radius-pill)",
                  border: "1.5px solid var(--color-border)",
                  backgroundColor: "var(--color-surface)",
                  color: "var(--color-primary)",
                  fontSize: "15px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  letterSpacing: "1px",
                }}
              >
                ···
              </button>
            </div>
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
        {/* 심플 버텀시트 — MobileFrame 내부 absolute */}
        {showAllRounds && (
          <>
            {/* 오버레이 */}
            <div
              onClick={() => setShowAllRounds(false)}
              aria-hidden="true"
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.35)",
                zIndex: 50,
              }}
            />

            {/* 시트 */}
            <div
              role="dialog"
              aria-modal="true"
              aria-label="전체 회차 선택"
              style={{
                position: "fixed",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
                maxWidth: "375px",
                maxHeight: "50vh",
                backgroundColor: "var(--color-surface)",
                borderRadius: "12px 12px 0 0",
                zIndex: 51,
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
              }}
            >
              {/* 드래그 핸들 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "10px 0 6px",
                }}
                aria-hidden="true"
              >
                <div
                  style={{
                    width: 32,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: "var(--color-border)",
                  }}
                />
              </div>

              {/* 헤더 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "4px 16px 12px",
                  borderBottom: "1px solid var(--color-divider)",
                }}
              >
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "var(--color-text-primary)",
                  }}
                >
                  전체 회차
                </span>
                <button
                  onClick={() => setShowAllRounds(false)}
                  aria-label="닫기"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    color: "var(--color-text-tertiary)",
                    minWidth: 44,
                    minHeight: 44,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "inherit",
                    padding: 0,
                  }}
                >
                  ✕
                </button>
              </div>

              {/* 목록 */}
              <div style={{ flex: 1, overflowY: "auto" }}>
                {ALL_ROUNDS.map((round) => {
                  const isSelected = selectedRound === round.id;
                  return (
                    <button
                      key={round.id}
                      onClick={() => {
                        setSelectedRound(round.id);
                        setShowAllRounds(false);
                      }}
                      style={{
                        width: "100%",
                        padding: "0 16px",
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: isSelected
                          ? "var(--color-primary-light)"
                          : "transparent",
                        border: "none",
                        borderBottom: "1px solid var(--color-divider)",
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: isSelected ? 700 : 400,
                          color: isSelected
                            ? "var(--color-primary)"
                            : "var(--color-text-primary)",
                        }}
                      >
                        {round.label}
                      </span>
                      {isSelected && (
                        <span
                          style={{
                            fontSize: "16px",
                            color: "var(--color-primary)",
                            fontWeight: 700,
                          }}
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </MobileFrame>
  );
}
