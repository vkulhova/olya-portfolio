import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "lolikar — illustration",
  description: "Portfolio of Olya Lolikar — illustrator. Cozy, whimsical, folk-inspired art.",
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "lolikar — illustration",
    description: "Portfolio of Olya Lolikar — illustrator",
    url: "https://lolikar.vercel.app",
    siteName: "lolikar",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className="min-h-screen flex flex-col">
        <LangProvider>
          {children}
          <ScrollToTop />
        </LangProvider>
      </body>
    </html>
  );
}
