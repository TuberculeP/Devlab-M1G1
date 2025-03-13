"use client";
import localFont from "next/font/local";
import "./globals.css";
import "../style/main.scss";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { usePathname } from "next/navigation";
import { Context } from "@/context/lightAndDarkMode";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased test`}
      >
        <Context>
          {pathname.startsWith("/admin") ? (
            <section>{children}</section>
          ) : (
            <>
              <Header />
                <section>{children}</section>
              <Footer />
            </>
          )}
        </Context>
      </body>
    </html>
  );
}
