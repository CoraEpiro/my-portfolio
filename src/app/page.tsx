"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';
import ExperienceTimeline from "./components/ExperienceTimeline";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Simple scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe scroll-fade-in elements after component mounts
    setTimeout(() => {
      const scrollElements = document.querySelectorAll('.scroll-fade-in');
      scrollElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center text-center pt-16 pb-10 animate-fade-in">
        <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-gray-700 shadow-lg transition-all duration-500 ease-out hover:scale-110 hover:border-blue-400 animate-scale-in">
          <Image
            src="/assets/profile.jpg"
            alt="Ali Guliyev"
            fill
            className="object-cover object-top scale-110"
            style={{ objectPosition: 'center 5%' }}
            priority
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-2 animate-slide-up" 
            style={{ fontFamily: 'Montserrat, Inter, sans-serif', animationDelay: '0.2s', animationFillMode: 'both' }}>
          Ali Guliyev
        </h1>
        <p className="text-2xl text-blue-400 font-semibold mb-1 animate-slide-up" 
           style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          Data-Driven Problem Solver
        </p>
        <p className="text-base text-gray-300 mb-4 animate-slide-up" 
           style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
          Python • Machine Learning • React • Hackathon Winner
        </p>
        <p className="text-base text-gray-400 mb-2 animate-slide-up" 
           style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
          Ingolstadt, Germany
        </p>
      </section>
      
      <hr className="divider" />
      
      {/* About Section */}
      <section className="container text-center scroll-fade-in">
        <h2 className="text-2xl font-bold mb-3">About Me</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-4">
          Data Science professional with 2+ years of experience in IT infrastructure support, data analysis, and visualization. Expert in Python, SQL, and Power BI. Recognized for optimizing reporting efficiency, winning hackathons, and delivering impactful analytics solutions. Seeking to leverage my skills in catastrophe modeling and risk analytics to support organizations in making data-driven decisions.
        </p>
        <a href="/contact" className="button mt-2 hover-lift">Contact Me</a>
      </section>
      
      <hr className="divider" />
      
      {/* Skills Section */}
      <section className="container scroll-fade-in">
        <h2 className="text-2xl font-bold text-center mb-8">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "💻",
              title: "Programming & Data",
              skills: [
                "Python (Expert), SQL, Java, C/C++",
                "Pandas, Numpy, Scikit-Learn, TensorFlow, PyTorch",
                "Docker, Git, GitHub"
              ]
            },
            {
              icon: "📊",
              title: "Data Science & Visualization",
              skills: [
                "Power BI, Tableau, Matplotlib, Seaborn",
                "Data Mining, EDA, ETL, Machine Learning",
                "Web Scraping, Selenium"
              ]
            },
            {
              icon: "🌍",
              title: "Other & Languages",
              skills: [
                "Agile, JIRA, Confluence, Microsoft Office",
                "Azerbaijani, Turkish (Native)",
                "English (Proficient), German (Intermediate)"
              ]
            }
          ].map((skillGroup, idx) => (
            <div 
              key={idx}
              className="card flex flex-col items-center hover-lift hover-glow"
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              <span className="text-3xl mb-2 animate-float">{skillGroup.icon}</span>
              <h3 className="text-lg font-semibold mb-2">{skillGroup.title}</h3>
              <ul className="text-gray-300 text-sm list-disc list-inside text-center">
                {skillGroup.skills.map((skill, skillIdx) => (
                  <li key={skillIdx}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      
      <hr className="divider" />
      
      {/* My Journey Section */}
      <section className="container scroll-fade-in">
        <h2 className="text-2xl font-bold text-center mb-8">My Journey</h2>
        <div className="relative w-full max-w-3xl mx-auto py-8">
          {/* Central vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-blue-400 via-purple-400 via-pink-400 via-orange-400 via-yellow-400 via-red-400 via-teal-400 to-slate-400 z-0" style={{ transform: 'translateX(-50%)' }} />
          <div className="flex flex-col gap-16 relative z-10">
            {[
              { title: "Salzburg Hackathon", icon: "🏆", subtitle: "€1 000 Prize", desc: "Smart tourism recommendation system (open-source)", date: "Nov 2024", color: "blue" as const },
              { title: "VGI Challenge", icon: "🏆", subtitle: "2nd Place, €3 000", desc: "Transport optimization project in Ingolstadt", date: "Nov 2024", color: "purple" as const },
              { title: "Würzburg Hackathon", icon: "🏆", subtitle: "1st Place", desc: "Qualified for ConsulCon25", date: "Nov 2024", color: "pink" as const },
              { title: "Data4Good Berlin", icon: "🏆", subtitle: "1st Place, €500", desc: "Hertie School hackathon; took 1st in our category", date: "Jan 2025", color: "orange" as const },
              { title: "Hack4Good Den Haag", icon: "🏆", subtitle: "Category Winner", desc: "Won our category at Hack4Good", date: "Jan 2025", color: "yellow" as const },
              { title: "ConsulCon25", icon: "🎤", subtitle: "International Conference", desc: "Presented Consul Democracy Analytics Tool", date: "Feb 2025", color: "teal" as const },
              { title: "European Healthcare Hackathon", icon: "🩺", subtitle: "Participant", desc: "Competed in Prague; gained experience", date: "Mar 2025", color: "red" as const },
              { title: "Berlin Blockchain Hackathons", icon: "🔗", subtitle: "Two 24h Web3 Hacks", desc: "Participated in two blockchain/Web3 hackathons; no final wins", date: "Jun 2025", color: "slate" as const },
            ].map((event, idx) => {
              const colorMap = {
                blue: "text-blue-400 border-blue-400 bg-blue-900/40",
                purple: "text-purple-400 border-purple-400 bg-purple-900/40",
                pink: "text-pink-400 border-pink-400 bg-pink-900/40",
                orange: "text-orange-400 border-orange-400 bg-orange-900/40",
                yellow: "text-yellow-400 border-yellow-400 bg-yellow-900/40",
                red: "text-red-400 border-red-400 bg-red-900/40",
                teal: "text-teal-400 border-teal-400 bg-teal-900/40",
                slate: "text-slate-400 border-slate-400 bg-slate-900/40",
              } as const;
              const dateCircle = {
                blue: "border-blue-400 text-blue-400",
                purple: "border-purple-400 text-purple-400",
                pink: "border-pink-400 text-pink-400",
                orange: "border-orange-400 text-orange-400",
                yellow: "border-yellow-400 text-yellow-400",
                red: "border-red-400 text-red-400",
                teal: "border-teal-400 text-teal-400",
                slate: "border-slate-400 text-slate-400",
              } as const;
              const flexDir = idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse";
              return (
                <div 
                  key={idx} 
                  className={`relative flex flex-col ${flexDir} items-center justify-between w-full hover-lift`}
                >
                  {/* Date circle - mobile */}
                  <div className="flex md:hidden mb-4 w-full justify-center">
                    <div className={`w-14 h-14 rounded-full flex flex-col items-center justify-center border-4 bg-gray-900 font-bold text-base ${dateCircle[event.color]} hover:scale-110 transition-transform duration-300`}>
                      <span className="text-center">{event.date}</span>
                    </div>
                  </div>
                  {/* Card */}
                  <div className={`w-full md:w-1/2 px-0 md:px-8 flex flex-col items-${idx % 2 === 0 ? 'end' : 'start'}`}>
                    <div className={`rounded-xl shadow-lg p-6 max-w-md w-full border-l-4 md:border-l-4 md:border-r-0 ${idx % 2 === 0 ? colorMap[event.color] : ''} ${idx % 2 !== 0 ? 'md:border-l-0 md:border-r-4 ' + colorMap[event.color] : ''} bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl hover:animate-pulse">{event.icon}</span>
                        <h3 className={`text-lg font-bold ${colorMap[event.color]}`}>{event.title}</h3>
                      </div>
                      <div className="text-gray-300 text-sm mb-1 font-semibold">{event.subtitle}</div>
                      <div className="text-gray-400 text-sm">{event.desc}</div>
                    </div>
                  </div>
                  {/* Date circle - desktop */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center z-20">
                    <div className={`w-14 h-14 rounded-full flex flex-col items-center justify-center border-4 bg-gray-900 font-bold text-base ${dateCircle[event.color]} hover:scale-110 transition-transform duration-300`}>
                      <span className="text-center">{event.date}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      <hr className="divider" />
      
      {/* Experience Section */}
      <section className="container scroll-fade-in">
        <h2 className="text-2xl font-bold text-center mb-8">Experience</h2>
        <ExperienceTimeline />
      </section>
      
      <hr className="divider" />
      
      {/* Education Section */}
      <section className="container py-12 scroll-fade-in">
        <h2 className="text-2xl font-bold text-center mb-8">Education</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "B.Sc. Data Science",
              logo: "/assets/ku_logo.png",
              institution: "Catholic University of Eichstätt-Ingolstadt",
              institutionUrl: "https://www.ku.de/en",
              location: "Ingolstadt, Germany",
              dates: "10/2023 – 09/2026 (expected)",
              details: [
                "Specialization GPA 1.75 / 1.0 (Overall 1.79 / 1.0)",
                "Key courses: Machine Learning, Deep Learning, Measure Theory for Data Science",
                "Student Assistant for Linear Algebra I & II (tutoring 120+ freshmen)"
              ]
            },
            {
              title: "B.Sc. Mathematics",
              logo: "/assets/bsu_logo.png",
              institution: "Baku State University",
              institutionUrl: "https://bsu.edu.az/en/",
              location: "Baku, Azerbaijan",
              dates: "09/2021 – 06/2023",
              details: [
                "Final grade 83 / 100 (top quintile)",
                "Advanced coursework: Real Analysis, Abstract Algebra, Differential Equations",
                "Transferred to Germany for a more research-oriented data-science track"
              ]
            },
            {
              title: "Software Development Diploma",
              logo: "/assets/step_logo.png",
              institution: "STEP IT Academy",
              institutionUrl: "https://itstep.az/",
              location: "Baku, Azerbaijan",
              dates: "10/2021 – 04/2024",
              details: [
                "2.5-year intensive .NET & Python program (GPA 11.3 / 12.0)",
                "Capstone: full-stack web app with JWT auth & Dockerized deployment",
                "Agile & CI/CD best-practices training"
              ]
            },
            {
              title: "Junior Programming Academy",
              logo: "/assets/step_logo.png",
              institution: "STEP IT Academy",
              institutionUrl: "https://itstep.az/",
              location: "Baku, Azerbaijan",
              dates: "09/2020 – 06/2021",
              details: [
                "1-year robotics and Construct 2 game-development track",
                "Introduced to Python, sensors, and basic algorithmic thinking"
              ]
            }
          ].map((edu, idx) => (
            <div
              key={idx}
              className="rounded-lg bg-slate-800/60 p-6 shadow hover-lift hover-glow max-w-full md:max-w-[480px] mx-auto cursor-pointer"
            >
              <div className="flex items-start gap-4">
                {edu.logo && (
                  <img
                    src={edu.logo}
                    alt={edu.institution + ' logo'}
                    className="w-12 h-12 object-contain rounded hover:scale-110 transition-transform duration-300"
                  />
                )}
                <div className="flex-1 space-y-1 pl-1 md:pl-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                    <span className="text-lg md:text-xl font-bold text-white mr-2">{edu.title}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <a href={edu.institutionUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-semibold hover:text-blue-300 transition-colors">
                      {edu.institution}
                    </a>
                    <span className="text-gray-400 text-sm">— {edu.location}</span>
                    <span className="text-gray-500 text-xs">({edu.dates})</span>
                  </div>
                  <ul className="list-disc list-outside text-sm leading-relaxed">
                    {edu.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <hr className="divider" />
      
      {/* Contact Section */}
      <section className="container mx-auto px-4 py-2 scroll-fade-in">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Get in Touch
        </h2>
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
            I'm always open to new opportunities and collaborations.
          </p>
          <div className="flex justify-center gap-6">
            {[
              { name: "GitHub", url: "https://github.com" },
              { name: "LinkedIn", url: "https://linkedin.com" },
              { name: "Email", url: "mailto:your.email@example.com" }
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target={link.name !== "Email" ? "_blank" : undefined}
                rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:scale-110 transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}