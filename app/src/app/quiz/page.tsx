"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import ProgressBar from "@/components/ui/ProgressBar";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";

/* ── 3문제 목데이터 ── */
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
  hasAudio: boolean;
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
    hasAudio: false,
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
    hasAudio: false,
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
    hasAudio: false,
  },
];

function QuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = Number(searchParams.get("q") ?? "1");
  const total = Number(searchParams.get("total") ?? "3");

  // 유효 범위 클램프
  const currentIndex = Math.max(0, Math.min(q - 1, QUESTIONS.length - 1));
  const currentQuestion = QUESTIONS[currentIndex];

  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const progress = ((q - 1) / total) * 100;

  const handleChoiceSelect = (id: string) => {
    if (selectedChoice !== null) return;
    setSelectedChoice(id);
    router.push(
      `/quiz/feedback?q=${q}&total=${total}&selected=${id}&correct=${currentQuestion.correctId}`
    );
  };

  const handleNext = () => {
    // 선택 없이 다음 클릭 = 건너뜀
    router.push(
      `/quiz/feedback?q=${q}&total=${total}&selected=&correct=${currentQuestion.correctId}`
    );
  };

  const handlePrev = () => {
    if (q > 1) {
      router.push(`/quiz?q=${q - 1}&total=${total}`);
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
          <div className="flex items-center justify-between" style={{ marginBottom: "8px" }}>
            <div className="flex items-center gap-2">
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
            aria-label={`${total}문제 중 ${q - 1}번째 완료`}
          />
        </div>

        {/* 문제 본문 */}
        <div
          style={{
            flex: 1,
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            overflowY: "auto",
          }}
        >
          {/* 유형 태그 */}
          <div className="flex items-center gap-2">
            <Tag variant="primary" size="sm">{currentQuestion.level}</Tag>
            <Tag variant="default" size="sm">{currentQuestion.area}</Tag>
            <Tag variant="default" size="sm">{currentQuestion.type}</Tag>
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
            {currentQuestion.hasAudio && (
              <div
                style={{
                  backgroundColor: "var(--color-background)",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
                aria-label="오디오 플레이어"
              >
                <button
                  aria-label="재생"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-primary)",
                    border: "none",
                    cursor: "pointer",
                    color: "#fff",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
                <span style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>
                  0:00 / 0:42
                </span>
              </div>
            )}
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.8,
                color: "var(--color-text-primary)",
                whiteSpace: "pre-wrap",
              }}
            >
              {currentQuestion.text}
            </p>
          </div>

          {/* 문제 */}
          <p
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              lineHeight: 1.5,
            }}
          >
            {currentQuestion.question}
          </p>

          {/* 선택지 */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            role="radiogroup"
            aria-label="선택지"
          >
            {currentQuestion.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleChoiceSelect(choice.id)}
                aria-label={`선택지 ${choice.id}: ${choice.text}`}
                disabled={selectedChoice !== null}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border:
                    selectedChoice === choice.id
                      ? "2px solid var(--color-primary)"
                      : "1.5px solid var(--color-border)",
                  backgroundColor:
                    selectedChoice === choice.id
                      ? "var(--color-primary-light)"
                      : "var(--color-surface)",
                  cursor: selectedChoice !== null ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  textAlign: "left",
                  fontFamily: "inherit",
                  minHeight: "44px",
                }}
              >
                <span
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor:
                      selectedChoice === choice.id
                        ? "var(--color-primary)"
                        : "var(--color-divider)",
                    color:
                      selectedChoice === choice.id
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
                    color:
                      selectedChoice === choice.id
                        ? "var(--color-primary)"
                        : "var(--color-text-primary)",
                    fontWeight: selectedChoice === choice.id ? 600 : 400,
                  }}
                >
                  {choice.text}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 하단 네비게이션 버튼 */}
        <div
          style={{
            padding: "12px 16px",
            borderTop: "1px solid var(--color-divider)",
            backgroundColor: "var(--color-surface)",
            display: "flex",
            gap: "8px",
          }}
        >
          <Button
            variant="ghost"
            size="lg"
            onClick={handlePrev}
            disabled={q <= 1}
            aria-label="이전 문제"
            style={{ flex: 1 }}
          >
            이전
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleNext}
            aria-label="다음 문제 (선택 없이 건너뜀)"
            style={{ flex: 2 }}
          >
            다음 문제
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <QuizContent />
    </Suspense>
  );
}
