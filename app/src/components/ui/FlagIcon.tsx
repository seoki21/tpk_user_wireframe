"use client";

import { useId } from "react";

interface FlagIconProps {
  /** ISO 639-1 language code: ko, en, zh, ja, vi, uz, mn, ph (fil), th */
  code: string;
  /** Rendered size in px — default 20 */
  size?: number;
}

function FlagShape({
  code,
  clipId,
}: {
  code: string;
  clipId: string;
}) {
  switch (code) {
    // 한국 — 흰 배경 + 태극 (빨강 반원 위 / 파랑 반원 아래)
    case "ko":
      return (
        <>
          <rect width="40" height="40" fill="#fff" />
          {/* 태극 원 — 파랑 전체 원 위에 빨강 반원 */}
          <circle cx="20" cy="20" r="8" fill="#003478" />
          <path d="M12 20 A8 8 0 0 1 28 20 Z" fill="#CD2E3A" />
          {/* 건(乾) 삼태극 — 단순화된 검정 괘 */}
          <line x1="5" y1="9" x2="11" y2="9" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="5" y1="12" x2="11" y2="12" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="5" y1="15" x2="11" y2="15" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
          {/* 이(離) */}
          <line x1="29" y1="9" x2="35" y2="9" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="29" y1="12" x2="32" y2="12" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="33" y1="12" x2="35" y2="12" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="29" y1="15" x2="35" y2="15" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
          {/* 감(坎) */}
          <line x1="5" y1="25" x2="11" y2="25" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="5" y1="28" x2="8" y2="28" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="9" y1="28" x2="11" y2="28" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="5" y1="31" x2="11" y2="31" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
          {/* 곤(坤) */}
          <line x1="29" y1="25" x2="32" y2="25" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="33" y1="25" x2="35" y2="25" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="29" y1="28" x2="32" y2="28" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="33" y1="28" x2="35" y2="28" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="29" y1="31" x2="32" y2="31" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="33" y1="31" x2="35" y2="31" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
        </>
      );

    // 미국 — 좌상단 파란 캔턴 + 흰 별 1개, 빨강/흰 줄무늬
    case "en":
      return (
        <>
          {/* 13개 줄무늬 (빨강 7, 흰 6) */}
          {Array.from({ length: 13 }).map((_, i) => (
            <rect
              key={i}
              x="0"
              y={(40 / 13) * i}
              width="40"
              height={40 / 13}
              fill={i % 2 === 0 ? "#B22234" : "#fff"}
            />
          ))}
          {/* 파란 캔턴 — 좌상단 */}
          <rect x="0" y="0" width="17" height="21" fill="#3C3B6E" />
          {/* 흰 별 (중앙) */}
          <polygon
            points="8.5,5 9.8,9.2 14,9.2 10.7,11.7 11.9,16 8.5,13.4 5.1,16 6.4,11.7 3,9.2 7.2,9.2"
            fill="#fff"
          />
        </>
      );

    // 중국 — 빨간 배경 + 큰 별 1개 + 작은 별 4개
    case "zh":
      return (
        <>
          <rect width="40" height="40" fill="#DE2910" />
          {/* 큰 별 */}
          <polygon
            points="10,7 11.8,13 17.5,13 12.8,16.7 14.6,22.7 10,19 5.4,22.7 7.2,16.7 2.5,13 8.2,13"
            fill="#FFDE00"
          />
          {/* 작은 별 4개 */}
          <polygon points="20,4 20.9,6.8 23.8,6.8 21.5,8.4 22.4,11.2 20,9.6 17.6,11.2 18.5,8.4 16.2,6.8 19.1,6.8" fill="#FFDE00" />
          <polygon points="24,9 24.9,11.8 27.8,11.8 25.5,13.4 26.4,16.2 24,14.6 21.6,16.2 22.5,13.4 20.2,11.8 23.1,11.8" fill="#FFDE00" />
          <polygon points="24,15 24.9,17.8 27.8,17.8 25.5,19.4 26.4,22.2 24,20.6 21.6,22.2 22.5,19.4 20.2,17.8 23.1,17.8" fill="#FFDE00" />
          <polygon points="20,20 20.9,22.8 23.8,22.8 21.5,24.4 22.4,27.2 20,25.6 17.6,27.2 18.5,24.4 16.2,22.8 19.1,22.8" fill="#FFDE00" />
        </>
      );

    // 일본 — 흰 배경 + 중앙 빨간 원
    case "ja":
      return (
        <>
          <rect width="40" height="40" fill="#fff" />
          <circle cx="20" cy="20" r="10" fill="#BC002D" />
        </>
      );

    // 베트남 — 빨간 배경 + 중앙 노란 별
    case "vi":
      return (
        <>
          <rect width="40" height="40" fill="#DA251D" />
          <polygon
            points="20,9 22.9,17.9 32.4,17.9 24.8,23.2 27.6,32.1 20,26.8 12.4,32.1 15.2,23.2 7.6,17.9 17.1,17.9"
            fill="#FFFF00"
          />
        </>
      );

    // 우즈베키스탄 — 하늘색/흰/초록 3등분 + 초승달+별
    case "uz":
      return (
        <>
          {/* 3등분 가로 줄 */}
          <rect x="0" y="0" width="40" height="13.3" fill="#1EB53A" />
          <rect x="0" y="13.3" width="40" height="13.4" fill="#fff" />
          <rect x="0" y="26.7" width="40" height="13.3" fill="#0099B5" />
          {/* 흰 줄 (구분선) */}
          <rect x="0" y="12" width="40" height="2" fill="#CE1126" opacity="0.7" />
          <rect x="0" y="26" width="40" height="2" fill="#CE1126" opacity="0.7" />
          {/* 초승달 (하늘색 영역 좌상단) */}
          <circle cx="10" cy="6.5" r="4" fill="#fff" />
          <circle cx="12" cy="6.5" r="3.4" fill="#1EB53A" />
          {/* 별 */}
          <polygon points="20,4 20.7,6.3 23.1,6.3 21.2,7.7 21.9,10 20,8.6 18.1,10 18.8,7.7 16.9,6.3 19.3,6.3" fill="#fff" />
        </>
      );

    // 몽골 — 빨강/파랑/빨강 세로 3등분 + 소욤보 심볼(단순화)
    case "mn":
      return (
        <>
          {/* 세로 3등분 */}
          <rect x="0" y="0" width="13.3" height="40" fill="#C4272F" />
          <rect x="13.3" y="0" width="13.4" height="40" fill="#015197" />
          <rect x="26.7" y="0" width="13.3" height="40" fill="#C4272F" />
          {/* 소욤보 단순화 — 불꽃(삼각형) + 원 + 직사각형 */}
          <polygon points="6.65,6 8.15,10 5.15,10" fill="#F9CF02" />
          <circle cx="6.65" cy="13" r="2" fill="#F9CF02" />
          <rect x="4.65" y="16" width="4" height="2" fill="#F9CF02" />
          <rect x="4.65" y="19" width="4" height="5" rx="0.5" fill="#F9CF02" />
          <rect x="4.65" y="25" width="4" height="2" fill="#F9CF02" />
          {/* 음양 — 위 파랑 반원, 아래 빨강 반원 */}
          <path d="M4.65 28 A2 2 0 0 1 8.65 28 A1 1 0 0 1 6.65 28 A1 1 0 0 0 4.65 28 Z" fill="#015197" />
          <path d="M4.65 28 A2 2 0 0 0 8.65 28 A1 1 0 0 0 6.65 28 A1 1 0 0 1 4.65 28 Z" fill="#C4272F" />
        </>
      );

    // 필리핀 — 흰 삼각형(좌) + 파랑(위)/빨강(아래) + 노란 태양
    case "ph":
    case "fil":
      return (
        <>
          {/* 파란 위 절반 */}
          <rect x="0" y="0" width="40" height="20" fill="#0038A8" />
          {/* 빨간 아래 절반 */}
          <rect x="0" y="20" width="40" height="20" fill="#CE1126" />
          {/* 흰 삼각형 (좌측) */}
          <polygon points="0,0 22,20 0,40" fill="#fff" />
          {/* 노란 태양 */}
          <circle cx="9" cy="20" r="5" fill="#FCD116" />
          {/* 태양 광선 8개 */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 8;
            const x1 = 9 + 5.5 * Math.cos(angle);
            const y1 = 20 + 5.5 * Math.sin(angle);
            const x2 = 9 + 7.5 * Math.cos(angle);
            const y2 = 20 + 7.5 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#FCD116"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            );
          })}
          {/* 태양 중심 흰 원 */}
          <circle cx="9" cy="20" r="2" fill="#fff" />
        </>
      );

    // 태국 — 빨강/흰/파랑/흰/빨강 가로 5등분
    case "th":
      return (
        <>
          <rect x="0" y="0" width="40" height="8" fill="#A51931" />
          <rect x="0" y="8" width="40" height="8" fill="#fff" />
          <rect x="0" y="16" width="40" height="8" fill="#2D2A4A" />
          <rect x="0" y="24" width="40" height="8" fill="#fff" />
          <rect x="0" y="32" width="40" height="8" fill="#A51931" />
        </>
      );

    // 폴백 — 회색 원
    default:
      return <rect width="40" height="40" fill="#D3D1C7" />;
  }
}

export default function FlagIcon({ code, size = 20 }: FlagIconProps) {
  const uid = useId();
  const clipId = `flag-clip-${uid}-${code}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      style={{ flexShrink: 0, display: "inline-block" }}
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="20" cy="20" r="20" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <FlagShape code={code} clipId={clipId} />
      </g>
      {/* 미세 테두리 */}
      <circle
        cx="20"
        cy="20"
        r="19.5"
        fill="none"
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="1"
      />
    </svg>
  );
}
