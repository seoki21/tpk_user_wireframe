"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Button from "@/components/ui/Button";
import FloatingInput from "@/components/ui/FloatingInput";

type Tab = "login" | "signup";

// useSearchParams()는 반드시 Suspense 경계 내부 컴포넌트에서만 사용해야 함
function AuthPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "signup" ? "signup" : "login";

  const [tab, setTab] = useState<Tab>(initialTab);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
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
        {/* 로고 */}
        <div style={{ paddingTop: "48px", paddingBottom: "32px", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 800,
              color: "var(--color-primary-dark)",
              margin: "0 0 4px 0",
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

        {/* 탭 전환 */}
        <div
          style={{
            display: "flex",
            backgroundColor: "var(--color-background)",
            borderRadius: "12px",
            padding: "3px",
            marginBottom: "28px",
            position: "relative",
          }}
        >
          {/* 슬라이딩 인디케이터 */}
          <div
            style={{
              position: "absolute",
              top: "3px",
              left: tab === "login" ? "3px" : "calc(50% + 0px)",
              width: "calc(50% - 3px)",
              height: "calc(100% - 6px)",
              backgroundColor: "var(--color-surface)",
              borderRadius: "10px",
              transition: "left 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
          />
          {(["login", "signup"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1,
                height: "40px",
                border: "none",
                background: "none",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: tab === t ? 700 : 500,
                color: tab === t ? "var(--color-text-primary)" : "var(--color-text-tertiary)",
                cursor: "pointer",
                position: "relative",
                zIndex: 1,
                fontFamily: "inherit",
                transition: "color 0.2s ease, font-weight 0.2s ease",
              }}
              aria-label={t === "login" ? "로그인 탭" : "회원가입 탭"}
            >
              {t === "login" ? "로그인" : "회원가입"}
            </button>
          ))}
        </div>

        {/* 폼 영역 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "16px",
            animation: "fadeIn 0.2s ease",
          }}
          key={tab}
        >
          {tab === "signup" && (
            <FloatingInput
              label="이름"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <FloatingInput
            label="이메일"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FloatingInput
            label={tab === "signup" ? "비밀번호 (8자 이상)" : "비밀번호"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* 비밀번호 찾기 (로그인만) */}
        {tab === "login" && (
          <div style={{ textAlign: "right", marginBottom: "20px" }}>
            <button
              style={{
                background: "none",
                border: "none",
                fontSize: "12px",
                color: "var(--color-text-secondary)",
                cursor: "pointer",
                padding: "4px 0",
                fontFamily: "inherit",
              }}
              aria-label="비밀번호 찾기"
            >
              비밀번호 찾기
            </button>
          </div>
        )}

        {/* 제출 버튼 */}
        <div style={{ marginBottom: tab === "signup" ? "12px" : "24px", marginTop: tab === "signup" ? "8px" : "0" }}>
          <Button
            variant="primary"
            fullWidth
            size="lg"
            onClick={handleSubmit}
            style={{
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: 700,
              transition: "opacity 0.15s ease, background-color 0.15s ease, transform 0.1s ease",
            }}
            aria-label={tab === "login" ? "로그인" : "회원가입"}
          >
            {tab === "login" ? "로그인" : "회원가입"}
          </Button>
        </div>

        {/* 법적 고지 (회원가입만) */}
        {tab === "signup" && (
          <p
            style={{
              fontSize: "11px",
              color: "var(--color-text-tertiary)",
              textAlign: "center",
              margin: "0 0 20px 0",
              lineHeight: 1.6,
            }}
          >
            가입 시 이용약관 및 개인정보처리방침에
            <br />
            동의하는 것으로 간주합니다.
          </p>
        )}

        {/* 구분선 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
          aria-hidden="true"
        >
          <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-border)" }} />
          <span
            style={{
              fontSize: "12px",
              color: "var(--color-text-tertiary)",
              whiteSpace: "nowrap",
            }}
          >
            또는
          </span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-border)" }} />
        </div>

        {/* 소셜 로그인 (아이콘 원형) */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "24px",
            marginBottom: "24px",
          }}
        >
          {/* Google */}
          <button
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0",
            }}
            aria-label="Google로 계속하기"
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: "1.5px solid var(--color-border)",
                backgroundColor: "var(--color-background)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.15s ease, background-color 0.15s ease",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            </div>
            <span
              style={{
                fontSize: "11px",
                color: "var(--color-text-tertiary)",
                fontFamily: "inherit",
              }}
            >
              Google
            </span>
          </button>

          {/* Apple */}
          <button
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0",
            }}
            aria-label="Apple로 계속하기"
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: "1.5px solid var(--color-border)",
                backgroundColor: "var(--color-background)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.15s ease, background-color 0.15s ease",
              }}
            >
              <svg width="18" height="20" viewBox="0 0 17 20" fill="none" aria-hidden="true">
                <path
                  d="M13.34 10.05c-.02-2.26 1.84-3.34 1.93-3.4-1.05-1.54-2.69-1.75-3.27-1.77-1.39-.14-2.72.82-3.43.82-.71 0-1.81-.8-2.97-.78-1.53.02-2.94.89-3.73 2.26-1.59 2.76-.41 6.85 1.14 9.09.76 1.1 1.66 2.33 2.85 2.29 1.14-.05 1.57-.74 2.95-.74 1.38 0 1.77.74 2.97.71 1.23-.02 2.01-1.12 2.76-2.22.87-1.28 1.23-2.51 1.25-2.58-.03-.01-2.4-.92-2.42-3.66zM11.07 3.26c.63-.76 1.05-1.83.94-2.89-.91.04-2.01.61-2.66 1.37-.59.68-1.1 1.76-.96 2.8 1.01.08 2.04-.52 2.68-1.28z"
                  fill="#1A1A2E"
                />
              </svg>
            </div>
            <span
              style={{
                fontSize: "11px",
                color: "var(--color-text-tertiary)",
                fontFamily: "inherit",
              }}
            >
              Apple
            </span>
          </button>
        </div>

        {/* 스페이서 */}
        <div style={{ flex: 1 }} />

        {/* 법적 고지 (로그인) */}
        {tab === "login" && (
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
        )}
      </div>

      {/* fade-in 애니메이션 */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </MobileFrame>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <AuthPageContent />
    </Suspense>
  );
}
