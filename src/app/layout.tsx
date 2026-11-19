import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import GoogleAnalytics from '@/components/GoogleAnalytics';
import RouteChangeListener from '@/components/RouteChangeListener';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aliguliyev.com"),
  title: {
    default: "Ali Guliyev - Data Science & Risk Modelling",
    template: "%s | Ali Guliyev",
  },
  description: "M.Sc. Mathematics in Data Science student at TUM, B.Sc. Data Science graduate with a 1.9 average, and Student Assistant in Secure Cloud Computing at LRZ.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Ali Guliyev",
    "Data Science",
    "Risk Analytics",
    "Catastrophe Modelling",
    "NatCat",
    "Probabilistic Modelling",
    "Statistics",
    "Machine Learning",
    "Python Developer",
    "Hackathon Winner",
    "Munich",
    "Ingolstadt",
    "Germany",
    "Catholic University of Eichstätt-Ingolstadt",
    "Technical University of Munich",
    "Leibniz Supercomputing Centre",
    "Portfolio"
  ],
  authors: [{ name: "Ali Guliyev" }],
  creator: "Ali Guliyev",
  publisher: "Ali Guliyev",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.aliguliyev.com",
    title: "Ali Guliyev - Data Science & Risk Modelling",
    description: "M.Sc. Mathematics in Data Science student at TUM, B.Sc. Data Science graduate with a 1.9 average, and Student Assistant in Secure Cloud Computing at LRZ.",
    siteName: "Ali Guliyev Portfolio",
    images: [
      {
        url: "/assets/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Ali Guliyev - Data Science & Machine Learning",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Guliyev - Data Science & Risk Modelling",
    description: "M.Sc. Mathematics in Data Science student at TUM, B.Sc. Data Science graduate with a 1.9 average, and Student Assistant in Secure Cloud Computing at LRZ.",
    images: ["/assets/og-banner.jpg"],
  },
  category: "Technology",
  // Set GOOGLE_SITE_VERIFICATION in the Vercel project env vars to verify
  // ownership in Google Search Console. No code change needed.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="bg-gray-900 text-white min-h-screen">
        {/* Initialize GA4 analytics */}
        <GoogleAnalytics />
        {/* Track route changes automatically */}
        <RouteChangeListener />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
