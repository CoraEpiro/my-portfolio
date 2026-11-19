"use client";
import React from "react";
import { useLanguage } from "@/lib/i18n";

const experiences = [
  {
    title: "Student Assistant, Secure Cloud Computing",
    company: { name: "Leibniz Supercomputing Centre (LRZ)", url: "https://www.lrz.de/" },
    date: "11/2026 – Present",
    location: "Munich, Germany · 15 hours/week",
    bullets: [
      "Starting 16 November 2026. Role details to be added as work begins."
    ]
  },
  {
    title: "Marketing Analytics & Insights Working Student",
    company: { name: "MediaMarktSaturn", url: "https://www.mediamarktsaturn.com" },
    date: "02/2026 – 07/2026",
    location: "Germany",
    bullets: [
      "Built and maintained Looker Studio dashboards on BigQuery marketing data used by the insights team.",
      "Wrote SQL to join campaign, product and traffic tables into reusable reporting datasets.",
      "Translated recurring analyst questions into standing reports instead of one-off pulls."
    ]
  },
  {
    title: "Teaching Assistant: Linear Algebra I & II",
    company: { name: "Catholic University of Eichstätt-Ingolstadt", url: "https://www.ku.de/en" },
    date: "10/2024 – 07/2026",
    location: "Ingolstadt, Germany",
    bullets: [
      "~200 hours across 4 semesters teaching Linear Algebra I & II to 120+ first-year students.",
      "Explained abstract proofs on vector spaces, eigenstructure, and linear maps to students with no prior exposure, in their second language and mine.",
      "Graded alongside a team of tutors, aligning on a shared standard so feedback stayed consistent across cohorts."
    ]
  },
  {
    title: "IT Infrastructure Support Working Student",
    company: { name: "Flix", url: "https://flixbus.com" },
    date: "03/2025 – Present",
    location: "Munich, Germany",
    bullets: [
      "Resolved 1,250+ support tickets working part-time alongside full-time study.",
      "On-site support, hardware provisioning, access management and network-side troubleshooting for employees across departments.",
      "Worked in English throughout, turning vague problem reports from non-technical colleagues into actionable tickets."
    ]
  }
];

export default function ExperienceTimeline() {
  const de = useLanguage() === "de";
  return (
    <div className="w-full max-w-4xl mx-auto py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {experiences.map((exp, idx) => (
        <div key={idx} className="w-full bg-white/10 rounded-xl p-6 shadow-lg flex flex-col gap-2 max-w-full">
          <h3 className="text-lg font-bold text-blue-300 mb-2">{de ? ({
            "Student Assistant, Secure Cloud Computing": "Studentische Hilfskraft im Bereich Secure Cloud Computing",
            "Marketing Analytics & Insights Working Student": "Werkstudent im Bereich Marketing Analytics & Insights",
            "Teaching Assistant: Linear Algebra I & II": "Tutor für Lineare Algebra I und II",
            "IT Infrastructure Support Working Student": "Werkstudent im IT-Infrastruktur-Support"
          } as Record<string, string>)[exp.title] : exp.title}</h3>
          <a href={exp.company.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 font-medium hover:underline">{exp.company.name}</a>
          <div className="text-gray-400 text-sm mb-1">{exp.date} • {de ? exp.location.replace("Germany", "Deutschland").replace("Munich", "München").replace("hours/week", "Std./Woche") : exp.location}</div>
          <ul className="text-gray-200 text-sm list-disc list-inside mt-2">
            {exp.bullets.map((b, i) => <li key={i}>{de ? ({
              "Starting 16 November 2026. Role details to be added as work begins.": "Offizieller Beginn am 16. November 2026. Weitere Aufgaben folgen, sobald ich angefangen habe.",
              "Built and maintained Looker Studio dashboards on BigQuery marketing data used by the insights team.": "Erstellte und pflegte Looker-Studio-Dashboards mit BigQuery-Marketingdaten für das Insights-Team.",
              "Wrote SQL to join campaign, product and traffic tables into reusable reporting datasets.": "Verknüpfte Kampagnen-, Produkt- und Traffic-Tabellen mit SQL zu wiederverwendbaren Reporting-Datensätzen.",
              "Translated recurring analyst questions into standing reports instead of one-off pulls.": "Überführte wiederkehrende Analysefragen in regelmäßige Berichte statt einmaliger Datenabfragen.",
              "~200 hours across 4 semesters teaching Linear Algebra I & II to 120+ first-year students.": "Rund 200 Stunden Tutorium in Linearer Algebra I und II über vier Semester für mehr als 120 Studierende im ersten Jahr.",
              "Explained abstract proofs on vector spaces, eigenstructure, and linear maps to students with no prior exposure, in their second language and mine.": "Erklärte abstrakte Beweise zu Vektorräumen, Eigenstrukturen und linearen Abbildungen für Studierende ohne Vorkenntnisse, in einer Zweitsprache für uns beide.",
              "Graded alongside a team of tutors, aligning on a shared standard so feedback stayed consistent across cohorts.": "Korrigierte Aufgaben im Tutorenteam und stimmte die Bewertung ab, damit das Feedback über alle Gruppen hinweg einheitlich blieb.",
              "Resolved 1,250+ support tickets working part-time alongside full-time study.": "Bearbeitete neben dem Vollzeitstudium in Teilzeit mehr als 1.250 Support-Tickets.",
              "On-site support, hardware provisioning, access management and network-side troubleshooting for employees across departments.": "Unterstützte Mitarbeitende vor Ort, richtete Hardware ein, verwaltete Zugänge und analysierte Netzwerkprobleme in verschiedenen Abteilungen.",
              "Worked in English throughout, turning vague problem reports from non-technical colleagues into actionable tickets.": "Arbeitete durchgehend auf Englisch und machte aus vagen Problembeschreibungen nichttechnischer Kolleginnen und Kollegen konkrete Tickets."
            } as Record<string, string>)[b] || b : b}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
} 
