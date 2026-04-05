"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";

/* ── 목데이터 ── */
interface Choice {
  id: number;
  text: string;
}

interface Question {
  id: number;
  type: string;
  area: string;
  text: string;
  question: string;
  hasAudio: boolean;
  choices: Choice[];
  correctIndex: number; // 0-based
}

const EXAM_INFO = {
  level: "TOPIK I",
  mode: "실전 모의고사",
  totalMinutes: 5, // 데모: 5분
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    type: "어휘·문법",
    area: "읽기",
    text: "다음 ( )에 알맞은 것을 고르십시오.\n\n오늘은 날씨가 ( ) 공원에 산책하러 갔다.",
    question: "빈칸에 들어갈 가장 알맞은 표현은 무엇입니까?",
    hasAudio: false,
    choices: [
      { id: 1, text: "좋아서" },
      { id: 2, text: "좋지만" },
      { id: 3, text: "좋으면" },
      { id: 4, text: "좋도록" },
    ],
    correctIndex: 0,
  },
  {
    id: 2,
    type: "내용 이해",
    area: "읽기",
    text: "다음 글을 읽고 물음에 답하십시오.\n\n저는 매일 아침 운동을 합니다. 건강을 위해서 아침 일찍 일어나 한 시간씩 달리기를 합니다. 처음에는 힘들었지만 지금은 운동이 없으면 하루가 허전합니다.",
    question: "이 글의 내용과 같은 것은 무엇입니까?",
    hasAudio: false,
    choices: [
      { id: 1, text: "이 사람은 저녁에 운동한다." },
      { id: 2, text: "이 사람은 매일 달리기를 한다." },
      { id: 3, text: "이 사람은 운동을 좋아하지 않는다." },
      { id: 4, text: "이 사람은 두 시간씩 운동한다." },
    ],
    correctIndex: 1,
  },
  {
    id: 3,
    type: "세부 내용",
    area: "읽기",
    text: "다음 안내문을 읽고 물음에 답하십시오.\n\n[도서관 이용 안내]\n- 이용 시간: 오전 9시 ~ 오후 9시\n- 대출 권수: 1인당 5권까지\n- 대출 기간: 2주\n- 반납 연장: 1회 가능 (2주 추가)",
    question: "이 안내문의 내용과 다른 것은 무엇입니까?",
    hasAudio: false,
    choices: [
      { id: 1, text: "도서관은 오전 9시부터 이용할 수 있다." },
      { id: 2, text: "한 번에 최대 5권을 빌릴 수 있다." },
      { id: 3, text: "책은 2주 동안 빌릴 수 있다." },
      { id: 4, text: "반납 연장은 두 번까지 가능하다." },
    ],
    correctIndex: 3,
  },
];

