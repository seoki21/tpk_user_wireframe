"use client";

import { useState, useEffect } from "react";
import LottieAnimation from "@/components/ui/LottieAnimation";
import celebrationData from "@/assets/success-check.json";

export default function ResultCelebration() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.8)",
        animation: "result-celebration 2.2s ease-in forwards",
        pointerEvents: "none",
      }}
    >
      <style>{`
        @keyframes result-celebration {
          0% { opacity: 0; }
          10% { opacity: 1; }
          75% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
      <LottieAnimation
        animationData={celebrationData}
        loop={false}
        autoplay={true}
        width={180}
        height={180}
      />
    </div>
  );
}
