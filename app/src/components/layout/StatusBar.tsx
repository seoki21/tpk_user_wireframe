"use client";

import { useEffect, useState } from "react";

export default function StatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, "0");
      const m = now.getMinutes().toString().padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    update();
    const timer = setInterval(update, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="flex items-center justify-between px-4"
      style={{
        height: "28px",
        backgroundColor: "var(--color-background)",
        borderBottom: "1px solid var(--color-divider)",
      }}
      aria-hidden="true"
    >
      <span
        className="text-xs font-semibold"
        style={{ color: "var(--color-text-primary)", fontSize: "12px" }}
      >
        {time}
      </span>
      <div className="flex items-center gap-1">
        {/* Signal bars */}
        <div className="flex items-end gap-px" aria-hidden="true">
          {[3, 5, 7, 9].map((h, i) => (
            <div
              key={i}
              style={{
                width: "3px",
                height: `${h}px`,
                backgroundColor:
                  i < 3
                    ? "var(--color-text-primary)"
                    : "var(--color-border)",
                borderRadius: "1px",
              }}
            />
          ))}
        </div>
        {/* WiFi */}
        <span style={{ fontSize: "10px", color: "var(--color-text-primary)" }}>
          ▲
        </span>
        {/* Battery */}
        <div
          className="flex items-center"
          style={{ gap: "1px" }}
          aria-label="배터리"
        >
          <div
            style={{
              width: "18px",
              height: "9px",
              border: "1px solid var(--color-text-primary)",
              borderRadius: "2px",
              padding: "1px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "70%",
                height: "100%",
                backgroundColor: "var(--color-text-primary)",
                borderRadius: "1px",
              }}
            />
          </div>
          <div
            style={{
              width: "2px",
              height: "4px",
              backgroundColor: "var(--color-text-primary)",
              borderRadius: "0 1px 1px 0",
            }}
          />
        </div>
      </div>
    </div>
  );
}
