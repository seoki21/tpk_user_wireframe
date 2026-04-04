"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Button from "@/components/ui/Button";

const INPUT_STYLE: React.CSSProperties = {
  height: "44px",
  padding: "0 14px",
  borderRadius: "8px",
  border: "1px solid var(--color-border)",
  backgroundColor: "var(--color-background)",
  fontSize: "14px",
  color: "var(--color-text-primary)",
  width: "100%",
  fontFamily: "inherit",
  outline: "none",
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = () => {
    router.push("/dashboard");
  };

  return (
    <MobileFrame showTabBar={false}>
      <div
        style={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--color-surface)",
          padding: "0 24px",
        }}
      >
        {/* 로고 영역 */}
        <div
          style={{
            paddingTop: "56px",
            paddingBottom: "40px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: 800,
              color: "var(--color-primary-dark)",
              margin: "0 0 8px 0",
              letterSpacing: "-0.5px",
            }}
          >
            TOPIK
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: "var(--color-text-secondary)",
              margin: 0,
            }}
          >
            한국어능력시험 문제은행
          </p>
        </div>

        {/* 소셜 버튼 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
          {/* Google */}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              height: "48px",
              padding: "0 16px",
              borderRadius: "10px",
              border: "1px solid var(--color-border)",
              backgroundColor: "var(--color-background)",
              cursor: "pointer",
              width: "100%",
              fontSize: "14px",
              color: "#363636",
              fontWeight: 500,
              fontFamily: "inherit",
            }}
            aria-label="Google로 로그인"
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 700,
                color: "#555555",
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              G
            </div>
            <span>Google로 계속하기</span>
          </button>

          {/* Apple */}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              height: "48px",
              padding: "0 16px",
              borderRadius: "10px",
              border: "1px solid var(--color-border)",
              backgroundColor: "var(--color-background)",
              cursor: "pointer",
              width: "100%",
              fontSize: "14px",
              color: "#363636",
              fontWeight: 500,
              fontFamily: "inherit",
            }}
            aria-label="Apple로 로그인"
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 700,
                color: "#555555",
                flexShrink: 0,
              }}
              aria-hidden="true"
            >

            </div>
            <span>Apple로 계속하기</span>
          </button>
        </div>

        {/* 이메일 구분선 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
          }}
          aria-hidden="true"
        >
          <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-border)" }} />
          <span style={{ fontSize: "12px", color: "var(--color-text-tertiary)", whiteSpace: "nowrap" }}>
            또는 이메일로
          </span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-border)" }} />
        </div>

        {/* 이메일 인풋 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "8px" }}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            style={{
              ...INPUT_STYLE,
              outline: emailFocused ? "2px solid var(--color-primary)" : "none",
              outlineOffset: "-1px",
            }}
            aria-label="이메일 입력"
          />

          {/* 비밀번호 인풋 + 비밀번호 찾기 */}
          <div style={{ position: "relative" }}>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              style={{
                ...INPUT_STYLE,
                outline: passwordFocused ? "2px solid var(--color-primary)" : "none",
                outlineOffset: "-1px",
                paddingRight: "90px",
              }}
              aria-label="비밀번호 입력"
            />
            <button
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                fontSize: "12px",
                color: "var(--color-text-secondary)",
                cursor: "pointer",
                padding: "4px",
                fontFamily: "inherit",
              }}
              aria-label="비밀번호 찾기"
            >
              비밀번호 찾기
            </button>
          </div>
        </div>

        {/* 로그인 버튼 */}
        <div style={{ marginBottom: "24px", marginTop: "8px" }}>
          <Button
            variant="primary"
            fullWidth
            size="lg"
            onClick={handleLogin}
            aria-label="로그인"
          >
            로그인
          </Button>
        </div>

        {/* 구분선 */}
        <div
          style={{ height: "1px", backgroundColor: "var(--color-divider)", marginBottom: "20px" }}
          aria-hidden="true"
        />

        {/* 회원가입 링크 */}
        <p
          style={{
            fontSize: "14px",
            color: "var(--color-text-secondary)",
            textAlign: "center",
            margin: "0 0 auto 0",
          }}
        >
          계정이 없으신가요?{" "}
          <Link
            href="/signup"
            style={{
              color: "var(--color-primary)",
              fontWeight: 700,
              textDecoration: "none",
            }}
            aria-label="회원가입 페이지로 이동"
          >
            회원가입
          </Link>
        </p>

        {/* 스페이서 */}
        <div style={{ flex: 1 }} />

        {/* 법적 고지 */}
        <p
          style={{
            fontSize: "11px",
            color: "var(--color-text-tertiary)",
            textAlign: "center",
            margin: "0 0 32px 0",
            lineHeight: 1.5,
          }}
        >
          로그인 시 이용약관 및 개인정보처리방침에 동의합니다.
        </p>
      </div>
    </MobileFrame>
  );
}
