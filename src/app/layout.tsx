import type { Metadata } from "next";
import { Geist_Mono,Roboto_Condensed} from "next/font/google";
import "./globals.css";

const geistSans = Roboto_Condensed({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "my-ecom-site",
  description: "e-commerce landing page designed to display products and manage a shopping cart.",
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
        {children}
      </body>
    </html>
  );
}
