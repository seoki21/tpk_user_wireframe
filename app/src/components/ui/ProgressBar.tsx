interface ProgressBarProps {
  /** 0–100 사이의 값 */
  value: number;
  /** 트랙 높이 (px, 기본 6) */
  height?: number;
  color?: string;
  trackColor?: string;
  "aria-label"?: string;
}

/**
 * 진행 바 컴포넌트.
 * value 0~100.
 */
export default function ProgressBar({
  value,
  height = 6,
  color = "var(--color-primary)",
  trackColor = "var(--color-divider)",
  "aria-label": ariaLabel,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel ?? `진행률 ${clamped}%`}
      style={{
        width: "100%",
        height: `${height}px`,
        backgroundColor: trackColor,
        borderRadius: `${height}px`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${clamped}%`,
          height: "100%",
          backgroundColor: color,
          borderRadius: `${height}px`,
          transition: "width 0.4s ease",
        }}
      />
    </div>
  );
}
