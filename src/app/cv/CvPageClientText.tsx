"use client";
import { useLanguage } from '@/lib/i18n';

export default function CvPageClientText({ description = false }: { description?: boolean }) {
  const de = useLanguage() === 'de';
  return description
    ? <>{de ? 'Sehen Sie sich meinen Lebenslauf unten an oder laden Sie ihn herunter.' : 'Preview my CV below, or download a copy for your records.'}</>
    : <>{de ? 'Ali Guliyev: Lebenslauf' : 'Ali Guliyev: CV'}</>;
}
