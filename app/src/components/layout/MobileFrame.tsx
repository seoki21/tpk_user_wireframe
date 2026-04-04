import TabBar from "./TabBar";
import StatusBar from "./StatusBar";

interface MobileFrameProps {
  children: React.ReactNode;
  /** 탭바 표시 여부 (기본 true) */
  showTabBar?: boolean;
  /** StatusBar 표시 여부 (기본 true) */
  showStatusBar?: boolean;
}

/**
 * 모바일 프레임 래퍼.
 * - 데스크탑에서는 375px 너비로 중앙 정렬
 * - StatusBar + 스크롤 가능 콘텐츠 + TabBar 구조
 */
export default function MobileFrame({
  children,
  showTabBar = true,
  showStatusBar = true,
}: MobileFrameProps) {
  return (
    <div
      className="min-h-screen flex items-start justify-center"
      style={{ backgroundColor: "#E5E7EB" }}
    >
      <div
        className="relative flex flex-col w-full overflow-hidden shadow-2xl"
        style={{
          maxWidth: "375px",
          minHeight: "100svh",
          backgroundColor: "var(--color-background)",
        }}
      >
        {showStatusBar && <StatusBar />}

        <main
          className="flex-1 overflow-y-auto"
          style={{
            /* 하단 탭바 높이만큼 패딩 */
            paddingBottom: showTabBar ? "0px" : "0px",
          }}
        >
          {children}
        </main>

        {showTabBar && <TabBar />}
      </div>
    </div>
  );
}
