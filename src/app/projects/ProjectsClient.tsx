"use client";
import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';

// Define the Collaborator type
type Collaborator = {
  name: string;
  linkedInUrl?: string;
  websiteUrl?: string;
};

// Define the Project type
type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
  collaborators?: Collaborator[];
};

// Sample projects data
const projects: Project[] = [
  {
    id: 2,
    title: 'Rain in Australia',
    description: 'Binary weather prediction on ten years of Australian meteorological observations: predicting next-day rainfall from atmospheric variables. Feature engineering on missing and skewed station data, class imbalance handling, and model comparison judged on precision/recall rather than raw accuracy.',
    image: '/projects/rain-in-australia/rain-in-australia-cover.jpg',
    technologies: ['Python', 'Jupyter', 'Scikit-Learn', 'Pandas'],
    tags: ['Weather Data', 'Predictive Modelling', 'Python', 'ML'],
    liveUrl: '#',
    githubUrl: 'https://github.com/CoraEpiro/rain-in-australia-binder',
    collaborators: [
      { name: 'Denis Hoti', linkedInUrl: 'https://www.linkedin.com/in/denishoti/', websiteUrl: 'https://denishoti.dev' }
    ],
  },
  {
    id: 4,
    title: 'VGI-Flexi: Rural Transport Analytics',
    description: 'Second place, VGI Challenge (€3,000). A logistic-regression model predicting passenger no-shows for on-demand rural transport, wrapped in an analytics platform the operator could actually use to reallocate capacity.',
    image: '/projects/university/vgi-challenge/vgi-cover.png',
    technologies: ['Data Analytics', 'Logistic Regression', 'Web Platform'],
    tags: ['Data Science', 'Transportation', 'Prediction Model'],
    liveUrl: 'https://8nxly8ub2.dora.run',
    collaborators: [
      { name: 'Denis Hoti', linkedInUrl: 'https://www.linkedin.com/in/denishoti/', websiteUrl: 'https://denishoti.dev' },
      { name: 'Veronika Rybak', linkedInUrl: 'https://www.linkedin.com/in/veronika-rybak-55379a337/' },
      { name: 'Ruslan Tsibirov', linkedInUrl: 'https://www.linkedin.com/in/ruslantsibirov/' }
    ],
  },
  {
    id: 1,
    title: 'ChatVocate: Azerbaijani Legal AI',
    description: 'A bilingual legal assistant for the Azerbaijani legal system, built on the OpenAI API, with retrieval over legal texts, two-language prompt design, and a deployed web front end.',
    image: '/legal-project/legal-project-cover.png',
    technologies: ['Next.js', 'TypeScript', 'OpenAI API', 'Tailwind CSS'],
    tags: ['LLM', 'Legal Tech', 'Bilingual', 'Next.js'],
    liveUrl: 'https://www.chatvocate.info',
    githubUrl: 'https://github.com/CoraEpiro/Legal-Project',
    collaborators: [],
  },
  {
    id: 5,
    title: 'Silent Routes: Holocaust Remembrance',
    description: 'A data-driven project to visualize the forced journeys of Holocaust victims, using data from the Arolsen Archives to shed light on historical patterns of persecution.',
    image: '/projects/holocaust-remembrance/data4good-cover.png',
    technologies: ['Data Visualization', 'React', 'Power BI', 'Dora AI'],
    tags: ['Data4Good', 'History', 'Data Science'],
    liveUrl: 'https://iwv9pz9d.dora.run/',
    githubUrl: 'https://github.com/denishotii/Data4Good25',
    collaborators: [
      { name: 'Denis Hoti', linkedInUrl: 'https://www.linkedin.com/in/denishoti/', websiteUrl: 'https://denishoti.dev' },
      { name: 'Veronika Rybak', linkedInUrl: 'https://www.linkedin.com/in/veronika-rybak-55379a337/' },
      { name: 'Ruslan Tsibirov', linkedInUrl: 'https://www.linkedin.com/in/ruslantsibirov/' },
      { name: 'Olga Ivanova', linkedInUrl: 'https://www.linkedin.com/in/olga-ivanova-datascientist/' }
    ],
  },
  {
    id: 6,
    title: 'coRELation: Religion, Diversity & Social Cohesion',
    description: 'A Data4Good26 hackathon project transforming survey data into insights on religious diversity, trust, and social cohesion.',
    image: '/projects/corel/corel-cover.jpg',
    technologies: ['Data Visualization', 'React', 'Survey Data', 'ReligionMonitor'],
    tags: ['Data4Good26', 'Hackathon', 'Social Cohesion', 'Data Science'],
    liveUrl: 'https://corel.denishoti.dev',
    githubUrl: 'https://github.com/denishotii/Data4Good26',
    collaborators: [
      { name: 'Denis Hoti', linkedInUrl: 'https://www.linkedin.com/in/denishoti/', websiteUrl: 'https://denishoti.dev' },
      { name: 'Veronika Rybak', linkedInUrl: 'https://www.linkedin.com/in/veronika-rybak-55379a337/' },
      { name: 'Ruslan Tsibirov', linkedInUrl: 'https://www.linkedin.com/in/ruslantsibirov/' },
      { name: 'Olga Ivanova', linkedInUrl: 'https://www.linkedin.com/in/olga-ivanova-datascientist/' },
      { name: 'Aleksandra Karabutova', linkedInUrl: 'https://www.linkedin.com/in/aleksandra-karabutova/' }
    ],
  },
  {
    id: 3,
    title: 'ConsulCon25 Presentation',
    description: 'Conference talk at ConsulCon25 on the Consul Democracy Analytics Tool, following a first-place finish at the Würzburg hackathon that qualified the team to present.',
    image: '/projects/consulcon25/consulcon25-cover.png',
    technologies: ['Presentation', 'Visualization'],
    tags: ['Speaking', 'Conference', 'Civic Tech'],
    liveUrl: '#',
    collaborators: [],
  },
  // AGV university project (kept near the end to avoid reordering indices used elsewhere)
  {
    id: 13,
    title: 'Intelligent Multilingual AGV',
    description: 'A university project combining RoboPro, Python services, MQTT, multilingual voice control, OCR-based parking, and grid navigation.',
    image: '/projects/university/agv-project/digital-project-presentation-slide-cover.png',
    technologies: ['Robotics', 'Automation', 'Systems Design'],
    tags: ['Robotics', 'Automation'],
    liveUrl: 'https://www.canva.com/design/DAGtDdUf82M/RX1r4-KkSrDdveJs6EAxww/view',
    githubUrl: '/projects/university/agv-project/Digital Project Report SS2025.pdf',
    collaborators: [],
  }
];

// Academic presentations data
const presentations: Project[] = [
  {
    id: 7,
    title: 'Differential Equations l: Newton\'s Law of Cooling (+experiment)',
    description: 'An in-depth mathematical exploration of Newton\'s Law of Cooling through theoretical analysis and practical experimentation, demonstrating how differential equations model real-world temperature phenomena.',
    image: '/projects/university/first-presentation-slide-cover.png',
    technologies: ['Mathematics', 'Differential Equations', 'Experimental Physics'],
    tags: ['Mathematics', 'Physics', 'Experiments', 'Education'],
    liveUrl: 'https://www.youtube.com/watch?v=6Sp1Di67pTI',
    collaborators: [],
  },
  {
    id: 8,
    title: 'Differential Equations l: 1-D Presentation of 3-Body Problem',
    description: 'A comprehensive mathematical presentation exploring the classical three-body problem through one-dimensional analysis, showcasing the complexity and beauty of celestial mechanics using differential equations.',
    image: '/projects/university/second-presentation-slide-cover.png',
    technologies: ['Mathematics', 'Celestial Mechanics', 'Differential Equations'],
    tags: ['Mathematics', 'Physics', 'Astronomy', 'Presentation'],
    liveUrl: 'https://gamma.app/docs/The-1D-Three-Body-Problem-A-Numerical-Approach-rr3lhiwd73g7j3s?mode=doc',
    collaborators: [],
  },
  {
    id: 9,
    title: 'Differential Equations III: Advanced Mathematical Analysis',
    description: 'Advanced mathematical analysis and differential equations presentation exploring complex mathematical concepts and their applications.',
    image: '/projects/university/third-presentation-slide-cover.png',
    technologies: ['Mathematics', 'Differential Equations', 'Advanced Analysis'],
    tags: ['Academic', 'Mathematics', 'Differential Equations', 'Advanced Analysis'],
    liveUrl: 'https://gamma.app/docs/pe8f0u9xf8gh5ls?following_id=lvwkfuullwkcsoq&follow_on_start=true',
    collaborators: [],
  },
  {
    id: 10,
    title: 'Locusts vs. Crops: A Predator-Prey Model',
    description: 'A comprehensive mathematical exploration of the dynamic interaction between locust populations and crop growth using predator-prey modeling with human intervention strategies.',
    image: '/projects/university/fourht-presentation-slide-cover.png',
    technologies: ['Mathematics', 'Differential Equations', 'Population Dynamics', 'Agricultural Modeling'],
    tags: ['Academic', 'Mathematics', 'Applied Modeling', 'Population Dynamics'],
    liveUrl: 'https://gamma.app/docs/Locusts-vs-Crops-A-Predator-Prey-Model-jexdfy88gxn63jt',
    collaborators: [],
  },
  {
    id: 11,
    title: 'Lagrangian Modeling: Falling Rope & Mass',
    description: 'A comprehensive exploration of Lagrangian mechanics applied to a rope with an attached object falling into a deep hole. Using energy conservation and the Euler-Lagrange equation to infer falling depth from measured fall time in a conservative system.',
    image: '/projects/university/fifth-presentation-slide-cover.png',
    technologies: ['Mathematics', 'Lagrangian Mechanics', 'Differential Equations', 'Physics'],
    tags: ['Academic', 'Mathematics', 'Physics', 'Mechanics'],
    liveUrl: 'https://gamma.app/docs/Lagrangian-Modeling-Falling-Rope-Mass-4bxdkfv0wgyghk9',
    collaborators: [],
  },
  {
    id: 12,
    title: 'Autocatalytic Chemical Reactions: From Reaction Structure to Emergent Dynamics',
    description: 'An exploration of how seemingly simple changes in chemical reaction structures lead to complex, nonlinear dynamics. Examining both deterministic (ODE-based) and stochastic (particle-based) modeling approaches to understand autocatalytic reactions and their emergent behaviors.',
    image: '/projects/university/sixth-presentation-slide-cover.png',
    technologies: ['Chemistry', 'Mathematics', 'Differential Equations', 'Stochastic Modeling', 'Simulation'],
    tags: ['Academic', 'Chemistry', 'Mathematics', 'Nonlinear Dynamics'],
    liveUrl: 'https://gamma.app/docs/Autocatalytic-Chemical-Reactions-From-Reaction-Structure-to-Emerg-3ffq619efwhr7p3',
    collaborators: [],
  },
  {
    id: 14,
    title: 'Universal Approximation, Transformers & Sumformers',
    description: 'An academic seminar for data science students on universal approximation, attention layers, transformers, and sumformers, connecting classical theory to modern deep learning architectures.',
    image: '/projects/university/seventh-presentation-slide-cover.png',
    technologies: ['Machine Learning', 'Deep Learning', 'Transformers', 'Neural Networks'],
    tags: ['Academic', 'Data Science', 'Transformers', 'Seminar'],
    liveUrl: 'https://canva.link/09it528ra1p1miu',
    collaborators: [],
  },
];

