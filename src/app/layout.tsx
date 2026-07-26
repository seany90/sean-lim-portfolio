import type { Metadata } from "next";
import { Inter, Funnel_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const funnelDisplay = Funnel_Display({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Sean Lim | Portfolio",
  description: "I design meaningful digital experiences where design, technology and imagination work together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${funnelDisplay.variable} antialiased selection:bg-accent/30 selection:text-textMain`} suppressHydrationWarning>
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
