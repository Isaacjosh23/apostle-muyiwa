import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { IntroProvider } from "@/context/IntroContext";
import IntroGate from "@/components/intro/IntroGate";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "In Honor of Daddy",
  description:
    "A tribute to our spiritual father — a life of mentorship and legacy.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <IntroProvider>
          <IntroGate />
          {children}
        </IntroProvider>
      </body>
    </html>
  );
}
