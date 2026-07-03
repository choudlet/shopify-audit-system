import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Casa Crobu Market Club",
  description: "Join the Casa Crobu Market Club for market updates and MARKET5 for $5 off.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
