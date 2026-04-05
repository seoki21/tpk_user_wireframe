"use client";

import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";

/* ── 목데이터 ── */
const WRONG_TYPES = [
  { label: "어휘·문법", count: 3 },
  { label: "세부 내용 파악", count: 2 },
];

const WEAKNESS = "연결어미(-아서/-지만) 사용에서 자주 틀려요.";

const RECOMMENDATION = {
  type: "어휘·문법 복습",
  count: 5,
  minutes: 3,
};

const totalWrong = WRONG_TYPES.reduce((acc, t) => acc + t.count, 0);

export default function RecommendPage() {
  const router = useRouter();

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
          <h1
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              margin: 0,
            }}
          >
            오늘의 추천학습
          </h1>
        </div>

        {/* 콘텐츠 */}
        <div
          style={{
            flex: 1,
            padding: "24px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            overflowY: "auto",
          }}
        >
          {/* 인트로 */}
          <div style={{ marginBottom: "4px" }}>
            <p
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                lineHeight: 1.4,
                margin: "0 0 6px 0",
              }}
            >
              회원님의 최근 학습을
              <br />
              분석했어요
            </p>
            <p
              style={{
                fontSize: "13px",
                color: "var(--color-text-secondary)",
                margin: 0,
              }}
            >
              최근 7일간의 학습 결과를 기반으로 정리했어요.
            </p>
          </div>

          {/* 1. 최근 틀린 유형 */}
          <div
            style={{
              backgroundColor: "var(--color-error-light)",
              borderRadius: "var(--radius-card)",
              padding: "16px",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "var(--color-error-dark)",
                marginBottom: "12px",
              }}
            >
              최근 틀린 유형
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              {WRONG_TYPES.map((type) => (
                <div
                  key={type.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Tag variant="error" size="sm">
                    {type.label}
                  </Tag>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--color-error-dark)",
                    }}
                  >
                    {type.count}문항
                  </span>
                </div>
              ))}
            </div>
            <p
              style={{
                fontSize: "12px",
                color: "var(--color-error-dark)",
                margin: 0,
                paddingTop: "10px",
                borderTop: "1px solid rgba(217, 64, 82, 0.15)",
              }}
            >
              총 <strong>{totalWrong}문항</strong>을 틀렸어요
            </p>
          </div>

          {/* 2. 약점 포인트 */}
          <div
            style={{
              backgroundColor: "var(--color-warning-light)",
              borderRadius: "var(--radius-card)",
              padding: "16px",
              display: "flex",
              gap: "10px",
              alignItems: "flex-start",
            }}
          >
            <span style={{ fontSize: "18px", flexShrink: 0, lineHeight: 1.3 }}>
              💡
            </span>
            <div>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "var(--color-warning-dark)",
                  marginBottom: "4px",
                }}
              >
                약점 포인트
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--color-text-primary)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {WEAKNESS}
              </p>
            </div>
          </div>

        </div>

        {/* 하단: 추천 안내 + CTA */}
        <div
          style={{
            padding: "20px 16px 16px",
            borderTop: "1px solid var(--color-divider)",
            backgroundColor: "var(--color-surface)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "17px",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              marginBottom: "8px",
            }}
          >
            그래서 이런 문제를 추천해요!
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            <Tag variant="success" size="md">
              {RECOMMENDATION.type}
            </Tag>
            <span
              style={{
                fontSize: "14px",
                color: "var(--color-text-secondary)",
              }}
            >
              {RECOMMENDATION.count}문항 · 약 {RECOMMENDATION.minutes}분
            </span>
          </div>
          <Button
            fullWidth
            variant="primary"
            size="lg"
            onClick={() =>
              router.push(
                `/quiz?q=1&total=${RECOMMENDATION.count}`
              )
            }
            aria-label="문제 연습 시작"
          >
            문제 연습 시작
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
}
