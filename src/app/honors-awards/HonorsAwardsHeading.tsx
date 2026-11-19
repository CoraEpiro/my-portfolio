"use client";
import { useLanguage } from "@/lib/i18n";
export default function HonorsAwardsHeading() {
  return <>{useLanguage() === "de" ? "Auszeichnungen & Ehrungen" : "Honors & Awards"}</>;
}
