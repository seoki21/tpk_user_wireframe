"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";

type Level = "TOPIK I" | "TOPIK II";
type Area = "듣기" | "읽기";

interface QuestionType {
  id: string;
  label: string;
  count: number;
}

const LISTENING_TYPES: QuestionType[] = [
  { id: "listen-dialog", label: "대화 이해", count: 15 },
  { id: "listen-detail", label: "세부 내용 파악", count: 12 },
  { id: "listen-topic", label: "주제·요지 파악", count: 10 },
  { id: "listen-intent", label: "화자 의도 파악", count: 8 },
  { id: "listen-response", label: "적절한 응답 고르기", count: 10 },
];

const READING_TYPES: QuestionType[] = [
  { id: "read-vocab", label: "어휘·문법", count: 20 },
  { id: "read-topic", label: "글의 주제 파악", count: 12 },
  { id: "read-order", label: "글의 순서 배열", count: 8 },
  { id: "read-fill", label: "빈칸 채우기", count: 15 },
  { id: "read-detail", label: "세부 내용 이해", count: 10 },
  { id: "read-infer", label: "추론하기", count: 8 },
];

const ALL_TYPES: QuestionType[] = [
  { id: "vocab-grammar", label: "어휘·문법", count: 30 },
  { id: "listening-detail", label: "듣기 세부 내용", count: 20 },
  { id: "reading-topic", label: "글의 주제 파악", count: 15 },
  { id: "reading-order", label: "글의 순서", count: 10 },
  { id: "reading-fill", label: "빈칸 채우기", count: 18 },
  { id: "listening-topic", label: "듣기 주제 파악", count: 12 },
];

function getTypesForArea(area: Area | null): QuestionType[] {
  if (area === "듣기") return LISTENING_TYPES;
  if (area === "읽기") return READING_TYPES;
  return ALL_TYPES;
}

