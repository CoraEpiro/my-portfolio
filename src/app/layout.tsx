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
  description: "B.Sc. Data Science and B.Sc. Mathematics, based near Munich. Probabilistic and statistical modelling in Python, five-time hackathon winner, working toward catastrophe and climate risk modelling.",
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
    description: "B.Sc. Data Science and B.Sc. Mathematics, based near Munich. Probabilistic and statistical modelling in Python, five-time hackathon winner, working toward catastrophe and climate risk modelling.",
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
    description: "B.Sc. Data Science and B.Sc. Mathematics, based near Munich. Probabilistic and statistical modelling in Python, five-time hackathon winner, working toward catastrophe and climate risk modelling.",
    images: ["/assets/og-banner.jpg"],
  },
  category: "Technology",
  // Set GOOGLE_SITE_VERIFICATION in the Vercel project env vars to verify
  // ownership in Google Search Console — no code change needed.
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
