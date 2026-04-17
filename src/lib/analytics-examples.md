# GA4 Analytics Usage Examples

This file shows how to use the analytics utility in your components.

## 1. Track Outbound Link Clicks (e.g., in Navbar or Contact sections)

```typescript
'use client';

import { trackOutboundClick } from '@/lib/analytics';

export default function Navbar() {
  const handleGitHubClick = () => {
    trackOutboundClick('GitHub Profile', 'https://github.com/username');
    // Then navigate or open link
    window.open('https://github.com/username', '_blank');
  };

  return (
    <nav>
      <a href="#" onClick={handleGitHubClick}>
        GitHub
      </a>
    </nav>
  );
}
```

## 2. Track Project Clicks (e.g., in Projects component)

```typescript
'use client';

import { trackProjectClick } from '@/lib/analytics';

export default function ProjectCard({ projectName, projectData }: Props) {
  const handleProjectClick = () => {
    trackProjectClick(projectName); // Track before opening modal
    // Open modal or navigate
  };

  return (
    <div onClick={handleProjectClick} className="cursor-pointer">
      <h3>{projectName}</h3>
      {/* Project details */}
    </div>
  );
}
```

## 3. Track CV Download

```typescript
'use client';

import { trackCVDownload } from '@/lib/analytics';

export default function CVDownloadButton() {
  const handleDownload = () => {
    trackCVDownload();
    // Trigger download
    const link = document.createElement('a');
    link.href = '/resume/Ali_Guliyev_Resume_April_2026.pdf';
    link.download = 'Ali_Guliyev_Resume_April_2026.pdf';
    link.click();
  };

  return (
    <button onClick={handleDownload}>
      Download CV
    </button>
  );
}
```

## 4. Track Contact Method Selection

```typescript
'use client';

import { trackContactClick } from '@/lib/analytics';

export default function ContactOptions() {
  const handleEmailClick = () => {
    trackContactClick('email');
    window.location.href = 'mailto:ali@example.com';
  };

  const handleLinkedInClick = () => {
    trackContactClick('linkedin');
    window.open('https://linkedin.com/in/aliguliyev', '_blank');
  };

  const handleFormSubmit = () => {
    trackContactClick('contact_form');
    // Submit form
  };

  return (
    <div>
      <button onClick={handleEmailClick}>Email Me</button>
      <button onClick={handleLinkedInClick}>LinkedIn</button>
      <button onClick={handleFormSubmit}>Contact Form</button>
    </div>
  );
}
```

## 5. Track Custom Events

```typescript
'use client';

import { trackCustomEvent } from '@/lib/analytics';

export default function SkillsSection() {
  const handleSkillHover = (skillName: string) => {
    trackCustomEvent('skill_viewed', {
      skill_name: skillName,
      category: 'technical',
    });
  };

  return (
    <div>
      <div onMouseEnter={() => handleSkillHover('Python')}>
        Python
      </div>
      <div onMouseEnter={() => handleSkillHover('React')}>
        React
      </div>
    </div>
  );
}
```

## Notes:

- All tracking functions are **safe to call** - they gracefully handle cases where GA4 is not initialized
- Use the pre-built functions (`trackOutboundClick`, `trackProjectClick`, etc.) for consistency
- For custom tracking needs, use `trackCustomEvent(eventName, params)`
- Page views are **automatically tracked** via `RouteChangeListener` component
- No need to await or check if analytics is ready - the utility handles it
