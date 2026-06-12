import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Casa Crobu Market List",
  description: "Join the Casa Crobu market list for updates and a 5% off code.",
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
