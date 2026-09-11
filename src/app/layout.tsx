import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import { PortfolioShell } from "@/components/portfolio-shell";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ricky — Full-stack Developer",
  description:
    "Portfolio of Ricky, an Information Systems student and full-stack developer based in Bekasi and Bandung, Indonesia.",
  authors: [{ name: "Ricky", url: "https://github.com/Radian-File" }],
  creator: "Ricky",
  openGraph: {
    type: "website",
    title: "Ricky — Full-stack Developer",
    description: "Full-stack work across web, mobile, and AI-powered applications.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        <PortfolioShell>{children}</PortfolioShell>
      </body>
    </html>
  );
}
