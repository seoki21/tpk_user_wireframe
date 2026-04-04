"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import MobileFrame from "@/components/layout/MobileFrame";
import Button from "@/components/ui/Button";
import CircularGauge from "@/components/ui/CircularGauge";
import ResultCelebration from "@/components/ui/ResultCelebration";
import { useCountUp } from "@/hooks/useCountUp";

/* ── 목데이터 (exam-mode/page.tsx와 동일) ── */
const QUESTIONS_META = [
  { id: 1, correctIndex: 0 },
  { id: 2, correctIndex: 1 },
  { id: 3, correctIndex: 1 },
];

const EXAM_INFO = {
  round: "102회",
  level: "TOPIK I",
  areas: "듣기+읽기",
};

function formatElapsed(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}초`;
  return `${m}분 ${s}초`;
}

function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // answers 파싱: "1,,2" → [1, null, 2] (1-based choice id)
  const answersParam = searchParams.get("answers") ?? "";
  const elapsedParam = searchParams.get("elapsed") ?? "0";

  const elapsed = parseInt(elapsedParam, 10);

  const userAnswers: (number | null)[] = answersParam
    .split(",")
    .map((s) => (s === "" ? null : parseInt(s, 10)));

  // 채점
  // correctIndex는 0-based, choice id는 1-based
  const results = QUESTIONS_META.map((q, idx) => {
    const userAnswer = userAnswers[idx] ?? null;
    const correctChoiceId = q.correctIndex + 1;
    if (userAnswer === null) return "skipped" as const;
    if (userAnswer === correctChoiceId) return "correct" as const;
    return "wrong" as const;
  });

  const correctCount = results.filter((r) => r === "correct").length;
  const wrongCount = results.filter((r) => r === "wrong").length;
  const skippedCount = results.filter((r) => r === "skipped").length;
  const totalCount = QUESTIONS_META.length;
  const accuracy = Math.round((correctCount / totalCount) * 100);

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
            padding: "16px 16px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              margin: 0,
            }}
          >
            결과
          </h1>
          <span
            style={{
              fontSize: "12px",
              color: "var(--color-text-secondary)",
            }}
          >
            {EXAM_INFO.round} {EXAM_INFO.level} · {EXAM_INFO.areas}
          </span>
        </div>

        {/* 스크롤 가능 콘텐츠 */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* 축하 오버레이 — 2초 후 fade out */}
          <ResultCelebration />

          {/* 큰 점수 with circular gauge */}
          <div
            style={{
              backgroundColor: "var(--color-surface)",
              borderRadius: "var(--radius-card)",
              border: "0.5px solid var(--color-border)",
              padding: "28px 24px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                color: "var(--color-text-secondary)",
              }}
            >
              최종 점수
            </p>
            <CircularGauge
              value={accuracy}
              size={140}
              strokeWidth={8}
              color={
                accuracy >= 70
                  ? "var(--color-success)"
                  : accuracy >= 40
                  ? "var(--color-warning)"
                  : "var(--color-error)"
              }
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "center",
                  gap: "2px",
                }}
              >
                <span
                  style={{
                    fontSize: "44px",
                    fontWeight: 800,
                    color: "var(--color-primary)",
                    lineHeight: 1,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {useCountUp(correctCount)}
                </span>
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "var(--color-text-tertiary)",
                    lineHeight: 1,
                  }}
                >
                  /{totalCount}
                </span>
              </div>
            </CircularGauge>
          </div>

          {/* 4개 통계 카드 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
            }}
          >
            {/* 정답 수 */}
            <div
              style={{
                backgroundColor: "var(--color-success-light)",
                borderRadius: "var(--radius-card)",
                border: "0.5px solid var(--color-border)",
                padding: "16px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "var(--color-success-dark)",
                  display: "block",
                  lineHeight: 1.2,
                }}
              >
                {correctCount}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--color-success-dark)",
                  fontWeight: 500,
                }}
              >
                정답
              </span>
            </div>

            {/* 오답 수 */}
            <div
              style={{
                backgroundColor: "var(--color-error-light)",
                borderRadius: "var(--radius-card)",
                border: "0.5px solid var(--color-border)",
                padding: "16px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "var(--color-error-dark)",
                  display: "block",
                  lineHeight: 1.2,
                }}
              >
                {wrongCount}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--color-error-dark)",
                  fontWeight: 500,
                }}
              >
                오답
              </span>
            </div>

            {/* 정답률 */}
            <div
              style={{
                backgroundColor: "var(--color-primary-light)",
                borderRadius: "var(--radius-card)",
                border: "0.5px solid var(--color-border)",
                padding: "16px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "var(--color-primary)",
                  display: "block",
                  lineHeight: 1.2,
                }}
              >
                {accuracy}%
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--color-primary)",
                  fontWeight: 500,
                }}
              >
                정답률
              </span>
            </div>

            {/* 소요시간 */}
            <div
              style={{
                backgroundColor: "var(--color-surface)",
                borderRadius: "var(--radius-card)",
                border: "0.5px solid var(--color-border)",
                padding: "16px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "var(--color-text-secondary)",
                  display: "block",
                  lineHeight: 1.2,
                }}
              >
                {formatElapsed(elapsed)}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--color-text-tertiary)",
                  fontWeight: 500,
                }}
              >
                소요시간
              </span>
            </div>
          </div>

          {/* 문항별 정오답 도트 그리드 */}
          <div
            style={{
              backgroundColor: "var(--color-surface)",
              borderRadius: "var(--radius-card)",
              border: "0.5px solid var(--color-border)",
              padding: "16px",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "12px",
              }}
            >
              문항별 결과
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
              role="list"
              aria-label="문항별 정오답"
            >
              {results.map((result, idx) => {
                const bgColor =
                  result === "correct"
                    ? "var(--color-success)"
                    : result === "wrong"
                    ? "var(--color-error)"
                    : "var(--color-text-tertiary)";
                return (
                  <div
                    key={idx}
                    role="listitem"
                    aria-label={`${idx + 1}번: ${result === "correct" ? "정답" : result === "wrong" ? "오답" : "미응답"}`}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      backgroundColor: bgColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: 700,
                    }}
                  >
                    {idx + 1}
                  </div>
                );
              })}
            </div>

            {/* 범례 */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                marginTop: "12px",
                paddingTop: "12px",
                borderTop: "1px solid var(--color-divider)",
              }}
            >
              {[
                { label: "정답", color: "var(--color-success)" },
                { label: "오답", color: "var(--color-error)" },
                { label: "미응답", color: "var(--color-text-tertiary)" },
              ].map(({ label, color }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "3px",
                      backgroundColor: color,
                    }}
                    aria-hidden="true"
                  />
                  <span
                    style={{
                      fontSize: "12px",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 미응답 문항 안내 (있을 경우) */}
          {skippedCount > 0 && (
            <div
              style={{
                backgroundColor: "var(--color-warning-light)",
                borderRadius: "var(--radius-card)",
                border: "0.5px solid var(--color-warning)",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              role="alert"
            >
              <span style={{ fontSize: "16px" }} aria-hidden="true">
                ⚠️
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "var(--color-warning-dark)",
                  fontWeight: 500,
                }}
              >
                {skippedCount}개 문항에 답변하지 않았습니다.
              </span>
            </div>
          )}
        </div>

        {/* 하단 액션 버튼 */}
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
            onClick={() => router.push("/quiz/feedback?selected=1&correct=1")}
            aria-label="문항별 피드백 보기"
            style={{ backgroundColor: "var(--color-primary-dark)" }}
          >
            문항별 피드백 보기
          </Button>
          <Button
            fullWidth
            variant="ghost"
            size="lg"
            onClick={() => router.push("/dashboard")}
            aria-label="대시보드로 이동"
          >
            대시보드로 이동
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
}

export default function PastExamResultPage() {
  return (
    <Suspense
      fallback={
        <MobileFrame showTabBar={false}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100%",
              color: "var(--color-text-secondary)",
            }}
          >
            결과 계산 중...
          </div>
        </MobileFrame>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
