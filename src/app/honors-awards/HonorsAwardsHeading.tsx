"use client";
import { useLanguage } from "@/lib/i18n";
export default function HonorsAwardsHeading({ description = false }: { description?: boolean }) {
  const de = useLanguage() === "de";
  if (description) return <>{de ? "Die Originaldokumente meiner Auszeichnungen in einem digitalen Portfolio." : "The original award documents, collected in a portfolio you can flip through."}</>;
  return <>{de ? "Auszeichnungen & Ehrungen" : "Honors & Awards"}</>;
}
