import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import GoogleAnalytics from '@/components/GoogleAnalytics';
import RouteChangeListener from '@/components/RouteChangeListener';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aliguliyev.com"),
  title: {
    default: "Ali Guliyev - Data Science & Machine Learning Portfolio",
    template: "%s | Ali Guliyev",
  },
  description: "Data Science professional with 2+ years experience in Python, Machine Learning, and Analytics. Hackathon winner specializing in predictive modeling, data visualization, and AI solutions.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Ali Guliyev",
    "Data Science",
    "Machine Learning",
    "Python Developer",
    "Data Analyst",
    "Hackathon Winner",
    "AI Developer",
    "Power BI",
    "Predictive Modeling",
    "Data Visualization",
    "Germany",
    "Ingolstadt",
    "Catholic University",
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
    title: "Ali Guliyev - Data Science & Machine Learning Portfolio",
    description: "Data Science professional with 2+ years experience in Python, Machine Learning, and Analytics. Hackathon winner specializing in predictive modeling and AI solutions.",
    siteName: "Ali Guliyev Portfolio",
    images: [
      {
        url: "/assets/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Ali Guliyev - Data Science Professional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Guliyev - Data Science & Machine Learning Portfolio",
    description: "Data Science professional with 2+ years experience in Python, Machine Learning, and Analytics. Hackathon winner specializing in predictive modeling and AI solutions.",
    images: ["/assets/profile.jpg"],
  },
  category: "Technology",
};
// To verify ownership in Google Search Console, add your code:
// verification: { google: "<your-search-console-token>" },

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
