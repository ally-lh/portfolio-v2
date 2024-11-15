import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import BackToTop from "./_components/BackToTop";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Allison's Portfolio",
  description: "Showcasing all of Allison's works",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="black"
      className="overflow-x-hidden scroll-smooth"
      style={{ scrollBehavior: "smooth" }}
    >
      <body className="">
        <Navbar />
        {children}
        <BackToTop />
        <Footer />
      </body>
    </html>
  );
}
