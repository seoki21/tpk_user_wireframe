"use client";

import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Button from "@/components/ui/Button";

/* ── 목데이터 (3문제 기준) ── */
const RESULT_META = {
  typeLabel: "TOPIK I 선택풀기",
  totalCount: 3,
  correctCount: 1,
  wrongCount: 1,
  skippedCount: 1,
};

const TOTAL = 3;

type ItemResult = "correct" | "wrong" | "skipped";

interface ResultItem {
  num: number;
  result: ItemResult;
  typeLabel: string;
  hasExplain?: boolean;
}

const RESULT_ITEMS: ResultItem[] = [
  { num: 1, result: "correct", typeLabel: "대화 유형" },
  { num: 2, result: "wrong", typeLabel: "내용 일치", hasExplain: true },
  { num: 3, result: "skipped", typeLabel: "중심 내용" },
];

function ResultIcon({ result }: { result: ItemResult }) {
  if (result === "correct") {
    return (
      <div
        aria-hidden="true"
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          backgroundColor: "var(--color-success)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span style={{ color: "#fff", fontSize: "13px", fontWeight: 700 }}>
          O
        </span>
      </div>
    );
  }
  if (result === "wrong") {
    return (
      <div
        aria-hidden="true"
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          backgroundColor: "var(--color-error)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span style={{ color: "#fff", fontSize: "13px", fontWeight: 700 }}>
          X
        </span>
      </div>
    );
  }
  return (
    <div
      aria-hidden="true"
      style={{
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        backgroundColor: "var(--color-divider)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          color: "var(--color-text-tertiary)",
          fontSize: "13px",
          fontWeight: 700,
        }}
      >
        —
      </span>
    </div>
  );
}

