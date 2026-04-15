/**
 * Google Analytics 4 utility for Next.js
 * Provides a clean, reusable interface for GA4 tracking
 * Only initializes and tracks if NEXT_PUBLIC_GA_MEASUREMENT_ID is present
 */

// Declare gtag function type for TypeScript
declare global {
  interface Window {
    gtag?: (command: string, action: string, config?: Record<string, any>) => void;
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Initialize GA4 analytics
 * Called once on app startup via layout component
 * Safe to call multiple times - gtag handles deduplication
 */
export function initializeGA(): void {
  // Only initialize if measurement ID exists
  if (!GA_MEASUREMENT_ID) {
    console.debug('[Analytics] GA4 measurement ID not configured, skipping initialization');
    return;
  }

  // Check if gtag is already initialized
  if (typeof window !== 'undefined' && window.gtag) {
    console.debug('[Analytics] GA4 already initialized');
    return;
  }

  // Load the gtag script dynamically
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag function
  window.gtag = function () {
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
    // @ts-ignore
    window.dataLayer.push(arguments);
  };

  // Call gtag to initialize GA4
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // We'll handle page views manually for SPA
  });

  console.debug('[Analytics] GA4 initialized successfully');
}

/**
 * Track page view
 * Call this when routes change in your app
 * @param path - Current page path (e.g., '/projects')
 * @param title - Page title (e.g., 'Projects')
 */
export function trackPageView(path: string, title: string = ''): void {
  if (!GA_MEASUREMENT_ID || !window.gtag) {
    return;
  }

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
  });
}

/**
 * Track outbound link click
 * Use this for external links (GitHub, LinkedIn, etc.)
 * @param label - Link label (e.g., 'GitHub Profile')
 * @param url - Target URL
 */
export function trackOutboundClick(label: string, url: string): void {
  if (!GA_MEASUREMENT_ID || !window.gtag) {
    return;
  }

  window.gtag('event', 'click', {
    event_category: 'outbound',
    event_label: label,
    value: url,
  });
}

/**
 * Track project click/view
 * Use this when user clicks on a project card or modal
 * @param projectName - Name of the project (e.g., 'coRELation')
 */
export function trackProjectClick(projectName: string): void {
  if (!GA_MEASUREMENT_ID || !window.gtag) {
    return;
  }

  window.gtag('event', 'view_item', {
    event_category: 'projects',
    event_label: projectName,
    items: [{ item_name: projectName }],
  });
}

/**
 * Track CV/Resume download
 * Use this when user downloads your CV
 */
export function trackCVDownload(): void {
  if (!GA_MEASUREMENT_ID || !window.gtag) {
    return;
  }

  window.gtag('event', 'download', {
    event_category: 'cv',
    event_label: 'Resume Download',
    file_name: 'ali-guliyev-cv.pdf',
  });
}

/**
 * Track contact method click
 * Use this when user clicks on contact links (email, phone, form)
 * @param method - Contact method (e.g., 'email', 'linkedin', 'contact_form')
 */
export function trackContactClick(method: string): void {
  if (!GA_MEASUREMENT_ID || !window.gtag) {
    return;
  }

  window.gtag('event', 'generate_lead', {
    event_category: 'contact',
    event_label: method,
  });
}

/**
 * Track custom event
 * Use this for any custom tracking not covered by the above helpers
 * @param eventName - GA4 event name
 * @param params - Custom parameters
 */
export function trackCustomEvent(
  eventName: string,
  params?: Record<string, any>
): void {
  if (!GA_MEASUREMENT_ID || !window.gtag) {
    return;
  }

  window.gtag('event', eventName, params);
}
