import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kittu Anime Studio",
  description: "Plan, design, and produce your original anime worlds.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
