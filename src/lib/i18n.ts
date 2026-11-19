"use client";

import { useEffect, useState } from "react";

export type Language = "en" | "de";
const KEY = "portfolio-language";

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("en");
  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved === "de" || saved === "en") setLanguage(saved);
    const onChange = (event: Event) => setLanguage((event as CustomEvent<Language>).detail);
    window.addEventListener("portfolio-language-change", onChange);
    return () => window.removeEventListener("portfolio-language-change", onChange);
  }, []);
  return language;
}

export function setLanguage(language: Language) {
  localStorage.setItem(KEY, language);
  window.dispatchEvent(new CustomEvent("portfolio-language-change", { detail: language }));
}
