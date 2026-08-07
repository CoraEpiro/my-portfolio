"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';
import ExperienceTimeline from "./components/ExperienceTimeline";

export default function HomeClient() {
  useEffect(() => {
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
    setTimeout(() => {
      const scrollElements = document.querySelectorAll('.scroll-fade-in');
      scrollElements.forEach((el) => observer.observe(el));
    }, 100);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Ali Guliyev",
            "jobTitle": "Data Science & Risk Modelling",
            "description": "B.Sc. Data Science and B.Sc. Mathematics, based near Munich. Probabilistic and statistical modelling in Python, five-time hackathon winner, working toward catastrophe and climate risk modelling.",
            "url": "https://www.aliguliyev.com",
            "image": "https://www.aliguliyev.com/assets/profile.jpg",
            "sameAs": [
              "https://www.linkedin.com/in/ali-guliyev-389837238/",
              "https://github.com/CoraEpiro",
              "https://www.youtube.com/channel/UCFSPcgnkuyQnIKObIMhiqqA"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Ingolstadt",
              "addressCountry": "Germany"
            },
            "alumniOf": [
              {
                "@type": "CollegeOrUniversity",
                "name": "Catholic University of Eichstätt-Ingolstadt",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Ingolstadt",
                  "addressCountry": "Germany"
                }
              },
              {
                "@type": "CollegeOrUniversity",
                "name": "Baku State University",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Baku",
                  "addressCountry": "Azerbaijan"
                }
              }
            ],
            "knowsAbout": [
              "Data Science",
              "Mathematics",
              "Probability Theory",
              "Statistical Modelling",
              "Machine Learning",
              "Python Programming",
              "SQL",
              "Risk Analytics",
              "Catastrophe Modelling"
            ],
            "email": "Ali.Guliyev@stud.ku.de"
          })
        }}
      />
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
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          Ali Guliyev
        </h1>
        <p className="text-2xl text-blue-400 font-semibold mb-1 animate-slide-up"
           style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          Data Science &amp; Risk Modelling
        </p>
        <p className="text-base text-gray-300 mb-4 animate-slide-up"
           style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
          Mathematics + Data Science • Python • Probabilistic modelling
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
          I am finishing a B.Sc. in Data Science at the Catholic University of Eichstätt-Ingolstadt, on top of a B.Sc. in Mathematics from Baku State University. Two degrees in the quantitative core: real analysis, probability and measure theory underneath the machine learning, rather than beside it. I work in Python and SQL, teach linear algebra to 120+ first-year students, and have won five hackathons — placing second in a sixth — building working models under a deadline.
        </p>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-4">
          I want to work in catastrophe and climate risk modelling — where the probability theory I was trained in is the job, not a prerequisite.
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
              title: "Modelling & Statistics",
              skills: [
                "Probability, stochastic processes, measure theory",
                "Regression, classification, time-series, model validation",
                "Scikit-Learn, TensorFlow, PyTorch, statsmodels"
              ]
            },
            {
              title: "Programming & Data",
              skills: [
                "Python (advanced), SQL, Java, C/C++",
                "Pandas, NumPy, Matplotlib, Seaborn",
                "Docker, Git, ETL/EDA, Power BI, Tableau"
              ]
            },
            {
              title: "Working & Languages",
              skills: [
                "Agile, JIRA, Confluence",
                "Azerbaijani, Turkish (native), English (proficient)",
                "German B1 — targeting B2 by end of 2026"
              ]
            }
          ].map((skillGroup, idx) => (
            <div
              key={idx}
              className="card flex flex-col items-center hover-lift"
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              <h3 className="text-lg font-semibold mb-2 text-blue-300">{skillGroup.title}</h3>
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
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-blue-500/60 via-blue-400/30 to-transparent z-0" style={{ transform: 'translateX(-50%)' }} />
          <div className="flex flex-col gap-16 relative z-10">
            {[
              { title: "Salzburg Hackathon", subtitle: "Winner — €1,000 Prize", desc: "Smart tourism recommendation system (open-source)", date: "Nov 2024" },
              { title: "VGI Challenge", subtitle: "2nd Place — €3,000", desc: "Transport optimization project in Ingolstadt", date: "Nov 2024" },
              { title: "Würzburg Hackathon", subtitle: "1st Place", desc: "Qualified for the ConsulCon25 conference", date: "Nov 2024" },
              { title: "Data4Good Berlin", subtitle: "1st Place — €500", desc: "Won our category at the Hertie School hackathon", date: "Jan 2025" },
              { title: "Hack4Good Den Haag", subtitle: "Category Winner", desc: "Won our category at Hack4Good", date: "Jan 2025" },
              { title: "ConsulCon25", subtitle: "Conference Speaker", desc: "Presented the Consul Democracy Analytics Tool", date: "Feb 2025" },
              { title: "European Healthcare Hackathon", subtitle: "Participant", desc: "Competed among international teams in Prague", date: "Mar 2025" },
              { title: "Berlin Blockchain Hackathons", subtitle: "Two 24h Web3 Sprints", desc: "Built prototypes in two 24-hour blockchain hackathons", date: "Jun 2025" },
              { title: "Data4Good Berlin", subtitle: "1st Place — €500", desc: "Defended the title: first place for the second year running", date: "Jan 2026" },
            ].map((event, idx) => {
              const flexDir = idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse";
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col ${flexDir} items-center justify-between w-full`}
                >
                  {/* Date - mobile */}
                  <div className="flex md:hidden mb-4 w-full justify-center">
                    <div className="rounded-full border border-blue-400/40 bg-gray-900 px-4 py-1 text-sm font-semibold text-blue-300">
                      {event.date}
                    </div>
                  </div>
                  {/* Card */}
                  <div className={`w-full md:w-1/2 px-0 md:px-8 flex flex-col items-${idx % 2 === 0 ? 'end' : 'start'}`}>
                    <div className="rounded-xl shadow-lg p-6 max-w-md w-full bg-white/5 border border-white/10 transition-shadow duration-300 hover:shadow-xl hover:border-blue-400/30">
                      <h3 className="text-lg font-bold text-white mb-1">{event.title}</h3>
                      <div className="text-blue-300 text-sm mb-1 font-semibold">{event.subtitle}</div>
                      <div className="text-gray-400 text-sm">{event.desc}</div>
                    </div>
                  </div>
                  {/* Date - desktop */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center z-20">
                    <div className="rounded-full border border-blue-400/40 bg-gray-900 px-4 py-1 text-sm font-semibold text-blue-300 whitespace-nowrap">
                      {event.date}
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
                "GPA 1.77 / 1.0 — German scale, where 1.0 is the best possible grade",
                "Specialization in Applied Mathematics",
                "Key courses: Machine Learning, Deep Learning, Measure Theory for Data Science, Stochastics",
                "Teaching Assistant for Linear Algebra I & II — ~200 hours, 120+ students"
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
                "Advanced coursework: Real Analysis, Abstract Algebra, Differential Equations, Probability Theory",
                "A full mathematics degree before the data science one — the reason probabilistic modelling reads as native rather than acquired",
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
              className="rounded-lg bg-slate-800/60 p-6 shadow hover-lift max-w-full md:max-w-[480px] mx-auto"
            >
              <div className="flex items-start gap-4">
                {edu.logo && (
                  <Image
                    src={edu.logo}
                    alt={edu.institution + ' logo'}
                    width={48}
                    height={48}
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
      {/* Certifications Section */}
      <section className="container py-12 scroll-fade-in">
        <h2 className="text-2xl font-bold text-center mb-3">Certifications</h2>
        <p className="text-center text-gray-300 mb-8">
          A dedicated certificates archive is available here:
          <a href="/certificates" className="ml-2 text-blue-400 hover:underline font-semibold">View All Certificates</a>
        </p>
        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
          {[
            {
              title: 'Google Advanced Data Analytics',
              category: 'Professional Certificate',
              issued: '13 March 2026',
              image: '/certificates/google_advanced_data_analytics.png',
              verifyUrl: 'https://coursera.org/verify/professional-cert/LGR9L7X7L5RL',
            },
            {
              title: 'IBM Deep Learning with PyTorch, Keras and Tensorflow',
              category: 'Specialization Certificate',
              issued: '4 May 2026',
              image: '/certificates/ibm_deep_learning_with_pytorch_keras_and_tensorflow.png',
              verifyUrl: 'https://www.coursera.org/account/accomplishments/professional-cert/23WN50BTKV7Z',
            },
          ].map((cert) => (
            <div key={cert.title} className="flex flex-col rounded-lg bg-slate-800/60 p-5 shadow">
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block aspect-[4/3] overflow-hidden rounded-lg border border-slate-600/60 bg-slate-900/80 mb-4"
              >
                <Image
                  src={cert.image}
                  alt={`${cert.title} certificate preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 430px"
                  className="object-contain object-center"
                />
              </a>
              <p className="text-xs uppercase tracking-[0.18em] text-blue-300 mb-1">{cert.category} · Coursera</p>
              <h3 className="text-lg font-bold text-white mb-1">{cert.title}</h3>
              <p className="text-sm text-gray-400 mb-4">Issued {cert.issued}</p>
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex w-fit items-center justify-center rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-blue-400"
              >
                Verify
              </a>
            </div>
          ))}
        </div>
      </section>
      <hr className="divider" />
      {/* Contact Section */}
      <section className="container mx-auto px-4 py-2 scroll-fade-in">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Get in Touch
        </h2>
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-gray-300 mb-8">
            I'm always open to new opportunities and collaborations.
          </p>
          <div className="flex justify-center gap-6">
            {[
              { name: "GitHub", url: "https://github.com/CoraEpiro" },
              { name: "LinkedIn", url: "https://www.linkedin.com/in/ali-guliyev-389837238/" },
              { name: "Email", url: "mailto:Ali.Guliyev@stud.ku.de" }
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target={link.name !== "Email" ? "_blank" : undefined}
                rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
    </>
  );
} 