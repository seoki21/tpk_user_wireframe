"use client";

import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";

interface StreakCardProps {
  streakCount: number;
  streakDays: string[];
  streakDone: boolean[];
}

export default function StreakCard({ streakCount, streakDays, streakDone }: StreakCardProps) {
  return (
    <Card aria-label="연속 학습">
      <div className="flex items-center justify-between" style={{ marginBottom: "10px" }}>
        <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-text-secondary)" }}>
          연속 학습
        </p>
        <Tag variant="warning">
          🔥 {streakCount}일 연속
        </Tag>
      </div>
      <div className="flex items-center justify-between">
        {streakDays.map((day, i) => (
          <div
            key={day}
            className="flex flex-col items-center gap-1"
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor: streakDone[i]
                  ? "var(--color-primary-muted)"
                  : "var(--color-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label={`${day}요일 ${streakDone[i] ? "학습 완료" : "미완료"}`}
            >
              {streakDone[i] && (
                <span style={{ color: "#fff", fontSize: "11px", fontWeight: 600 }}>✓</span>
              )}
            </div>
            <span
              style={{
                fontSize: "10px",
                color: streakDone[i]
                  ? "var(--color-primary-muted)"
                  : "var(--color-text-tertiary)",
                fontWeight: streakDone[i] ? 500 : 400,
              }}
            >
              {day}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
