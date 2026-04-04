import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const VARIANT_STYLES: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: "var(--color-primary)",
    color: "#FFFFFF",
    border: "none",
  },
  secondary: {
    backgroundColor: "var(--color-surface)",
    color: "var(--color-primary)",
    border: "1.5px solid var(--color-primary)",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "var(--color-text-secondary)",
    border: "1.5px solid var(--color-border)",
  },
  danger: {
    backgroundColor: "var(--color-error)",
    color: "#FFFFFF",
    border: "none",
  },
};

const SIZE_STYLES: Record<ButtonSize, React.CSSProperties> = {
  sm: { height: "32px", fontSize: "13px", padding: "0 12px" },
  md: { height: "38px", fontSize: "15px", padding: "0 16px" },
  lg: { height: "48px", fontSize: "16px", padding: "0 24px" },
};

/**
 * 공통 버튼 컴포넌트.
 * 최소 터치 타겟 44x44px 준수 (min-height: 44px).
 */
export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      style={{
        ...VARIANT_STYLES[variant],
        ...SIZE_STYLES[size],
        borderRadius: "var(--radius-btn)",
        fontWeight: 600,
        cursor: props.disabled ? "not-allowed" : "pointer",
        opacity: props.disabled ? 0.5 : 1,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        width: fullWidth ? "100%" : undefined,
        minHeight: "44px",
        transition: "opacity 0.15s ease, background-color 0.15s ease",
        fontFamily: "inherit",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
