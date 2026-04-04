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

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSignup = () => {
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
        {/* 제목 영역 */}
        <div
          style={{
            paddingTop: "48px",
            paddingBottom: "32px",
          }}
        >
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              margin: "0 0 8px 0",
              letterSpacing: "-0.3px",
            }}
          >
            계정 만들기
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "var(--color-text-secondary)",
              margin: 0,
            }}
          >
            TOPIK 학습을 시작해요.
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
            aria-label="Google로 회원가입"
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
            <span>Google로 가입하기</span>
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
            aria-label="Apple로 회원가입"
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
            <span>Apple로 가입하기</span>
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

        {/* 입력 필드 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
            style={{
              ...INPUT_STYLE,
              outline: focusedField === "name" ? "2px solid var(--color-primary)" : "none",
              outlineOffset: "-1px",
            }}
            aria-label="이름 입력"
          />
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            style={{
              ...INPUT_STYLE,
              outline: focusedField === "email" ? "2px solid var(--color-primary)" : "none",
              outlineOffset: "-1px",
            }}
            aria-label="이메일 입력"
          />
          <input
            type="password"
            placeholder="비밀번호 (8자 이상)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            style={{
              ...INPUT_STYLE,
              outline: focusedField === "password" ? "2px solid var(--color-primary)" : "none",
              outlineOffset: "-1px",
            }}
            aria-label="비밀번호 입력 (8자 이상)"
          />
        </div>

        {/* 회원가입 버튼 */}
        <div style={{ marginBottom: "16px" }}>
          <Button
            variant="primary"
            fullWidth
            size="lg"
            onClick={handleSignup}
            aria-label="회원가입"
          >
            회원가입
          </Button>
        </div>

        {/* 법적 고지 */}
        <p
          style={{
            fontSize: "11px",
            color: "var(--color-text-tertiary)",
            textAlign: "center",
            margin: "0 0 20px 0",
            lineHeight: 1.6,
          }}
        >
          가입 시 이용약관 및
          <br />
          개인정보처리방침에 동의하는 것으로 간주합니다.
        </p>

        {/* 구분선 */}
        <div
          style={{ height: "1px", backgroundColor: "var(--color-divider)", marginBottom: "20px" }}
          aria-hidden="true"
        />

        {/* 로그인 링크 */}
        <p
          style={{
            fontSize: "14px",
            color: "var(--color-text-secondary)",
            textAlign: "center",
            margin: "0 0 auto 0",
          }}
        >
          이미 계정이 있으신가요?{" "}
          <Link
            href="/login"
            style={{
              color: "var(--color-primary)",
              fontWeight: 700,
              textDecoration: "none",
            }}
            aria-label="로그인 페이지로 이동"
          >
            로그인
          </Link>
        </p>

        {/* 스페이서 */}
        <div style={{ flex: 1, minHeight: "32px" }} />
      </div>
    </MobileFrame>
  );
}
