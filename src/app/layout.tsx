import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "Aetheris — Next-Gen AI & Edge Media Platform | By Palash Tripathi",
  description:
    "A frontier AI SaaS platform engineered by Palash Tripathi integrating Google Gemini LLMs, Next.js 14, React 18, Node.js Route Handlers, and Cloudinary Edge Media Processing.",
  keywords: [
    "Aetheris",
    "Palash Tripathi",
    "AI SaaS",
    "Next.js",
    "React",
    "Node.js",
    "Cloudinary",
    "Gemini LLM",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
