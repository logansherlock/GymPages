import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css"; // Import Tailwind globally
import { Navigation } from "./components/navigation";
import Link from "next/link";
import Image from "next/image";

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
  icons: {
    icon: "/gympages-icons/GymPages_Icon.png", // Update the path to your icon
    apple: "/gympages-icons/GymPages_Icon.png", // Optional: for Apple devices
  },
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
          <Link href="/">

          <Image
          src="/gympages-icons/GymPages_Logo.tiff"
          alt="GymPages Logo"
          width={400}
          height={100}
          className="rounded-full cursor-pointer"
          />
          
          </Link>

          {/* <Link
            href="/"
            className="text-7xl font-semibold align-middle"
            style={{ WebkitTextStroke: '2px black' }}
          >
            GymPages
          </Link> */}
          
          <Navigation />
        </header>
        <footer></footer>
        {children}
      </body>
    </html>
  );
}