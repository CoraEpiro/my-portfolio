'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

/**
 * Automatically tracks page views when route changes in Next.js App Router
 * Place this in your root layout for automatic route tracking
 */
export default function RouteChangeListener() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view when pathname changes
    const pageTitle = getPageTitle(pathname);
    trackPageView(pathname, pageTitle);
  }, [pathname]);

  return null; // This component doesn't render anything
}

/**
 * Helper function to get human-readable page titles
 * Customize this based on your routes
 */
function getPageTitle(pathname: string): string {
  const titleMap: Record<string, string> = {
    '/': 'Home',
    '/projects': 'Projects',
    '/certificates': 'Certificates',
    '/honors-awards': 'Honors',
    '/contact': 'Contact',
    '/cv': 'CV',
  };

  return titleMap[pathname] || 'Portfolio';
}
