import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jakarta",
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
  description: "A cinematic birthday tribute for someone who makes every room brighter — here's to 23 incredible years.",
  robots: {
    index: false,
    follow: false,
  },
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} ${caveat.variable}`}>
      <body className="font-body">
        {children}
      </body>
    </html>
  );
}
