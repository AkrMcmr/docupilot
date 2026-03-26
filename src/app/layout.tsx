import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DocuPilot - AI-Powered Documentation for Your Code",
  description:
    "Automatically generate and update README, API docs, and CHANGELOG on every push. Just install the GitHub App. Starting at $9/month.",
  keywords: ["documentation", "github", "ai", "readme", "changelog", "api docs", "developer tools", "automation"],
  openGraph: {
    title: "DocuPilot - Your docs, always up to date. Automatically.",
    description: "AI-powered documentation that updates on every push. README, CHANGELOG, and API docs — zero config. Starting at $9/month.",
    url: "https://docupilot-alpha.vercel.app",
    siteName: "DocuPilot",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DocuPilot - Your docs, always up to date.",
    description: "AI-powered documentation that updates on every push. Starting at $9/month.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