export default function PastExamSelectPage() {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState<Level>("TOPIK I");
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());

  const questionTypes = getTypesForArea(selectedArea);

  const handleAreaChange = (area: Area) => {
    const next = selectedArea === area ? null : area;
    setSelectedArea(next);
    setSelectedTypes(new Set());
  };

  const toggleType = (id: string) => {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectedCount = selectedTypes.size;
  const totalQuestions = questionTypes
    .filter((t) => selectedTypes.has(t.id))
    .reduce((acc, t) => acc + t.count, 0);

  const canStart = selectedCount > 0;

  return (
    <MobileFrame>
      <div
        style={{
          backgroundColor: "var(--color-background)",
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 페이지 헤더 */}
        <div
          style={{
            padding: "16px",
            backgroundColor: "var(--color-surface)",
            borderBottom: "1px solid var(--color-divider)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <button
            onClick={() => router.back()}
            aria-label="뒤로 가기"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              fontSize: "18px",
              color: "var(--color-text-primary)",
              display: "flex",
              alignItems: "center",
              minWidth: "44px",
              minHeight: "44px",
              justifyContent: "center",
            }}
          >
            ←
          </button>
          <div>
            <h1
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                margin: 0,
              }}
            >
              유형 선택풀기
            </h1>
            <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", marginTop: "2px" }}>
              기출문제 · 문제 유형 선택
            </p>
          </div>
        </div>

        {/* 요약 칩 바 */}
        {(selectedArea || selectedCount > 0) && (
          <div
            style={{
              padding: "8px 16px",
              backgroundColor: "var(--color-primary-light)",
              borderBottom: "1px solid #C8CCFF",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexWrap: "wrap",
            }}
            aria-live="polite"
            aria-label="현재 선택 상태"
          >
            <Tag variant="primary" size="sm">{selectedLevel}</Tag>
            {selectedArea && <Tag variant="primary" size="sm">{selectedArea}</Tag>}
            {selectedCount > 0 && (
              <Tag variant="primary" size="sm">
                유형 {selectedCount}개 선택
              </Tag>
            )}
            {totalQuestions > 0 && (
              <span style={{ fontSize: "11px", color: "var(--color-primary)", fontWeight: 600 }}>
                · 약 {totalQuestions}문항
              </span>
            )}
          </div>
        )}

        <div
          style={{
            flex: 1,
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            overflowY: "auto",
          }}
        >
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
              01 · 등급 선택
            </p>
            <div className="flex gap-3">
              {(["TOPIK I", "TOPIK II"] as Level[]).map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  aria-pressed={selectedLevel === level}
                  style={{
                    flex: 1,
                    height: "44px",
                    borderRadius: "var(--radius-pill)",
                    border:
                      selectedLevel === level
                        ? "2px solid var(--color-primary)"
                        : "1.5px solid var(--color-border)",
                    backgroundColor:
                      selectedLevel === level
                        ? "var(--color-primary)"
                        : "var(--color-surface)",
                    color:
                      selectedLevel === level
                        ? "#fff"
                        : "var(--color-text-secondary)",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {level}
                </button>
              ))}
            </div>
          </section>

          {/* 영역 선택 */}
          <section aria-labelledby="area-label">
            <p
              id="area-label"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--color-text-secondary)",
                marginBottom: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              02 · 영역 선택
            </p>
            <div className="flex gap-3">
              {(["듣기", "읽기"] as Area[]).map((area) => (
                <button
                  key={area}
                  onClick={() => handleAreaChange(area)}
                  aria-pressed={selectedArea === area}
                  style={{
                    flex: 1,
                    height: "64px",
                    borderRadius: "12px",
                    border:
                      selectedArea === area
                        ? "2px solid var(--color-primary)"
                        : "1.5px solid var(--color-border)",
                    backgroundColor:
                      selectedArea === area
                        ? "var(--color-primary-light)"
                        : "var(--color-surface)",
                    color:
                      selectedArea === area
                        ? "var(--color-primary)"
                        : "var(--color-text-secondary)",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                  }}
                >
                  <span style={{ fontSize: "20px" }}>
                    {area === "듣기" ? "🎧" : "📖"}
                  </span>
                  {area}
                </button>
              ))}
            </div>
          </section>

          {/* 문항 유형 선택 */}
          <section aria-labelledby="type-label">
            <p
              id="type-label"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--color-text-secondary)",
                marginBottom: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              03 · 문항 유형 선택
            </p>
            <div
              style={{
                backgroundColor: "var(--color-surface)",
                borderRadius: "var(--radius-card)",
                border: "0.5px solid var(--color-border)",
                overflow: "hidden",
              }}
            >
              {questionTypes.map((type, i) => {
                const checked = selectedTypes.has(type.id);
                return (
                  <button
                    key={type.id}
                    onClick={() => toggleType(type.id)}
                    aria-pressed={checked}
                    aria-label={`${type.label} 유형 선택 (${type.count}문항)`}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "14px 16px",
                      borderBottom:
                        i < questionTypes.length - 1
                          ? "1px solid var(--color-divider)"
                          : "none",
                      backgroundColor: checked
                        ? "var(--color-primary-light)"
                        : "transparent",
                      cursor: "pointer",
                      border: "none",
                      fontFamily: "inherit",
                      minHeight: "44px",
                      textAlign: "left",
                    }}
                  >
                    {/* 체크박스 */}
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "4px",
                        border: checked
                          ? "2px solid var(--color-primary)"
                          : "2px solid var(--color-border)",
                        backgroundColor: checked
                          ? "var(--color-primary)"
                          : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    >
                      {checked && (
                        <span style={{ color: "#fff", fontSize: "12px", fontWeight: 700 }}>
                          ✓
                        </span>
                      )}
                    </div>
                    <span
                      style={{
                        flex: 1,
                        fontSize: "14px",
                        fontWeight: checked ? 600 : 400,
                        color: checked
                          ? "var(--color-primary)"
                          : "var(--color-text-primary)",
                      }}
                    >
                      {type.label}
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "var(--color-text-tertiary)",
                      }}
                    >
                      {type.count}문항
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* 하단 요약 + CTA */}
        <div
          style={{
            padding: "12px 16px",
            borderTop: "1px solid var(--color-divider)",
            backgroundColor: "var(--color-surface)",
          }}
        >
          {canStart && (
            <p
              style={{
                fontSize: "12px",
                color: "var(--color-text-secondary)",
                textAlign: "center",
                marginBottom: "8px",
              }}
              aria-live="polite"
            >
              선택된 유형 {selectedCount}개 · 약 {totalQuestions}문항
            </p>
          )}
          <Button
            fullWidth
            variant="primary"
            size="lg"
            disabled={!canStart}
            onClick={() => router.push("/quiz?q=1&total=3")}
            aria-label="풀기 시작"
          >
            풀기 시작
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
}