export default function QuizResultPage() {
  const router = useRouter();
  const { typeLabel, totalCount, correctCount, wrongCount, skippedCount } =
    RESULT_META;

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
          }}
        >
          <h1
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              margin: "0 0 2px",
            }}
          >
            결과
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: "var(--color-text-secondary)",
            }}
          >
            {typeLabel} · {totalCount}문항
          </p>
        </div>

        {/* 스크롤 콘텐츠 */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* 큰 점수 */}
          <div
            style={{
              backgroundColor: "var(--color-surface)",
              borderRadius: "var(--radius-card)",
              border: "0.5px solid var(--color-border)",
              padding: "28px 24px",
              textAlign: "center",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                color: "var(--color-text-secondary)",
                marginBottom: "8px",
              }}
            >
              최종 점수
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <span
                style={{
                  fontSize: "56px",
                  fontWeight: 800,
                  color: "var(--color-primary)",
                  lineHeight: 1,
                }}
              >
                {correctCount}
              </span>
              <span
                style={{
                  fontSize: "26px",
                  fontWeight: 500,
                  color: "var(--color-text-tertiary)",
                  lineHeight: 1,
                }}
              >
                / {totalCount}
              </span>
            </div>
          </div>

          {/* 3개 통계 카드 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "8px",
            }}
          >
            <div
              style={{
                backgroundColor: "var(--color-success-light)",
                borderRadius: "var(--radius-card)",
                border: "0.5px solid var(--color-border)",
                padding: "14px 12px",
                textAlign: "center",
              }}
              aria-label={`정답 ${correctCount}개`}
            >
              <span
                style={{
                  fontSize: "26px",
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
            <div
              style={{
                backgroundColor: "var(--color-error-light)",
                borderRadius: "var(--radius-card)",
                border: "0.5px solid var(--color-border)",
                padding: "14px 12px",
                textAlign: "center",
              }}
              aria-label={`오답 ${wrongCount}개`}
            >
              <span
                style={{
                  fontSize: "26px",
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
            <div
              style={{
                backgroundColor: "var(--color-divider)",
                borderRadius: "var(--radius-card)",
                border: "0.5px solid var(--color-border)",
                padding: "14px 12px",
                textAlign: "center",
              }}
              aria-label={`건너뜀 ${skippedCount}개`}
            >
              <span
                style={{
                  fontSize: "26px",
                  fontWeight: 700,
                  color: "var(--color-text-secondary)",
                  display: "block",
                  lineHeight: 1.2,
                }}
              >
                {skippedCount}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--color-text-secondary)",
                  fontWeight: 500,
                }}
              >
                건너뜀
              </span>
            </div>
          </div>

          {/* 문항별 결과 */}
          <div>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--color-text-secondary)",
                marginBottom: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              문항별 결과
            </p>
            <div
              style={{
                backgroundColor: "var(--color-surface)",
                borderRadius: "var(--radius-card)",
                border: "0.5px solid var(--color-border)",
                overflow: "hidden",
              }}
              role="list"
              aria-label="문항별 결과 목록"
            >
              {RESULT_ITEMS.map((item, i) => (
                <div
                  key={item.num}
                  role="listitem"
                  aria-label={`${item.num}번 문항: ${
                    item.result === "correct"
                      ? "정답"
                      : item.result === "wrong"
                      ? "오답"
                      : "건너뜀"
                  }, ${item.typeLabel}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 16px",
                    borderBottom:
                      i < RESULT_ITEMS.length - 1
                        ? "1px solid var(--color-divider)"
                        : "none",
                    backgroundColor:
                      item.result === "correct"
                        ? "transparent"
                        : item.result === "wrong"
                        ? "var(--color-error-light)"
                        : "transparent",
                  }}
                >
                  <ResultIcon result={item.result} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color:
                          item.result === "wrong"
                            ? "var(--color-error-dark)"
                            : item.result === "skipped"
                            ? "var(--color-text-tertiary)"
                            : "var(--color-text-primary)",
                      }}
                    >
                      {item.num}번 · {item.typeLabel}
                    </span>
                  </div>
                  {item.result === "skipped" && (
                    <button
                      onClick={() =>
                        router.push(`/quiz?q=${item.num}&total=${TOTAL}`)
                      }
                      aria-label={`${item.num}번 문항 풀어보기`}
                      style={{
                        background: "none",
                        border: "1.5px solid var(--color-primary)",
                        borderRadius: "var(--radius-pill)",
                        padding: "3px 10px",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "var(--color-primary)",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        minHeight: "28px",
                        flexShrink: 0,
                      }}
                    >
                      풀어보기
                    </button>
                  )}
                  {item.hasExplain && item.result === "wrong" && (
                    <button
                      onClick={() => router.push("/quiz/result/explain")}
                      aria-label={`${item.num}번 문항 해설 보기`}
                      style={{
                        backgroundColor: "var(--color-error-light)",
                        border: "1.5px solid var(--color-error)",
                        borderRadius: "var(--radius-pill)",
                        padding: "3px 10px",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "var(--color-error-dark)",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        minHeight: "28px",
                        flexShrink: 0,
                      }}
                    >
                      해설
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
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
          {/* 메인 버튼 */}
          <div>
            <Button
              fullWidth
              variant="primary"
              size="lg"
              onClick={() => router.push("/quiz?q=1&total=3")}
              aria-label="유사 문제 다시 풀기"
            >
              유사 문제 다시 풀기
            </Button>
            <p
              style={{
                fontSize: "11px",
                color: "var(--color-text-tertiary)",
                textAlign: "center",
                marginTop: "4px",
              }}
            >
              같은 유형 · 새 문항으로 재도전
            </p>
          </div>
          {/* 보조 버튼 행 */}
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              variant="secondary"
              size="md"
              fullWidth
              onClick={() => router.push("/past-exam/select")}
              aria-label="다른 유형 선택"
            >
              다른 유형 선택
            </Button>
            <Button
              variant="ghost"
              size="md"
              fullWidth
              onClick={() => router.push("/dashboard")}
              aria-label="대시보드로 이동"
            >
              대시보드
            </Button>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}
