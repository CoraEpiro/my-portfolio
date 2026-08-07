"use client";
import React from "react";

const experiences = [
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
    title: "Teaching Assistant — Linear Algebra I & II",
    company: { name: "Catholic University of Eichstätt-Ingolstadt", url: "https://www.ku.de/en" },
    date: "10/2024 – 07/2026",
    location: "Ingolstadt, Germany",
    bullets: [
      "~200 hours across 4 semesters teaching Linear Algebra I & II to 120+ first-year students.",
      "Explained abstract proofs — vector spaces, eigenstructure, linear maps — to students with no prior exposure, in their second language and mine.",
      "Graded alongside a team of tutors, aligning on a shared standard so feedback stayed consistent across cohorts."
    ]
  },
  {
    title: "IT Infrastructure Support Working Student",
    company: { name: "Flix", url: "https://flixbus.com" },
    date: "03/2025 – Present",
    location: "Munich, Germany",
    bullets: [
      "Resolved 1,100+ support tickets working part-time alongside full-time study.",
      "On-site support, hardware provisioning, access management and network-side troubleshooting for employees across departments.",
      "Worked in English throughout, turning vague problem reports from non-technical colleagues into actionable tickets."
    ]
  }
];

export default function ExperienceTimeline() {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {experiences.map((exp, idx) => (
        <div key={idx} className="w-full bg-white/10 rounded-xl p-6 shadow-lg flex flex-col gap-2 max-w-full">
          <h3 className="text-lg font-bold text-blue-300 mb-2">{exp.title}</h3>
          <a href={exp.company.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 font-medium hover:underline">{exp.company.name}</a>
          <div className="text-gray-400 text-sm mb-1">{exp.date} • {exp.location}</div>
          <ul className="text-gray-200 text-sm list-disc list-inside mt-2">
            {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
} 