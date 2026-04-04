"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

type Mode = "select" | "exam";

export default function PastExamPage() {
  const [selectedMode, setSelectedMode] = useState<Mode>("select");
  const router = useRouter();

  const handleStart = () => {
    if (selectedMode === "select") {
      router.push("/past-exam/select");
    } else {
      router.push("/past-exam/exam-mode/select");
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
            기출문제
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
                      ? "var(--color-primary-light)"
                      : "var(--color-divider)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                📚
              </div>
              <div style={{ flex: 1 }}>
                <div className="flex items-center gap-2" style={{ marginBottom: "4px" }}>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    유형 선택풀기
                  </p>
                  {selectedMode === "select" && (
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "var(--color-primary)",
                        backgroundColor: "var(--color-primary-light)",
                        borderRadius: "10px",
                        padding: "1px 8px",
                      }}
                    >
                      선택됨
                    </span>
                  )}
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.5,
                  }}
                >
                  등급, 영역, 유형을 직접 선택해서 원하는 문제만 집중 풀기
                </p>
                <div
                  className="flex flex-wrap gap-1"
                  style={{ marginTop: "10px" }}
                >
                  {["등급 선택", "영역 선택", "유형 선택"].map((step, i) => (
                    <span key={step} className="flex items-center gap-1">
                      <span
                        style={{
                          fontSize: "11px",
                          color: "var(--color-primary-muted)",
                          backgroundColor: "var(--color-primary-light)",
                          padding: "2px 8px",
                          borderRadius: "10px",
                          fontWeight: 500,
                        }}
                      >
                        {step}
                      </span>
                      {i < 2 && (
                        <span
                          style={{
                            fontSize: "10px",
                            color: "var(--color-text-tertiary)",
                          }}
                        >
                          →
                        </span>
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
                      ? "var(--color-primary-light)"
                      : "var(--color-divider)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                ⏱
              </div>
              <div style={{ flex: 1 }}>
                <div className="flex items-center gap-2" style={{ marginBottom: "4px" }}>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    실전모드
                  </p>
                  {selectedMode === "exam" && (
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "var(--color-primary)",
                        backgroundColor: "var(--color-primary-light)",
                        borderRadius: "10px",
                        padding: "1px 8px",
                      }}
                    >
                      선택됨
                    </span>
                  )}
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.5,
                  }}
                >
                  실제 시험과 동일한 조건으로 특정 회차 전체 문제 풀기
                </p>
                <div className="flex items-center gap-2" style={{ marginTop: "8px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "var(--color-warning-dark)",
                      backgroundColor: "var(--color-warning-light)",
                      padding: "2px 8px",
                      borderRadius: "10px",
                      fontWeight: 500,
                    }}
                  >
                    ⏱ 타이머
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "var(--color-text-secondary)",
                      backgroundColor: "var(--color-divider)",
                      padding: "2px 8px",
                      borderRadius: "10px",
                      fontWeight: 500,
                    }}
                  >
                    회차 선택
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* 실전모드 선택 시 안내 */}
          {selectedMode === "exam" && (
            <div
              style={{
                backgroundColor: "var(--color-warning-light)",
                borderRadius: "12px",
                border: "0.5px solid var(--color-warning)",
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span style={{ fontSize: "18px", flexShrink: 0 }} aria-hidden="true">⏱</span>
              <p style={{ fontSize: "13px", color: "var(--color-warning-dark)", lineHeight: 1.5 }}>
                다음 화면에서 <strong>회차와 등급</strong>을 선택 후 실전을 시작합니다.
              </p>
            </div>
          )}
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
            aria-label={
              selectedMode === "select"
                ? "유형 선택풀기 시작"
                : "실전모드 회차 선택으로 이동"
            }
          >
            {selectedMode === "select" ? "유형 선택풀기 시작" : "회차 선택하기"}
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
}
