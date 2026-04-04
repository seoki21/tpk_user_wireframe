"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Button from "@/components/ui/Button";
import LottieAnimation from "@/components/ui/LottieAnimation";
import bookAnimation from "@/assets/book-open.json";
import globeAnimation from "@/assets/globe-spin.json";
import aiAnimation from "@/assets/ai-bot.json";

interface SlideData {
  icon: string;
  iconBg: string;
  animationData: unknown;
  title: string;
  desc1: string;
  desc2: string;
}

const SLIDES: SlideData[] = [
  {
    icon: "📚",
    iconBg: "var(--color-primary)",
    animationData: bookAnimation,
    title: "TOPIK 합격 문제은행",
    desc1: "기출문제 · 연습문제 · 모의고사를",
    desc2: "한 앱에서 체계적으로 학습해요.",
  },
  {
    icon: "🌏",
    iconBg: "var(--color-success)",
    animationData: globeAnimation,
    title: "10개 언어 지원",
    desc1: "모국어로 문제 해설과 AI 피드백을",
    desc2: "바로 받을 수 있어요.",
  },
  {
    icon: "🤖",
    iconBg: "var(--color-warning-dark)",
    animationData: aiAnimation,
    title: "AI 즉시 피드백",
    desc1: "선택 즉시 정답 여부와 이유를",
    desc2: "모국어로 설명해드려요.",
  },
];

export default function IntroPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      router.push("/onboarding/language");
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    router.push("/onboarding/language");
  };

  const slide = SLIDES[currentSlide];

  return (
    <MobileFrame showTabBar={false}>
      <div
        style={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--color-surface)",
          position: "relative",
        }}
      >
        {/* 건너뛰기 버튼 */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "12px 16px 0",
          }}
        >
          <button
            onClick={handleSkip}
            style={{
              background: "none",
              border: "none",
              fontSize: "14px",
              color: "var(--color-text-secondary)",
              cursor: "pointer",
              padding: "8px",
              minHeight: "44px",
              minWidth: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
            aria-label="온보딩 건너뛰기"
          >
            건너뛰기
          </button>
        </div>

        {/* 상단 일러스트 영역 */}
        <div
          style={{
            backgroundColor: "var(--color-primary-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "220px",
            flexShrink: 0,
          }}
        >
          <div
            key={currentSlide}
            style={{
              width: "88px",
              height: "88px",
              borderRadius: "24px",
              backgroundColor: slide.iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              overflow: "hidden",
            }}
            aria-hidden="true"
          >
            <LottieAnimation
              animationData={slide.animationData}
              loop={false}
              autoplay={true}
              width="88px"
              height="88px"
              fallback={<span>{slide.icon}</span>}
            />
          </div>
        </div>

        {/* 콘텐츠 영역 */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "0 24px",
          }}
        >
          {/* 페이지 인디케이터 */}
          <div
            style={{
              display: "flex",
              gap: "6px",
              justifyContent: "center",
              margin: "32px 0 28px",
            }}
            role="tablist"
            aria-label="슬라이드 인디케이터"
          >
            {SLIDES.map((_, i) => (
              <div
                key={i}
                role="tab"
                aria-selected={i === currentSlide}
                aria-label={`슬라이드 ${i + 1}`}
                style={{
                  height: "8px",
                  width: i === currentSlide ? "24px" : "8px",
                  borderRadius: "4px",
                  backgroundColor:
                    i === currentSlide
                      ? "var(--color-primary)"
                      : "var(--color-border)",
                  transition: "width 0.25s ease, background-color 0.25s ease",
                }}
              />
            ))}
          </div>

          {/* 텍스트 */}
          <div style={{ textAlign: "center", marginBottom: "auto" }}>
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                margin: "0 0 12px 0",
                letterSpacing: "-0.2px",
              }}
            >
              {slide.title}
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {slide.desc1}
              <br />
              {slide.desc2}
            </p>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div style={{ padding: "24px 24px 40px", display: "flex", gap: "8px", alignItems: "center" }}>
          {currentSlide > 0 && (
            <button
              onClick={handleBack}
              aria-label="이전 슬라이드로 이동"
              style={{
                background: "none",
                border: "1.5px solid var(--color-border)",
                borderRadius: "var(--radius-btn, 10px)",
                color: "var(--color-text-secondary)",
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "inherit",
                cursor: "pointer",
                padding: "0 16px",
                height: "48px",
                minWidth: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              ‹ 이전
            </button>
          )}
          <Button
            variant="primary"
            fullWidth
            size="lg"
            onClick={handleNext}
            aria-label={
              currentSlide < SLIDES.length - 1
                ? "다음 슬라이드로 이동"
                : "언어 선택으로 이동"
            }
          >
            {currentSlide < SLIDES.length - 1 ? "다음 ›" : "시작하기 ›"}
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
}
