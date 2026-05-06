"use client";
import { useState, useEffect } from 'react';

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
    id: 1,
    title: 'ChatVocate: Azerbaijani Legal AI',
    description: 'A sophisticated, bilingual legal assistant chatbot designed for the Azerbaijani legal system with OpenAI GPT integration.',
    image: '/legal-project/legal-project-cover.png',
    technologies: ['Next.js', 'TypeScript', 'OpenAI API', 'Tailwind CSS'],
    tags: ['AI', 'Legal Tech', 'Bilingual', 'Next.js'],
    liveUrl: 'https://www.chatvocate.info',
    githubUrl: 'https://github.com/CoraEpiro/Legal-Project',
    collaborators: [],
  },
  {
    id: 2,
    title: 'Rain in Australia',
    description: 'A comprehensive data science project analyzing and predicting rainfall patterns across Australia using advanced machine learning algorithms and statistical modeling techniques.',
    image: '/projects/rain-in-australia/rain-in-australia-cover.jpg',
    technologies: ['Python', 'Jupyter', 'ML'],
    tags: ['Python', 'Jupyter', 'ML'],
    liveUrl: '#',
    githubUrl: 'https://github.com/CoraEpiro/rain-in-australia-binder',
    collaborators: [
      { name: 'Denis Hoti', linkedInUrl: 'https://www.linkedin.com/in/denishoti/', websiteUrl: 'https://denishoti.dev' }
    ],
  },
  {
    id: 3,
    title: 'ConsulCon25 Presentation',
    description: 'Presentation slides and materials for the ConsulCon25 event.',
    image: '/projects/consulcon25/consulcon25-cover.png',
    technologies: ['Presentation', 'Visualization'],
    tags: ['Presentation', 'Conference'],
    liveUrl: '#',
    collaborators: [],
  },
  {
    id: 4,
    title: 'VGI-Flexi: Rural Transport Analytics',
    description: 'An analytics platform for optimizing rural public transportation by predicting passenger no-shows.',
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
];

