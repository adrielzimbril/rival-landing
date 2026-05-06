import type { Metadata } from "next";
import { Geist, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rival-landing.adrielzimbril.com"),
  title: "Rival – The future of digital banking",
  description:
    "Day 6/30 of the AI-Generated Landing Page Challenge. Rival is a conceptual digital banking platform that redefines your relationship with money through speed, security, and intelligence.",
  keywords: [
    "Rival",
    "digital banking",
    "fintech",
    "money management",
    "AI banking",
    "Next.js",
    "React",
    "Tailwind CSS",
    "bento design",
    "AI challenge",
  ],
  openGraph: {
    title: "Rival – The future of digital banking",
    description:
      "A conceptual digital banking platform landing page for Day 6/30 of the AI-Generated Landing Page Challenge.",
    url: "https://rival-landing.adrielzimbril.com",
    siteName: "Rival",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Rival landing page preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rival – The future of digital banking",
    description:
      "A conceptual digital banking platform landing page for Day 6/30 of the AI-Generated Landing Page Challenge.",
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${jakarta.variable} antialiased`} suppressHydrationWarning>
        <SmoothScroll>{children}</SmoothScroll>
        <script
          src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"
          async
        ></script>
      </body>
    </html>
  );
}