export default function ProjectsClient() {
  const de = useLanguage() === 'de';
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [showRainModal, setShowRainModal] = useState(false);
  const [showConsulConModal, setShowConsulConModal] = useState(false);
  const [showAgvModal, setShowAgvModal] = useState(false);
  const [showVgiModal, setShowVgiModal] = useState(false);
  const [showHolocaustModal, setShowHolocaustModal] = useState(false);
  const [showCorelModal, setShowCorelModal] = useState(false);
  const [showNewtonsCoolingModal, setShowNewtonsCoolingModal] = useState(false);
  const [showThreeBodyModal, setShowThreeBodyModal] = useState(false);
  const [showThirdPresentationModal, setShowThirdPresentationModal] = useState(false);
  const [showFourthPresentationModal, setShowFourthPresentationModal] = useState(false);
  const [showFifthPresentationModal, setShowFifthPresentationModal] = useState(false);
  const [showSixthPresentationModal, setShowSixthPresentationModal] = useState(false);
  const [showSeventhPresentationModal, setShowSeventhPresentationModal] = useState(false);
  const [showSeventhReport, setShowSeventhReport] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [isHtmlZoomed, setIsHtmlZoomed] = useState(false);
  const [htmlTheme, setHtmlTheme] = useState<'white' | 'black'>('white');
  const [isVisible, setIsVisible] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Initial fade-in
    setIsVisible(true);
    
    // Staggered project card animations
    [...projects, ...presentations].forEach((_, idx) => {
      setTimeout(() => {
        setVisibleProjects(prev => new Set(prev).add(idx));
      }, 200 + idx * 150);
    });
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {de ? 'Meine Projekte' : 'My Projects'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {de ? 'Eine Auswahl aktueller Arbeiten und persönlicher Projekte. Jedes Projekt steht für eine eigene Herausforderung und Lernerfahrung.' : 'A collection of my recent work and personal projects. Each project represents a unique challenge and learning experience.'}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-700 ease-out hover:scale-105 hover:shadow-2xl cursor-pointer group ${
                visibleProjects.has(idx) 
                  ? 'opacity-100 translate-y-0 rotate-0' 
                  : 'opacity-0 translate-y-12 rotate-1'
              }`}
              onClick={() => {
                if (project.title === 'ChatVocate: Azerbaijani Legal AI') {
                  setShowLegalModal(true);
                } else if (project.title === 'Rain in Australia') {
                  setShowRainModal(true);
                } else if (project.title === 'ConsulCon25 Presentation') {
                  setShowConsulConModal(true);
                } else if (project.title === 'Intelligent Multilingual AGV') {
                  setShowAgvModal(true);
                } else if (project.title === 'VGI-Flexi: Rural Transport Analytics') {
                  setShowVgiModal(true);
                } else if (project.title === 'Silent Routes: Holocaust Remembrance') {
                  setShowHolocaustModal(true);
                } else if (project.title === 'coRELation: Religion, Diversity & Social Cohesion') {
                  setShowCorelModal(true);
                }
              }}
            >
              <div className="relative h-48 w-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-500 dark:from-gray-700 dark:to-gray-900 overflow-hidden">
                <img loading="lazy" decoding="async" 
                  src={project.image} 
                  alt={project.title} 
                  className="object-contain h-32 transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {de ? ({
                    'VGI-Flexi: Rural Transport Analytics': 'VGI-Flexi: Analyse des ländlichen Verkehrs',
                    'ChatVocate: Azerbaijani Legal AI': 'ChatVocate: Juristische KI für Aserbaidschan',
                    'Silent Routes: Holocaust Remembrance': 'Silent Routes: Erinnerung an den Holocaust',
                    'coRELation: Religion, Diversity & Social Cohesion': 'coRELation: Religion, Vielfalt und gesellschaftlicher Zusammenhalt',
                    'ConsulCon25 Presentation': 'ConsulCon25-Präsentation',
                    'Intelligent Multilingual AGV': 'Intelligentes mehrsprachiges AGV',
                    "Differential Equations l: Newton's Law of Cooling (+experiment)": 'Differentialgleichungen I: Newtons Abkühlungsgesetz (mit Experiment)',
                    'Differential Equations l: 1-D Presentation of 3-Body Problem': 'Differentialgleichungen I: Das Dreikörperproblem in einer Dimension',
                    'Differential Equations III: Advanced Mathematical Analysis': 'Differentialgleichungen III: Vertiefte mathematische Analyse',
                    'Locusts vs. Crops: A Predator-Prey Model': 'Heuschrecken und Nutzpflanzen: Ein Räuber-Beute-Modell',
                    'Lagrangian Modeling: Falling Rope & Mass': 'Lagrange-Mechanik: Fallendes Seil mit Gewicht',
                    'Autocatalytic Chemical Reactions: From Reaction Structure to Emergent Dynamics': 'Autokatalytische chemische Reaktionen: Von der Reaktionsstruktur zur Dynamik',
                    'Universal Approximation, Transformers & Sumformers': 'Universelle Approximation, Transformer und Sumformer'
                  } as Record<string, string>)[project.title] || project.title : project.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  {de ? ({
                    'Rain in Australia': 'Binäre Wettervorhersage auf Basis von zehn Jahren australischer Wetterdaten: Vorhersage von Niederschlag am Folgetag anhand atmosphärischer Variablen.',
                    'VGI-Flexi: Rural Transport Analytics': 'Zweiter Platz beim VGI Challenge (3.000 €). Ein logistisches Regressionsmodell prognostiziert Nichterscheinen bei bedarfsgesteuertem ländlichem Verkehr.',
                    'ChatVocate: Azerbaijani Legal AI': 'Zweisprachiger Rechtsassistent für das aserbaidschanische Rechtssystem mit Suche in Gesetzestexten und einer bereitgestellten Weboberfläche.',
                    'Silent Routes: Holocaust Remembrance': 'Datenprojekt zur Visualisierung der Deportationswege von Holocaust-Opfern anhand von Daten des Arolsen Archives.',
                    'coRELation: Religion, Diversity & Social Cohesion': 'Hackathon-Projekt, das Umfragedaten zu religiöser Vielfalt, Vertrauen und gesellschaftlichem Zusammenhalt auswertet.',
                    'ConsulCon25 Presentation': 'Vortrag auf der ConsulCon25 über das Consul Democracy Analytics Tool nach dem ersten Platz beim Würzburger Hackathon.',
                    'Intelligent Multilingual AGV': 'Universitätsprojekt mit RoboPro, Python-Diensten, MQTT, mehrsprachiger Sprachsteuerung, OCR-Parken und Raster-Navigation.'
                  } as Record<string, string>)[project.title] || project.description : project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag, tagIdx) => (
                    <span 
                      key={tag} 
                      className={`inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-300 ${
                        visibleProjects.has(idx) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                      }`}
                      style={{ transitionDelay: `${400 + idx * 150 + tagIdx * 50}ms` }}
                    >
                      {de ? ({ 'Weather Data': 'Wetterdaten', 'Predictive Modelling': 'Prognosemodelle', Data: 'Daten', 'Data Science': 'Data Science', Transportation: 'Verkehr', 'Prediction Model': 'Prognosemodell', LLM: 'LLM', 'Legal Tech': 'Legal Tech', Bilingual: 'Zweisprachig', 'Data4Good': 'Data4Good', History: 'Geschichte', ML: 'ML', Hackathon: 'Hackathon', 'Social Cohesion': 'Gesellschaftlicher Zusammenhalt', 'Civic Tech': 'Civic Tech', Speaking: 'Vortrag', Robotics: 'Robotik', Automation: 'Automatisierung' } as Record<string, string>)[tag] || tag : tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* AGV University Project Modal */}
          {showAgvModal && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowAgvModal(false)}>
              <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full relative m-4 my-8 max-w-5xl max-h-[90vh] overflow-y-auto transform transition-all duration-500 ease-out animate-scale-in" onClick={e => e.stopPropagation()}>
                <button className="absolute top-4 right-4 text-4xl font-light text-gray-400 hover:text-white transition-colors z-10" onClick={() => setShowAgvModal(false)}>&times;</button>

                <h2 className="text-3xl font-bold text-white mb-6 px-8 pt-8">{de ? 'Intelligentes mehrsprachiges AGV für Raster-Navigation und Parken per OCR' : 'Intelligent Multilingual AGV for Grid Navigation and Parking via OCR'}</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start px-8 pb-8">
                  <div className="flex flex-col gap-6">
                    <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-700 bg-slate-950 cursor-pointer">
                      <img loading="lazy" decoding="async"
                        src="/projects/university/agv-project/digital-project-presentation-slide-cover.png"
                        alt="Intelligent Multilingual AGV cover"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onClick={() => setZoomedImage("/projects/university/agv-project/digital-project-presentation-slide-cover.png")}
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" onClick={() => setZoomedImage("/projects/university/agv-project/digital-project-presentation-slide-cover.png")}>
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-300">{de ? 'In diesem Universitätsprojekt entsteht ein AGV-Prototyp für die Logistik. Das Fahrzeug folgt einem farbcodierten Raster, reagiert auf mehrsprachige Sprachbefehle und übernimmt Navigation, Parken sowie Hindernisvermeidung mit RoboPro und Python.' : 'This university project builds a smart AGV prototype for logistics use cases. The system follows a color-coded grid, responds to multilingual voice commands, and switches between real-time navigation, parking, and obstacle handling through a hybrid RoboPro and Python architecture.'}</p>
                      <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                        <li><strong>{de ? 'Sprachsteuerung:' : 'Voice control:'}</strong> {de ? 'GPT interpretiert mehrsprachige Spracheingaben und wandelt sie in strukturierte Aktionen um.' : 'multilingual speech input interpreted with GPT and converted into structured actions'}</li>
                        <li><strong>{de ? 'Parken:' : 'Parking:'}</strong> {de ? 'OCR erkennt den Buchstaben „P“, um Parkplätze zu finden und das Fahrzeug auszurichten.' : 'OCR detects the letter “P” to locate and align with parking spots'}</li>
                        <li><strong>{de ? 'Steuerung:' : 'Control loop:'}</strong> {de ? 'RoboPro steuert Linienverfolgung und Zustandswechsel; Python übernimmt über MQTT die übergeordnete Logik.' : 'RoboPro manages line following and state switching while Python handles higher-level logic over MQTT'}</li>
                        <li><strong>{de ? 'Tests:' : 'Testing:'}</strong> {de ? 'Linienverfolgung, Parken, Hindernisvermeidung und schnelle Befehlswechsel wurden integriert und geprüft.' : 'integrated and validated across line following, parking, obstacle avoidance, and rapid command switching'}</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <a
                      href="https://www.canva.com/design/DAGtDdUf82M/RX1r4-KkSrDdveJs6EAxww/view?utm_content=DAGtDdUf82M&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h0ac547b620"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative group aspect-video rounded-lg overflow-hidden border border-gray-700"
                    >
                      <img loading="lazy" decoding="async"
                        src="/projects/university/agv-project/digital-project-presentation-slide-cover.png"
                        alt="Intelligent Multilingual AGV presentation"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">{de ? 'Präsentation ansehen' : 'View Presentation'}</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Academic Presentations Section */}
        <div className="mt-20">
          <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {de ? 'Akademische Präsentationen' : 'Academic Presentations'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {de ? 'Mathematische Themen und Präsentationen, in denen ich theoretische Inhalte mit praktischen Anwendungen verbinde.' : 'Mathematical explorations and academic presentations showcasing theoretical knowledge and practical applications.'}
            </p>
          </div>

          {/* Presentations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {presentations.map((presentation, idx) => (
              <div
                key={presentation.id}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-700 ease-out hover:scale-105 hover:shadow-2xl cursor-pointer group ${
                  visibleProjects.has(idx + projects.length) 
                    ? 'opacity-100 translate-y-0 rotate-0' 
                    : 'opacity-0 translate-y-12 rotate-1'
                }`}
                onClick={() => {
                  if (presentation.title === 'Differential Equations l: Newton\'s Law of Cooling (+experiment)') {
                    setShowNewtonsCoolingModal(true);
                  } else if (presentation.title === 'Differential Equations l: 1-D Presentation of 3-Body Problem') {
                    setShowThreeBodyModal(true);
                  } else if (presentation.title === 'Differential Equations III: Advanced Mathematical Analysis') {
                    setShowThirdPresentationModal(true);
                  } else if (presentation.title === 'Locusts vs. Crops: A Predator-Prey Model') {
                    setShowFourthPresentationModal(true);
                  } else if (presentation.title === 'Lagrangian Modeling: Falling Rope & Mass') {
                    setShowFifthPresentationModal(true);
                  } else if (presentation.title === 'Autocatalytic Chemical Reactions: From Reaction Structure to Emergent Dynamics') {
                    setShowSixthPresentationModal(true);
                  } else if (presentation.title === 'Universal Approximation, Transformers & Sumformers') {
                    setShowSeventhPresentationModal(true);
                  }
                }}
              >
                <div className="relative h-48 w-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-500 dark:from-gray-700 dark:to-gray-900 overflow-hidden">
                  <img loading="lazy" decoding="async" 
                    src={presentation.image} 
                    alt={presentation.title} 
                    className="object-contain h-32 transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {de ? ({
                      7: "Differentialgleichungen I: Newtons Abkühlungsgesetz (mit Experiment)",
                      8: 'Differentialgleichungen I: Das Dreikörperproblem in einer Dimension',
                      9: 'Differentialgleichungen III: Vertiefte mathematische Analyse',
                      10: 'Heuschrecken und Nutzpflanzen: Ein Räuber-Beute-Modell',
                      11: 'Lagrange-Mechanik: Fallendes Seil mit Gewicht',
                      12: 'Autokatalytische Reaktionen: Von der Reaktionsstruktur zur Dynamik',
                      14: 'Universelle Approximation, Transformer und Sumformer',
                    } as Record<number, string>)[presentation.id] : presentation.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                    {de ? ({
                      7: 'Eine mathematische Untersuchung des Newtonschen Abkühlungsgesetzes mit theoretischer Herleitung und praktischem Experiment. Dabei wird gezeigt, wie Differentialgleichungen Temperaturverläufe beschreiben.',
                      8: 'Eine Präsentation zum klassischen Dreikörperproblem, untersucht in einer Dimension. Sie zeigt, wie Differentialgleichungen die Bewegung mehrerer Himmelskörper beschreiben.',
                      9: 'Eine Präsentation zu fortgeschrittener mathematischer Analysis und Differentialgleichungen mit ausgewählten Konzepten und Anwendungen.',
                      10: 'Ein mathematisches Modell für das Zusammenspiel von Heuschreckenpopulationen und Pflanzenwachstum, einschließlich möglicher menschlicher Eingriffe.',
                      11: 'Eine Untersuchung der Lagrange-Mechanik anhand eines fallenden Seils mit angehängter Masse. Aus Energieerhaltung und der Euler-Lagrange-Gleichung wird die Falltiefe aus der gemessenen Fallzeit bestimmt.',
                      12: 'Wie kleine Änderungen in chemischen Reaktionen komplexe, nichtlineare Dynamiken erzeugen können. Die Präsentation vergleicht deterministische Modelle mit Differentialgleichungen und stochastische Teilchenmodelle.',
                      14: 'Ein Seminar für Data-Science-Studierende über universelle Approximation, Attention, Transformer und Sumformer. Es verbindet klassische Theorie mit modernen Deep-Learning-Architekturen.',
                    } as Record<number, string>)[presentation.id] : presentation.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {presentation.tags.map((tag, tagIdx) => (
                      <span 
                        key={tag} 
                        className={`inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-300 ${
                          visibleProjects.has(idx + projects.length) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                        }`}
                        style={{ transitionDelay: `${400 + (idx + projects.length) * 150 + tagIdx * 50}ms` }}
                      >
                        {de ? ({ Mathematics: 'Mathematik', Physics: 'Physik', Experiments: 'Experimente', Education: 'Lehre', Astronomy: 'Astronomie', Presentation: 'Präsentation', Academic: 'Akademisch', 'Differential Equations': 'Differentialgleichungen', 'Advanced Analysis': 'Vertiefte Analysis', 'Applied Modeling': 'Angewandte Modellierung', 'Population Dynamics': 'Populationsdynamik', Mechanics: 'Mechanik', Chemistry: 'Chemie', 'Nonlinear Dynamics': 'Nichtlineare Dynamik', 'Data Science': 'Data Science', Transformers: 'Transformer', Seminar: 'Seminar' } as Record<string, string>)[tag] || tag : tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ChatVocate Legal AI Modal */}
        {showLegalModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowLegalModal(false)}>
            <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full relative m-4 my-8 max-w-6xl max-h-[90vh] overflow-y-auto transform transition-all duration-500 ease-out animate-scale-in" onClick={e => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-4xl font-light text-gray-400 hover:text-white transition-colors z-10" onClick={() => setShowLegalModal(false)}>&times;</button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-8">
                {/* Left Column: Image & Details */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-3xl font-bold text-white">{de ? 'ChatVocate: Zweisprachiger Rechtsassistent für Aserbaidschan' : 'ChatVocate: Azerbaijani Legal AI Assistant'}</h2>
                  <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-600">
                    <img loading="lazy" decoding="async" 
                      src="/legal-project/legal-project-cover.png" 
                      alt="ChatVocate Legal AI Project Cover" 
                      className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer"
                      onClick={() => setZoomedImage("/legal-project/legal-project-cover.png")}
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" onClick={() => setZoomedImage("/legal-project/legal-project-cover.png")}>
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300">{de ? 'Ein zweisprachiger Rechtsassistent für das aserbaidschanische Rechtssystem. Er verbindet KI-gestützte Antworten mit einer klaren Bedienung.' : 'A sophisticated, bilingual legal assistant chatbot specifically designed for the Azerbaijani legal system, combining advanced AI technology with intuitive user experience.'}</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                      <li><strong>{de ? 'KI-Integration:' : 'AI Integration:'}</strong> {de ? 'OpenAI GPT-4 für kontextbezogene Antworten auf Rechtsfragen' : 'Powered by OpenAI GPT-4 for contextually accurate legal responses'}</li>
                      <li><strong>{de ? 'Zweisprachigkeit:' : 'Bilingual Support:'}</strong> {de ? 'Aserbaidschanisch mit Echtzeitübersetzung ins Englische' : 'Native Azerbaijani with real-time English translation'}</li>
                      <li><strong>{de ? 'Sicherheit:' : 'Enterprise Security:'}</strong> {de ? 'JWT-Authentifizierung, getrennte Nutzerkonten und sichere Sitzungen' : 'JWT authentication, user isolation, and secure session management'}</li>
                      <li><strong>{de ? 'Technologien:' : 'Modern Tech Stack:'}</strong> Next.js 14, TypeScript, Tailwind CSS</li>
                      <li><strong>{de ? 'Chatverwaltung:' : 'Chat Management:'}</strong> {de ? 'Mehrere Chats mit gespeicherten Gesprächen und Kontext' : 'Multi-chat interface with conversation persistence and context memory'}</li>
                    </ul>
                  </div>
                  <div className="pt-4 flex gap-4">
                    <a href="https://www.chatvocate.info" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition-colors text-center flex-1">
                      {de ? 'Website besuchen' : 'Visit Live Site'}
                    </a>
                    <a href="https://github.com/CoraEpiro/Legal-Project" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-gray-700 text-white font-bold rounded-lg shadow hover:bg-gray-600 transition-colors text-center flex-1">
                      {de ? 'Auf GitHub ansehen' : 'View GitHub'}
                    </a>
                  </div>
                </div>

                {/* Right Column: Technical Details & Architecture */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-semibold text-white">{de ? 'Technischer Aufbau' : 'Technical Architecture'}</h3>
                  
                  {/* Technology Stack */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Verwendete Technologien' : 'Technology Stack'}</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-blue-400 font-semibold mb-2">{de ? 'Benutzeroberfläche' : 'Frontend'}</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• Next.js 14 ({de ? 'App-Router' : 'App Router'})</li>
                          <li>• TypeScript</li>
                          <li>• Tailwind CSS</li>
                          <li>• {de ? 'React-Hooks' : 'React Hooks'}</li>
                        </ul>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-green-400 font-semibold mb-2">{de ? 'Backend' : 'Backend'}</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• Next.js API Routes</li>
                          <li>• {de ? 'JWT-Authentifizierung' : 'JWT Authentication'}</li>
                          <li>• {de ? 'bcryptjs-Verschlüsselung' : 'bcryptjs Encryption'}</li>
                          <li>• {de ? 'REST-APIs' : 'RESTful APIs'}</li>
                        </ul>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-purple-400 font-semibold mb-2">{de ? 'KI und Dienste' : 'AI & Services'}</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• OpenAI GPT-4</li>
                          <li>• {de ? 'Echtzeitübersetzung' : 'Real-time Translation'}</li>
                          <li>• {de ? 'Antworten im Streaming' : 'Streaming Responses'}</li>
                          <li>• {de ? 'Kontextgedächtnis' : 'Context Memory'}</li>
                        </ul>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-orange-400 font-semibold mb-2">{de ? 'Bereitstellung' : 'Deployment'}</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• {de ? 'Hosting mit Vercel' : 'Vercel Hosting'}</li>
                          <li>• {de ? 'Serverlose Funktionen' : 'Serverless Functions'}</li>
                          <li>• {de ? 'Edge-Computing' : 'Edge Computing'}</li>
                          <li>• {de ? 'Automatische Skalierung' : 'Auto-scaling'}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Target Users */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Zielgruppen' : 'Target Users'}</h4>
                    <div className="space-y-3">
                      <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                        <h5 className="text-blue-400 font-semibold mb-2">{de ? 'Juristische Fachkräfte' : 'Legal Professionals'}</h5>
                        <p className="text-gray-400 text-sm">{de ? 'Schnelle Rechtsrecherche, Hinweise auf Rechtsprechung, Unterstützung bei Dokumenten und Orientierung zu Vorschriften.' : 'Quick legal research, case law references, document drafting assistance, and regulatory compliance guidance.'}</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                        <h5 className="text-green-400 font-semibold mb-2">{de ? 'Privatpersonen und Unternehmen' : 'Citizens & Businesses'}</h5>
                        <p className="text-gray-400 text-sm">{de ? 'Informationen zu Rechten, Prüfung von Verträgen, Erklärungen zu Verfahren und erste rechtliche Orientierung.' : 'Understanding legal rights, contract review, legal procedure explanations, and basic legal guidance.'}</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                        <h5 className="text-purple-400 font-semibold mb-2">{de ? 'Bildungseinrichtungen' : 'Educational Institutions'}</h5>
                        <p className="text-gray-400 text-sm">{de ? 'Recherche für Jurastudierende, Erklärungen rechtlicher Konzepte, Übungsfälle und mehrsprachige Lernangebote.' : 'Law student research tool, legal concept explanations, practice scenarios, and multilingual legal education support.'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Leistungsmerkmale' : 'Performance Highlights'}</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-blue-400 font-semibold">{de ? 'Antwortzeit:' : 'Response Time:'}</span>
                          <p className="text-gray-400">{de ? '3 Sekunden' : '3 seconds'}</p>
                        </div>
                        <div>
                          <span className="text-green-400 font-semibold">{de ? 'Verfügbarkeit:' : 'Uptime:'}</span>
                          <p className="text-gray-400">{de ? '99,9 % Verfügbarkeit' : '99.9% availability'}</p>
                        </div>
                        <div>
                          <span className="text-purple-400 font-semibold">{de ? 'Sicherheit:' : 'Security:'}</span>
                          <p className="text-gray-400">{de ? 'Keine bekannten Sicherheitslücken' : 'Zero vulnerabilities'}</p>
                        </div>
                        <div>
                          <span className="text-orange-400 font-semibold">{de ? 'Design:' : 'Design:'}</span>
                          <p className="text-gray-400">{de ? 'Für Mobilgeräte optimiert und responsiv' : 'Mobile-first responsive'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rain in Australia Modal */}
        {showRainModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowRainModal(false)}>
            <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full relative m-4 my-8 max-w-6xl max-h-[90vh] overflow-y-auto transform transition-all duration-500 ease-out animate-scale-in" onClick={e => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-4xl font-light text-gray-400 hover:text-white transition-colors z-10" onClick={() => setShowRainModal(false)}>&times;</button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-8">
                {/* Left Column: Image & Details */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-3xl font-bold text-white">{de ? 'Regen in Australien: Eine Prognoseanalyse' : 'Rain in Australia: A Predictive Analysis'}</h2>
                  <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-600">
                    <img loading="lazy" decoding="async" 
                      src="/projects/rain-in-australia/rain-in-australia-cover.jpg" 
                      alt="Rain in Australia Project Cover" 
                      className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer"
                      onClick={() => setZoomedImage("/projects/rain-in-australia/rain-in-australia-cover.jpg")}
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" onClick={() => setZoomedImage("/projects/rain-in-australia/rain-in-australia-cover.jpg")}>
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300">{de ? 'Dieses Projekt nutzt umfangreiche australische Wetterdaten, um vorherzusagen, ob es am nächsten Tag regnet.' : 'This project dives into a large dataset of weather conditions in Australia to predict whether it will rain the next day.'}</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                      <li><strong>{de ? 'Datenaufbereitung:' : 'Data Processing:'}</strong> {de ? 'Umgang mit fehlenden Werten, Skalierung und Kodierung kategorialer Merkmale.' : 'Handled missing values, feature scaling, and categorical data encoding.'}</li>
                      <li><strong>{de ? 'Maschinelles Lernen:' : 'Machine Learning:'}</strong> {de ? 'Implementierung und Bewertung eines logistischen Regressionsmodells.' : 'Implemented and evaluated a Logistic Regression model.'}</li>
                      <li><strong>{de ? 'Technologien:' : 'Technology:'}</strong> {de ? 'Python, Pandas und Scikit-learn in Jupyter Notebook.' : 'Utilized Python, Pandas, and Scikit-learn in a Jupyter Notebook.'}</li>
                    </ul>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-gray-700">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Mitwirkende' : 'Collaborator'}</h4>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-gray-800 border border-gray-600">
                        <span className="font-medium text-white">Denis Hoti</span>
                        <div className="flex items-center gap-3">
                          <a href="https://www.linkedin.com/in/denishoti/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                          </a>
                          <a href="https://denishoti.dev" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 flex gap-4">
                    <a href="https://github.com/CoraEpiro/rain-in-australia-binder" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-gray-700 text-white font-bold rounded-lg shadow hover:bg-gray-600 transition-colors text-center w-full">
                      {de ? 'Auf GitHub ansehen' : 'View on GitHub'}
                    </a>
                  </div>
                </div>

                {/* Right Column: Notebook Preview */}
                <div className="h-full flex flex-col">
                  <h3 className="text-xl font-semibold text-white mb-3 mt-3">{de ? 'Notebook-Vorschau' : 'Notebook Preview'}</h3>
                  
                  {/* HTML Preview Section */}
                  <div className="space-y-3 mb-6">
                    <h4 className="text-lg font-semibold text-white">{de ? 'HTML-Berichtsvorschau' : 'HTML Report Preview'}</h4>
                    <div className="relative rounded-lg overflow-hidden border border-gray-700">
                      <iframe
                        src="/projects/rain-in-australia/RainInAustralia.html"
                        className="w-full h-[600px] bg-white"
                        title="Rain in Australia HTML Report"
                        scrolling="yes"
                      />
                      <button
                        className="absolute bottom-2 right-2 w-10 h-8 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center justify-center text-base shadow-lg z-10"
                        onClick={() => setIsHtmlZoomed(true)}
                        title="Enlarge HTML Preview"
                        style={{ pointerEvents: 'auto' }}
                      >
                        ⛶
                      </button>
                    </div>
                  </div>
                  
                  {/* PowerPoint Presentation Section */}
                  <div className="space-y-3 mb-6">
                    <h4 className="text-lg font-semibold text-white">{de ? 'PowerPoint-Präsentation' : 'PowerPoint Presentation'}</h4>
                    <a
                      href="https://kude-my.sharepoint.com/:p:/g/personal/ali_guliyev_stud_ku_de/EfCfWPZhgTpGo-svG7enMvoBrsg2OhPVhcyPrirNq3oyGg?e=GB6saq"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative group aspect-video rounded-lg overflow-hidden border border-gray-700"
                    >
                      <img loading="lazy" decoding="async"
                        src="/projects/rain-in-australia/rain-in-australia-cover.jpg"
                        alt="PowerPoint Presentation Preview"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">{de ? 'Präsentation ansehen' : 'View Presentation'}</span>
                      </div>
                    </a>
                  </div>

                  {/* Interactive Binder Link */}
                  <div className="text-center pt-4">
                    <a
                      href="https://mybinder.org/v2/gh/CoraEpiro/rain-in-australia-binder/main?filepath=Rain%20in%20Australia.ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow hover:bg-green-700 transition-colors"
                    >
                      {de ? 'Interaktive Version in Binder starten' : 'Launch Interactive Version in Binder'}
                    </a>
                  </div>
                  
                  {/* Download Files Section */}
                  <div className="text-sm text-gray-400 p-3 bg-gray-800 rounded-lg border border-gray-700 mt-4">
                    <h4 className="font-bold text-white mb-2">{de ? 'Dateien herunterladen' : 'Download Files'}</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li><a href="/projects/rain-in-australia/RainInAustralia.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{de ? 'HTML-Bericht (.html)' : 'HTML Report (.html)'}</a></li>
                      <li><a href="https://github.com/CoraEpiro/rain-in-australia-binder/blob/main/Rain%20in%20Australia.ipynb" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{de ? 'Jupyter-Notebook (.ipynb)' : 'Jupyter Notebook (.ipynb)'}</a></li>
                      <li><a href="https://github.com/CoraEpiro/rain-in-australia-binder/blob/main/weatherAUS.csv" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{de ? 'Datensatz (.csv)' : 'Dataset (.csv)'}</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ConsulCon25 Modal */}
        {showConsulConModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowConsulConModal(false)}>
            <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full relative m-4 my-8 max-w-6xl max-h-[90vh] overflow-y-auto transform transition-all duration-500 ease-out animate-scale-in" onClick={e => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-4xl font-light text-gray-400 hover:text-white transition-colors z-10" onClick={() => setShowConsulConModal(false)}>&times;</button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-8">
                {/* Left Column: Image & Details */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-3xl font-bold text-white">{de ? 'ConsulCon25: Von Würzburg nach Gran Canaria' : 'ConsulCon25: From Würzburg to Gran Canaria'}</h2>
                  <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-600">
                    <img loading="lazy" decoding="async" 
                      src="/projects/consulcon25/consulcon25-cover.png" 
                      alt="ConsulCon25 Project Cover" 
                      className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer"
                      onClick={() => setZoomedImage("/projects/consulcon25/consulcon25-cover.png")}
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" onClick={() => setZoomedImage("/projects/consulcon25/consulcon25-cover.png")}>
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300">{de ? 'Das Projekt wurde beim Würzburger Hackathon entwickelt und anschließend auf der ConsulCon25 in Gran Canaria, Spanien, vorgestellt.' : 'A presentation project showcasing work developed in Würzburg and presented at the ConsulCon25 conference in Gran Canaria, Spain.'}</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                      <li><strong>{de ? 'Entwicklung:' : 'Development:'}</strong> {de ? 'Konzeption und Umsetzung in Würzburg' : 'Project conceptualization and development in Würzburg, Germany'}</li>
                      <li><strong>{de ? 'Vortrag:' : 'Presentation:'}</strong> {de ? 'Präsentation auf der ConsulCon25 in Gran Canaria' : 'Live presentation at ConsulCon25 in Gran Canaria, Spain'}</li>
                      <li><strong>{de ? 'Inhalte:' : 'Content:'}</strong> {de ? 'Videovortrag, interaktive Website und Canva-Folien' : 'Video presentation, interactive website, and Canva slides'}</li>
                      <li><strong>{de ? 'Technologien:' : 'Technology:'}</strong> {de ? 'Webtechnologien und Präsentationstools' : 'Modern web technologies and presentation tools'}</li>
                    </ul>
                    <div className="space-y-3 pt-4 border-t border-gray-700">
                      <h4 className="text-lg font-semibold text-white">{de ? 'Mitwirkende' : 'Collaborators'}</h4>
                      <div className="flex flex-col gap-3">
                        {[
                          { name: 'Denis Hoti', linkedInUrl: 'https://www.linkedin.com/in/denishoti/', websiteUrl: 'https://denishoti.dev' },
                          { name: 'Veronika Rybak', linkedInUrl: 'https://www.linkedin.com/in/veronika-rybak-55379a337/' },
                          { name: 'Ruslan Tsibirov', linkedInUrl: 'https://www.linkedin.com/in/ruslantsibirov/' }
                        ].map(c => (
                          <div key={c.name} className="flex items-center justify-between p-2 rounded-lg bg-gray-800 border border-gray-600">
                            <span className="font-medium text-white">{c.name}</span>
                            <div className="flex items-center gap-3">
                              {c.linkedInUrl && <a href={c.linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                              </a>}
                              {c.websiteUrl && <a href={c.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>
                              </a>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 flex gap-4">
                      <a href="https://github.com/denishotii/ConsulAnalytics" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-gray-700 text-white font-bold rounded-lg shadow hover:bg-gray-600 transition-colors text-center w-full">{de ? 'Auf GitHub ansehen' : 'View on GitHub'}</a>
                    </div>
                  </div>
                </div>

                {/* Right Column: Video, Website, and Presentation */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-semibold text-white">{de ? 'Projektbestandteile' : 'Project Components'}</h3>
                  
                  {/* Website Section */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Projektwebsite' : 'Hosted Website'}</h4>
                    <a
                      href="https://consulanalytics.denishoti.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative group aspect-video rounded-lg overflow-hidden border border-gray-700"
                    >
                      <img loading="lazy" decoding="async"
                        src="/projects/consulcon25/consulcon25-project-cover.png"
                        alt="Hosted Website Preview"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">{de ? 'Website besuchen' : 'Visit Website'}</span>
                      </div>
                    </a>
                  </div>

                  {/* Canva Presentation Section */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Canva-Präsentation' : 'Canva Presentation'}</h4>
                    <a
                      href="https://www.canva.com/design/DAGdxuu9z08/ud-4yV5dVODq2phEJc7Ahg/view?utm_content=DAGdxuu9z08&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h7d882f3544#1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative group aspect-video rounded-lg overflow-hidden border border-gray-700"
                    >
                      <img loading="lazy" decoding="async"
                        src="/projects/consulcon25/consulcon25-presentation-cover.png"
                        alt="Canva Presentation Preview"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">{de ? 'Präsentation ansehen' : 'View Presentation'}</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VGI Challenge Modal */}
        {showVgiModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowVgiModal(false)}>
            <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full relative m-4 my-8 max-w-6xl max-h-[90vh] overflow-y-auto transform transition-all duration-500 ease-out animate-scale-in" onClick={e => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-4xl font-light text-gray-400 hover:text-white transition-colors z-10" onClick={() => setShowVgiModal(false)}>&times;</button>
              
                  <h2 className="text-3xl font-bold text-white mb-6 px-8 pt-8">{de ? 'VGI-Flexi: Analyse des ländlichen Verkehrs' : 'VGI-Flexi: Rural Transport Analytics'}</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start px-8 pb-8">
                {/* Left Column: Image & Details */}
                <div className="flex flex-col gap-6">
                  <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-600">
                    <img loading="lazy" decoding="async" 
                      src="/projects/university/vgi-challenge/vgi-cover.png" 
                      alt="VGI Challenge Project Cover" 
                      className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer"
                      onClick={() => setZoomedImage("/projects/university/vgi-challenge/vgi-cover.png")}
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" onClick={() => setZoomedImage("/projects/university/vgi-challenge/vgi-cover.png")}>
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300">{de ? 'Eine Analyseplattform zur Verbesserung des öffentlichen Verkehrs im ländlichen Raum. Ein logistisches Regressionsmodell prognostiziert, welche Fahrgäste den VGI-Flexi-Service nicht nutzen, und unterstützt so eine verlässlichere Planung.' : 'An analytics platform for optimizing rural public transportation. Using a logistic regression model, this project predicts passenger no-shows for the VGI-Flexi service, enabling data-driven adjustments for more reliable and sustainable operations.'}</p>
                    <div className="space-y-3 pt-4 border-t border-gray-700">
                      <h4 className="text-lg font-semibold text-white">{de ? 'Mitwirkende' : 'Collaborators'}</h4>
                      <div className="flex flex-col gap-3">
                        {[
                          { name: 'Denis Hoti', linkedInUrl: 'https://www.linkedin.com/in/denishoti/', websiteUrl: 'https://denishoti.dev' },
                          { name: 'Veronika Rybak', linkedInUrl: 'https://www.linkedin.com/in/veronika-rybak-55379a337/' },
                          { name: 'Ruslan Tsibirov', linkedInUrl: 'https://www.linkedin.com/in/ruslantsibirov/' }
                        ].map(c => (
                          <div key={c.name} className="flex items-center justify-between p-2 rounded-lg bg-gray-800 border border-gray-600">
                            <span className="font-medium text-white">{c.name}</span>
                            <div className="flex items-center gap-3">
                              {c.linkedInUrl && <a href={c.linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                              </a>}
                              {c.websiteUrl && <a href={c.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>
                              </a>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Website */}
                <div className="flex flex-col gap-6">
                  <a href="https://8nxly8ub2.dora.run" target="_blank" rel="noopener noreferrer" className="block relative group aspect-video rounded-lg overflow-hidden border border-gray-700">
                    <img loading="lazy" decoding="async" src="/projects/university/vgi-challenge/vgi-cover.png" alt="Hosted Website Preview" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">{de ? 'Website besuchen' : 'Visit Website'}</span>
                    </div>
                  </a>
                  <div className="pt-4 flex gap-4">
                    <a href="https://github.com/denishotii/ConsulAnalytics" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-gray-700 text-white font-bold rounded-lg shadow hover:bg-gray-600 transition-colors text-center w-full">{de ? 'Auf GitHub ansehen' : 'View on GitHub'}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Holocaust Remembrance Modal */}
        {showHolocaustModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowHolocaustModal(false)}>
            <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full relative m-4 my-8 max-w-6xl max-h-[90vh] overflow-y-auto transform transition-all duration-500 ease-out animate-scale-in" onClick={e => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-4xl font-light text-gray-400 hover:text-white transition-colors z-10" onClick={() => setShowHolocaustModal(false)}>&times;</button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-8">
                {/* Left Column: Image & Details */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-3xl font-bold text-white">{de ? 'Silent Routes: Erinnerung an den Holocaust' : 'Silent Routes: Holocaust Remembrance'}</h2>
                  <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-600">
                    <img loading="lazy" decoding="async" 
                      src="/projects/holocaust-remembrance/data4good-cover.png" 
                      alt="Holocaust Remembrance Project Cover" 
                      className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer"
                      onClick={() => setZoomedImage("/projects/holocaust-remembrance/data4good-cover.png")}
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" onClick={() => setZoomedImage("/projects/holocaust-remembrance/data4good-cover.png")}>
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300">{de ? 'Ein datenbasiertes Projekt zur Visualisierung der Deportationswege von Holocaust-Opfern. Daten des Arolsen Archives machen historische Muster der Verfolgung sichtbar und laden zur Auseinandersetzung mit den Einzelschicksalen ein.' : 'A data-driven project to visualize the forced journeys of Holocaust victims. Using data from the Arolsen Archives, this project sheds light on the harrowing statistical patterns of persecution, empowering exploration and remembrance.'}</p>
                    <div className="space-y-3 pt-4 border-t border-gray-700">
                      <h4 className="text-lg font-semibold text-white">{de ? 'Mitwirkende' : 'Collaborators'}</h4>
                      <div className="flex flex-col gap-3">
                        {[
                          { name: 'Denis Hoti', linkedInUrl: 'https://www.linkedin.com/in/denishoti/', websiteUrl: 'https://denishoti.dev' },
                          { name: 'Veronika Rybak', linkedInUrl: 'https://www.linkedin.com/in/veronika-rybak-55379a337/' },
                          { name: 'Ruslan Tsibirov', linkedInUrl: 'https://www.linkedin.com/in/ruslantsibirov/' },
                          { name: 'Olga Ivanova', linkedInUrl: 'https://www.linkedin.com/in/olga-ivanova-datascientist/' }
                        ].map(c => (
                          <div key={c.name} className="flex items-center justify-between p-2 rounded-lg bg-gray-800 border border-gray-600">
                            <span className="font-medium text-white">{c.name}</span>
                            <div className="flex items-center gap-3">
                              {c.linkedInUrl && <a href={c.linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                              </a>}
                              {c.websiteUrl && <a href={c.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>
                              </a>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Website */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-semibold text-white mt-3">{de ? 'Projektressourcen' : 'Project Resources'}</h3>
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Projektwebsite' : 'Hosted Website'}</h4>
                    <a href="https://iwv9pz9d.dora.run/" target="_blank" rel="noopener noreferrer" className="block relative group aspect-video rounded-lg overflow-hidden border border-gray-700">
                      <img loading="lazy" decoding="async" src="/projects/holocaust-remembrance/data4good-cover.png" alt="Hosted Website Preview" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">{de ? 'Website besuchen' : 'Visit Website'}</span>
                      </div>
                    </a>
                  </div>
                  <div className="pt-4 flex gap-4">
                    <a href="https://github.com/denishotii/Data4Good25" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-gray-700 text-white font-bold rounded-lg shadow hover:bg-gray-600 transition-colors text-center w-full">{de ? 'Auf GitHub ansehen' : 'View on GitHub'}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* coRELation Data4Good26 Modal */}
        {showCorelModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowCorelModal(false)}>
            <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full relative m-4 my-8 max-w-6xl max-h-[90vh] overflow-y-auto transform transition-all duration-500 ease-out animate-scale-in" onClick={e => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-4xl font-light text-gray-400 hover:text-white transition-colors z-10" onClick={() => setShowCorelModal(false)}>&times;</button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-8">
                {/* Left Column: Image & Details */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-3xl font-bold text-white">coRELation: {de ? 'Religion, Vielfalt und gesellschaftlicher Zusammenhalt' : 'Religion, Diversity & Social Cohesion'}</h2>
                  <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-600">
                    <img loading="lazy" decoding="async" 
                      src="/projects/corel/corel-cover.jpg" 
                      alt="coRELation Data4Good26 Project Cover" 
                      className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer"
                      onClick={() => setZoomedImage("/projects/corel/corel-cover.jpg")}
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" onClick={() => setZoomedImage("/projects/corel/corel-cover.jpg")}>
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300">{de ? 'Ein Hackathon-Projekt von Data4Good26, das Umfragedaten zu religiöser Vielfalt, Vertrauen und gesellschaftlichem Zusammenhalt auswertet. Es untersucht, wie das Zusammenleben verschiedener Religionen Solidarität und pluralistische Gesellschaften prägt.' : 'A Data4Good26 hackathon project that transforms complex survey data into meaningful insights on religious diversity, trust, and social cohesion. It explores how religious coexistence shapes solidarity and pluralistic societies.'}</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                      <li><strong>{de ? 'Datenbasiert:' : 'Data-driven:'}</strong> {de ? 'Umfragedaten des ReligionMonitor werden für Politik, Bildung und Zivilgesellschaft visualisiert.' : 'ReligionMonitor survey data visualized for policymakers, educators, and civil society.'}</li>
                      <li><strong>{de ? 'Zentrale Themen:' : 'Key themes:'}</strong> {de ? 'Ängste und Wissenslücken, Solidarität in Krisen und der Einfluss persönlicher Begegnungen.' : 'Fear and knowledge gaps, solidarity in crisis, and how contact improves perception.'}</li>
                      <li><strong>{de ? 'Live-Plattform:' : 'Live platform:'}</strong> {de ? 'Erkenntnisse erkunden, Geschichten lesen und Kennzahlen zur Vielfalt zwischen Ländern vergleichen.' : 'Explore insights, read stories, and compare diversity metrics across countries.'}</li>
                    </ul>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-gray-700">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Mitwirkende' : 'Collaborators'}</h4>
                    <div className="flex flex-col gap-3">
                      {[
                        { name: 'Denis Hoti', linkedInUrl: 'https://www.linkedin.com/in/denishoti/', websiteUrl: 'https://denishoti.dev' },
                        { name: 'Veronika Rybak', linkedInUrl: 'https://www.linkedin.com/in/veronika-rybak-55379a337/' },
                        { name: 'Ruslan Tsibirov', linkedInUrl: 'https://www.linkedin.com/in/ruslantsibirov/' },
                        { name: 'Olga Ivanova', linkedInUrl: 'https://www.linkedin.com/in/olga-ivanova-datascientist/' },
                        { name: 'Aleksandra Karabutova', linkedInUrl: 'https://www.linkedin.com/in/aleksandra-karabutova/' }
                      ].map(c => (
                        <div key={c.name} className="flex items-center justify-between p-2 rounded-lg bg-gray-800 border border-gray-600">
                          <span className="font-medium text-white">{c.name}</span>
                          <div className="flex items-center gap-3">
                            {c.linkedInUrl && <a href={c.linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            </a>}
                            {c.websiteUrl && <a href={c.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>
                            </a>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: single preview with hover links for Website & Canva */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-semibold text-white">{de ? 'Projektressourcen' : 'Project Resources'}</h3>
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Website und Canva' : 'Website & Canva'}</h4>
                    <div className="relative group aspect-video rounded-lg overflow-hidden border border-gray-700">
                    <img loading="lazy" decoding="async"
                      src="/projects/corel/corel-cover.jpg"
                      alt="coRELation Project"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-4">
                      <a
                        href="https://corel.denishoti.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition-colors"
                      >{de ? 'Canva-Präsentation öffnen' : 'Open Canva Presentation'}</a>
                      <a
                        href="https://www.canva.com/design/DAG_V3nTRwg/LqzjoeOI0dX_0IokSNwIDQ/view?utm_content=DAG_V3nTRwg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=he5c1a8d7a3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 bg-gray-700 text-white font-bold rounded-lg shadow hover:bg-gray-600 transition-colors"
                      >
                        View Canva
                      </a>
                    </div>
                  </div>
                  </div>
                  <a href="https://github.com/denishotii/Data4Good26" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-gray-700 text-white font-bold rounded-lg shadow hover:bg-gray-600 transition-colors text-center w-full">{de ? 'Auf GitHub ansehen' : 'View on GitHub'}</a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Newton's Law of Cooling Modal */}
        {showNewtonsCoolingModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowNewtonsCoolingModal(false)}>
            <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full relative m-4 my-8 max-w-6xl max-h-[90vh] overflow-y-auto transform transition-all duration-500 ease-out animate-scale-in" onClick={e => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-4xl font-light text-gray-400 hover:text-white transition-colors z-10" onClick={() => setShowNewtonsCoolingModal(false)}>&times;</button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-8">
                {/* Left Column: Image & Details */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-3xl font-bold text-white">{de ? 'Newtonsches Abkühlungsgesetz (mit Experiment)' : "Newton's Law of Cooling (+experiment)"}</h2>
                  
                  {/* Presentation Slide Preview */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Präsentationsfolien' : 'Presentation Slides'}</h4>
                    <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-600">
                      <a href="https://docs.google.com/presentation/d/1xk0J1aK9BfF4BHXvrGLYMr8QyUF7GW2TfDVLwmbsvxU/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        <img loading="lazy" decoding="async" 
                          src={presentations.find(p => p.id === 7)?.image || "/projects/university/first-presentation-slide-cover.png"} 
                          alt="Newton's Law of Cooling Presentation Cover" 
                          className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                          <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">{de ? 'Präsentation ansehen' : 'View Presentation'}</span>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Embedded YouTube Video */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Experimentvideo' : 'Experiment video'}</h4>
                    <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg border border-gray-600">
                      <iframe
                        src="https://www.youtube.com/embed/6Sp1Di67pTI"
                        title="Newton's Law of Cooling Experiment"
                        className="absolute top-0 left-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300">{de ? 'Eine mathematische Untersuchung des Newtonschen Abkühlungsgesetzes mit theoretischer Herleitung und praktischem Experiment. Das Projekt zeigt, wie Differentialgleichungen reale Temperaturverläufe beschreiben.' : "An in-depth mathematical exploration of Newton's Law of Cooling through theoretical analysis and practical experimentation. This project demonstrates how differential equations model real-world temperature phenomena."}</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                      <li><strong>{de ? 'Mathematische Herleitung:' : 'Mathematical Theory:'}</strong> {de ? 'Herleitung und Analyse der Abkühlungsgleichung' : 'Derivation and analysis of the cooling differential equation'}</li>
                      <li><strong>{de ? 'Versuchsaufbau:' : 'Experimental Design:'}</strong> {de ? 'Temperaturmessung und Datenerhebung' : 'Temperature measurement setup and data collection'}</li>
                      <li><strong>{de ? 'Datenauswertung:' : 'Data Analysis:'}</strong> {de ? 'Kurvenanpassung und Parameterschätzung' : 'Curve fitting and parameter estimation'}</li>
                      <li><strong>{de ? 'Anwendungen:' : 'Real-world Applications:'}</strong> {de ? 'Forensik, Lebensmittelsicherheit und Ingenieurwesen' : 'Forensic science, food safety, and engineering'}</li>
                      <li><strong>{de ? 'Lernziel:' : 'Educational Value:'}</strong> {de ? 'Verbindung von Theorie und praktischer Anwendung' : 'Bridge between theory and practical application'}</li>
                    </ul>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <a href={presentations.find(p => p.id === 7)?.liveUrl || "#"} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition-colors text-center flex-1">
                      {de ? 'Auf YouTube ansehen' : 'Open in YouTube'}
                    </a>
                    <a href="https://docs.google.com/presentation/d/1xk0J1aK9BfF4BHXvrGLYMr8QyUF7GW2TfDVLwmbsvxU/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition-colors text-center flex-1">{de ? 'Canva-Präsentation öffnen' : 'Open Canva Presentation'}</a>
                  </div>
                </div>

                {/* Right Column: Mathematical Details */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-semibold text-white">{de ? 'Mathematisches Modell' : 'Mathematical Framework'}</h3>
                  
                  {/* Differential Equation */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Kern-Gleichung' : 'Core Equation'}</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-center">
                        <div className="text-2xl text-blue-400 mb-3 font-serif flex items-center justify-center" style={{fontFamily: 'Times, serif'}}>
                          <div className="flex flex-col items-center mr-3">
                            <span className="italic text-2xl border-b-2 border-blue-400 px-2 pb-1">dT</span>
                            <span className="italic text-2xl pt-1">dt</span>
                          </div>
                          <span className="mx-3 text-3xl">=</span>
                          <span className="text-2xl">−<span className="italic">k</span>(<span className="italic">T</span> − <span className="italic">T</span><sub className="text-lg">env</sub>)</span>
                        </div>
                        <p className="text-sm text-gray-400">
                          {de ? 'Dabei steht ' : 'where '}<span className="italic text-blue-300">T</span>{de ? ' für die Temperatur, ' : ' is temperature, '}<span className="italic text-blue-300">t</span>{de ? ' für die Zeit, ' : ' is time, '}<span className="italic text-blue-300">k</span>{de ? ' für die Abkühlungskonstante und ' : ' is cooling constant, '}<span className="italic text-blue-300">T<sub>env</sub></span>{de ? ' für die Umgebungstemperatur.' : ' is environmental temperature'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Experimental Setup */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Bestandteile des Experiments' : 'Experimental Components'}</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-blue-400 font-semibold mb-2">{de ? 'Temperaturmessung' : 'Temperature Measurement'}</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• {de ? 'Digitales Thermometer' : 'Digital thermometer setup'}</li>
                          <li>• {de ? 'Zeitreihenmessung' : 'Time-series data collection'}</li>
                          <li>• {de ? 'Kontrolle der Umgebungsbedingungen' : 'Environmental control'}</li>
                        </ul>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-green-400 font-semibold mb-2">{de ? 'Datenanalyse' : 'Data Analysis'}</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• {de ? 'Anpassung einer Exponentialkurve' : 'Exponential curve fitting'}</li>
                          <li>• {de ? 'Parameterschätzung' : 'Parameter estimation'}</li>
                          <li>• {de ? 'Fehleranalyse' : 'Error analysis'}</li>
                        </ul>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-purple-400 font-semibold mb-2">{de ? 'Anwendungen' : 'Applications'}</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• {de ? 'Forensische Bestimmung des Todeszeitpunkts' : 'Forensic time of death'}</li>
                          <li>• {de ? 'Lebensmittelsicherheit' : 'Food safety protocols'}</li>
                          <li>• {de ? 'Wärmeübertragung in der Technik' : 'Engineering heat transfer'}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Solution & Results */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Analytische Lösung' : 'Analytical Solution'}</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-center">
                        <div className="text-xl text-green-400 mb-3 font-serif" style={{fontFamily: 'Times, serif'}}>
                          <span className="italic">T</span>(<span className="italic">t</span>) = <span className="italic">T</span><sub className="text-sm">env</sub> + (<span className="italic">T</span><sub className="text-sm">₀</sub> − <span className="italic">T</span><sub className="text-sm">env</sub>)<span className="italic">e</span><sup className="text-sm">−<span className="italic">kt</span></sup>
                        </div>
                        <p className="text-sm text-gray-400">
                          {de ? 'Exponentielle Abkühlung mit der Anfangstemperatur ' : 'Exponential decay solution with initial condition '}<span className="italic text-green-300">T<sub>₀</sub></span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Three-Body Problem Modal */}
        {showThreeBodyModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowThreeBodyModal(false)}>
            <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full relative m-4 my-8 max-w-6xl max-h-[90vh] overflow-y-auto transform transition-all duration-500 ease-out animate-scale-in" onClick={e => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-4xl font-light text-gray-400 hover:text-white transition-colors z-10" onClick={() => setShowThreeBodyModal(false)}>&times;</button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-8">
                {/* Left Column: Image & Details */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-3xl font-bold text-white">{de ? 'Das Dreikörperproblem in einer Dimension' : '1-D Presentation of 3-Body Problem'}</h2>
                  {/* Presentation Slide Preview */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Präsentationsfolien' : 'Presentation Slides'}</h4>
                    <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-600">
                      <a href="https://gamma.app/docs/The-1D-Three-Body-Problem-A-Numerical-Approach-rr3lhiwd73g7j3s?mode=doc" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        <img loading="lazy" decoding="async" 
                          src={presentations.find(p => p.id === 8)?.image || "/projects/university/second-presentation-slide-cover.png"} 
                          alt="Three-Body Problem Presentation Cover" 
                          className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                          <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">{de ? 'Präsentation ansehen' : 'View Presentation'}</span>
                        </div>
                      </a>
                    </div>
                  </div>
                  {/* Embedded YouTube Video */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Präsentationsvideo' : 'Presentation video'}</h4>
                    <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg border border-gray-600">
                      <iframe
                        src="https://www.youtube.com/embed/j_LV2-FKD8I"
                        title="Three-Body Problem Presentation Video"
                        className="absolute top-0 left-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300">{de ? 'Die Präsentation untersucht das klassische Dreikörperproblem anhand einer eindimensionalen Analyse. Sie veranschaulicht die Komplexität der Himmelsmechanik mit Differentialgleichungen.' : 'A mathematical presentation exploring the classical three-body problem through one-dimensional analysis and differential equations.'}</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                      <li><strong>{de ? 'Klassische Mechanik:' : 'Classical Mechanics:'}</strong> {de ? 'Anwendung der Newtonschen Gesetze auf Gravitationssysteme' : "Newton's laws applied to gravitational systems"}</li>
                      <li><strong>{de ? 'Differentialgleichungen:' : 'Differential Equations:'}</strong> {de ? 'Analyse eines nichtlinearen Systems zweiter Ordnung' : 'Second-order nonlinear system analysis'}</li>
                      <li><strong>{de ? 'Mathematische Komplexität:' : 'Mathematical Complexity:'}</strong> {de ? 'Chaostheorie und empfindliche Abhängigkeit von Anfangsbedingungen' : 'Chaos theory and sensitive dependence'}</li>
                      <li><strong>{de ? 'Historischer Kontext:' : 'Historical Context:'}</strong> {de ? 'Poincarés Beiträge und neuere Entwicklungen' : "Poincaré's contributions and modern developments"}</li>
                      <li><strong>{de ? 'Astronomische Anwendungen:' : 'Astronomical Applications:'}</strong> {de ? 'Planetenbewegungen und Orbitalmechanik' : 'Planetary motion and orbital mechanics'}</li>
                    </ul>
                  </div>
                </div>

                {/* Right Column: Mathematical Details */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-semibold text-white">{de ? 'Mathematisches Modell' : 'Mathematical Framework'}</h3>
                  
                  {/* Core Equations */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Gleichungssystem' : 'System of Equations'}</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-center space-y-3" style={{fontFamily: 'Times, serif'}}>
                        <div className="text-xl text-blue-400">
                          <span className="italic">m</span><sub className="text-sm">₁</sub><span className="italic">r̈</span><sub className="text-sm">₁</sub> = Σ <span className="italic">F</span><sub className="text-sm">₁ⱼ</sub>
                        </div>
                        <div className="text-xl text-blue-400">
                          <span className="italic">m</span><sub className="text-sm">₂</sub><span className="italic">r̈</span><sub className="text-sm">₂</sub> = Σ <span className="italic">F</span><sub className="text-sm">₂ⱼ</sub>
                        </div>
                        <div className="text-xl text-blue-400">
                          <span className="italic">m</span><sub className="text-sm">₃</sub><span className="italic">r̈</span><sub className="text-sm">₃</sub> = Σ <span className="italic">F</span><sub className="text-sm">₃ⱼ</sub>
                        </div>
                        <p className="text-sm text-gray-400 pt-2">
                          {de ? 'Gekoppelte Differentialgleichungen zweiter Ordnung für drei gravitativ wechselwirkende Körper.' : 'Coupled second-order differential equations for three gravitating bodies'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Problem Characteristics */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Eigenschaften des Problems' : 'Problem Characteristics'}</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-purple-400 font-semibold mb-2">{de ? 'Gravitationskräfte' : 'Gravitational Forces'}</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• {de ? 'Wechselwirkung nach dem inversen Quadratgesetz' : 'Inverse square law interactions'}</li>
                          <li>• {de ? 'Energieerhaltung' : 'Conservation of energy'}</li>
                          <li>• {de ? 'Impulserhaltung' : 'Conservation of momentum'}</li>
                        </ul>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-orange-400 font-semibold mb-2">{de ? 'Dynamisches Verhalten' : 'Dynamical Behavior'}</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• {de ? 'Chaotische Bahnen' : 'Chaotic trajectories'}</li>
                          <li>• {de ? 'Empfindlichkeit gegenüber Anfangsbedingungen' : 'Sensitive initial conditions'}</li>
                          <li>• {de ? 'Keine allgemeine analytische Lösung' : 'No general analytical solution'}</li>
                        </ul>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-green-400 font-semibold mb-2">{de ? 'Numerische Methoden' : 'Numerical Methods'}</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• {de ? 'Runge-Kutta-Integration' : 'Runge-Kutta integration'}</li>
                          <li>• {de ? 'Symplektische Algorithmen' : 'Symplectic algorithms'}</li>
                          <li>• {de ? 'Phasenraumanalyse' : 'Phase space analysis'}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Historical Context */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Historische Bedeutung' : 'Historical Significance'}</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="space-y-2">
                        <p className="text-gray-300 text-sm"><strong>Henri Poincaré (1889):</strong> {de ? 'Zeigte, dass keine allgemeine Lösung existiert.' : 'Proved no general solution exists'}</p>
                        <p className="text-gray-300 text-sm"><strong>{de ? 'Moderne:' : 'Modern Era:'}</strong> {de ? 'Computersimulationen machen das chaotische Verhalten sichtbar.' : 'Computer simulations reveal chaotic nature'}</p>
                        <p className="text-gray-300 text-sm"><strong>{de ? 'Anwendungen:' : 'Applications:'}</strong> {de ? 'Raumflugbahnen und Asteroidendynamik.' : 'Spacecraft trajectories, asteroid dynamics'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Third Academic Presentation Modal */}
        {showThirdPresentationModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowThirdPresentationModal(false)}>
            <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full relative m-4 my-8 max-w-6xl max-h-[90vh] overflow-y-auto transform transition-all duration-500 ease-out animate-scale-in" onClick={e => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-4xl font-light text-gray-400 hover:text-white transition-colors z-10" onClick={() => setShowThirdPresentationModal(false)}>&times;</button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-8">
                {/* Left Column: Image & Details */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-3xl font-bold text-white">{de ? 'Differentialgleichungen III: Vertiefte mathematische Analyse' : 'Differential Equations III: Advanced Mathematical Analysis'}</h2>
                  {/* Presentation Slide Preview */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Präsentationsfolien' : 'Presentation Slides'}</h4>
                    <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-600">
                      <a href="https://gamma.app/docs/pe8f0u9xf8gh5ls?following_id=lvwkfuullwkcsoq&follow_on_start=true" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        <img loading="lazy" decoding="async" 
                          src="/projects/university/third-presentation-slide-cover.png" 
                          alt="Advanced Mathematical Analysis Presentation Cover" 
                          className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                          <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">{de ? 'Präsentation ansehen' : 'View Presentation'}</span>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300">{de ? 'Eine Präsentation zu komplexen Differentialgleichungen und ihren Anwendungen in der modernen Mathematik und Physik.' : 'An advanced mathematical analysis presentation exploring complex differential equations and their applications in modern mathematics and physics.'}</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                      <li><strong>{de ? 'Vertiefte Mathematik:' : 'Advanced Mathematics:'}</strong> {de ? 'Analyse komplexer Differentialgleichungen' : 'Complex differential equation analysis'}</li>
                      <li><strong>{de ? 'Mathematische Theorie:' : 'Mathematical Theory:'}</strong> {de ? 'Theoretische Grundlagen und Beweise' : 'Theoretical foundations and proofs'}</li>
                      <li><strong>{de ? 'Anwendungen:' : 'Practical Applications:'}</strong> {de ? 'Mathematische Methoden in realen Fragestellungen' : 'Real-world mathematical applications'}</li>
                      <li><strong>{de ? 'Forschung:' : 'Academic Research:'}</strong> {de ? 'Aktuelle mathematische Konzepte' : 'Cutting-edge mathematical concepts'}</li>
                    </ul>
                  </div>
                </div>

                {/* Right Column: Mathematical Analysis Details */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-semibold text-white">{de ? 'Vertiefte mathematische Analyse' : 'Advanced Mathematical Analysis'}</h3>
                  
                  {/* Mathematical Concepts */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Zentrale mathematische Konzepte' : 'Core Mathematical Concepts'}</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="space-y-3">
                        <div className="text-center">
                          <p className="text-blue-400 font-semibold">{de ? 'Vertiefte Differentialgleichungen' : 'Advanced Differential Equations'}</p>
                          <p className="text-sm text-gray-400">{de ? 'Komplexe mathematische Analyse und theoretische Grundlagen' : 'Complex mathematical analysis and theoretical foundations'}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-purple-400 font-semibold">{de ? 'Mathematische Theorie' : 'Mathematical Theory'}</p>
                          <p className="text-sm text-gray-400">{de ? 'Theoretische Beweise und mathematische Strenge' : 'Theoretical proofs and mathematical rigor'}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-green-400 font-semibold">{de ? 'Praktische Anwendungen' : 'Practical Applications'}</p>
                          <p className="text-sm text-gray-400">{de ? 'Anwendungen vertiefter Mathematik in realen Fragestellungen' : 'Real-world applications of advanced mathematics'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Analysis Framework */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Analysemethoden' : 'Analysis Framework'}</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-blue-400 font-semibold mb-2">{de ? 'Mathematische Methoden' : 'Mathematical Methods'}</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• {de ? 'Vertiefte Differentialgleichungen' : 'Advanced differential equations'}</li>
                          <li>• {de ? 'Komplexe mathematische Analyse' : 'Complex mathematical analysis'}</li>
                          <li>• {de ? 'Theoretische Grundlagen' : 'Theoretical foundations'}</li>
                        </ul>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-purple-400 font-semibold mb-2">{de ? 'Analytische Verfahren' : 'Analytical Techniques'}</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• {de ? 'Mathematische Beweise' : 'Mathematical proofs'}</li>
                          <li>• {de ? 'Theoretische Analyse' : 'Theoretical analysis'}</li>
                          <li>• {de ? 'Vertiefte Konzepte' : 'Advanced concepts'}</li>
                        </ul>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-green-400 font-semibold mb-2">{de ? 'Forschungsanwendungen' : 'Research Applications'}</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• {de ? 'Akademische Forschung' : 'Academic research'}</li>
                          <li>• {de ? 'Mathematische Modellierung' : 'Mathematical modeling'}</li>
                          <li>• {de ? 'Wissenschaftliche Anwendungen' : 'Scientific applications'}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Academic Context */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Akademischer Kontext' : 'Academic Context'}</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="space-y-2">
                        <p className="text-gray-300 text-sm"><strong>{de ? 'Vertiefte Mathematik:' : 'Advanced Mathematics:'}</strong> {de ? 'Analyse komplexer Differentialgleichungen' : 'Complex differential equation analysis'}</p>
                        <p className="text-gray-300 text-sm"><strong>{de ? 'Akademische Forschung:' : 'Academic Research:'}</strong> {de ? 'Aktuelle mathematische Konzepte' : 'Cutting-edge mathematical concepts'}</p>
                        <p className="text-gray-300 text-sm"><strong>{de ? 'Anwendungen:' : 'Applications:'}</strong> {de ? 'Mathematische Anwendungen in der Praxis' : 'Real-world mathematical applications'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Locusts vs. Crops Modal */}
        {showFourthPresentationModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowFourthPresentationModal(false)}>
            <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full relative m-4 my-8 max-w-6xl max-h-[90vh] overflow-y-auto transform transition-all duration-500 ease-out animate-scale-in" onClick={e => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-4xl font-light text-gray-400 hover:text-white transition-colors z-10" onClick={() => setShowFourthPresentationModal(false)}>&times;</button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-8">
                {/* Left Column: Image & Details */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-3xl font-bold text-white">{de ? 'Heuschrecken und Nutzpflanzen: Ein Räuber-Beute-Modell' : 'Locusts vs. Crops: A Predator-Prey Model'}</h2>
                  {/* Presentation Slide Preview */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Präsentationsfolien' : 'Presentation Slides'}</h4>
                    <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-600">
                      <a href="https://gamma.app/docs/Locusts-vs-Crops-A-Predator-Prey-Model-jexdfy88gxn63jt" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        <img loading="lazy" decoding="async"
                          src="/projects/university/fourht-presentation-slide-cover.png"
                          alt="Locusts vs. Crops Presentation Cover"
                          className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                          <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">{de ? 'Präsentation ansehen' : 'View Presentation'}</span>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300">{de ? 'Die Präsentation modelliert das Zusammenspiel von Heuschreckenpopulationen und Pflanzenwachstum. Dazu gehören mögliche Eingriffe zur Schädlingsbekämpfung und deren Auswirkungen auf die Landwirtschaft.' : 'A mathematical exploration of the interaction between locust populations and crop growth, including intervention strategies for agricultural pest management.'}</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                      <li><strong>{de ? 'Grunddynamik:' : 'Basic Dynamics:'}</strong> {de ? 'Exponentielles und logistisches Wachstum von Nutzpflanzen und Heuschrecken' : 'Exponential and logistic growth models for crops and locust populations'}</li>
                      <li><strong>{de ? 'Räuber-Beute-Beziehung:' : 'Predator-Prey Interaction:'}</strong> {de ? 'Pflanzenverbrauch und Fortpflanzung der Heuschrecken in Abhängigkeit vom Nahrungsangebot' : 'Modeling crop consumption and locust reproduction based on food availability'}</li>
                      <li><strong>{de ? 'Eingriffe:' : 'Human Intervention:'}</strong> {de ? 'Schwellenwertbasierte Sprühmaßnahmen mit Kosten-Nutzen-Abwägung' : 'Threshold-based spraying function with cost-benefit analysis'}</li>
                      <li><strong>{de ? 'Optimierung:' : 'Optimization:'}</strong> {de ? 'Suche nach passenden Maßnahmen für eine nachhaltige Landwirtschaft' : 'Finding optimal intervention strategies for sustainable agriculture'}</li>
                      <li><strong>{de ? 'Anwendungen:' : 'Real-world Applications:'}</strong> {de ? 'Schädlingsbekämpfung und biologische Kontrollstrategien' : 'Agricultural pest management and biological control strategies'}</li>
                    </ul>
                  </div>
                </div>

                {/* Right Column: Mathematical Details */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-semibold text-white">{de ? 'Mathematisches Modell' : 'Mathematical Framework'}</h3>

                  {/* Core Equations */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Gleichungen des dynamischen Modells' : 'Dynamic Model Equations'}</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-center space-y-2" style={{fontFamily: 'Times, serif'}}>
                        <div className="text-sm text-gray-400 mb-2"><strong>{de ? 'Ausgangsmodell (ohne Wechselwirkung):' : 'Initial Model (without interaction):'}</strong></div>
                        <div className="text-sm text-blue-400 mb-4">
                          C'(t) = <span className="italic">r</span>C ({de ? 'exponentiell' : 'Exponential'})<br/>
                          L'(t) = −<span className="italic">d</span>L ({de ? 'Abnahme ohne Nutzpflanzen' : 'Decay without crops'})
                        </div>
                        <div className="text-sm text-gray-400 mb-2"><strong>{de ? 'Mit Wechselwirkung:' : 'With Interaction:'}</strong></div>
                        <div className="text-sm text-green-400 mb-4">
                          C'(t) = <span className="italic">r</span>C(1 − C/K) − <span className="italic">aCL</span><br/>
                          L'(t) = −<span className="italic">d</span>L + <span className="italic">bCL</span>
                        </div>
                        <div className="text-sm text-gray-400 mb-2"><strong>{de ? 'Mit Sprühmaßnahme:' : 'With Spraying Intervention:'}</strong></div>
                        <div className="text-sm text-purple-400">
                          C'(t) = <span className="italic">r</span>C(1 − C/K) − <span className="italic">aCL</span><br/>
                          L'(t) = <span className="italic">b</span>CL − (<span className="italic">d</span> + u(t))L
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Model Components */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Zentrale Parameter' : 'Key Parameters'}</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-green-400 font-semibold mb-2">{de ? 'Nutzpflanzendynamik' : 'Crop Dynamics'}</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• <span className="italic">r</span>: {de ? 'Wachstumsrate' : 'Growth rate'}</li>
                          <li>• <span className="italic">K</span>: {de ? 'Umweltkapazität' : 'Carrying capacity'}</li>
                          <li>• <span className="italic">a</span>: {de ? 'Fraßrate' : 'Consumption rate'}</li>
                        </ul>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-yellow-400 font-semibold mb-2">{de ? 'Heuschreckendynamik' : 'Locust Dynamics'}</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• <span className="italic">d</span>: {de ? 'Natürliche Sterberate' : 'Natural death rate'}</li>
                          <li>• <span className="italic">b</span>: {de ? 'Umwandlungseffizienz' : 'Conversion efficiency'}</li>
                          <li>• <span className="italic">u(t)</span>: {de ? 'Eingriffsmaßnahme' : 'Control intervention'}</li>
                        </ul>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-blue-400 font-semibold mb-2">{de ? 'Eingriffsstrategie' : 'Intervention Strategy'}</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• {de ? 'Schwellenwertbasierte Sprühmaßnahmen' : 'Threshold-based spraying'}</li>
                          <li>• {de ? 'Kosten-Nutzen-Optimierung' : 'Cost-benefit optimization'}</li>
                          <li>• {de ? 'Gleichgewichtsanalyse' : 'Equilibrium analysis'}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Applications */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Anwendungen' : 'Real-World Applications'}</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="space-y-2">
                        <p className="text-gray-300 text-sm"><strong>{de ? 'Landwirtschaftlicher Pflanzenschutz:' : 'Agricultural Pest Management:'}</strong> {de ? 'Heuschreckenschwärme vorhersagen und Sprühzeitpunkte optimieren.' : 'Predicting locust swarms and optimizing spray schedules'}</p>
                        <p className="text-gray-300 text-sm"><strong>{de ? 'Wirtschaftliche Optimierung:' : 'Economic Optimization:'}</strong> {de ? 'Kosten der Maßnahmen gegen Ernteverluste abwägen.' : 'Balancing spray costs against crop damage losses'}</p>
                        <p className="text-gray-300 text-sm"><strong>{de ? 'Nachhaltige Lösungen:' : 'Sustainable Solutions:'}</strong> {de ? 'Pestizideinsatz verringern und Nutzpflanzen schützen.' : 'Minimizing pesticide use while protecting crops'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lagrangian Modeling Modal */}
        {showFifthPresentationModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowFifthPresentationModal(false)}>
            <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full relative m-4 my-8 max-w-6xl max-h-[90vh] overflow-y-auto transform transition-all duration-500 ease-out animate-scale-in" onClick={e => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-4xl font-light text-gray-400 hover:text-white transition-colors z-10" onClick={() => setShowFifthPresentationModal(false)}>&times;</button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-8">
                {/* Left Column: Image & Details */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-3xl font-bold text-white">{de ? 'Lagrange-Mechanik: Fallendes Seil mit Gewicht' : 'Lagrangian Modeling: Falling Rope & Mass'}</h2>
                  {/* Presentation Slide Preview */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Präsentationsfolien' : 'Presentation Slides'}</h4>
                    <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-600">
                      <a href="https://gamma.app/docs/Lagrangian-Modeling-Falling-Rope-Mass-4bxdkfv0wgyghk9" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        <img loading="lazy" decoding="async"
                          src="/projects/university/fifth-presentation-slide-cover.png"
                          alt="Lagrangian Modeling Presentation Cover"
                          className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                          <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">{de ? 'Präsentation ansehen' : 'View Presentation'}</span>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300">{de ? 'Die Präsentation wendet die Lagrange-Mechanik auf ein Seil mit angehängter Masse an, das in die Tiefe fällt. Mit Energieerhaltung und der Euler-Lagrange-Gleichung wird aus der gemessenen Fallzeit die Falltiefe bestimmt.' : 'An exploration of Lagrangian mechanics applied to a rope with an attached object falling into a deep hole. Energy conservation and the Euler-Lagrange equation are used to infer falling depth from measured fall time.'}</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                      <li><strong>{de ? 'Aufbau:' : 'Problem setup:'}</strong> {de ? 'Ein Seil mit gleichmäßiger linearer Massendichte fällt zusammen mit einem angehängten Körper.' : 'Rope with linear mass density falling with attached object'}</li>
                      <li><strong>{de ? 'Systemvariablen:' : 'System variables:'}</strong> {de ? 'Gesamtmasse M des Seils, Masse m des Körpers, Seillänge ℓ und Fallstrecke x(t).' : 'Total rope mass M, object mass m, rope length ℓ, and fallen distance x(t)'}</li>
                      <li><strong>{de ? 'Energieanalyse:' : 'Energy analysis:'}</strong> {de ? 'Kinetische und potenzielle Energie des Seils und des Körpers.' : 'Kinetic and potential energy of rope and mass system'}</li>
                      <li><strong>{de ? 'Lagrange-Mechanik:' : 'Lagrangian mechanics:'}</strong> {de ? 'Aufstellung von L = T - V und Anwendung der Euler-Lagrange-Gleichung.' : 'Constructing L = T - V and applying Euler-Lagrange equation'}</li>
                      <li><strong>{de ? 'Energieerhaltung:' : 'Energy conservation:'}</strong> {de ? 'Herleitung der Geschwindigkeitsbeziehung aus der erhaltenen Energie.' : 'Using conserved energy to derive velocity relations'}</li>
                      <li><strong>{de ? 'Quadratur:' : 'Solution by quadrature:'}</strong> {de ? 'Numerische Integration zur Lösung des inversen Problems.' : 'Numerical integration to solve the inverse problem'}</li>
                    </ul>
                  </div>
                </div>

                {/* Right Column: Mathematical Details */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-semibold text-white">{de ? 'Mathematisches Modell' : 'Mathematical Framework'}</h3>

                  {/* System Description */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Systemvariablen und Massen' : 'System Variables & Masses'}</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-sm text-gray-300 space-y-2 font-mono">
                        <div><strong>M:</strong> {de ? 'Gesamtmasse des Seils' : 'Total rope mass'}</div>
                        <div><strong>m:</strong> {de ? 'Masse des angehängten Körpers' : 'Attached object mass'}</div>
                        <div><strong>ℓ:</strong> {de ? 'Gesamtlänge des Seils' : 'Total rope length'}</div>
                        <div><strong>λ:</strong> {de ? 'Lineare Massendichte = M/ℓ' : 'Linear mass density = M/ℓ'}</div>
                        <div><strong>x(t):</strong> {de ? 'Gefallene Seillänge zum Zeitpunkt t' : 'Fallen rope length at time t'}</div>
                        <div><strong>g:</strong> {de ? 'Erdbeschleunigung' : 'Gravitational acceleration'}</div>
                        <div className="pt-2 border-t border-gray-600 mt-2"><strong>{de ? 'Effektive Masse:' : 'Effective mass:'}</strong> m_eff(t) = m + λx(t)</div>
                      </div>
                    </div>
                  </div>

                  {/* Kinetic Energy */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Kinetische Energie (T)' : 'Kinetic Energy (T)'}</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-center space-y-2" style={{fontFamily: 'Times, serif'}}>
                        <div className="text-sm text-blue-400">
                          {de ? 'Alle bewegten Teile haben dieselbe Geschwindigkeit ẋ(t).' : 'All moving parts share velocity ẋ(t)'}
                        </div>
                        <div className="text-lg text-green-400 mt-3">
                          T = ½(m + λx)ẋ²
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Potential Energy */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Potenzielle Energie (V)' : 'Potential Energy (V)'}</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-sm text-gray-300 space-y-2 mb-3">
                        <div><strong>{de ? 'Körper:' : 'Object:'}</strong> V_obj = -mgx</div>
                        <div><strong>{de ? 'Seil:' : 'Rope:'}</strong> V_rope = -½λgx²</div>
                      </div>
                      <div className="text-center text-green-400" style={{fontFamily: 'Times, serif'}}>
                        V = -mgx - ½λgx²
                      </div>
                    </div>
                  </div>

                  {/* Lagrangian */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Lagrange-Funktion (L = T - V)' : 'Lagrangian (L = T - V)'}</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-center" style={{fontFamily: 'Times, serif'}}>
                        <div className="text-yellow-400 text-lg">
                          L = ½(m + λx)ẋ² + mgx + ½λgx²
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Equation of Motion */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Bewegungsgleichung' : 'Equation of Motion'}</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-sm text-gray-300 mb-3">
                        {de ? 'Aus der Euler-Lagrange-Gleichung:' : 'From the Euler-Lagrange equation:'}
                      </div>
                      <div className="text-center text-purple-400" style={{fontFamily: 'Times, serif'}}>
                        ẍ = g - (½λẋ²)/(m + λx)
                      </div>
                    </div>
                  </div>

                  {/* Energy Conservation */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Lösung mit Energieerhaltung' : 'Solution via Energy Conservation'}</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-sm text-gray-300 space-y-2">
                        <div>{de ? 'Die Gesamtenergie E = T + V bleibt erhalten.' : 'Total energy E = T + V is conserved'}</div>
                        <div className="pt-2 border-t border-gray-600">{de ? 'Anfangsbedingung: x(0) = 0, E = 0' : 'Initial condition: x(0) = 0, E = 0'}</div>
                        <div className="text-center text-green-400 mt-3" style={{fontFamily: 'Times, serif'}}>
                          ẋ = √(2gx(m + ½λx)/(m + λx))
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quadrature Solution */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Lösung durch Quadratur' : 'Solution by Quadrature'}</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-sm text-gray-300 mb-3">
                        {de ? 'Trennung der Variablen und anschließende Integration:' : 'Separating variables and integrating:'}
                      </div>
                      <div className="text-center text-blue-400 text-sm" style={{fontFamily: 'Times, serif'}}>
                        t(x) = ∫₀ˣ √[(m + λx')/(2gx'(m + ½λx'))] dx'
                      </div>
                      <div className="text-gray-400 text-sm mt-3">
                        {de ? 'Das Integral ergibt eine implizite Lösung, die numerisch berechnet werden kann.' : 'This integral provides an implicit solution, solvable numerically'}
                      </div>
                    </div>
                  </div>

                  {/* Inverse Problem */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Inverses Problem' : 'Inverse Problem'}</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-gray-300 text-sm space-y-2">
                        <p>{de ? 'Die Funktion t(x) ordnet jeder Falltiefe eine Fallzeit zu. Wird die Fallzeit experimentell gemessen, lässt sich die Tiefe durch numerische Umkehrung bestimmen.' : 'The function t(x) maps falling depth to time. Measuring the fall time makes it possible to determine the depth through numerical inversion.'}</p>
                        <p className="italic text-gray-400">{de ? 'Das Beispiel zeigt, wie sich mit Lagrange-Mechanik und Energieerhaltung ein praktisches inverses Problem lösen lässt.' : 'This demonstrates how Lagrangian mechanics and energy conservation can solve a practical inverse problem.'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Universal Approximation, Transformers & Sumformers Modal */}
        {showSeventhPresentationModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowSeventhPresentationModal(false)}>
            <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full relative m-4 my-8 max-w-6xl max-h-[90vh] overflow-y-auto transform transition-all duration-500 ease-out animate-scale-in" onClick={e => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-4xl font-light text-gray-400 hover:text-white transition-colors z-10" onClick={() => setShowSeventhPresentationModal(false)}>&times;</button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-8">
                <div className="flex flex-col gap-6">
                  <h2 className="text-3xl font-bold text-white">{de ? 'Universelle Approximation, Transformer und Sumformer' : 'Universal Approximation, Transformers & Sumformers'}</h2>
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Präsentationsfolien' : 'Presentation Slides'}</h4>
                    <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-600">
                      <a href="https://canva.link/09it528ra1p1miu" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        <img loading="lazy" decoding="async"
                          src="/projects/university/seventh-presentation-slide-cover.png"
                          alt="Universal Approximation, Transformers & Sumformers presentation cover"
                          className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                          <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">{de ? 'Präsentation ansehen' : 'View Presentation'}</span>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300">
                      {de ? 'Ein akademisches Seminar für Data-Science-Studierende im sechsten Semester. Es behandelt, wie neuronale Netze Funktionen approximieren, wie Attention funktioniert und wie Transformer sowie Sumformer auf diesen Grundlagen aufbauen.' : 'An academic seminar for data science students (6th semester) exploring how neural networks approximate functions, how attention mechanisms work, and how transformer-style architectures, including sumformers, build on these ideas.'}
                    </p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                      <li><strong>{de ? 'Universelle Approximation:' : 'Universal Approximation:'}</strong> {de ? 'Warum neuronale Netze komplexe Funktionen darstellen können.' : 'Why neural networks can represent complex functions'}</li>
                      <li><strong>{de ? 'Attention-Schichten:' : 'Attention Layers:'}</strong> {de ? 'Query-Key-Value-Prinzip und Sequenzmodellierung.' : 'Query-key-value intuition and sequence modeling'}</li>
                      <li><strong>{de ? 'Transformer:' : 'Transformers:'}</strong> {de ? 'Self-Attention, Netzwerktiefe und skalierbare Sprachmodellierung.' : 'Self-attention, depth, and scalable language modeling'}</li>
                      <li><strong>{de ? 'Sumformer:' : 'Sumformers:'}</strong> {de ? 'Strukturierte Alternativen und architektonische Abwägungen.' : 'Structured alternatives and architectural trade-offs'}</li>
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://canva.link/09it528ra1p1miu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition-colors text-center"
                    >{de ? 'Canva-Präsentation öffnen' : 'Open Canva Presentation'}</a>
                    <button
                      onClick={() => setShowSeventhReport(!showSeventhReport)}
                      className={`inline-block px-6 py-3 font-bold rounded-lg shadow transition-colors text-center ${showSeventhReport ? 'bg-green-700 text-white hover:bg-green-800' : 'bg-green-600 text-white hover:bg-green-700'}`}
                    >
                      {showSeventhReport ? (de ? 'Bericht ausblenden' : 'Hide Report') : (de ? 'Seminararbeit ansehen' : 'View Seminar Report')}
                    </button>
                    <a
                      href="/projects/university/universal-approximation-report.pdf"
                      download
                      className="inline-block px-6 py-3 bg-gray-600 text-white font-bold rounded-lg shadow hover:bg-gray-700 transition-colors text-center"
                    >{de ? 'Bericht herunterladen (PDF)' : 'Download Report (PDF)'}</a>
                  </div>
                  {showSeventhReport && (
                    <div className="mt-2 animate-fade-in">
                      <h4 className="text-lg font-semibold text-white mb-3">{de ? 'Seminararbeit' : 'Seminar Report'}</h4>
                      <div className="rounded-lg overflow-hidden border border-gray-600" style={{ height: '500px' }}>
                        <iframe
                          src="/projects/university/universal-approximation-report.pdf"
                          className="w-full h-full"
                          title="Universal Approximation, Transformers & Sumformers - Seminar Report"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-semibold text-white">{de ? 'Seminarthemen' : 'Seminar Topics'}</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                      <h5 className="text-blue-400 font-semibold mb-2">{de ? 'Universelle Approximation' : 'Universal Approximation'}</h5>
                      <p className="text-sm text-gray-400">{de ? 'Grundlagen dazu, welche Funktionen mehrschichtige Netze darstellen können und warum Tiefe eine Rolle spielt.' : 'Foundations of what multilayer networks can represent and why depth matters.'}</p>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                      <h5 className="text-purple-400 font-semibold mb-2">{de ? 'Attention-Mechanismus' : 'Attention'}</h5>
                      <p className="text-sm text-gray-400">{de ? 'Wie Modelle Eingaben dynamisch gewichten, statt feste Fenster zu verwenden.' : 'How models weigh inputs dynamically instead of using fixed windows.'}</p>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                      <h5 className="text-green-400 font-semibold mb-2">Transformer</h5>
                      <p className="text-sm text-gray-400">{de ? 'Parallele Sequenzverarbeitung und die Architektur moderner Sprachmodelle.' : 'Parallel sequence processing and the architecture behind modern LLMs.'}</p>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                      <h5 className="text-orange-400 font-semibold mb-2">Sumformer</h5>
                      <p className="text-sm text-gray-400">{de ? 'Alternative strukturierte Ansätze und mögliche Effizienzvorteile.' : 'Alternative structured designs and when they can be more efficient.'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Autocatalytic Chemical Reactions Modal */}
        {showSixthPresentationModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowSixthPresentationModal(false)}>
            <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full relative m-4 my-8 max-w-6xl max-h-[90vh] overflow-y-auto transform transition-all duration-500 ease-out animate-scale-in" onClick={e => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-4xl font-light text-gray-400 hover:text-white transition-colors z-10" onClick={() => setShowSixthPresentationModal(false)}>&times;</button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-8">
                {/* Left Column: Image & Details */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-3xl font-bold text-white">{de ? 'Autokatalytische chemische Reaktionen: Von der Reaktionsstruktur zur Dynamik' : 'Autocatalytic Chemical Reactions: From Reaction Structure to Emergent Dynamics'}</h2>
                  {/* Presentation Slide Preview */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Präsentationsfolien' : 'Presentation Slides'}</h4>
                    <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-600">
                      <a href="https://gamma.app/docs/Autocatalytic-Chemical-Reactions-From-Reaction-Structure-to-Emerg-3ffq619efwhr7p3" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        <img loading="lazy" decoding="async"
                          src="/projects/university/sixth-presentation-slide-cover.png"
                          alt={de ? 'Titelbild der Präsentation zu autokatalytischen chemischen Reaktionen' : 'Autocatalytic Chemical Reactions Presentation Cover'}
                          className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                          <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">{de ? 'Präsentation ansehen' : 'View Presentation'}</span>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300">{de ? 'Diese Präsentation zeigt, wie kleine Änderungen in chemischen Reaktionsstrukturen zu komplexen, nichtlinearen Dynamiken führen können. Sie betrachtet autokatalytische Reaktionen mit deterministischen Modellen auf Basis gewöhnlicher Differentialgleichungen und stochastischen Teilchenmodellen.' : 'This presentation explores how seemingly simple changes in chemical reaction structures can lead to complex, nonlinear dynamics. It examines autocatalytic reactions using both deterministic (ODE-based) and stochastic (particle-based) models.'}</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                      <li><strong>{de ? 'Grundlagen' : 'Foundational concepts'}:</strong> {de ? 'Chemische Kettenreaktionen, biologisches Wachstum und Ausbreitung' : 'Chemical chain reactions, biological growth, and spread of phenomena'}</li>
                      <li><strong>{de ? 'Klassisches Massenwirkungsgesetz' : 'Classical mass action'}:</strong> {de ? 'Stöchiometrie, Reaktionsgeschwindigkeiten und vorhersehbare lineare Dynamik' : 'Stoichiometry, reaction rates, and predictable linear dynamics'}</li>
                      <li><strong>{de ? 'Autokatalyse' : 'Autocatalytic reactions'}:</strong> {de ? 'Selbstverstärkende Reaktionen mit positiver Rückkopplung' : 'Self-promoting reactions with positive feedback loops'}</li>
                      <li><strong>{de ? 'Deterministisches Modell' : 'Deterministic model'}:</strong> {de ? 'Herleitung der logistischen Gleichung aus der Reaktionskinetik' : 'Deriving the logistic equation from reaction kinetics'}</li>
                      <li><strong>{de ? 'Stochastische Simulation' : 'Stochastic simulation'}:</strong> {de ? 'Teilchenmodelle mit kollisionsbasierten Reaktionen' : 'Particle-based models with collision-based reactions'}</li>
                      <li><strong>{de ? 'Umkehrbare Reaktionen' : 'Reversible reactions'}:</strong> {de ? 'Dynamisches Gleichgewicht und komplexes Systemverhalten' : 'Dynamic equilibrium and complex system behaviors'}</li>
                    </ul>
                  </div>
                </div>

                {/* Right Column: Mathematical Details */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-semibold text-white">{de ? 'Mathematisches Modell' : 'Mathematical framework'}</h3>

                  {/* Reaction Scheme */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Chemische Reaktionsstruktur' : 'Chemical reaction structure'}</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-sm text-gray-300 space-y-3 font-mono">
                        <div className="text-center">
                          <div className="text-green-400 mb-2"><strong>{de ? 'Hinreaktion (autokatalytisch):' : 'Forward reaction (autocatalytic):'}</strong></div>
                          <div className="text-lg text-blue-400">A + B → 2B</div>
                        </div>
                        <div className="border-t border-gray-600 pt-3">
                          <div className="text-yellow-400"><strong>{de ? 'Besonderheit:' : 'Key feature:'}</strong></div>
                          <div className="text-gray-300 mt-1">{de ? 'Molekül B wirkt als Katalysator und beschleunigt seine eigene Bildung.' : 'Molecule B acts as a catalyst, accelerating its own formation.'}</div>
                          <div className="text-gray-300">{de ? 'Positive Rückkopplung: Mehr B führt zu einer schnelleren Bildung von B.' : 'Positive feedback: more B leads to faster B production.'}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Deterministic Model */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Deterministisches Modell (DGL)' : 'Deterministic model (ODEs)'}</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-sm text-gray-300 space-y-2 mb-3">
                        <div>{de ? 'Gleichungen nach dem Massenwirkungsgesetz:' : 'Mass action equations:'}</div>
                      </div>
                      <div className="text-center space-y-2 font-mono mb-3">
                        <div className="text-blue-400">ȧ = -kab</div>
                        <div className="text-green-400">ḃ = kab</div>
                      </div>
                      <div className="border-t border-gray-600 pt-3 text-sm text-gray-300">
                        <div className="mb-2"><strong>{de ? 'Erhaltungssatz:' : 'Conservation law:'}</strong> a(t) + b(t) = C</div>
                        <div className="text-yellow-400 text-center mt-2">{de ? 'Ausgedrückt durch b:' : 'In terms of b:'}</div>
                        <div className="text-center text-green-400 mt-1">ḃ = kb(C - b)</div>
                        <div className="text-gray-400 text-center mt-2 text-xs italic">{de ? 'Die logistische Gleichung' : 'The logistic equation'}</div>
                      </div>
                    </div>
                  </div>

                  {/* S-Shaped Growth */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'S-förmiges Wachstum' : 'S-shaped growth pattern'}</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <div className="text-purple-400 font-semibold mb-1">{de ? '① Langsamer Beginn' : '① Slow start'}</div>
                        <div className="text-sm text-gray-300">{de ? 'B ist zunächst selten, daher läuft die Reaktion langsam.' : 'B is rare, so the reaction rate is low.'}</div>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <div className="text-green-400 font-semibold mb-1">{de ? '② Schnelle Beschleunigung' : '② Rapid acceleration'}</div>
                        <div className="text-sm text-gray-300">{de ? 'Die positive Rückkopplung verstärkt das exponentielle Wachstum.' : 'Positive feedback intensifies exponential growth.'}</div>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <div className="text-blue-400 font-semibold mb-1">{de ? '③ Sättigung' : '③ Saturation'}</div>
                        <div className="text-sm text-gray-300">{de ? 'A wird aufgebraucht, das Wachstum verlangsamt sich bis zum Gleichgewicht.' : 'A is depleted and growth slows towards equilibrium.'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Stochastic Model */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Stochastische Modellierung' : 'Stochastic modeling'}</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-sm text-gray-300 space-y-2">
                        <div className="font-semibold text-cyan-400 mb-2">{de ? 'Teilchenbasierte Simulation:' : 'Particle-based simulation:'}</div>
                        <div><strong>{de ? '1. Zufällige Bewegung:' : '1. Random movement:'}</strong> {de ? 'Einzelne A- und B-Teilchen bewegen sich im Raum.' : 'Individual A and B particles move in space.'}</div>
                        <div><strong>{de ? '2. Kollision:' : '2. Collision:'}</strong> A + B → 2B {de ? 'mit Wahrscheinlichkeit p' : 'with probability p'}</div>
                        <div><strong>{de ? '3. Diskret und räumlich:' : '3. Discrete and spatial:'}</strong> {de ? 'Einzelne Teilchen bilden molekulare Prozesse direkt ab.' : 'Individual particles model molecular processes directly.'}</div>
                        <div className="border-t border-gray-600 mt-3 pt-3 text-gray-400">
                          {de ? 'Zentrale Erkenntnis: Das makroskopische S-förmige Wachstum entsteht aus mikroskopischen Kollisionsregeln.' : 'Key insight: macroscopic S-shaped growth emerges from microscopic collision rules.'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Extensions */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Erweiterungen' : 'Advanced considerations'}</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-sm text-gray-300 space-y-2">
                        <div><strong>{de ? 'Umkehrbare Reaktionen:' : 'Reversible reactions:'}</strong></div>
                        <div className="text-gray-400 ml-2">A + B → 2B ({de ? 'Hinreaktion, Rate k' : 'forward, rate k'})</div>
                        <div className="text-gray-400 ml-2">B → A ({de ? 'Rückreaktion, Rate p' : 'reverse, rate p'}<sub>back</sub>)</div>
                        <div className="text-gray-400 mt-2">{de ? 'Es entsteht ein dynamisches Gleichgewicht statt einer vollständigen Umwandlung.' : 'This leads to dynamic equilibrium instead of full conversion.'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Applications */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">{de ? 'Anwendungen' : 'Real-world applications'}</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-300"><strong>{de ? 'Chemische Systeme:' : 'Chemical systems:'}</strong> {de ? 'Verbrennung, Kettenreaktionen und Polymerisation' : 'Combustion, chain reactions, and polymerization'}</p>
                        <p className="text-gray-300"><strong>{de ? 'Biologische Systeme:' : 'Biological systems:'}</strong> {de ? 'Populationswachstum, mikrobielle Dynamik und Epidemiologie' : 'Population growth, microbial dynamics, and epidemiology'}</p>
                        <p className="text-gray-300"><strong>{de ? 'Ausbreitung von Informationen:' : 'Information spread:'}</strong> {de ? 'Ideen, Innovationen und Krankheitsübertragung' : 'Ideas, innovations, and disease transmission networks'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Universal Image Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center"
          onClick={() => setZoomedImage(null)}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div 
              className="max-w-[95vw] max-h-[95vh] overflow-auto rounded-lg shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <img loading="lazy" decoding="async"
                src={zoomedImage}
                alt="Project Cover, zoomed"
                className="w-auto h-auto min-w-[800px] lg:min-w-[1200px]"
              />
            </div>
          </div>

          <button
            className="absolute top-5 right-5 text-4xl font-light text-white/80 hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setZoomedImage(null);
            }}
          >
            &times;
          </button>
        </div>
      )}

      {/* HTML Zoom Modal */}
      {isHtmlZoomed && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center"
          onClick={() => setIsHtmlZoomed(false)}
        >
          <div className="w-full h-full flex flex-col items-center justify-center">
            {/* Theme Toggle Button */}
            <button
              className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                setHtmlTheme(htmlTheme === 'white' ? 'black' : 'white');
              }}
            >
              {htmlTheme === 'white' ? 'Dark' : 'Light'}
            </button>
            
            <div 
              className="w-[75vw] h-[75vh] rounded-lg shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <iframe
                src="/projects/rain-in-australia/RainInAustralia.html"
                className={`w-full h-full ${htmlTheme === 'white' ? 'bg-white' : 'bg-black'}`}
                title="Rain in Australia HTML Report - Zoomed"
                scrolling="yes"
                style={htmlTheme === 'black' ? { filter: 'invert(1) hue-rotate(180deg)' } : {}}
              />
            </div>
          </div>

          {/* Close Button */}
          <button
            className="absolute top-5 right-5 text-4xl font-light text-white/80 hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsHtmlZoomed(false);
            }}
          >
            &times;
          </button>
        </div>
      )}


    </main>
  );
}
