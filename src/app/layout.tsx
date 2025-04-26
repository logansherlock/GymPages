import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css"; // Import Tailwind globally
import { Navigation } from "./components/navigation";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GymPages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="font-dejaVuMono text-right p-1 flex items-center justify-between border m-2">
          <Link href="/" className="text-7xl font-semibold align-middle" style={{ WebkitTextStroke: '2px black' }}>
            GymPages
          </Link>
          <Navigation />
        </header>
        <footer></footer>
        {children}
      </body>
    </html>
  );
}
