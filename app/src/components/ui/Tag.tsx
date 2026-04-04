import React from "react";

type TagVariant = "default" | "primary" | "success" | "error" | "warning" | "outline";

interface TagProps {
  children: React.ReactNode;
  variant?: TagVariant;
  size?: "sm" | "md";
  style?: React.CSSProperties;
}

const VARIANT_STYLES: Record<TagVariant, React.CSSProperties> = {
  default: {
    backgroundColor: "var(--color-divider)",
    color: "var(--color-text-secondary)",
    border: "none",
  },
  primary: {
    backgroundColor: "var(--color-primary-light)",
    color: "var(--color-primary)",
    border: "none",
  },
  success: {
    backgroundColor: "var(--color-success-light)",
    color: "var(--color-success-dark)",
    border: "none",
  },
  error: {
    backgroundColor: "var(--color-error-light)",
    color: "var(--color-error-dark)",
    border: "none",
  },
  warning: {
    backgroundColor: "var(--color-warning-light)",
    color: "var(--color-warning-dark)",
    border: "none",
  },
  outline: {
    backgroundColor: "transparent",
    color: "var(--color-text-secondary)",
    border: "1px solid var(--color-border)",
  },
};

/**
 * Pill 형태 태그 컴포넌트.
 * border-radius 20px.
 */
export default function Tag({
  children,
  variant = "default",
  size = "sm",
  style,
}: TagProps) {
  return (
    <span
      style={{
        ...VARIANT_STYLES[variant],
        borderRadius: "var(--radius-pill)",
        display: "inline-flex",
        alignItems: "center",
        fontWeight: 500,
        fontSize: size === "sm" ? "11px" : "13px",
        padding: size === "sm" ? "2px 8px" : "4px 12px",
        lineHeight: 1.4,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
