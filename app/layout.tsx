import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Caveat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair", // keep same CSS var name so all components work
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jakarta", // keep same CSS var name
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy 23rd Birthday, Burhanuddin",
  description:
    "A cinematic birthday tribute for someone who makes every room brighter — here's to 23 incredible years.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Happy 23rd Birthday, Burhanuddin",
    description: "A cinematic birthday tribute for someone who makes every room brighter.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy 23rd Birthday, Burhanuddin",
    description: "A cinematic birthday tribute for someone who makes every room brighter.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${caveat.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
