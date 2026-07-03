import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Casa Crobu Market Club",
  description: "Join the Casa Crobu Market Club for market updates and a $5 welcome offer.",
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
