# GA4 Analytics Setup Guide

## Overview

This implementation adds Google Analytics 4 (GA4) to your Next.js portfolio in a clean, production-ready way. The setup:

- ✅ Uses native `gtag.js` (no heavy dependencies)
- ✅ Only initializes when measurement ID is configured
- ✅ Initializes GA4 only once
- ✅ Automatically tracks page views for SPA routing
- ✅ Provides helper functions for custom event tracking
- ✅ Safe for local development (won't fire without measurement ID)
- ✅ Works with Next.js 14 App Router

---

## Files Created/Modified

### New Files (Create These)

1. **`.env.local.example`** – Template for environment variables
   - Shows where to get your GA4 measurement ID
   - Copied or renamed to `.env.local` with actual ID

2. **`src/lib/analytics.ts`** – Core analytics utility
   - Initialization logic with deduplication
   - Helper functions: `trackPageView()`, `trackOutboundClick()`, `trackProjectClick()`, `trackCVDownload()`, `trackContactClick()`, `trackCustomEvent()`
   - All functions are safe to call (handle missing gtag gracefully)

3. **`src/components/GoogleAnalytics.tsx`** – Initialization component
   - Client-side component that runs `initializeGA()` once on mount
   - Loads the gtag script dynamically from Google

4. **`src/components/RouteChangeListener.tsx`** – Route tracking component
   - Auto-tracks page views when route changes (Next.js App Router)
   - Maps route paths to human-readable page titles
   - Customizable via the `getPageTitle()` function

5. **`src/lib/analytics-examples.md`** – Usage examples for all tracking functions

### Modified Files

- **`src/app/layout.tsx`** – Added two components:
  - `<GoogleAnalytics />` – Initializes GA4 on app startup
  - `<RouteChangeListener />` – Tracks page view changes automatically

---

## Setup Steps

### 1. Get Your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com)
2. Click **Admin** (bottom left)
3. Select your Property
4. Go to **Data Streams**
5. Click your web stream
6. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Configure Environment Variables

```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local and replace with your actual measurement ID
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Why `NEXT_PUBLIC_`?**
- Next.js convention for variables that should be accessible in the browser
- GA4 measurement ID must be public (it's in the client-side script anyway)

### 3. Verify Setup

1. Run your dev server: `npm run dev`
2. Open browser DevTools → **Network** tab
3. Search for `googletagmanager.com`
4. You should see the gtag script loading (in production; in dev it might say "waiting")
5. Check **Console** for debug message: `[Analytics] GA4 initialized successfully`

### 4. Add Analytics to Your Components

Use the helper functions in your components:

```typescript
'use client';

import { trackProjectClick, trackOutboundClick } from '@/lib/analytics';

export default function ProjectCard({ name, url }: Props) {
  return (
    <div onClick={() => trackProjectClick(name)}>
      <h3>{name}</h3>
      <a
        href={url}
        onClick={(e) => {
          e.preventDefault();
          trackOutboundClick('Project Link', url);
          window.open(url, '_blank');
        }}
      >
        View Project
      </a>
    </div>
  );
}
```

See `src/lib/analytics-examples.md` for more examples.

---

## How Each Part Works

### GoogleAnalytics Component
- Runs once on app startup (in root layout)
- Injects the Google tag script into `<head>`
- Initializes the global `window.gtag` function
- Sets `send_page_view: false` so we handle page views manually (better for SPA)

### RouteChangeListener Component
- Watches route changes via `usePathname()` hook
- Calls `trackPageView(pathname, title)` whenever pathname changes
- Maps routes to readable titles automatically

### Analytics Utility Functions
- **`initializeGA()`** – Loads gtag script and initializes GA4
- **`trackPageView(path, title)`** – Manual page view tracking
- **`trackOutboundClick(label, url)`** – External link clicks (GitHub, LinkedIn, etc.)
- **`trackProjectClick(projectName)`** – Project cards/modals
- **`trackCVDownload()`** – CV/resume downloads
- **`trackContactClick(method)`** – Contact form, email, phone clicks
- **`trackCustomEvent(name, params)`** – Custom tracking for anything else

All functions **silently return** if GA4 isn't initialized (safe to call anytime).

---

## What Gets Tracked (By Default)

### Automatic (No Code Changes Needed)
- **Page views** – Every route change (/, /projects, /contact, etc.)
- **Basic metrics** – Session duration, bounce rate, device info

### Custom (You Must Add)
- Project clicks
- Outbound link clicks (GitHub, LinkedIn, etc.)
- CV downloads
- Contact form submissions
- Any other user interactions

---

## Testing

### In Development
1. Without `.env.local` → GA4 won't initialize (safe for testing)
2. With `.env.local` → GA4 initializes and tracks (check console logs)

### In Production (Vercel)
1. Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` to Vercel environment variables
2. GA4 will automatically start tracking

### Verify in GA4 Dashboard
1. Go to [Google Analytics](https://analytics.google.com)
2. Select your Property
3. Go to **Real-time** report
4. Interact with your site
5. You should see events appear in real-time (may take 30 seconds)

---

## Common Tasks

### Add Tracking to an Existing Button
```typescript
import { trackOutboundClick } from '@/lib/analytics';

<button onClick={() => {
  trackOutboundClick('Download CV', '/files/cv.pdf');
  downloadFile('/files/cv.pdf');
}}>
  Download CV
</button>
```

### Track Form Submission
```typescript
import { trackContactClick } from '@/lib/analytics';

const handleSubmit = (e: React.FormEvent) => {
  trackContactClick('contact_form');
  // Submit form...
};
```

### Track Custom Interaction
```typescript
import { trackCustomEvent } from '@/lib/analytics';

const handleSkillHover = (skill: string) => {
  trackCustomEvent('skill_interaction', {
    skill_name: skill,
    interaction_type: 'hover',
  });
};
```

---

## Troubleshooting

### GA4 Script Not Loading
- Check browser DevTools → **Network** tab → filter by "google"
- Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set in `.env.local`
- Check console for error messages

### Events Not Appearing
- Go to **Real-time** report in GA4 (changes appear instantly)
- Wait 24-48 hours for historical reports to update
- Ensure your Property is configured correctly in GA4

### Debug Mode
All functions log to console with `[Analytics]` prefix when enabled:
```typescript
// In src/lib/analytics.ts, all debug messages show if GA4 is initialized
console.debug('[Analytics] GA4 initialized successfully');
```

---

## Security/Privacy Notes

- Measurement ID is public (it's in client-side code anyway)
- Consider your analytics privacy policy in GDPR/CCPA compliance
- GA4 data is sent to Google (review their privacy policy)
- You may want to implement cookie consent before initializing GA4

---

## Next Steps

1. ✅ Copy `.env.local.example` → `.env.local`
2. ✅ Add your actual GA4 measurement ID
3. ✅ Test in dev: Check console for `[Analytics] GA4 initialized successfully`
4. ✅ Add tracking to key interactions (see examples)
5. ✅ Deploy to Vercel with `NEXT_PUBLIC_GA_MEASUREMENT_ID` env var
6. ✅ Verify tracking in GA4 Real-time report

---

## Reference

- [Google Analytics 4 Setup](https://support.google.com/analytics/answer/9304153)
- [gtag.js Documentation](https://developers.google.com/analytics/devguides/collection/gtagjs)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
