import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ContractGuard - Understand Your Employment Contract",
  description: "We simplify employment contracts, highlight red flags, and connect you to trusted legal support. Educational guidance for workers.",
  keywords: ["employment contract", "contract review", "labor rights", "legal education", "red flags", "worker protection"],
  authors: [{ name: "ContractGuard" }],
  openGraph: {
    title: "ContractGuard - Understand Your Employment Contract",
    description: "We simplify employment contracts, highlight red flags, and connect you to trusted legal support.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

