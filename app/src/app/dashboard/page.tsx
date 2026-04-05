import Link from "next/link";
import MobileFrame from "@/components/layout/MobileFrame";
import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import LanguageDropdown from "@/components/dashboard/LanguageDropdown";
import StreakCard from "@/components/dashboard/StreakCard";

/* ── 목데이터 ── */
const USER_NAME = "Jaeseok";
const EXAM_TARGET = "TOPIK II 4급";
const DDAY = 42;
const EXAM_DATE = "2026.05.17";

const TODAY_RECOMMENDATION = {
  title: "어휘·문법 / 틀린 문제 복습",
  subtitle: "최근 오답률 높은 유형",
  questionCount: 12,
};

const STREAK_DAYS = ["월", "화", "수", "목", "금", "토", "일"];
const STREAK_DONE = [true, true, true, true, false, false, false];
const STREAK_COUNT = 4;

const WEAK_ANALYSIS = {
  summary: "어휘·문법 영역에서 반복 오답이 발생하고 있어요.",
  tags: [
    { label: "어휘·문법", variant: "error" as const },
    { label: "듣기 세부 내용", variant: "error" as const },
    { label: "읽기 주제 파악", variant: "warning" as const },
  ],
};

const WEAK_TYPES = [
  { rank: 1, type: "어휘·문법", area: "읽기", accuracy: 38 },
  { rank: 2, type: "중심 내용 파악", area: "듣기", accuracy: 45 },
  { rank: 3, type: "글의 순서", area: "읽기", accuracy: 52 },
];

export default function DashboardPage() {
  return (
    <MobileFrame>
      <div
        style={{
          backgroundColor: "var(--color-background)",
          minHeight: "100%",
          paddingBottom: "24px",
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            padding: "20px 16px 16px",
            backgroundColor: "var(--color-surface)",
            borderBottom: "1px solid var(--color-divider)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginBottom: "2px" }}>
                안녕하세요
              </p>
              <h1
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  margin: 0,
                }}
              >
                {USER_NAME}님 👋
              </h1>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* 다국어 드롭다운 */}
              <LanguageDropdown />
            </div>
          </div>
        </div>

        <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>

          {/* 시험 목표 카드 */}
          <Card aria-label="시험 목표 카드">
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontSize: "11px", color: "var(--color-text-tertiary)", marginBottom: "2px" }}>
                  목표 시험
                </p>
                <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "2px" }}>
                  {EXAM_TARGET}
                </p>
                <p style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>
                  {EXAM_DATE}
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "var(--color-primary-dark)",
                  color: "#fff",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  textAlign: "center",
                  minWidth: "60px",
                }}
              >
                <p style={{ fontSize: "10px", fontWeight: 500, opacity: 0.8, marginBottom: "2px" }}>D-day</p>
                <p style={{ fontSize: "24px", fontWeight: 800, lineHeight: 1 }}>
                  {DDAY}
                </p>
              </div>
            </div>
          </Card>

          {/* 연속 학습 — 시험목표 바로 아래 */}
          <StreakCard
            streakCount={STREAK_COUNT}
            streakDays={STREAK_DAYS}
            streakDone={STREAK_DONE}
          />

          {/* 오늘의 추천학습 */}
          <div
            style={{
              backgroundColor: "var(--color-success-light)",
              borderRadius: "var(--radius-card)",
              padding: "16px",
              border: "0.5px solid #B8EDD8",
            }}
          >
            <div className="flex items-start justify-between">
              <div style={{ flex: 1 }}>
                <div className="flex items-center gap-2" style={{ marginBottom: "6px" }}>
                  <span style={{ fontSize: "14px" }}>⭐</span>
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--color-success-dark)",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    오늘의 추천학습
                  </p>
                </div>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "var(--color-text-primary)",
                    marginBottom: "4px",
                  }}
                >
                  {TODAY_RECOMMENDATION.title}
                </p>
                <p style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>
                  {TODAY_RECOMMENDATION.subtitle} · {TODAY_RECOMMENDATION.questionCount}문항
                </p>
              </div>
              <Link
                href="/quiz/recommend"
                aria-label="오늘의 추천학습 바로 풀기"
              >
                <Button
                  variant="primary"
                  size="sm"
                  style={{
                    backgroundColor: "var(--color-success)",
                    marginLeft: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  바로 풀기
                </Button>
              </Link>
            </div>
          </div>

          {/* 학습 진단 (약점 분석 + 취약 유형 통합) */}
          <Card aria-label="학습 진단">
            <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "8px" }}>
              학습 진단
            </p>
            <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: "8px" }}>
              {WEAK_ANALYSIS.summary}
            </p>

            {/* 약점 태그 */}
            <div className="flex flex-wrap gap-2" style={{ marginBottom: "12px" }}>
              {WEAK_ANALYSIS.tags.map((tag) => (
                <Tag key={tag.label} variant={tag.variant}>
                  {tag.label}
                </Tag>
              ))}
            </div>

            {/* 취약 유형 리스트 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
              {WEAK_TYPES.map((item) => (
                <div
                  key={item.rank}
                  className="flex items-center gap-3"
                  style={{
                    padding: "10px 12px",
                    backgroundColor: "var(--color-background)",
                    borderRadius: "8px",
                    border: "0.5px solid var(--color-border)",
                  }}
                >
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      backgroundColor:
                        item.rank === 1
                          ? "var(--color-error)"
                          : item.rank === 2
                          ? "var(--color-warning)"
                          : "var(--color-text-tertiary)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                    aria-label={`${item.rank}위`}
                  >
                    {item.rank}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.type}
                    </p>
                    <p style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>
                      {item.area}
                    </p>
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-error)" }}>
                    {item.accuracy}%
                  </span>
                  <Link href="/quiz">
                    <Button variant="secondary" size="sm" aria-label={`${item.type} 풀기`}
                      style={{ height: "28px", fontSize: "12px", padding: "0 10px", minHeight: "28px" }}
                    >
                      풀기
                    </Button>
                  </Link>
                </div>
              ))}
            </div>

          </Card>

        </div>
      </div>
    </MobileFrame>
  );
}
