"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Button from "@/components/ui/Button";

/* ── 목데이터 ── */
interface WrongItem {
  num: number;
  typeLabel: string;
  questionText: string;
  choices: { id: string; text: string }[];
  correctId: string;
  myAnswerId: string;
  aiExplain: string;
}

const WRONG_ITEMS: WrongItem[] = [
  {
    num: 2,
    typeLabel: "대화 듣고 이어질 말 고르기",
    questionText: "다음을 듣고 이어질 말로 가장 알맞은 것을 고르세요.",
    choices: [
      { id: "①", text: "네, 감사합니다." },
      { id: "②", text: "아니요, 괜찮아요." },
      { id: "③", text: "맞아요, 저도요." },
      { id: "④", text: "잘 모르겠어요." },
    ],
    correctId: "①",
    myAnswerId: "③",
    aiExplain:
      "이 대화에서 상대방은 감사 표현을 하고 있어요. ①번이 자연스러운 응답이에요. ③번은 동의 표현으로 맞지 않아요.",
  },
  {
    num: 4,
    typeLabel: "내용 일치 고르기",
    questionText:
      "다음을 읽고 내용이 맞는 것을 고르세요. '저는 매일 아침 운동을 해요. 운동 후에는 커피를 마셔요.'",
    choices: [
      { id: "①", text: "저는 저녁에 운동을 해요." },
      { id: "②", text: "저는 운동 후에 차를 마셔요." },
      { id: "③", text: "저는 매일 아침 운동을 해요." },
      { id: "④", text: "저는 운동 전에 커피를 마셔요." },
    ],
    correctId: "③",
    myAnswerId: "②",
    aiExplain:
      "지문에서 '매일 아침 운동을 해요'라고 했으므로 ③번이 맞아요. '운동 후에 커피를 마셔요'라고 했는데 ②번은 차를 마신다고 했어서 틀려요.",
  },
  {
    num: 7,
    typeLabel: "빈칸 채우기",
    questionText:
      "빈칸에 들어갈 알맞은 말을 고르세요. '오늘은 날씨가 ( ) 밖에 나가기 좋아요.'",
    choices: [
      { id: "①", text: "좋아서" },
      { id: "②", text: "나빠서" },
      { id: "③", text: "좋으면" },
      { id: "④", text: "나쁘면" },
    ],
    correctId: "①",
    myAnswerId: "③",
    aiExplain:
      "문장의 흐름상 날씨가 좋기 때문에 밖에 나가기 좋다는 인과 관계가 성립해야 해요. '-아서/어서'는 이유·원인을 나타내므로 ①번이 정답이에요.",
  },
];

