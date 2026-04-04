"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import MobileFrame from "@/components/layout/MobileFrame";
import ProgressBar from "@/components/ui/ProgressBar";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";

/* ── 3문제 목데이터 (quiz/page.tsx와 동일) ── */
interface Choice {
  id: string;
  text: string;
}

interface Question {
  id: number;
  type: string;
  area: string;
  level: string;
  text: string;
  question: string;
  choices: Choice[];
  correctId: string;
  explanationKo: string;
  feedback: {
    correct: { title: string; detail: string };
    wrong: { title: string; detail: string };
    skipped: { title: string; detail: string };
  };
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    type: "대화 유형",
    area: "듣기",
    level: "TOPIK I",
    text: "남자: 오늘 발표 정말 잘하셨어요.\n여자: ___________",
    question: "여자의 대답으로 가장 알맞은 것을 고르세요.",
    choices: [
      { id: "A", text: "네, 감사합니다." },
      { id: "B", text: "아니요, 괜찮아요." },
      { id: "C", text: "맞아요, 저도요." },
      { id: "D", text: "잘 모르겠어요." },
    ],
    correctId: "A",
    explanationKo:
      "상대방이 칭찬을 할 때 자연스러운 응답은 감사 표현입니다. '감사합니다'는 칭찬이나 도움에 대한 감사를 표현하는 말로, 이 상황에 가장 적합합니다.",
    feedback: {
      correct: {
        title: "Chính xác!",
        detail:
          "Rất giỏi! '감사합니다' có nghĩa là 'cảm ơn'. Đáp án A là câu trả lời tự nhiên nhất khi nhận lời khen.",
      },
      wrong: {
        title: "Sai rồi!",
        detail:
          "Người kia đang nói lời khen. Đáp án đúng là A. '감사합니다' có nghĩa là 'cảm ơn'.",
      },
      skipped: {
        title: "Đã bỏ qua",
        detail:
          "Câu hỏi này đã bị bỏ qua. Đáp án đúng là A. Hãy xem giải thích bên dưới.",
      },
    },
  },
  {
    id: 2,
    type: "내용 일치",
    area: "읽기",
    level: "TOPIK I",
    text: "이번 주말에 도서관에서 한국어 말하기 대회가 있습니다. 참가를 원하는 학생은 금요일까지 신청해야 합니다.",
    question: "다음 내용과 일치하는 것을 고르세요.",
    choices: [
      { id: "A", text: "대회는 평일에 합니다." },
      { id: "B", text: "신청은 주말까지 합니다." },
      { id: "C", text: "도서관에서 대회를 합니다." },
      { id: "D", text: "모든 학생이 참가해야 합니다." },
    ],
    correctId: "C",
    explanationKo:
      "지문에서 '도서관에서 한국어 말하기 대회가 있습니다'라고 했으므로 C가 정답입니다. 대회는 주말에, 신청은 금요일까지입니다.",
    feedback: {
      correct: {
        title: "Chính xác!",
        detail:
          "Xuất sắc! Đáp án C đúng vì bài đọc nói 'đại hội tổ chức tại thư viện'.",
      },
      wrong: {
        title: "Sai rồi!",
        detail:
          "Đáp án đúng là C. Bài đọc nói cuộc thi tổ chức tại thư viện vào cuối tuần, đăng ký trước thứ Sáu.",
      },
      skipped: {
        title: "Đã bỏ qua",
        detail:
          "Câu hỏi này đã bị bỏ qua. Đáp án đúng là C. Hãy xem giải thích bên dưới.",
      },
    },
  },
  {
    id: 3,
    type: "중심 내용",
    area: "읽기",
    level: "TOPIK I",
    text: "아침에 일어나면 먼저 물을 한 잔 마시세요. 물을 마시면 몸이 깨어나고 건강에 좋습니다.",
    question: "다음은 무엇에 대한 내용인지 고르세요.",
    choices: [
      { id: "A", text: "운동하는 방법" },
      { id: "B", text: "아침 식사의 중요성" },
      { id: "C", text: "건강을 위한 습관" },
      { id: "D", text: "물의 종류" },
    ],
    correctId: "C",
    explanationKo:
      "아침에 물을 마시는 건강한 습관을 소개하는 내용이므로 '건강을 위한 습관'인 C가 정답입니다.",
    feedback: {
      correct: {
        title: "Chính xác!",
        detail:
          "Giỏi lắm! Đoạn văn giới thiệu thói quen uống nước buổi sáng để tốt cho sức khỏe.",
      },
      wrong: {
        title: "Sai rồi!",
        detail:
          "Đáp án đúng là C. Bài đọc nói về thói quen uống nước buổi sáng tốt cho sức khỏe.",
      },
      skipped: {
        title: "Đã bỏ qua",
        detail:
          "Câu hỏi này đã bị bỏ qua. Đáp án đúng là C. Hãy xem giải thích bên dưới.",
      },
    },
  },
];

function FeedbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = Number(searchParams.get("q") ?? "1");
  const total = Number(searchParams.get("total") ?? "3");
  const selectedId = searchParams.get("selected") ?? "";
  const correctId = searchParams.get("correct") ?? "";

  const [explanationOpen, setExplanationOpen] = useState(false);

  // 현재 문제 데이터 (q는 1-based)
  const currentIndex = Math.max(0, Math.min(q - 1, QUESTIONS.length - 1));
  const currentQuestion = QUESTIONS[currentIndex];

  const isSkipped = selectedId === "";
  const isCorrect = !isSkipped && selectedId === correctId;

  const progress = (q / total) * 100;

  const feedbackData = isSkipped
    ? currentQuestion.feedback.skipped
    : isCorrect
    ? currentQuestion.feedback.correct
    : currentQuestion.feedback.wrong;

  const feedbackBorderColor = isSkipped
    ? "var(--color-border)"
    : isCorrect
    ? "var(--color-success)"
    : "var(--color-error)";

  const feedbackBgColor = isSkipped
    ? "var(--color-surface)"
    : isCorrect
    ? "var(--color-success-light)"
    : "var(--color-error-light)";

  const feedbackTitleColor = isSkipped
    ? "var(--color-text-secondary)"
    : isCorrect
    ? "var(--color-success-dark)"
    : "var(--color-error-dark)";

  const handleNext = () => {
    if (q < total) {
      router.push(`/quiz?q=${q + 1}&total=${total}`);
    } else {
      router.push("/quiz/result");
    }
  };

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
        {/* 상단 진행 헤더 */}
        <div
          style={{
            backgroundColor: "var(--color-surface)",
            borderBottom: "1px solid var(--color-divider)",
            padding: "12px 16px 8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                onClick={() => router.push("/past-exam")}
                aria-label="문제 풀기 종료"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "18px",
                  color: "var(--color-text-secondary)",
                  padding: "0",
                  minWidth: "32px",
                  minHeight: "32px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                ✕
              </button>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                }}
              >
                {q} / {total}
              </span>
            </div>
          </div>
          <ProgressBar
            value={progress}
            height={4}
            color={
              isCorrect
                ? "var(--color-success)"
                : isSkipped
                ? "var(--color-text-tertiary)"
                : "var(--color-error)"
            }
            aria-label={`${total}문제 중 ${q}번째 완료`}
          />
        </div>

        {/* 문제 본문 */}
        <div
          style={{
            flex: 1,
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            overflowY: "auto",
          }}
        >
          {/* 유형 태그 */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Tag variant="primary" size="sm">
              {currentQuestion.level}
            </Tag>
            <Tag variant="default" size="sm">{currentQuestion.area}</Tag>
            <Tag variant="default" size="sm">{currentQuestion.type}</Tag>
          </div>

          {/* 지문 */}
          <div
            style={{
              backgroundColor: "var(--color-surface)",
              borderRadius: "var(--radius-card)",
              border: "0.5px solid var(--color-border)",
              padding: "14px 16px",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                lineHeight: 1.8,
                color: "var(--color-text-secondary)",
                whiteSpace: "pre-line",
              }}
            >
              {currentQuestion.text}
            </p>
          </div>

          {/* 문제 */}
          <p
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              lineHeight: 1.5,
            }}
          >
            {currentQuestion.question}
          </p>

          {/* 선택지 (정답/오답 표시) */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            role="list"
            aria-label="선택지 결과"
          >
            {currentQuestion.choices.map((choice) => {
              const isThisCorrect = choice.id === correctId;
              const isThisSelected = choice.id === selectedId;
              const isThisWrong = isThisSelected && !isThisCorrect;

              let bgColor = "var(--color-surface)";
              let borderColor = "0.5px solid var(--color-border)";
              let dotBg = "var(--color-divider)";
              let dotColor = "var(--color-text-secondary)";
              let textColor = "var(--color-text-secondary)";

              if (isThisCorrect) {
                bgColor = "var(--color-success-light)";
                borderColor = "1.5px solid var(--color-success)";
                dotBg = "var(--color-success)";
                dotColor = "#fff";
                textColor = "var(--color-success-dark)";
              } else if (isThisWrong) {
                bgColor = "var(--color-error-light)";
                borderColor = "1.5px solid var(--color-error)";
                dotBg = "var(--color-error)";
                dotColor = "#fff";
                textColor = "var(--color-error-dark)";
              }

              return (
                <div
                  key={choice.id}
                  role="listitem"
                  aria-label={`선택지 ${choice.id}: ${choice.text}${
                    isThisCorrect ? " (정답)" : ""
                  }${isThisWrong ? " (오답)" : ""}`}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "10px",
                    border: borderColor,
                    backgroundColor: bgColor,
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
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
                      fontSize: "13px",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    {isThisCorrect ? "✓" : isThisWrong ? "✕" : choice.id}
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      color: textColor,
                      fontWeight: isThisCorrect || isThisWrong ? 600 : 400,
                      flex: 1,
                    }}
                  >
                    {choice.text}
                  </span>
                  {isThisCorrect && (
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--color-success-dark)",
                        fontWeight: 600,
                        backgroundColor: "rgba(255,255,255,0.6)",
                        padding: "2px 6px",
                        borderRadius: "6px",
                      }}
                    >
                      정답
                    </span>
                  )}
                  {isThisWrong && (
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--color-error-dark)",
                        fontWeight: 600,
                        backgroundColor: "rgba(255,255,255,0.6)",
                        padding: "2px 6px",
                        borderRadius: "6px",
                      }}
                    >
                      내 답
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* 피드백 카드 */}
          <div
            style={{
              borderRadius: "var(--radius-card)",
              border: `1.5px solid ${feedbackBorderColor}`,
              backgroundColor: feedbackBgColor,
              padding: "16px",
            }}
            aria-label="피드백"
          >
            {/* 언어 뱃지 + 제목 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span style={{ fontSize: "20px" }} aria-hidden="true">
                  {isCorrect ? "🎉" : isSkipped ? "⏭️" : "😅"}
                </span>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: feedbackTitleColor,
                  }}
                >
                  {feedbackData.title}
                </p>
              </div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--color-text-secondary)",
                  backgroundColor: "rgba(255,255,255,0.7)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-pill)",
                  padding: "2px 10px",
                }}
                aria-label="피드백 언어: 베트남어"
              >
                Tiếng Việt
              </span>
            </div>

            {/* 베트남어 설명 */}
            <p
              style={{
                fontSize: "13px",
                color: feedbackTitleColor,
                lineHeight: 1.7,
                marginBottom: "12px",
              }}
            >
              {feedbackData.detail}
            </p>

            {/* 한국어 해설 — 접이식 */}
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.65)",
                borderRadius: "8px",
                overflow: "hidden",
                marginBottom: "12px",
              }}
            >
              <button
                onClick={() => setExplanationOpen((prev) => !prev)}
                aria-expanded={explanationOpen}
                aria-label="한국어 해설 펼치기/접기"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 12px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  minHeight: "44px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--color-text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span aria-hidden="true">📖</span> 한국어 해설
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "var(--color-text-tertiary)",
                    transform: explanationOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                    display: "inline-block",
                  }}
                  aria-hidden="true"
                >
                  ▾
                </span>
              </button>
              {explanationOpen && (
                <div
                  style={{
                    padding: "0 12px 12px",
                    borderTop: "1px solid var(--color-divider)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "13px",
                      color: "var(--color-text-primary)",
                      lineHeight: 1.7,
                      paddingTop: "10px",
                    }}
                  >
                    {currentQuestion.explanationKo}
                  </p>
                </div>
              )}
            </div>

            {/* 관련 강의 링크 */}
            <button
              aria-label="관련 강의 보기 (준비 중)"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: 0,
                fontFamily: "inherit",
              }}
            >
              <span style={{ fontSize: "12px" }}>🎬</span>
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--color-primary)",
                  textDecoration: "underline",
                  fontWeight: 500,
                }}
              >
                관련 강의 보기
              </span>
              <span
                style={{
                  fontSize: "10px",
                  color: "var(--color-text-tertiary)",
                  backgroundColor: "var(--color-divider)",
                  borderRadius: "4px",
                  padding: "1px 4px",
                }}
              >
                TBD
              </span>
            </button>
          </div>
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
            onClick={handleNext}
            aria-label={q < total ? "다음 문제로 이동" : "결과 보기"}
          >
            {q < total ? "다음 문제" : "결과 보기"}
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
}

export default function QuizFeedbackPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <FeedbackContent />
    </Suspense>
  );
}
