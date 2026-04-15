'use client';

import { useEffect } from 'react';
import { initializeGA } from '@/lib/analytics';

/**
 * Google Analytics initialization component
 * This runs once on app startup to inject the GA4 script
 * Safe for client-side rendering in Next.js
 */
export default function GoogleAnalytics() {
  useEffect(() => {
    // Initialize GA4 on component mount
    initializeGA();
  }, []);

  return null; // This component doesn't render anything
}
