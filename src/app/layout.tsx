import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "₱isoCoin Remit",
  description:
    "₱isoCoin Remit is a borderless payment and remittance landing page for Filipino merchants, crypto-savvy customers, and global transfers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