export default function ProjectsClient() {
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
            My Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A collection of my recent work and personal projects. Each project represents a unique challenge and learning experience.
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
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="object-contain h-32 transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  {project.description}
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
                      {tag}
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

                <h2 className="text-3xl font-bold text-white mb-6 px-8 pt-8">Intelligent Multilingual AGV for Grid Navigation and Parking via OCR</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start px-8 pb-8">
                  <div className="flex flex-col gap-6">
                    <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-700 bg-slate-950 cursor-pointer">
                      <img
                        src="/projects/university/agv-project/digital-project-presentation-slide-cover.png"
                        alt="Intelligent Multilingual AGV cover"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onClick={() => setZoomedImage("/projects/university/agv-project/digital-project-presentation-slide-cover.png")}
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" onClick={() => setZoomedImage("/projects/university/agv-project/digital-project-presentation-slide-cover.png")}>
                        <span className="text-white text-2xl">🔍</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-300">This university project builds a smart AGV prototype for logistics use cases. The system follows a color-coded grid, responds to multilingual voice commands, and switches between real-time navigation, parking, and obstacle handling through a hybrid RoboPro and Python architecture.</p>
                      <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                        <li><strong>Voice control:</strong> multilingual speech input interpreted with GPT and converted into structured actions</li>
                        <li><strong>Parking:</strong> OCR detects the letter “P” to locate and align with parking spots</li>
                        <li><strong>Control loop:</strong> RoboPro manages line following and state switching while Python handles higher-level logic over MQTT</li>
                        <li><strong>Testing:</strong> integrated and validated across line following, parking, obstacle avoidance, and rapid command switching</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-white">Canva Presentation</h3>
                      <a
                        href="https://www.canva.com/design/DAGtDdUf82M/RX1r4-KkSrDdveJs6EAxww/view?utm_content=DAGtDdUf82M&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h0ac547b620"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative group aspect-video rounded-lg overflow-hidden border border-gray-700"
                      >
                        <img
                          src="/projects/university/agv-project/digital-project-presentation-slide-cover.png"
                          alt="Intelligent Multilingual AGV presentation"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">View Presentation</span>
                        </div>
                      </a>
                    </div>
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
              Academic Presentations
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Mathematical explorations and academic presentations showcasing theoretical knowledge and practical applications.
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
                  }
                }}
              >
                <div className="relative h-48 w-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-500 dark:from-gray-700 dark:to-gray-900 overflow-hidden">
                  <img 
                    src={presentation.image} 
                    alt={presentation.title} 
                    className="object-contain h-32 transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {presentation.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                    {presentation.description}
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
                        {tag}
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
                  <h2 className="text-3xl font-bold text-white">ChatVocate: Azerbaijani Legal AI Assistant</h2>
                  <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-600">
                    <img 
                      src="/legal-project/legal-project-cover.png" 
                      alt="ChatVocate Legal AI Project Cover" 
                      className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer"
                      onClick={() => setZoomedImage("/legal-project/legal-project-cover.png")}
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" onClick={() => setZoomedImage("/legal-project/legal-project-cover.png")}>
                      <span className="text-white text-2xl">🔍</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300">A sophisticated, bilingual legal assistant chatbot specifically designed for the Azerbaijani legal system, combining advanced AI technology with intuitive user experience.</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                      <li><strong>AI Integration:</strong> Powered by OpenAI GPT-4 for contextually accurate legal responses</li>
                      <li><strong>Bilingual Support:</strong> Native Azerbaijani with real-time English translation</li>
                      <li><strong>Enterprise Security:</strong> JWT authentication, user isolation, and secure session management</li>
                      <li><strong>Modern Tech Stack:</strong> Next.js 14, TypeScript, Tailwind CSS, and serverless architecture</li>
                      <li><strong>Chat Management:</strong> Multi-chat interface with conversation persistence and context memory</li>
                    </ul>
                  </div>
                  <div className="pt-4 flex gap-4">
                    <a href="https://www.chatvocate.info" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition-colors text-center flex-1">
                      Visit Live Site
                    </a>
                    <a href="https://github.com/CoraEpiro/Legal-Project" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-gray-700 text-white font-bold rounded-lg shadow hover:bg-gray-600 transition-colors text-center flex-1">
                      View GitHub
                    </a>
                  </div>
                </div>

                {/* Right Column: Technical Details & Architecture */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-semibold text-white">Technical Architecture</h3>
                  
                  {/* Technology Stack */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Technology Stack</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-blue-400 font-semibold mb-2">Frontend</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• Next.js 14 (App Router)</li>
                          <li>• TypeScript</li>
                          <li>• Tailwind CSS</li>
                          <li>• React Hooks</li>
                        </ul>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-green-400 font-semibold mb-2">Backend</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• Next.js API Routes</li>
                          <li>• JWT Authentication</li>
                          <li>• bcryptjs Encryption</li>
                          <li>• RESTful APIs</li>
                        </ul>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-purple-400 font-semibold mb-2">AI & Services</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• OpenAI GPT-4</li>
                          <li>• Real-time Translation</li>
                          <li>• Streaming Responses</li>
                          <li>• Context Memory</li>
                        </ul>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-orange-400 font-semibold mb-2">Deployment</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• Vercel Hosting</li>
                          <li>• Serverless Functions</li>
                          <li>• Edge Computing</li>
                          <li>• Auto-scaling</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Target Users */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Target Users</h4>
                    <div className="space-y-3">
                      <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                        <h5 className="text-blue-400 font-semibold mb-2">🏛️ Legal Professionals</h5>
                        <p className="text-gray-400 text-sm">Quick legal research, case law references, document drafting assistance, and regulatory compliance guidance.</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                        <h5 className="text-green-400 font-semibold mb-2">👥 Citizens & Businesses</h5>
                        <p className="text-gray-400 text-sm">Understanding legal rights, contract review, legal procedure explanations, and basic legal guidance.</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                        <h5 className="text-purple-400 font-semibold mb-2">🎓 Educational Institutions</h5>
                        <p className="text-gray-400 text-sm">Law student research tool, legal concept explanations, practice scenarios, and multilingual legal education support.</p>
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Performance Highlights</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-blue-400 font-semibold">Response Time:</span>
                          <p className="text-gray-400">3 seconds</p>
                        </div>
                        <div>
                          <span className="text-green-400 font-semibold">Uptime:</span>
                          <p className="text-gray-400">99.9% availability</p>
                        </div>
                        <div>
                          <span className="text-purple-400 font-semibold">Security:</span>
                          <p className="text-gray-400">Zero vulnerabilities</p>
                        </div>
                        <div>
                          <span className="text-orange-400 font-semibold">Design:</span>
                          <p className="text-gray-400">Mobile-first responsive</p>
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
                  <h2 className="text-3xl font-bold text-white">Rain in Australia: A Predictive Analysis</h2>
                  <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-600">
                    <img 
                      src="/projects/rain-in-australia/rain-in-australia-cover.jpg" 
                      alt="Rain in Australia Project Cover" 
                      className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer"
                      onClick={() => setZoomedImage("/projects/rain-in-australia/rain-in-australia-cover.jpg")}
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" onClick={() => setZoomedImage("/projects/rain-in-australia/rain-in-australia-cover.jpg")}>
                      <span className="text-white text-2xl">🔍</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300">This project dives into a large dataset of weather conditions in Australia to predict whether it will rain the next day.</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                      <li><strong>Data Processing:</strong> Handled missing values, feature scaling, and categorical data encoding.</li>
                      <li><strong>Machine Learning:</strong> Implemented and evaluated a Logistic Regression model.</li>
                      <li><strong>Technology:</strong> Utilized Python, Pandas, and Scikit-learn in a Jupyter Notebook.</li>
                    </ul>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-gray-700">
                    <h4 className="text-lg font-semibold text-white">Collaborator</h4>
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
                      View on GitHub
                    </a>
                  </div>
                </div>

                {/* Right Column: Notebook Preview */}
                <div className="h-full flex flex-col">
                  <h3 className="text-xl font-semibold text-white mb-3 mt-3">Notebook Preview</h3>
                  
                  {/* HTML Preview Section */}
                  <div className="space-y-3 mb-6">
                    <h4 className="text-lg font-semibold text-white">HTML Report Preview</h4>
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
                    <h4 className="text-lg font-semibold text-white">PowerPoint Presentation</h4>
                    <a
                      href="https://kude-my.sharepoint.com/:p:/g/personal/ali_guliyev_stud_ku_de/EfCfWPZhgTpGo-svG7enMvoBrsg2OhPVhcyPrirNq3oyGg?e=GB6saq"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative group aspect-video rounded-lg overflow-hidden border border-gray-700"
                    >
                      <img
                        src="/projects/rain-in-australia/rain-in-australia-cover.jpg"
                        alt="PowerPoint Presentation Preview"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">View Presentation</span>
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
                      🌧️ Launch Interactive Version in Binder
                    </a>
                  </div>
                  
                  {/* Download Files Section */}
                  <div className="text-sm text-gray-400 p-3 bg-gray-800 rounded-lg border border-gray-700 mt-4">
                    <h4 className="font-bold text-white mb-2">Download Files</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li><a href="/projects/rain-in-australia/RainInAustralia.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">HTML Report (.html)</a></li>
                      <li><a href="https://github.com/CoraEpiro/rain-in-australia-binder/blob/main/Rain%20in%20Australia.ipynb" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Jupyter Notebook (.ipynb)</a></li>
                      <li><a href="https://github.com/CoraEpiro/rain-in-australia-binder/blob/main/weatherAUS.csv" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Dataset (.csv)</a></li>
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
                  <h2 className="text-3xl font-bold text-white">ConsulCon25: From Würzburg to Gran Canaria</h2>
                  <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-600">
                    <img 
                      src="/projects/consulcon25/consulcon25-cover.png" 
                      alt="ConsulCon25 Project Cover" 
                      className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer"
                      onClick={() => setZoomedImage("/projects/consulcon25/consulcon25-cover.png")}
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" onClick={() => setZoomedImage("/projects/consulcon25/consulcon25-cover.png")}>
                      <span className="text-white text-2xl">🔍</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300">A comprehensive presentation project that showcases our work developed in Würzburg and presented at the prestigious ConsulCon25 conference in Gran Canaria, Spain.</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                      <li><strong>Development:</strong> Project conceptualization and development in Würzburg, Germany</li>
                      <li><strong>Presentation:</strong> Live presentation at ConsulCon25 in Gran Canaria, Spain</li>
                      <li><strong>Content:</strong> Video presentation, interactive website, and Canva slides</li>
                      <li><strong>Technology:</strong> Modern web technologies and presentation tools</li>
                    </ul>
                    <div className="space-y-3 pt-4 border-t border-gray-700">
                      <h4 className="text-lg font-semibold text-white">Collaborators</h4>
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
                      <a href="https://github.com/denishotii/ConsulAnalytics" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-gray-700 text-white font-bold rounded-lg shadow hover:bg-gray-600 transition-colors text-center w-full">
                        View on GitHub
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Column: Video, Website, and Presentation */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-semibold text-white">Project Components</h3>
                  
                  {/* Website Section */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Hosted Website</h4>
                    <a
                      href="https://consulanalytics.denishoti.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative group aspect-video rounded-lg overflow-hidden border border-gray-700"
                    >
                      <img
                        src="/projects/consulcon25/consulcon25-project-cover.png"
                        alt="Hosted Website Preview"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">Visit Website</span>
                      </div>
                    </a>
                  </div>

                  {/* Canva Presentation Section */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Canva Presentation</h4>
                    <a
                      href="https://www.canva.com/design/DAGdxuu9z08/ud-4yV5dVODq2phEJc7Ahg/view?utm_content=DAGdxuu9z08&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h7d882f3544#1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative group aspect-video rounded-lg overflow-hidden border border-gray-700"
                    >
                      <img
                        src="/projects/consulcon25/consulcon25-presentation-cover.png"
                        alt="Canva Presentation Preview"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">View Presentation</span>
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
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-8">
                {/* Left Column: Image & Details */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-3xl font-bold text-white">VGI-Flexi: Rural Transport Analytics</h2>
                  <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-600">
                    <img 
                      src="/projects/university/vgi-challenge/vgi-cover.png" 
                      alt="VGI Challenge Project Cover" 
                      className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer"
                      onClick={() => setZoomedImage("/projects/university/vgi-challenge/vgi-cover.png")}
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" onClick={() => setZoomedImage("/projects/university/vgi-challenge/vgi-cover.png")}>
                      <span className="text-white text-2xl">🔍</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300">An analytics platform for optimizing rural public transportation. Using a logistic regression model, this project predicts passenger no-shows for the VGI-Flexi service, enabling data-driven adjustments for more reliable and sustainable operations.</p>
                    <div className="space-y-3 pt-4 border-t border-gray-700">
                      <h4 className="text-lg font-semibold text-white">Collaborators</h4>
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
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-semibold text-white -mt-6">Project Resources</h3>
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Hosted Website</h4>
                    <a href="https://8nxly8ub2.dora.run" target="_blank" rel="noopener noreferrer" className="block relative group aspect-video rounded-lg overflow-hidden border border-gray-700">
                      <img src="/projects/university/vgi-challenge/vgi-cover.png" alt="Hosted Website Preview" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">Visit Website</span>
                      </div>
                    </a>
                  </div>
                  <div className="pt-4 flex gap-4">
                    <a href="https://github.com/denishotii/ConsulAnalytics" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-gray-700 text-white font-bold rounded-lg shadow hover:bg-gray-600 transition-colors text-center w-full">
                      View on GitHub
                    </a>
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
                  <h2 className="text-3xl font-bold text-white">Silent Routes: Holocaust Remembrance</h2>
                  <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-600">
                    <img 
                      src="/projects/holocaust-remembrance/data4good-cover.png" 
                      alt="Holocaust Remembrance Project Cover" 
                      className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer"
                      onClick={() => setZoomedImage("/projects/holocaust-remembrance/data4good-cover.png")}
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" onClick={() => setZoomedImage("/projects/holocaust-remembrance/data4good-cover.png")}>
                      <span className="text-white text-2xl">🔍</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300">A data-driven project to visualize the forced journeys of Holocaust victims. Using data from the Arolsen Archives, this project sheds light on the harrowing statistical patterns of persecution, empowering exploration and remembrance.</p>
                    <div className="space-y-3 pt-4 border-t border-gray-700">
                      <h4 className="text-lg font-semibold text-white">Collaborators</h4>
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
                  <h3 className="text-xl font-semibold text-white mt-3">Project Resources</h3>
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Hosted Website</h4>
                    <a href="https://iwv9pz9d.dora.run/" target="_blank" rel="noopener noreferrer" className="block relative group aspect-video rounded-lg overflow-hidden border border-gray-700">
                      <img src="/projects/holocaust-remembrance/data4good-cover.png" alt="Hosted Website Preview" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">Visit Website</span>
                      </div>
                    </a>
                  </div>
                  <div className="pt-4 flex gap-4">
                    <a href="https://github.com/denishotii/Data4Good25" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-gray-700 text-white font-bold rounded-lg shadow hover:bg-gray-600 transition-colors text-center w-full">
                      View on GitHub
                    </a>
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
                  <h2 className="text-3xl font-bold text-white">coRELation: Religion, Diversity & Social Cohesion</h2>
                  <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-600">
                    <img 
                      src="/projects/corel/corel-cover.jpg" 
                      alt="coRELation Data4Good26 Project Cover" 
                      className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer"
                      onClick={() => setZoomedImage("/projects/corel/corel-cover.jpg")}
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" onClick={() => setZoomedImage("/projects/corel/corel-cover.jpg")}>
                      <span className="text-white text-2xl">🔍</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300">A Data4Good26 hackathon project that transforms complex survey data into meaningful insights on religious diversity, trust, and social cohesion. Discover how religious coexistence shapes solidarity and the future of pluralistic societies.</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                      <li><strong>Data-driven:</strong> ReligionMonitor survey data visualized for policymakers, educators, and civil society.</li>
                      <li><strong>Key themes:</strong> Fear and knowledge gaps, solidarity in crisis, and how contact improves perception.</li>
                      <li><strong>Live platform:</strong> Explore insights, read stories, and compare diversity metrics across countries.</li>
                    </ul>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-gray-700">
                    <h4 className="text-lg font-semibold text-white">Collaborators</h4>
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
                  <h3 className="text-xl font-semibold text-white">Project Resources</h3>
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Website & Canva</h4>
                    <div className="relative group aspect-video rounded-lg overflow-hidden border border-gray-700">
                    <img
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
                      >
                        Visit Website
                      </a>
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
                  <a href="https://github.com/denishotii/Data4Good26" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-gray-700 text-white font-bold rounded-lg shadow hover:bg-gray-600 transition-colors text-center w-full">
                    View on GitHub
                  </a>
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
                  <h2 className="text-3xl font-bold text-white">Newton's Law of Cooling (+experiment)</h2>
                  
                  {/* Presentation Slide Preview */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">📄 Presentation Slides</h4>
                    <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-600">
                      <a href="https://docs.google.com/presentation/d/1xk0J1aK9BfF4BHXvrGLYMr8QyUF7GW2TfDVLwmbsvxU/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        <img 
                          src={presentations.find(p => p.id === 7)?.image || "/projects/university/first-presentation-slide-cover.png"} 
                          alt="Newton's Law of Cooling Presentation Cover" 
                          className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                          <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">📄 View Presentation</span>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Embedded YouTube Video */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">📺 Experiment Video</h4>
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
                    <p className="text-gray-300">An in-depth mathematical exploration of Newton's Law of Cooling through theoretical analysis and practical experimentation. This project demonstrates how differential equations model real-world temperature phenomena.</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                      <li><strong>Mathematical Theory:</strong> Derivation and analysis of the cooling differential equation</li>
                      <li><strong>Experimental Design:</strong> Temperature measurement setup and data collection</li>
                      <li><strong>Data Analysis:</strong> Curve fitting and parameter estimation</li>
                      <li><strong>Real-world Applications:</strong> Forensic science, food safety, and engineering</li>
                      <li><strong>Educational Value:</strong> Bridge between theory and practical application</li>
                    </ul>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <a href={presentations.find(p => p.id === 7)?.liveUrl || "#"} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition-colors text-center flex-1">
                      🔗 Open in YouTube
                    </a>
                    <a href="https://docs.google.com/presentation/d/1xk0J1aK9BfF4BHXvrGLYMr8QyUF7GW2TfDVLwmbsvxU/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition-colors text-center flex-1">
                      📄 View Presentation
                    </a>
                  </div>
                </div>

                {/* Right Column: Mathematical Details */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-semibold text-white">Mathematical Framework</h3>
                  
                  {/* Differential Equation */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Core Equation</h4>
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
                          where <span className="italic text-blue-300">T</span> is temperature, <span className="italic text-blue-300">t</span> is time, <span className="italic text-blue-300">k</span> is cooling constant, <span className="italic text-blue-300">T<sub>env</sub></span> is environmental temperature
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Experimental Setup */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Experimental Components</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-blue-400 font-semibold mb-2">🌡️ Temperature Measurement</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• Digital thermometer setup</li>
                          <li>• Time-series data collection</li>
                          <li>• Environmental control</li>
                        </ul>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-green-400 font-semibold mb-2">📊 Data Analysis</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• Exponential curve fitting</li>
                          <li>• Parameter estimation</li>
                          <li>• Error analysis</li>
                        </ul>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-purple-400 font-semibold mb-2">🔬 Applications</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• Forensic time of death</li>
                          <li>• Food safety protocols</li>
                          <li>• Engineering heat transfer</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Solution & Results */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Analytical Solution</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-center">
                        <div className="text-xl text-green-400 mb-3 font-serif" style={{fontFamily: 'Times, serif'}}>
                          <span className="italic">T</span>(<span className="italic">t</span>) = <span className="italic">T</span><sub className="text-sm">env</sub> + (<span className="italic">T</span><sub className="text-sm">₀</sub> − <span className="italic">T</span><sub className="text-sm">env</sub>)<span className="italic">e</span><sup className="text-sm">−<span className="italic">kt</span></sup>
                        </div>
                        <p className="text-sm text-gray-400">
                          Exponential decay solution with initial condition <span className="italic text-green-300">T<sub>₀</sub></span>
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
                  <h2 className="text-3xl font-bold text-white">1-D Presentation of 3-Body Problem</h2>
                  {/* Presentation Slide Preview */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">📄 Presentation Slides</h4>
                    <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-600">
                      <a href="https://gamma.app/docs/The-1D-Three-Body-Problem-A-Numerical-Approach-rr3lhiwd73g7j3s?mode=doc" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        <img 
                          src={presentations.find(p => p.id === 8)?.image || "/projects/university/second-presentation-slide-cover.png"} 
                          alt="Three-Body Problem Presentation Cover" 
                          className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                          <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">📄 View Presentation</span>
                        </div>
                      </a>
                    </div>
                  </div>
                  {/* Embedded YouTube Video */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">📺 Presentation Video</h4>
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
                    <p className="text-gray-300">A comprehensive mathematical presentation exploring the classical three-body problem through one-dimensional analysis. This work showcases the complexity and beauty of celestial mechanics using differential equations.</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                      <li><strong>Classical Mechanics:</strong> Newton's laws applied to gravitational systems</li>
                      <li><strong>Differential Equations:</strong> Second-order nonlinear system analysis</li>
                      <li><strong>Mathematical Complexity:</strong> Chaos theory and sensitive dependence</li>
                      <li><strong>Historical Context:</strong> Poincaré's contributions and modern developments</li>
                      <li><strong>Astronomical Applications:</strong> Planetary motion and orbital mechanics</li>
                    </ul>
                  </div>
                </div>

                {/* Right Column: Mathematical Details */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-semibold text-white">Mathematical Framework</h3>
                  
                  {/* Core Equations */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">System of Equations</h4>
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
                          Coupled second-order differential equations for three gravitating bodies
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Problem Characteristics */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Problem Characteristics</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-purple-400 font-semibold mb-2">🌌 Gravitational Forces</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• Inverse square law interactions</li>
                          <li>• Conservation of energy</li>
                          <li>• Conservation of momentum</li>
                        </ul>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-orange-400 font-semibold mb-2">🔄 Dynamical Behavior</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• Chaotic trajectories</li>
                          <li>• Sensitive initial conditions</li>
                          <li>• No general analytical solution</li>
                        </ul>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-green-400 font-semibold mb-2">🧮 Numerical Methods</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• Runge-Kutta integration</li>
                          <li>• Symplectic algorithms</li>
                          <li>• Phase space analysis</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Historical Context */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Historical Significance</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="space-y-2">
                        <p className="text-gray-300 text-sm"><strong>Henri Poincaré (1889):</strong> Proved no general solution exists</p>
                        <p className="text-gray-300 text-sm"><strong>Modern Era:</strong> Computer simulations reveal chaotic nature</p>
                        <p className="text-gray-300 text-sm"><strong>Applications:</strong> Spacecraft trajectories, asteroid dynamics</p>
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
                  <h2 className="text-3xl font-bold text-white">Differential Equations III: Advanced Mathematical Analysis</h2>
                  {/* Presentation Slide Preview */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">📄 Presentation Slides</h4>
                    <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-600">
                      <a href="https://gamma.app/docs/pe8f0u9xf8gh5ls?following_id=lvwkfuullwkcsoq&follow_on_start=true" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        <img 
                          src="/projects/university/third-presentation-slide-cover.png" 
                          alt="Advanced Mathematical Analysis Presentation Cover" 
                          className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                          <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">📄 View Presentation</span>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300">An advanced mathematical analysis presentation exploring complex differential equations and their applications in modern mathematics and physics.</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                      <li><strong>Advanced Mathematics:</strong> Complex differential equation analysis</li>
                      <li><strong>Mathematical Theory:</strong> Theoretical foundations and proofs</li>
                      <li><strong>Practical Applications:</strong> Real-world mathematical applications</li>
                      <li><strong>Academic Research:</strong> Cutting-edge mathematical concepts</li>
                    </ul>
                  </div>
                </div>

                {/* Right Column: Mathematical Analysis Details */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-semibold text-white">Advanced Mathematical Analysis</h3>
                  
                  {/* Mathematical Concepts */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Core Mathematical Concepts</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="space-y-3">
                        <div className="text-center">
                          <p className="text-blue-400 font-semibold">Advanced Differential Equations</p>
                          <p className="text-sm text-gray-400">Complex mathematical analysis and theoretical foundations</p>
                        </div>
                        <div className="text-center">
                          <p className="text-purple-400 font-semibold">Mathematical Theory</p>
                          <p className="text-sm text-gray-400">Theoretical proofs and mathematical rigor</p>
                        </div>
                        <div className="text-center">
                          <p className="text-green-400 font-semibold">Practical Applications</p>
                          <p className="text-sm text-gray-400">Real-world applications of advanced mathematics</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Analysis Framework */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Analysis Framework</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-blue-400 font-semibold mb-2">🧮 Mathematical Methods</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• Advanced differential equations</li>
                          <li>• Complex mathematical analysis</li>
                          <li>• Theoretical foundations</li>
                        </ul>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-purple-400 font-semibold mb-2">📊 Analytical Techniques</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• Mathematical proofs</li>
                          <li>• Theoretical analysis</li>
                          <li>• Advanced concepts</li>
                        </ul>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-green-400 font-semibold mb-2">🔬 Research Applications</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• Academic research</li>
                          <li>• Mathematical modeling</li>
                          <li>• Scientific applications</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Academic Context */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Academic Context</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="space-y-2">
                        <p className="text-gray-300 text-sm"><strong>Advanced Mathematics:</strong> Complex differential equation analysis</p>
                        <p className="text-gray-300 text-sm"><strong>Academic Research:</strong> Cutting-edge mathematical concepts</p>
                        <p className="text-gray-300 text-sm"><strong>Applications:</strong> Real-world mathematical applications</p>
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
                  <h2 className="text-3xl font-bold text-white">Locusts vs. Crops: A Predator-Prey Model</h2>
                  {/* Presentation Slide Preview */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">📄 Presentation Slides</h4>
                    <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-600">
                      <a href="https://gamma.app/docs/Locusts-vs-Crops-A-Predator-Prey-Model-jexdfy88gxn63jt" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        <img
                          src="/projects/university/fourht-presentation-slide-cover.png"
                          alt="Locusts vs. Crops Presentation Cover"
                          className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                          <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">📄 View Presentation</span>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300">A comprehensive mathematical exploration of the dynamic interaction between locust populations and crop growth. This presentation models predator-prey relationships with realistic human intervention strategies for agricultural pest management.</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                      <li><strong>Basic Dynamics:</strong> Exponential and logistic growth models for crops and locust populations</li>
                      <li><strong>Predator-Prey Interaction:</strong> Modeling crop consumption and locust reproduction based on food availability</li>
                      <li><strong>Human Intervention:</strong> Threshold-based spraying function with cost-benefit analysis</li>
                      <li><strong>Optimization:</strong> Finding optimal intervention strategies for sustainable agriculture</li>
                      <li><strong>Real-world Applications:</strong> Agricultural pest management and biological control strategies</li>
                    </ul>
                  </div>
                </div>

                {/* Right Column: Mathematical Details */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-semibold text-white">Mathematical Framework</h3>

                  {/* Core Equations */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Dynamic Model Equations</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-center space-y-2" style={{fontFamily: 'Times, serif'}}>
                        <div className="text-sm text-gray-400 mb-2"><strong>Initial Model (without interaction):</strong></div>
                        <div className="text-sm text-blue-400 mb-4">
                          C'(t) = <span className="italic">r</span>C (Exponential)<br/>
                          L'(t) = −<span className="italic">d</span>L (Decay without crops)
                        </div>
                        <div className="text-sm text-gray-400 mb-2"><strong>With Interaction:</strong></div>
                        <div className="text-sm text-green-400 mb-4">
                          C'(t) = <span className="italic">r</span>C(1 − C/K) − <span className="italic">aCL</span><br/>
                          L'(t) = −<span className="italic">d</span>L + <span className="italic">bCL</span>
                        </div>
                        <div className="text-sm text-gray-400 mb-2"><strong>With Spraying Intervention:</strong></div>
                        <div className="text-sm text-purple-400">
                          C'(t) = <span className="italic">r</span>C(1 − C/K) − <span className="italic">aCL</span><br/>
                          L'(t) = <span className="italic">b</span>CL − (<span className="italic">d</span> + u(t))L
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Model Components */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Key Parameters</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-green-400 font-semibold mb-2">🌾 Crop Dynamics</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• <span className="italic">r</span>: Growth rate</li>
                          <li>• <span className="italic">K</span>: Carrying capacity</li>
                          <li>• <span className="italic">a</span>: Consumption rate</li>
                        </ul>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-yellow-400 font-semibold mb-2">🦗 Locust Dynamics</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• <span className="italic">d</span>: Natural death rate</li>
                          <li>• <span className="italic">b</span>: Conversion efficiency</li>
                          <li>• <span className="italic">u(t)</span>: Control intervention</li>
                        </ul>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <h5 className="text-blue-400 font-semibold mb-2">✈️ Intervention Strategy</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• Threshold-based spraying</li>
                          <li>• Cost-benefit optimization</li>
                          <li>• Equilibrium analysis</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Applications */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Real-World Applications</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="space-y-2">
                        <p className="text-gray-300 text-sm"><strong>🌍 Agricultural Pest Management:</strong> Predicting locust swarms and optimizing spray schedules</p>
                        <p className="text-gray-300 text-sm"><strong>💰 Economic Optimization:</strong> Balancing spray costs against crop damage losses</p>
                        <p className="text-gray-300 text-sm"><strong>♻️ Sustainable Solutions:</strong> Minimizing pesticide use while protecting crops</p>
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
                  <h2 className="text-3xl font-bold text-white">Lagrangian Modeling: Falling Rope & Mass</h2>
                  {/* Presentation Slide Preview */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">📄 Presentation Slides</h4>
                    <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-600">
                      <a href="https://gamma.app/docs/Lagrangian-Modeling-Falling-Rope-Mass-4bxdkfv0wgyghk9" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        <img
                          src="/projects/university/fifth-presentation-slide-cover.png"
                          alt="Lagrangian Modeling Presentation Cover"
                          className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                          <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">📄 View Presentation</span>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300">A comprehensive exploration of Lagrangian mechanics applied to a rope with an attached object falling into a deep hole. Using energy conservation and the Euler-Lagrange equation, the presentation demonstrates how to infer falling depth from measured fall time in a conservative system.</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                      <li><strong>Problem Setup:</strong> Rope with linear mass density falling with attached object</li>
                      <li><strong>System Variables:</strong> Total rope mass M, object mass m, rope length ℓ, and fallen distance x(t)</li>
                      <li><strong>Energy Analysis:</strong> Kinetic and potential energy of rope and mass system</li>
                      <li><strong>Lagrangian Mechanics:</strong> Constructing L = T - V and applying Euler-Lagrange equation</li>
                      <li><strong>Energy Conservation:</strong> Using conserved energy to derive velocity relations</li>
                      <li><strong>Solution by Quadrature:</strong> Numerical integration to solve the inverse problem</li>
                    </ul>
                  </div>
                </div>

                {/* Right Column: Mathematical Details */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-semibold text-white">Mathematical Framework</h3>

                  {/* System Description */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">System Variables & Masses</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-sm text-gray-300 space-y-2 font-mono">
                        <div><strong>M:</strong> Total rope mass</div>
                        <div><strong>m:</strong> Attached object mass</div>
                        <div><strong>ℓ:</strong> Total rope length</div>
                        <div><strong>λ:</strong> Linear mass density = M/ℓ</div>
                        <div><strong>x(t):</strong> Fallen rope length at time t</div>
                        <div><strong>g:</strong> Gravitational acceleration</div>
                        <div className="pt-2 border-t border-gray-600 mt-2"><strong>Effective mass:</strong> m_eff(t) = m + λx(t)</div>
                      </div>
                    </div>
                  </div>

                  {/* Kinetic Energy */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Kinetic Energy (T)</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-center space-y-2" style={{fontFamily: 'Times, serif'}}>
                        <div className="text-sm text-blue-400">
                          All moving parts share velocity ẋ(t)
                        </div>
                        <div className="text-lg text-green-400 mt-3">
                          T = ½(m + λx)ẋ²
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Potential Energy */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Potential Energy (V)</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-sm text-gray-300 space-y-2 mb-3">
                        <div><strong>Object:</strong> V_obj = -mgx</div>
                        <div><strong>Rope:</strong> V_rope = -½λgx²</div>
                      </div>
                      <div className="text-center text-green-400" style={{fontFamily: 'Times, serif'}}>
                        V = -mgx - ½λgx²
                      </div>
                    </div>
                  </div>

                  {/* Lagrangian */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Lagrangian (L = T - V)</h4>
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
                    <h4 className="text-lg font-semibold text-white">Equation of Motion</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-sm text-gray-300 mb-3">
                        From Euler-Lagrange equation:
                      </div>
                      <div className="text-center text-purple-400" style={{fontFamily: 'Times, serif'}}>
                        ẍ = g - (½λẋ²)/(m + λx)
                      </div>
                    </div>
                  </div>

                  {/* Energy Conservation */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Solution via Energy Conservation</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-sm text-gray-300 space-y-2">
                        <div>Total energy E = T + V is conserved</div>
                        <div className="pt-2 border-t border-gray-600">Initial condition: x(0) = 0, E = 0</div>
                        <div className="text-center text-green-400 mt-3" style={{fontFamily: 'Times, serif'}}>
                          ẋ = √(2gx(m + ½λx)/(m + λx))
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quadrature Solution */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Solution by Quadrature</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-sm text-gray-300 mb-3">
                        Separating variables and integrating:
                      </div>
                      <div className="text-center text-blue-400 text-sm" style={{fontFamily: 'Times, serif'}}>
                        t(x) = ∫₀ˣ √[(m + λx')/(2gx'(m + ½λx'))] dx'
                      </div>
                      <div className="text-gray-400 text-sm mt-3">
                        This integral provides an implicit solution, solvable numerically
                      </div>
                    </div>
                  </div>

                  {/* Inverse Problem */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Inverse Problem</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-gray-300 text-sm space-y-2">
                        <p>The function t(x) creates a one-to-one mapping between falling depth and time. By measuring fall time experimentally, the hole depth can be determined through numerical inversion.</p>
                        <p className="italic text-gray-400">This demonstrates how Lagrangian mechanics and energy conservation solve realistic inverse problems.</p>
                      </div>
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
                  <h2 className="text-3xl font-bold text-white">Autocatalytic Chemical Reactions: From Reaction Structure to Emergent Dynamics</h2>
                  {/* Presentation Slide Preview */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">📄 Presentation Slides</h4>
                    <div className="relative group aspect-video w-full rounded-lg overflow-hidden border border-gray-600">
                      <a href="https://gamma.app/docs/Autocatalytic-Chemical-Reactions-From-Reaction-Structure-to-Emerg-3ffq619efwhr7p3" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        <img
                          src="/projects/university/sixth-presentation-slide-cover.png"
                          alt="Autocatalytic Chemical Reactions Presentation Cover"
                          className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                          <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">📄 View Presentation</span>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300">This presentation explores how seemingly simple changes in chemical reaction structures can lead to complex, nonlinear dynamics. It delves into autocatalytic reactions, examining both deterministic (ODE-based) and stochastic (particle-based) modeling approaches to understand their emergent behaviors and real-world implications.</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                      <li><strong>Foundational Concepts:</strong> Chemical chain reactions, biological growth, and spread of phenomena</li>
                      <li><strong>Classical Mass Action:</strong> Stoichiometry, reaction rates, and predictable linear dynamics</li>
                      <li><strong>Autocatalytic Twist:</strong> Self-promoting reactions with positive feedback loops</li>
                      <li><strong>Deterministic Model:</strong> Deriving the logistic equation from reaction kinetics</li>
                      <li><strong>Stochastic Simulation:</strong> Particle-based models with collision-based reactions</li>
                      <li><strong>Reversible Reactions:</strong> Dynamic equilibrium and complex system behaviors</li>
                    </ul>
                  </div>
                </div>

                {/* Right Column: Mathematical Details */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-semibold text-white">Mathematical Framework</h3>

                  {/* Reaction Scheme */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Chemical Reaction Structure</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-sm text-gray-300 space-y-3 font-mono">
                        <div className="text-center">
                          <div className="text-green-400 mb-2"><strong>Forward Reaction (Autocatalytic):</strong></div>
                          <div className="text-lg text-blue-400">A + B → 2B</div>
                        </div>
                        <div className="border-t border-gray-600 pt-3">
                          <div className="text-yellow-400"><strong>Key Feature:</strong></div>
                          <div className="text-gray-300 mt-1">Molecule B acts as a catalyst, accelerating its own formation</div>
                          <div className="text-gray-300">Creates positive feedback: more B → faster B production</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Deterministic Model */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Deterministic Model (ODEs)</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-sm text-gray-300 space-y-2 mb-3">
                        <div>Mass Action equations:</div>
                      </div>
                      <div className="text-center space-y-2 font-mono mb-3">
                        <div className="text-blue-400">ȧ = -kab</div>
                        <div className="text-green-400">ḃ = kab</div>
                      </div>
                      <div className="border-t border-gray-600 pt-3 text-sm text-gray-300">
                        <div className="mb-2"><strong>Conservation Law:</strong> a(t) + b(t) = C</div>
                        <div className="text-yellow-400 text-center mt-2">In terms of b:</div>
                        <div className="text-center text-green-400 mt-1">ḃ = kb(C - b)</div>
                        <div className="text-gray-400 text-center mt-2 text-xs italic">The Logistic Equation</div>
                      </div>
                    </div>
                  </div>

                  {/* S-Shaped Growth */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">S-Shaped Growth Pattern</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <div className="text-purple-400 font-semibold mb-1">① Slow Start</div>
                        <div className="text-sm text-gray-300">B is rare, reaction rate is low</div>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <div className="text-green-400 font-semibold mb-1">② Rapid Acceleration</div>
                        <div className="text-sm text-gray-300">Positive feedback intensifies exponential growth</div>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <div className="text-blue-400 font-semibold mb-1">③ Saturation</div>
                        <div className="text-sm text-gray-300">A depletes, growth slows to equilibrium</div>
                      </div>
                    </div>
                  </div>

                  {/* Stochastic Model */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Stochastic Modeling</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-sm text-gray-300 space-y-2">
                        <div className="font-semibold text-cyan-400 mb-2">Particle-Based Simulation:</div>
                        <div><strong>1. Random Movement:</strong> Individual A & B particles move in space</div>
                        <div><strong>2. Collision-Based:</strong> A + B collision → 2B with probability p</div>
                        <div><strong>3. Discrete & Spatial:</strong> Individual particles, true molecular realism</div>
                        <div className="border-t border-gray-600 mt-3 pt-3 text-gray-400">
                          Key insight: macroscopic S-shaped growth emerges from microscopic collision rules
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Extensions */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Advanced Considerations</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-sm text-gray-300 space-y-2">
                        <div><strong>Reversible Reactions:</strong></div>
                        <div className="text-gray-400 ml-2">A + B → 2B (forward, rate k)</div>
                        <div className="text-gray-400 ml-2">B → A (reverse, rate p<sub>back</sub>)</div>
                        <div className="text-gray-400 mt-2">Leads to dynamic equilibrium instead of full conversion</div>
                      </div>
                    </div>
                  </div>

                  {/* Applications */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Real-World Applications</h4>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-300"><strong>🔥 Chemical Systems:</strong> Combustion, chain reactions, polymerization</p>
                        <p className="text-gray-300"><strong>🧬 Biological Systems:</strong> Population growth, microbial dynamics, epidemiology</p>
                        <p className="text-gray-300"><strong>📡 Information Spread:</strong> Ideas, innovations, disease transmission networks</p>
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
              <img
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
              {htmlTheme === 'white' ? '🌙 Dark' : '☀️ Light'}
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