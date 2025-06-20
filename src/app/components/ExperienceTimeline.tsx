"use client";
import React from "react";

const experiences = [
  {
    icon: "💼",
    title: "IT Infrastructure Support Intern",
    company: { name: "Flix", url: "https://flixbus.com" },
    date: "03/2025 – Present",
    location: "Berlin, Germany",
    bullets: [
      "Contributed to cross-functional projects as the subject-matter expert in IT infrastructure support services.",
      "Supported business growth by efficiently scaling IT infrastructure.",
      "Enhanced network capacity by upgrading infrastructure components."
    ]
  },
  {
    icon: "💼",
    title: "Student Assistant",
    company: { name: "Catholic University of Eichstaett", url: "https://www.ku.de/en" },
    date: "10/2024 – Present",
    location: "Ingolstadt, Germany",
    bullets: [
      "Assured timely completion of grading tasks, contributing to smooth course progression.",
      "Emphasized conceptual understanding over memorization in feedback.",
      "Collaborated with graders to ensure consistency and high standards."
    ]
  }
];

export default function ExperienceTimeline() {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {experiences.map((exp, idx) => (
        <div key={idx} className="w-full bg-white/10 rounded-xl p-6 shadow-lg flex flex-col gap-2 transition-transform hover:scale-105 max-w-full">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{exp.icon}</span>
            <h3 className="text-lg font-bold text-blue-300">{exp.title}</h3>
          </div>
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