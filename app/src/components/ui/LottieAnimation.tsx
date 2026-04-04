"use client";

import { type CSSProperties, type ReactNode, useRef, useEffect } from "react";

interface LottieAnimationProps {
  animationData: unknown;
  loop?: boolean;
  autoplay?: boolean;
  width?: number | string;
  height?: number | string;
  onComplete?: () => void;
  fallback?: ReactNode;
  style?: CSSProperties;
}

export default function LottieAnimation({
  animationData,
  loop = false,
  autoplay = true,
  width,
  height,
  onComplete,
  fallback,
  style,
}: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const animRef = useRef<any>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !animationData) return;

    let destroyed = false;

    (async () => {
      const lottieModule = await import(
        "lottie-web/build/player/lottie_light.js"
      );
      const lottie = lottieModule.default ?? lottieModule;

      if (destroyed || !containerRef.current) return;

      const anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop,
        autoplay,
        animationData,
      });

      animRef.current = anim;

      if (onComplete) {
        anim.addEventListener("complete", onComplete);
      }
    })();

    return () => {
      destroyed = true;
      if (animRef.current) {
        animRef.current.destroy();
        animRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationData]);

  if (!animationData) {
    return (
      <div
        aria-hidden="true"
        style={{ width, height, ...style }}
      >
        {fallback}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{ width, height, ...style }}
    />
  );
}