const TOTAL_SECONDS = EXAM_INFO.totalMinutes * 60;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function PracticeExamModePage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(QUESTIONS.length).fill(null)
  );
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [startTime] = useState(() => Date.now());

  const goToResult = useCallback(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const answersParam = answers
      .map((a) => (a === null ? "" : String(a)))
      .join(",");
    router.push(
      `/practice/exam-mode/result?answers=${answersParam}&elapsed=${elapsed}`
    );
  }, [router, answers, startTime]);

  // 타이머
  useEffect(() => {
    if (timeLeft <= 0) {
      goToResult();
      return;
    }
    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [timeLeft, goToResult]);

  const handleChoiceSelect = (choiceId: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = choiceId;
      return next;
    });
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      goToResult();
    }
  };

  const handleClose = () => {
    router.push("/practice");
  };

  const question = QUESTIONS[currentIndex];
  const answeredCount = answers.filter((a) => a !== null).length;
  const progressPercent = Math.round(
    ((currentIndex + 1) / QUESTIONS.length) * 100
  );

  const isTimeLow = timeLeft <= 60;

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
        {/* 다크 헤더 */}
        <div
          style={{
            backgroundColor: "var(--color-primary-dark)",
            padding: "16px 16px 0",
          }}
        >
          {/* 상단 행: 서브텍스트 + 닫기 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "4px",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                color: "var(--color-primary-muted)",
                fontWeight: 500,
              }}
            >
              {EXAM_INFO.level} · {EXAM_INFO.mode}
            </span>
            <button
              onClick={handleClose}
              aria-label="실전 모의고사 종료"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.15)",
                border: "none",
                cursor: "pointer",
                color: "#FFFFFF",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              ✕
            </button>
          </div>

          {/* 제목 */}
          <h1
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#FFFFFF",
              margin: "0 0 16px",
            }}
          >
            실전 모의고사
          </h1>

          {/* 타이머 박스 */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                backgroundColor: isTimeLow
                  ? "var(--color-error)"
                  : "var(--color-primary)",
                borderRadius: "12px",
                padding: "10px 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2px",
                minWidth: "120px",
                transition: "background-color 0.3s ease",
              }}
              aria-label={`남은 시간 ${formatTime(timeLeft)}`}
            >
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  fontVariantNumeric: "tabular-nums",
                  letterSpacing: "2px",
                }}
              >
                {formatTime(timeLeft)}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.75)",
                  fontWeight: 500,
                }}
              >
                남은 시간
              </span>
            </div>
          </div>

          {/* 진행 상태 바 영역 */}
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: "12px 12px 0 0",
              padding: "10px 16px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.85)",
                  fontWeight: 600,
                }}
              >
                {currentIndex + 1} / {QUESTIONS.length} 문항
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "var(--color-primary-muted)",
                  fontWeight: 600,
                }}
              >
                {progressPercent}%
              </span>
            </div>
            {/* 진행 바 */}
            <div
              style={{
                height: "4px",
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: "4px",
                overflow: "hidden",
              }}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${progressPercent}% 진행`}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progressPercent}%`,
                  backgroundColor: "var(--color-primary-muted)",
                  borderRadius: "4px",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
        </div>

        {/* 문제 영역 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "var(--color-background)",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {/* 문제 번호 + 유형 태그 */}
            <div
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "var(--color-success-dark)",
                }}
              >
                {question.id}번
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "var(--color-success-dark)",
                  backgroundColor: "var(--color-success-light)",
                  padding: "2px 8px",
                  borderRadius: "var(--radius-pill)",
                  fontWeight: 500,
                }}
              >
                {question.type}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "var(--color-text-secondary)",
                  backgroundColor: "var(--color-divider)",
                  padding: "2px 8px",
                  borderRadius: "var(--radius-pill)",
                  fontWeight: 500,
                }}
              >
                {question.area}
              </span>
            </div>

            {/* 지문 */}
            <div
              style={{
                backgroundColor: "var(--color-surface)",
                borderRadius: "var(--radius-card)",
                border: "0.5px solid var(--color-border)",
                padding: "16px",
              }}
            >
              {question.hasAudio && (
                <div
                  style={{
                    backgroundColor: "var(--color-background)",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    marginBottom: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                  aria-label="오디오 플레이어"
                >
                  <button
                    aria-label="오디오 재생"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor: "var(--color-success)",
                      border: "none",
                      cursor: "pointer",
                      color: "#fff",
                      fontSize: "13px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    ▶
                  </button>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        height: "3px",
                        backgroundColor: "var(--color-border)",
                        borderRadius: "3px",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "var(--color-text-tertiary)",
                    }}
                  >
                    0:00 / 0:35
                  </span>
                </div>
              )}
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: 1.8,
                  color: "var(--color-text-primary)",
                  whiteSpace: "pre-wrap",
                  margin: 0,
                }}
              >
                {question.text}
              </p>
            </div>

            {/* 질문 */}
            <p
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {question.question}
            </p>

            {/* 선택지 */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              role="radiogroup"
              aria-label="선택지"
            >
              {question.choices.map((choice) => {
                const isSelected = answers[currentIndex] === choice.id;
                return (
                  <button
                    key={choice.id}
                    onClick={() => handleChoiceSelect(choice.id)}
                    aria-label={`선택지 ${choice.id}: ${choice.text}`}
                    aria-pressed={isSelected}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: "10px",
                      border: isSelected
                        ? "2px solid var(--color-success)"
                        : "1.5px solid var(--color-border)",
                      backgroundColor: isSelected
                        ? "var(--color-success-light)"
                        : "var(--color-surface)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      textAlign: "left",
                      fontFamily: "inherit",
                      minHeight: "44px",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <span
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        backgroundColor: isSelected
                          ? "var(--color-success)"
                          : "var(--color-divider)",
                        color: isSelected
                          ? "#fff"
                          : "var(--color-text-secondary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "13px",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    >
                      {choice.id}
                    </span>
                    <span
                      style={{
                        fontSize: "14px",
                        color: isSelected
                          ? "var(--color-success-dark)"
                          : "var(--color-text-primary)",
                        fontWeight: isSelected ? 600 : 400,
                      }}
                    >
                      {choice.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 문항 이동 그리드 */}
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
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--color-text-secondary)",
                  marginBottom: "10px",
                }}
              >
                문항 이동 ({answeredCount}/{QUESTIONS.length} 답변)
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
                role="group"
                aria-label="문항 이동"
              >
                {QUESTIONS.map((q, idx) => {
                  const isAnswered = answers[idx] !== null;
                  const isCurrent = idx === currentIndex;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`${q.id}번 문항${isAnswered ? " (답변 완료)" : ""}${isCurrent ? " (현재)" : ""}`}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        border: isCurrent
                          ? "2px solid var(--color-success)"
                          : "1.5px solid var(--color-border)",
                        backgroundColor: isCurrent
                          ? "var(--color-success-light)"
                          : isAnswered
                          ? "var(--color-success)"
                          : "var(--color-divider)",
                        color:
                          isAnswered && !isCurrent
                            ? "#fff"
                            : isCurrent
                            ? "var(--color-success-dark)"
                            : "var(--color-text-secondary)",
                        fontSize: "13px",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "inherit",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {q.id}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 하단 네비게이션 */}
        <div
          style={{
            padding: "12px 16px",
            borderTop: "1px solid var(--color-divider)",
            backgroundColor: "var(--color-surface)",
            display: "flex",
            gap: "8px",
          }}
        >
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="이전 문제"
            style={{
              flex: 1,
              height: "48px",
              borderRadius: "var(--radius-btn)",
              border: "1.5px solid var(--color-border)",
              backgroundColor: "transparent",
              color:
                currentIndex === 0
                  ? "var(--color-text-tertiary)"
                  : "var(--color-text-secondary)",
              fontSize: "15px",
              fontWeight: 600,
              cursor: currentIndex === 0 ? "not-allowed" : "pointer",
              opacity: currentIndex === 0 ? 0.5 : 1,
              fontFamily: "inherit",
              minHeight: "44px",
            }}
          >
            이전
          </button>
          <button
            onClick={handleNext}
            aria-label={
              currentIndex === QUESTIONS.length - 1
                ? "연습 제출"
                : "다음 문제"
            }
            style={{
              flex: 2,
              height: "48px",
              borderRadius: "var(--radius-btn)",
              border: "none",
              backgroundColor: "var(--color-primary-dark)",
              color: "#FFFFFF",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              minHeight: "44px",
            }}
          >
            {currentIndex === QUESTIONS.length - 1 ? "연습 제출" : "다음"}
          </button>
        </div>
      </div>
    </MobileFrame>
  );
}
