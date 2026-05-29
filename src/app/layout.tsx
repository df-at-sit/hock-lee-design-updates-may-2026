import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hock Lee Bus Riots — Design SOT",
  description: "Design source-of-truth for the Hock Lee Bus Riots pixel scenario",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
