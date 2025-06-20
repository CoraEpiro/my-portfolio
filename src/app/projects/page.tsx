"use client";
import Image from 'next/image';
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
    title: 'Rain in Australia',
    description: 'A data science project predicting rainfall in Australia using machine learning.',
    image: '/projects/rain-in-australia/rain-in-australia-cover.jpg',
    technologies: ['Python', 'Jupyter', 'ML'],
    tags: ['Python', 'Jupyter', 'ML'],
    liveUrl: '#', // Special handling for modal
    githubUrl: 'https://github.com/CoraEpiro/rain-in-australia-binder',
    collaborators: [
      { name: 'Denis Hoti', linkedInUrl: 'https://www.linkedin.com/in/denishoti/', websiteUrl: 'https://denishoti.dev' }
    ],
  },
  {
    id: 2,
    title: 'ConsulCon25 Presentation',
    description: 'A comprehensive presentation project developed in Würzburg and presented in Gran Canaria, Spain.',
    image: '/projects/consulcon25/consulcon25-cover.png',
    technologies: ['Presentation', 'Video', 'Web Development'],
    tags: ['Presentation', 'Video', 'Web Development'],
    liveUrl: 'https://consulanalytics.denishoti.dev',
    githubUrl: 'https://github.com/denishotii/ConsulAnalytics',
    collaborators: [
      { name: 'Denis Hoti', linkedInUrl: 'https://www.linkedin.com/in/denishoti/', websiteUrl: 'https://denishoti.dev' },
      { name: 'Veronika Rybak', linkedInUrl: 'https://www.linkedin.com/in/veronika-rybak-55379a337/' },
      { name: 'Ruslan Tsibirov', linkedInUrl: 'https://www.linkedin.com/in/ruslantsibirov/' }
    ],
  },
  {
    id: 3,
    title: 'VGI-Flexi: Rural Transport Analytics',
    description: 'An analytics platform for optimizing rural public transportation by predicting passenger no-shows.',
    image: '/projects/vgi-challenge/vgi-cover.png',
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
    id: 4,
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
      { name: 'Olga Ivanova' }
    ],
  },
  {
    id: 5,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform built with Next.js, featuring real-time inventory management and secure payment processing.",
    image: "/projects/ecommerce.jpg",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    liveUrl: "https://example.com/ecommerce",
    githubUrl: "https://github.com/your-username/ecommerce",
  },
  {
    id: 6,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    image: "/projects/task-manager.jpg",
    technologies: ["React", "Firebase", "Tailwind CSS"],
    tags: ["React", "Firebase", "Tailwind CSS"],
    liveUrl: "https://example.com/task-manager",
    githubUrl: "https://github.com/your-username/task-manager",
  },
  {
    id: 7,
    title: "AI Image Generator",
    description: "An AI-powered image generation tool that creates unique artwork based on text prompts.",
    image: "/projects/ai-generator.jpg",
    technologies: ["Python", "Flask", "Hugging Face"],
    tags: ["Python", "Flask", "Hugging Face"],
    liveUrl: "https://example.com/ai-generator",
    githubUrl: "https://github.com/your-username/ai-generator",
  },
];

