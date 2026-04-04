"use client";

import Link from "next/link";
import MobileFrame from "@/components/layout/MobileFrame";
import Button from "@/components/ui/Button";
import FlagIcon from "@/components/ui/FlagIcon";
import LottieAnimation from "@/components/ui/LottieAnimation";
import successAnimation from "@/assets/success-check.json";

export default function CompletePage() {
  return (
    <MobileFrame showTabBar={false}>
      <div
        style={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--color-surface)",
          padding: "40px 24px",
          gap: "0",
        }}
      >
        {/* Lottie 애니메이션 */}
        <LottieAnimation
          animationData={successAnimation}
          loop={false}
          autoplay={true}
          width="140px"
          height="140px"
          style={{ marginBottom: "16px" }}
          fallback={
            <div
              style={{
                width: "96px",
                height: "96px",
                borderRadius: "50%",
                backgroundColor: "var(--color-success-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "40px",
              }}
            >
              &#10003;
            </div>
          }
        />

        {/* 제목 */}
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 800,
            color: "var(--color-text-primary)",
            margin: "0 0 10px 0",
            letterSpacing: "-0.3px",
            textAlign: "center",
          }}
        >
          준비 완료!
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "var(--color-text-secondary)",
            margin: "0 0 32px 0",
            textAlign: "center",
          }}
        >
          맞춤 학습을 시작할게요.
        </p>

        {/* 설정 요약 카드 */}
        <div
          style={{
            width: "100%",
            backgroundColor: "var(--color-background)",
            borderRadius: "12px",
            border: "1px solid var(--color-border)",
            padding: "16px",
            marginBottom: "32px",
          }}
          aria-label="설정 요약"
        >
          <p
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "var(--color-text-tertiary)",
              margin: "0 0 12px 0",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            설정 요약
          </p>
          <div
            style={{
              borderTop: "1px solid var(--color-divider)",
              paddingTop: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>언어</span>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <FlagIcon code="vi" size={16} />
                Tiếng Việt
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>목표 레벨</span>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-primary)" }}>
                TOPIK I 2급
              </span>
            </div>
          </div>
        </div>

        {/* 대시보드 버튼 */}
        <div style={{ width: "100%", marginBottom: "16px" }}>
          <Link href="/dashboard" style={{ display: "block" }}>
            <Button
              variant="primary"
              fullWidth
              size="lg"
              aria-label="대시보드로 이동"
            >
              대시보드로 이동
            </Button>
          </Link>
        </div>

        {/* 로그인/회원가입 링크 */}
        <Link
          href="/login"
          style={{
            fontSize: "14px",
            color: "var(--color-text-secondary)",
            textDecoration: "underline",
            textDecorationColor: "var(--color-border)",
            textUnderlineOffset: "3px",
            padding: "8px",
            minHeight: "44px",
            display: "flex",
            alignItems: "center",
          }}
          aria-label="로그인 또는 회원가입 페이지로 이동"
        >
          로그인 / 회원가입
        </Link>
      </div>
    </MobileFrame>
  );
}
