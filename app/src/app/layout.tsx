import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TOPIK 문제은행",
  description: "다국어 기반 한국어능력시험(TOPIK) 학습 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full" suppressHydrationWarning>
      <body className="min-h-full" suppressHydrationWarning>{children}</body>
    </html>
  );
}
