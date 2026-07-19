import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lolikar — Portfolio",
  description: "Illustration portfolio of Olika Nikolska — warm, cozy, detailed illustrations",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
