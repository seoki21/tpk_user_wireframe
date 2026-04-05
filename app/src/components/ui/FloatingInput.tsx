"use client";

import React, { useState, useId } from "react";

interface FloatingInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  label: string;
}

export default function FloatingInput({
  label,
  value,
  onFocus,
  onBlur,
  style,
  ...props
}: FloatingInputProps) {
  const [focused, setFocused] = useState(false);
  const id = useId();
  const hasValue = value !== undefined && value !== "";
  const isActive = focused || hasValue;

  return (
    <div style={{ position: "relative" }}>
      <input
        id={id}
        value={value}
        placeholder=" "
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        style={{
          height: "52px",
          padding: "20px 14px 6px",
          borderRadius: "10px",
          border: focused
            ? "2px solid var(--color-primary)"
            : "1.5px solid var(--color-border)",
          backgroundColor: "var(--color-background)",
          fontSize: "15px",
          color: "var(--color-text-primary)",
          width: "100%",
          fontFamily: "inherit",
          outline: "none",
          transition: "border-color 0.2s ease",
          ...style,
        }}
        aria-label={label}
        {...props}
      />
      <label
        htmlFor={id}
        style={{
          position: "absolute",
          left: "15px",
          top: isActive ? "8px" : "50%",
          transform: isActive ? "none" : "translateY(-50%)",
          fontSize: isActive ? "11px" : "15px",
          fontWeight: isActive ? 500 : 400,
          color: focused
            ? "var(--color-primary)"
            : "var(--color-text-tertiary)",
          pointerEvents: "none",
          transition: "all 0.2s ease",
          lineHeight: 1,
        }}
      >
        {label}
      </label>
    </div>
  );
}