export default function ProjectsPage() {
  const [showRainModal, setShowRainModal] = useState(false);
  const [showConsulConModal, setShowConsulConModal] = useState(false);
  const [showVgiModal, setShowVgiModal] = useState(false);
  const [showHolocaustModal, setShowHolocaustModal] = useState(false);
  const [isNotebookExpanded, setIsNotebookExpanded] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [htmlExists, setHtmlExists] = useState(true);

  useEffect(() => {
    if (showRainModal) {
      fetch('/projects/rain-in-australia/RainInAustralia.html', { method: 'HEAD' })
        .then(res => setHtmlExists(res.ok))
        .catch(() => setHtmlExists(false));
    }
  }, [showRainModal]);

  // Communication with iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'toggle-notebook-expand') {
        setIsNotebookExpanded(prev => !prev);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (showRainModal || showConsulConModal || showVgiModal || showHolocaustModal || isImageZoomed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showRainModal, showConsulConModal, showVgiModal, showHolocaustModal, isImageZoomed]);

  // Reset expanded state when modal closes
  useEffect(() => {
    if (!showRainModal) {
      setIsNotebookExpanded(false);
      setIsImageZoomed(false); // Also reset image zoom
    }
    if (!showConsulConModal) {
      setIsImageZoomed(false);
    }
    if (!showVgiModal) {
      setIsImageZoomed(false);
    }
    if (!showHolocaustModal) {
      setIsImageZoomed(false);
    }
  }, [showRainModal, showConsulConModal, showVgiModal, showHolocaustModal]);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A collection of my recent work and personal projects. Each project represents a unique challenge and learning experience.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => {
                if (project.title === 'Rain in Australia') setShowRainModal(true);
                else if (project.title === 'ConsulCon25 Presentation') setShowConsulConModal(true);
                else if (project.title === 'VGI-Flexi: Rural Transport Analytics') setShowVgiModal(true);
                else if (project.title === 'Silent Routes: Holocaust Remembrance') setShowHolocaustModal(true);
              }}
            >
              <div className="relative h-48 w-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-500 dark:from-gray-700 dark:to-gray-900">
                <img src={project.image} alt={project.title} className="object-contain h-32" />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{project.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{project.description}</p>
                {project.tags.map(tag => (
                  <span key={tag} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-200 mr-2">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Rain in Australia Modal */}
        {showRainModal && (
          <>
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowRainModal(false)}>
              <div className={`bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full relative m-4 my-8 transition-all duration-500 ease-in-out ${isNotebookExpanded ? 'max-w-[90vw] max-h-[90vh] h-[90vh] overflow-hidden' : 'max-w-6xl max-h-[90vh] overflow-y-auto'}`} onClick={e => e.stopPropagation()}>
                <button className="absolute top-4 right-4 text-4xl font-light text-gray-400 hover:text-white transition-colors z-10" onClick={() => setShowRainModal(false)}>&times;</button>
                
                <div className={`grid grid-cols-1 gap-8 items-start transition-all duration-300 h-full ${isNotebookExpanded ? 'lg:grid-cols-1' : 'lg:grid-cols-2'}`}>
                  {/* Left Column: Image & Details */}
                  <div className={`flex flex-col gap-6 p-8 transition-all duration-300 ${isNotebookExpanded ? 'hidden' : 'lg:flex'}`}>
                    <h2 className="text-3xl font-bold text-white">Rain in Australia: A Predictive Analysis</h2>
                    <div className="relative group">
                      <img 
                        src="/projects/rain-in-australia/rain-in-australia-cover.jpg" 
                        alt="Rain in Australia Project Cover" 
                        className="w-full h-auto object-cover rounded-lg shadow-lg border border-gray-600 cursor-pointer"
                        onClick={() => setIsImageZoomed(true)}
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" onClick={() => setIsImageZoomed(true)}>
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

                  {/* Right Column: HTML Preview or Fallback */}
                  <div className={`h-full flex flex-col transition-all duration-300 ${isNotebookExpanded ? 'p-4' : 'p-8'}`}>
                    <h3 className={`text-xl font-semibold text-white mb-3 ${isNotebookExpanded ? 'hidden' : ''}`}>Notebook Preview</h3>
                    {htmlExists ? (
                      <div className={`flex-grow rounded-lg overflow-hidden border border-gray-700 mb-4 transition-all duration-500 ease-in-out ${isNotebookExpanded ? 'h-full' : 'h-[600px]'}`}>
                        <iframe
                          src="/projects/rain-in-australia/RainInAustralia.html"
                          width="100%"
                          height="100%"
                          style={{ border: 'none' }}
                          title="Rain in Australia Notebook Preview"
                          sandbox="allow-scripts allow-same-origin"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center flex-grow rounded-lg border border-gray-700 mb-4 bg-gray-800 p-8 text-center h-[600px]">
                        <span className="text-6xl mb-4">🌧️</span>
                        <h4 className="text-lg font-bold text-white mb-2">Interactive Preview Unavailable</h4>
                      </div>
                    )}
                    <button 
                      onClick={() => setIsNotebookExpanded(prev => !prev)}
                      className="absolute bottom-6 right-10 z-20 bg-blue-600 text-white rounded-full p-2 shadow-lg hover:bg-blue-700 transition-transform hover:scale-110"
                      title={isNotebookExpanded ? "Shrink" : "Expand"}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {isNotebookExpanded ? (
                          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                        ) : (
                          <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
                        )}
                      </svg>
                    </button>
                    <div className={isNotebookExpanded ? 'hidden' : ''}>
                      <a
                        href="https://mybinder.org/v2/gh/CoraEpiro/rain-in-australia-binder/main?filepath=Rain%20in%20Australia.ipynb"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 mb-4 bg-green-600 text-white font-bold rounded-lg shadow hover:bg-green-700 transition-colors text-center w-full"
                      >
                         Launch in Binder (Interactive)
                      </a>
                      <div className="text-sm text-gray-400 p-3 bg-gray-800 rounded-lg border border-gray-700">
                        <h4 className="font-bold text-white mb-2">Download Original Files</h4>
                        <ul className="list-disc list-inside space-y-2">
                          <li><a href="https://github.com/CoraEpiro/rain-in-australia-binder/blob/main/Rain%20in%20Australia.ipynb" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Jupyter Notebook (.ipynb)</a></li>
                          <li><a href="https://github.com/CoraEpiro/rain-in-australia-binder/blob/main/weatherAUS.csv" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Dataset (.csv)</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Zoom Modal */}
            {isImageZoomed && (
              <div
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center"
                onClick={() => setIsImageZoomed(false)}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div 
                    className="max-w-[95vw] max-h-[95vh] overflow-auto rounded-lg shadow-2xl"
                    onClick={e => e.stopPropagation()}
                  >
                    <img
                      src="/projects/rain-in-australia/rain-in-australia-cover.jpg"
                      alt="Rain in Australia Project Cover, zoomed"
                      className="w-auto h-auto min-w-[800px] lg:min-w-[1200px]"
                    />
                  </div>
                </div>

                <button
                  className="absolute top-5 right-5 text-4xl font-light text-white/80 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsImageZoomed(false);
                  }}
                >
                  &times;
                </button>
              </div>
            )}
          </>
        )}

        {/* ConsulCon25 Modal */}
        {showConsulConModal && (
          <>
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowConsulConModal(false)}>
              <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full relative m-4 my-8 max-w-6xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <button className="absolute top-4 right-4 text-4xl font-light text-gray-400 hover:text-white transition-colors z-10" onClick={() => setShowConsulConModal(false)}>&times;</button>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-8">
                  {/* Left Column: Image & Details */}
                  <div className="flex flex-col gap-6">
                    <h2 className="text-3xl font-bold text-white">ConsulCon25: From Würzburg to Gran Canaria</h2>
                    <div className="relative group">
                      <img 
                        src="/projects/consulcon25/consulcon25-cover.png" 
                        alt="ConsulCon25 Project Cover" 
                        className="w-full h-auto object-cover rounded-lg shadow-lg border border-gray-600 cursor-pointer"
                        onClick={() => setIsImageZoomed(true)}
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" onClick={() => setIsImageZoomed(true)}>
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
                    
                    {/* Video Section */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-white">Presentation Video</h4>
                      <div className="aspect-video rounded-lg overflow-hidden border border-gray-700">
                        <video
                          controls
                          width="100%"
                          height="100%"
                          style={{ border: 'none' }}
                          title="ConsulCon25 Presentation Video"
                        >
                          <source src="https://videos.denishoti.dev/consulcon25/presentation.mp4" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>

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

            {/* Image Zoom Modal for ConsulCon25 */}
            {isImageZoomed && (
              <div
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center"
                onClick={() => setIsImageZoomed(false)}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div 
                    className="max-w-[95vw] max-h-[95vh] overflow-auto rounded-lg shadow-2xl"
                    onClick={e => e.stopPropagation()}
                  >
                    <img
                      src="/projects/consulcon25/consulcon25-cover.png"
                      alt="ConsulCon25 Project Cover, zoomed"
                      className="w-auto h-auto min-w-[800px] lg:min-w-[1200px]"
                    />
                  </div>
                </div>

                <button
                  className="absolute top-5 right-5 text-4xl font-light text-white/80 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsImageZoomed(false);
                  }}
                >
                  &times;
                </button>
              </div>
            )}
          </>
        )}

        {/* VGI Challenge Modal */}
        {showVgiModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowVgiModal(false)}>
            <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full relative m-4 my-8 max-w-6xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-4xl font-light text-gray-400 hover:text-white transition-colors z-10" onClick={() => setShowVgiModal(false)}>&times;</button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-8">
                {/* Left Column: Image & Details */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-3xl font-bold text-white">VGI-Flexi: Rural Transport Analytics</h2>
                  <div className="relative group">
                    <img 
                      src="/projects/vgi-challenge/vgi-cover.png" 
                      alt="VGI Challenge Project Cover" 
                      className="w-full h-auto object-cover rounded-lg shadow-lg border border-gray-600"
                    />
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
                              {c.linkedInUrl && <a href={c.linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>}
                              {c.websiteUrl && <a href={c.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg></a>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Website and Presentation */}
                <div className="flex flex-col gap-6">
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Hosted Website</h4>
                    <a href="https://8nxly8ub2.dora.run" target="_blank" rel="noopener noreferrer" className="block relative group aspect-video rounded-lg overflow-hidden border border-gray-700">
                      <img src="/projects/vgi-challenge/vgi-cover.png" alt="Hosted Website Preview" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">Visit Website</span>
                      </div>
                    </a>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Presentation</h4>
                    <div className="aspect-video rounded-lg overflow-hidden border border-gray-700 bg-gray-800 flex items-center justify-center">
                      <div className="text-center text-gray-400 p-6">
                        <span className="text-6xl mb-4 block">📊</span>
                        <p>Presentation coming soon...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Holocaust Remembrance Modal */}
        {showHolocaustModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowHolocaustModal(false)}>
            <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full relative m-4 my-8 max-w-6xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-4xl font-light text-gray-400 hover:text-white transition-colors z-10" onClick={() => setShowHolocaustModal(false)}>&times;</button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-8">
                {/* Left Column: Image & Details */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-3xl font-bold text-white">Silent Routes: Holocaust Remembrance</h2>
                  <div className="relative group">
                    <img 
                      src="/projects/holocaust-remembrance/data4good-cover.png" 
                      alt="Holocaust Remembrance Project Cover" 
                      className="w-full h-auto object-cover rounded-lg shadow-lg border border-gray-600"
                    />
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
                          { name: 'Olga Ivanova' }
                        ].map(c => (
                          <div key={c.name} className="flex items-center justify-between p-2 rounded-lg bg-gray-800 border border-gray-600">
                            <span className="font-medium text-white">{c.name}</span>
                            <div className="flex items-center gap-3">
                              {c.linkedInUrl && <a href={c.linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>}
                              {c.websiteUrl && <a href={c.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg></a>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Website and Presentation */}
                <div className="flex flex-col gap-6">
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Hosted Website</h4>
                    <a href="https://iwv9pz9d.dora.run/" target="_blank" rel="noopener noreferrer" className="block relative group aspect-video rounded-lg overflow-hidden border border-gray-700">
                      <img src="/projects/holocaust-remembrance/data4good-cover.png" alt="Hosted Website Preview" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-xl font-bold px-4 py-2 rounded-lg bg-black/50">Visit Website</span>
                      </div>
                    </a>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Presentation</h4>
                    <div className="aspect-video rounded-lg overflow-hidden border border-gray-700 bg-gray-800 flex items-center justify-center">
                      <div className="text-center text-gray-400 p-6">
                        <span className="text-6xl mb-4 block">📊</span>
                        <p>Presentation coming soon...</p>
                      </div>
                    </div>
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
      </div>
    </main>
  );
} 