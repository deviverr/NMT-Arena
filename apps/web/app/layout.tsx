import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const nunito = Nunito({ subsets: ["cyrillic", "latin"], variable: "--font-nunito", display: "swap" });

export const metadata: Metadata = {
  title: "NMT Arena",
  description: "Гейміфікована підготовка до НМТ із XP, рангами, бейджами та лідербордом.",
  metadataBase: new URL("https://nmt-arena.fun"),
  openGraph: {
    title: "NMT Arena",
    description: "Готуйся до НМТ з кайфом.",
    url: "https://nmt-arena.fun",
    siteName: "NMT Arena"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className={`${nunito.variable} font-sans text-slate-950 antialiased dark:text-arena-50`}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
