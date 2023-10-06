import "./globals.scss";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

export const jetbrains = JetBrains_Mono({
  weight: ["500"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Ray.so Copy",
  description: "Share beautiful code snippets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrains.variable}>
      <body>
        <div className="app">
          <Theme appearance="dark" scaling="100%">
            {children}
          </Theme>
        </div>
      </body>
    </html>
  );
}
