"use client";
import { useLanguage } from '@/lib/i18n';

export default function CvPageClientText({ description = false, label = false, previewLabel = false }: { description?: boolean; label?: boolean; previewLabel?: boolean }) {
  const de = useLanguage() === 'de';
  if (label) return <>{de ? 'Lebenslauf' : 'Curriculum Vitae'}</>;
  if (previewLabel) return <>{de ? 'PDF-Vorschau' : 'PDF preview'}</>;
  return description
    ? <>{de ? 'Sehen Sie sich meinen Lebenslauf unten an oder laden Sie ihn herunter.' : 'Preview my CV below, or download a copy for your records.'}</>
    : <>{de ? 'Ali Guliyev: Lebenslauf' : 'Ali Guliyev: CV'}</>;
}
