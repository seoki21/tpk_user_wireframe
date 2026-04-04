"use client";

import MobileFrame from "@/components/layout/MobileFrame";
import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";

/* ── 목데이터 ── */
const USER = {
  name: "Jaeseok Kim",
  email: "jaeseok@example.com",
  plan: "Free" as const,
  language: "베트남어",
  targetLevel: "TOPIK II 4급",
  joinDate: "2026.01.15",
};

const SETTINGS = [
  { id: "language", label: "언어 설정", value: USER.language, icon: "🌐" },
  { id: "notification", label: "알림 설정", value: "켜짐", icon: "🔔" },
  { id: "target-level", label: "목표 레벨", value: USER.targetLevel, icon: "🎯" },
];

export default function MyPage() {
  return (
    <MobileFrame>
      <div
        style={{
          backgroundColor: "var(--color-background)",
          minHeight: "100%",
          paddingBottom: "24px",
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
            마이페이지
          </h1>
        </div>

        <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>

          {/* 프로필 카드 */}
          <Card aria-label="프로필 정보">
            <div className="flex items-center gap-4">
              {/* 아바타 */}
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#fff",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                {USER.name[0]}
              </div>
              {/* 정보 */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="flex items-center gap-2" style={{ marginBottom: "2px" }}>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "var(--color-text-primary)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {USER.name}
                  </p>
                  <Tag
                    variant={USER.plan === "Free" ? "default" : "primary"}
                    size="sm"
                  >
                    {USER.plan}
                  </Tag>
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--color-text-secondary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {USER.email}
                </p>
                <p style={{ fontSize: "11px", color: "var(--color-text-tertiary)", marginTop: "4px" }}>
                  가입일 {USER.joinDate}
                </p>
              </div>
            </div>
          </Card>

          {/* 구독 관리 */}
          <Card aria-label="구독 관리">
            <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "12px" }}>
              구독 관리
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {/* Free 플랜 */}
              <div
                style={{
                  borderRadius: "10px",
                  border: "2px solid var(--color-primary)",
                  backgroundColor: "var(--color-primary-light)",
                  padding: "14px 16px",
                }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: "8px" }}>
                  <div>
                    <p style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-primary)" }}>
                      Free
                    </p>
                    <p style={{ fontSize: "12px", color: "var(--color-primary-muted)" }}>
                      현재 플랜
                    </p>
                  </div>
                  <Tag variant="primary" size="sm">현재 이용 중</Tag>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {["기출문제 N개/월", "연습문제 N개/월", "기본 피드백"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span style={{ fontSize: "12px", color: "var(--color-primary)" }}>✓</span>
                      <span style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro 플랜 */}
              <div
                style={{
                  borderRadius: "10px",
                  border: "1px solid var(--color-border)",
                  backgroundColor: "var(--color-surface)",
                  padding: "14px 16px",
                }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: "8px" }}>
                  <div>
                    <div className="flex items-center gap-2">
                      <p style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-primary)" }}>
                        Pro
                      </p>
                      <Tag variant="warning" size="sm">추천</Tag>
                    </div>
                    <p style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>
                      가격 TBD
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "12px" }}>
                  {[
                    "무제한 기출·연습문제",
                    "AI 피드백 전체",
                    "영상 강의 (TBD)",
                    "약점 분석 상세",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span style={{ fontSize: "12px", color: "var(--color-success)" }}>✓</span>
                      <span style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{item}</span>
                    </div>
                  ))}
                </div>
                <Button
                  fullWidth
                  variant="primary"
                  size="sm"
                  aria-label="Pro 플랜으로 업그레이드"
                  style={{ backgroundColor: "var(--color-primary-dark)" }}
                >
                  Pro로 업그레이드
                </Button>
              </div>
            </div>
          </Card>

          {/* 설정 목록 */}
          <Card aria-label="설정">
            <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "4px" }}>
              설정
            </p>
            <div>
              {SETTINGS.map((setting, i) => (
                <button
                  key={setting.id}
                  aria-label={`${setting.label}: ${setting.value}`}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px 0",
                    background: "none",
                    border: "none",
                    borderBottom: i < SETTINGS.length - 1
                      ? "1px solid var(--color-divider)"
                      : "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    minHeight: "44px",
                    textAlign: "left",
                  }}
                >
                  <span style={{ fontSize: "18px" }} aria-hidden="true">
                    {setting.icon}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      fontSize: "14px",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {setting.label}
                  </span>
                  <span style={{ fontSize: "13px", color: "var(--color-text-tertiary)" }}>
                    {setting.value}
                  </span>
                  <span style={{ fontSize: "14px", color: "var(--color-text-tertiary)" }}>
                    ›
                  </span>
                </button>
              ))}
            </div>
          </Card>

          {/* 로그아웃 */}
          <button
            aria-label="로그아웃"
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: "var(--radius-card)",
              border: "1px solid var(--color-error-light)",
              backgroundColor: "var(--color-surface)",
              color: "var(--color-error)",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              minHeight: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <span aria-hidden="true">🚪</span>
            로그아웃
          </button>

          <p style={{ fontSize: "11px", color: "var(--color-text-tertiary)", textAlign: "center" }}>
            버전 1.0.0 · TOPIK 문제은행
          </p>
        </div>
      </div>
    </MobileFrame>
  );
}
