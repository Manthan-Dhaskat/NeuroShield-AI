import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import AppProvider from "@/components/providers/AppProvider";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NeuroShield",
  description: "AI-Powered Cyber Defense",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}