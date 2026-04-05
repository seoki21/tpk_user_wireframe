"use client";

import { useState, useEffect, useCallback } from "react";
import TabBar from "./TabBar";
import StatusBar from "./StatusBar";
import Sidebar from "./Sidebar";

type ViewMode = "mobile" | "desktop";

const STORAGE_KEY = "topik-view-mode";

interface MobileFrameProps {
  children: React.ReactNode;
  showTabBar?: boolean;
  showStatusBar?: boolean;
}

function ViewToggle({
  mode,
  onChange,
}: {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}) {
  return (
    <div
      style={{
        height: "28px",
        backgroundColor: "#2D2D2D",
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
      }}
    >
      {(["mobile", "desktop"] as ViewMode[]).map((m) => {
        const active = mode === m;
        return (
          <button
            key={m}
            onClick={() => onChange(m)}
            aria-pressed={active}
            style={{
              height: "100%",
              padding: "0 8px",
              border: "none",
              background: "none",
              color: active ? "#FFFFFF" : "rgba(255,255,255,0.4)",
              fontSize: "11px",
              fontWeight: active ? 600 : 400,
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              transition: "color 0.15s ease",
              borderBottom: active ? "1.5px solid #FFFFFF" : "1.5px solid transparent",
            }}
          >
            {m === "mobile" ? "Mobile" : "Desktop"}
          </button>
        );
      })}
    </div>
  );
}

export default function MobileFrame({
  children,
  showTabBar = true,
  showStatusBar = true,
}: MobileFrameProps) {
  const [mode, setMode] = useState<ViewMode>("mobile");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ViewMode | null;
    if (saved === "desktop" || saved === "mobile") {
      setMode(saved);
    }
    setMounted(true);
  }, []);

  const handleChange = useCallback((next: ViewMode) => {
    setMode(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  if (!mounted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <span style={{ color: "var(--color-text-secondary)" }}>로딩 중...</span>
      </div>
    );
  }

  if (mode === "desktop") {
    return (
      <>
        <ViewToggle mode={mode} onChange={handleChange} />
        <div
          className="flex"
          style={{
            backgroundColor: "var(--color-background)",
            minHeight: "calc(100vh - 28px)",
            maxWidth: "1024px",
            margin: "0 auto",
          }}
        >
          {showTabBar && <Sidebar />}
          <div
            className="flex-1 flex justify-center"
            style={{ minHeight: "calc(100vh - 28px)" }}
          >
            <main
              className="w-full overflow-y-auto"
              style={{
                maxWidth: "760px",
                minHeight: "calc(100vh - 28px)",
              }}
            >
              {children}
            </main>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ViewToggle mode={mode} onChange={handleChange} />
      <div
        className="flex flex-col items-center"
        style={{
          backgroundColor: "#E5E7EB",
          minHeight: "calc(100vh - 28px)",
        }}
      >
        <div
          className="relative flex flex-col w-full overflow-hidden shadow-2xl"
          style={{
            maxWidth: "375px",
            flex: 1,
            backgroundColor: "var(--color-background)",
          }}
        >
          {showStatusBar && <StatusBar />}
          <main className="flex-1 overflow-y-auto">{children}</main>
          {showTabBar && <TabBar />}
        </div>
      </div>
    </>
  );
}
