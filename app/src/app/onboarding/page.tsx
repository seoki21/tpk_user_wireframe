"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import LottieAnimation from "@/components/ui/LottieAnimation";
import logoAnimation from "@/assets/sparkle.json";

export default function SplashPage() {
  const router = useRouter();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // 마운트 시 progress bar 애니메이션 트리거
    const raf = requestAnimationFrame(() => setStarted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleAnimationComplete = useCallback(() => {
    router.push("/onboarding/intro");
  }, [router]);

  // Lottie 로드 실패 fallback: 2초 후 자동 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/onboarding/intro");
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <MobileFrame showTabBar={false} showStatusBar={false}>
      <div
        style={{
          minHeight: "100svh",
          backgroundColor: "var(--color-primary-dark)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "32px 24px",
        }}
      >
        {/* 로고 영역 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "32px",
          }}
        >
          {/* 원형 로고 with Lottie */}
          <LottieAnimation
            animationData={logoAnimation}
            loop={false}
            autoplay={true}
            width="120px"
            height="120px"
            onComplete={handleAnimationComplete}
            fallback={
              <div
                style={{
                  width: "96px",
                  height: "96px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-primary)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 32px rgba(79, 91, 213, 0.4)",
                }}
                aria-label="TOPIK 로고"
              >
                <span
                  style={{
                    fontSize: "36px",
                    fontWeight: 800,
                    color: "#FFFFFF",
                    lineHeight: 1,
                  }}
                >
                  T
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "var(--color-primary-muted)",
                    letterSpacing: "1px",
                  }}
                >
                  OPIK
                </span>
              </div>
            }
          />

          {/* 타이틀 */}
          <div style={{ textAlign: "center" }}>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: 800,
                color: "#FFFFFF",
                margin: "0 0 8px 0",
                letterSpacing: "-0.3px",
              }}
            >
              TOPIK 문제은행
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "var(--color-primary-muted)",
                margin: 0,
              }}
            >
              한국어능력시험 학습 플랫폼
            </p>
          </div>
        </div>

        {/* 로딩 바 */}
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            left: "24px",
            right: "24px",
          }}
        >
          <div
            style={{
              height: "4px",
              backgroundColor: "rgba(255,255,255,0.12)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
            aria-label="로딩 중"
            role="progressbar"
            aria-valuenow={started ? 100 : 0}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              style={{
                height: "100%",
                width: started ? "100%" : "0%",
                backgroundColor: "var(--color-primary-muted)",
                borderRadius: "2px",
                transition: "width 2s linear",
              }}
            />
          </div>
        </div>

        {/* Powered by */}
        <p
          style={{
            position: "absolute",
            bottom: "40px",
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: "11px",
            color: "var(--color-primary)",
            margin: 0,
          }}
        >
          Powered by Claude AI
        </p>
      </div>
    </MobileFrame>
  );
}