export default function QuizResultExplainPage() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const current = WRONG_ITEMS[activeIndex];
  const isLast = activeIndex === WRONG_ITEMS.length - 1;

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
            onClick={() => router.push("/quiz/result")}
            aria-label="결과로 돌아가기"
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
          <h1
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              margin: 0,
            }}
          >
            문제 해설
          </h1>
        </div>

        {/* 스크롤 콘텐츠 */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* 오답 문항 섹션 */}
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
              오답 문항
            </p>
            {/* 오답 칩 가로 나열 */}
            <div
              style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
              role="tablist"
              aria-label="오답 문항 선택"
            >
              {WRONG_ITEMS.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={item.num}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`${item.num}번 문항 해설 보기`}
                    onClick={() => setActiveIndex(idx)}
                    style={{
                      height: "38px",
                      padding: "0 16px",
                      borderRadius: "var(--radius-pill)",
                      border: isActive
                        ? "2px solid var(--color-error)"
                        : "1.5px solid var(--color-border)",
                      backgroundColor: isActive
                        ? "var(--color-error-light)"
                        : "var(--color-surface)",
                      color: isActive
                        ? "var(--color-error-dark)"
                        : "var(--color-text-secondary)",
                      fontSize: "14px",
                      fontWeight: isActive ? 700 : 400,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      minHeight: "44px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {item.num}번
                  </button>
                );
              })}
            </div>
          </div>

          {/* 구분선 */}
          <hr
            style={{
              border: "none",
              borderTop: "1px solid var(--color-divider)",
              margin: 0,
            }}
          />

          {/* 현재 문항 정보 */}
          <div>
            <p
              style={{
                fontSize: "12px",
                color: "var(--color-text-tertiary)",
                marginBottom: "2px",
              }}
            >
              {current.num}번 문항 · {current.typeLabel}
            </p>
          </div>

          {/* 문제 텍스트 카드 */}
          <div
            style={{
              backgroundColor: "var(--color-background)",
              borderRadius: "var(--radius-card)",
              border: "0.5px solid var(--color-border)",
              padding: "14px 16px",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                color: "var(--color-text-primary)",
                lineHeight: 1.7,
              }}
            >
              {current.questionText}
            </p>
          </div>

          {/* 선택지 4개 */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            role="list"
            aria-label="선택지"
          >
            {current.choices.map((choice) => {
              const isCorrect = choice.id === current.correctId;
              const isMyAnswer =
                choice.id === current.myAnswerId && !isCorrect;

              let bgColor = "var(--color-surface)";
              let borderColor = "0.5px solid var(--color-border)";
              let dotBg = "var(--color-divider)";
              let dotColor = "var(--color-text-secondary)";
              let textColor = "var(--color-text-primary)";
              let dotSymbol = choice.id;

              if (isCorrect) {
                bgColor = "var(--color-success-light)";
                borderColor = "1.5px solid var(--color-success)";
                dotBg = "var(--color-success)";
                dotColor = "#fff";
                textColor = "var(--color-success-dark)";
                dotSymbol = "✓";
              } else if (isMyAnswer) {
                bgColor = "var(--color-error-light)";
                borderColor = "1.5px solid var(--color-error)";
                dotBg = "var(--color-error)";
                dotColor = "#fff";
                textColor = "var(--color-error-dark)";
                dotSymbol = "✕";
              }

              return (
                <div
                  key={choice.id}
                  role="listitem"
                  aria-label={`${choice.id}: ${choice.text}${
                    isCorrect ? " (정답)" : ""
                  }${isMyAnswer ? " (내 답)" : ""}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "13px 16px",
                    borderRadius: "10px",
                    border: borderColor,
                    backgroundColor: bgColor,
                  }}
                >
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: dotBg,
                      color: dotColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    {dotSymbol}
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      color: textColor,
                      fontWeight: isCorrect || isMyAnswer ? 600 : 400,
                      flex: 1,
                    }}
                  >
                    {choice.text}
                  </span>
                  {isCorrect && (
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--color-success-dark)",
                        fontWeight: 600,
                        backgroundColor: "rgba(255,255,255,0.65)",
                        padding: "2px 7px",
                        borderRadius: "6px",
                        flexShrink: 0,
                      }}
                    >
                      정답
                    </span>
                  )}
                  {isMyAnswer && (
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--color-error-dark)",
                        fontWeight: 600,
                        backgroundColor: "rgba(255,255,255,0.65)",
                        padding: "2px 7px",
                        borderRadius: "6px",
                        flexShrink: 0,
                      }}
                    >
                      내 답
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* AI 해설 카드 */}
          <div
            style={{
              backgroundColor: "var(--color-primary-light)",
              borderRadius: "var(--radius-card)",
              border: "1.5px solid var(--color-primary)",
              padding: "16px",
            }}
            aria-label="AI 해설"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-primary)",
                  display: "inline-block",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "var(--color-primary)",
                }}
              >
                AI 해설
              </span>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "var(--color-primary-dark)",
                lineHeight: 1.7,
              }}
            >
              {current.aiExplain}
            </p>
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
          {!isLast && (
            <Button
              fullWidth
              variant="primary"
              size="lg"
              onClick={() => setActiveIndex((prev) => prev + 1)}
              aria-label="다음 오답 보기"
            >
              다음 오답 보기
            </Button>
          )}
          <Button
            fullWidth
            variant={isLast ? "primary" : "secondary"}
            size={isLast ? "lg" : "md"}
            onClick={() => router.push("/quiz/result")}
            aria-label="결과로 돌아가기"
          >
            결과로 돌아가기
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
}
