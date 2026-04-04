import MobileFrame from "@/components/layout/MobileFrame";

export default function WrongNotesPage() {
  return (
    <MobileFrame>
      <div
        style={{
          backgroundColor: "var(--color-background)",
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            padding: "20px 16px 16px",
            backgroundColor: "var(--color-surface)",
            borderBottom: "1px solid var(--color-divider)",
          }}
        >
          <h1
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              margin: 0,
            }}
          >
            오답노트
          </h1>
        </div>

        {/* 빈 상태 — 정중앙 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px",
          }}
        >
          {/* 고민하는 사람 이미지 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/thinking-person.png"
            alt="고민 중인 사람 일러스트"
            width={140}
            height={140}
            style={{
              marginBottom: "24px",
              objectFit: "contain",
            }}
          />

          <h2
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              margin: "0 0 10px 0",
              textAlign: "center",
            }}
          >
            구현 준비 중이에요
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "var(--color-text-secondary)",
              textAlign: "center",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            오답노트, 학습관리, 마이페이지의
            <br />
            최적 구조를 고민하고 있어요.
          </p>
        </div>
      </div>
    </MobileFrame>
  );
}
