import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ModeToggle } from "@/components/mode-toggle";
import { Providers } from "./provider";
import { Header } from "./header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevFinder",
  description:
    "An application to help pair promrammers with random people to work on projects together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
