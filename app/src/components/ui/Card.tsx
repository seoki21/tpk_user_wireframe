import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** 클릭 가능한 카드인 경우 aria-label 필수 */
  onClick?: () => void;
  "aria-label"?: string;
  selected?: boolean;
}

/**
 * 기본 카드 래퍼.
 * border-radius 12px, border 0.5px, surface 배경.
 */
export default function Card({
  children,
  style,
  onClick,
  selected = false,
  ...props
}: CardProps) {
  const baseStyle: React.CSSProperties = {
    backgroundColor: "var(--color-surface)",
    borderRadius: "var(--radius-card)",
    border: selected
      ? "1.5px solid var(--color-primary)"
      : "0.5px solid var(--color-border)",
    padding: "16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    cursor: onClick ? "pointer" : undefined,
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
    ...style,
  };

  if (onClick) {
    return (
      <div
        role="button"
        tabIndex={0}
        style={baseStyle}
        onClick={onClick}
        onKeyDown={(e) => e.key === "Enter" && onClick()}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div style={baseStyle} {...props}>
      {children}
    </div>
  );
}
