"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";

type Mode = "select" | "exam";
type Difficulty = "쉬움" | "보통" | "어려움";

export default function PracticePage() {
  const [selectedMode, setSelectedMode] = useState<Mode>("select");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("보통");
  const [questionCount, setQuestionCount] = useState<number>(20);
  const router = useRouter();

  const handleStart = () => {
    if (selectedMode === "select") {
      router.push("/practice/select");
    } else {
      router.push("/practice/exam-mode");
    }
  };

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
            padding: "20px 16px 16px",
            backgroundColor: "var(--color-surface)",
            borderBottom: "1px solid var(--color-divider)",
          }}
        >
          <h1
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              margin: 0,
            }}
          >
            연습문제
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: "var(--color-text-secondary)",
              marginTop: "4px",
            }}
          >
            풀기 방식을 선택하세요
          </p>
        </div>

        <div
          style={{
            padding: "16px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {/* 유형 선택풀기 카드 */}
          <Card
            selected={selectedMode === "select"}
            onClick={() => setSelectedMode("select")}
            aria-label="유형 선택풀기 방식 선택"
            style={{ padding: "20px" }}
          >
            <div className="flex items-start gap-3">
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor:
                    selectedMode === "select"
                      ? "var(--color-success-light)"
                      : "var(--color-divider)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                ✏️
              </div>
              <div style={{ flex: 1 }}>
                <div className="flex items-center gap-2" style={{ marginBottom: "4px" }}>
                  <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-primary)" }}>
                    유형 선택풀기
                  </p>
                  {selectedMode === "select" && (
                    <Tag variant="success" size="sm">선택됨</Tag>
                  )}
                </div>
                <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                  등급, 영역, 유형, 난이도를 선택해서 맞춤 연습
                </p>
                <div className="flex flex-wrap gap-1" style={{ marginTop: "10px" }}>
                  {["등급", "영역", "유형", "난이도"].map((step, i) => (
                    <span key={step} className="flex items-center gap-1">
                      <span
                        style={{
                          fontSize: "11px",
                          color: "var(--color-success-dark)",
                          backgroundColor: "var(--color-success-light)",
                          padding: "2px 8px",
                          borderRadius: "10px",
                          fontWeight: 500,
                        }}
                      >
                        {step}
                      </span>
                      {i < 3 && (
                        <span style={{ fontSize: "10px", color: "var(--color-text-tertiary)" }}>→</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* 실전모드 카드 */}
          <Card
            selected={selectedMode === "exam"}
            onClick={() => setSelectedMode("exam")}
            aria-label="실전모드 방식 선택"
            style={{ padding: "20px" }}
          >
            <div className="flex items-start gap-3">
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor:
                    selectedMode === "exam"
                      ? "var(--color-primary-dark)"
                      : "var(--color-divider)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                ⚡
              </div>
              <div style={{ flex: 1 }}>
                <div className="flex items-center gap-2" style={{ marginBottom: "4px" }}>
                  <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-primary)" }}>
                    실전모드
                  </p>
                  {selectedMode === "exam" && (
                    <Tag variant="primary" size="sm">선택됨</Tag>
                  )}
                </div>
                <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                  난이도와 문항 수를 설정해서 타이머와 함께 실전 연습
                </p>
              </div>
            </div>

            {/* 실전모드 세부 설정 (선택 시 노출) */}
            {selectedMode === "exam" && (
              <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--color-divider)" }}>
                {/* 난이도 선택 */}
                <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: "8px" }}>
                  난이도
                </p>
                <div className="flex gap-2" style={{ marginBottom: "16px" }}>
                  {(["쉬움", "보통", "어려움"] as Difficulty[]).map((d) => (
                    <button
                      key={d}
                      onClick={(e) => { e.stopPropagation(); setSelectedDifficulty(d); }}
                      aria-pressed={selectedDifficulty === d}
                      style={{
                        flex: 1,
                        height: "36px",
                        borderRadius: "8px",
                        border: selectedDifficulty === d
                          ? "2px solid var(--color-primary)"
                          : "1px solid var(--color-border)",
                        backgroundColor: selectedDifficulty === d
                          ? "var(--color-primary-light)"
                          : "transparent",
                        color: selectedDifficulty === d
                          ? "var(--color-primary)"
                          : "var(--color-text-secondary)",
                        fontSize: "13px",
                        fontWeight: selectedDifficulty === d ? 600 : 400,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
                {/* 문항 수 선택 */}
                <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: "8px" }}>
                  문항 수
                </p>
                <div className="flex gap-2">
                  {[10, 20, 30, 50].map((n) => (
                    <button
                      key={n}
                      onClick={(e) => { e.stopPropagation(); setQuestionCount(n); }}
                      aria-pressed={questionCount === n}
                      style={{
                        flex: 1,
                        height: "36px",
                        borderRadius: "8px",
                        border: questionCount === n
                          ? "2px solid var(--color-primary)"
                          : "1px solid var(--color-border)",
                        backgroundColor: questionCount === n
                          ? "var(--color-primary-light)"
                          : "transparent",
                        color: questionCount === n
                          ? "var(--color-primary)"
                          : "var(--color-text-secondary)",
                        fontSize: "13px",
                        fontWeight: questionCount === n ? 600 : 400,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* 하단 CTA */}
        <div
          style={{
            padding: "12px 16px",
            borderTop: "1px solid var(--color-divider)",
            backgroundColor: "var(--color-surface)",
          }}
        >
          <Button
            fullWidth
            variant="primary"
            size="lg"
            onClick={handleStart}
            aria-label={selectedMode === "select" ? "유형 선택풀기 시작" : `실전 시작 (${selectedDifficulty} ${questionCount}문항)`}
            style={{ backgroundColor: selectedMode === "exam" ? "var(--color-primary-dark)" : "var(--color-success)" }}
          >
            {selectedMode === "select" ? "유형 선택풀기 시작" : `실전 시작 · ${questionCount}문항`}
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
}
