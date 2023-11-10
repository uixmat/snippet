import "./globals.scss";
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import GitHub from "@/components/GitHub";
import Footer from "@/components/Footer";

export const jetbrains = JetBrains_Mono({
  weight: ["500"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Snippets | Share beautiful code snippets",
  description:
    "Use Snippets.fyi to share beautiful code snippets for social media.",
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
          <GitHub />
          <Toaster position="bottom-center" />
          <Theme
            appearance="dark"
            scaling="100%"
            accentColor="iris"
            radius="small"
          >
            {children}
            {/* <ThemePanel /> */}
          </Theme>
          <Footer />
        </div>
      </body>
    </html>
  );
}
