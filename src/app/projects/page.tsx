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
    id: 4,
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
      { name: 'Olga Ivanova' }
    ],
  },
];

export default function ProjectsPage() {
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [showRainModal, setShowRainModal] = useState(false);
  const [showConsulConModal, setShowConsulConModal] = useState(false);
  const [showVgiModal, setShowVgiModal] = useState(false);
  const [showHolocaustModal, setShowHolocaustModal] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [isHtmlZoomed, setIsHtmlZoomed] = useState(false);
  const [htmlTheme, setHtmlTheme] = useState<'white' | 'black'>('white');
  const [isVisible, setIsVisible] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Initial fade-in
    setIsVisible(true);
    
    // Staggered project card animations
    projects.forEach((_, idx) => {
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
                } else if (project.title === 'VGI-Flexi: Rural Transport Analytics') {
                  setShowVgiModal(true);
                } else if (project.title === 'Silent Routes: Holocaust Remembrance') {
                  setShowHolocaustModal(true);
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
                  <div className="relative group">
                    <img 
                      src="/legal-project/legal-project-cover.png" 
                      alt="ChatVocate Legal AI Project Cover" 
                      className="w-full h-auto object-cover rounded-lg shadow-lg border border-gray-600 cursor-pointer"
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
                  <div className="relative group">
                    <img 
                      src="/projects/rain-in-australia/rain-in-australia-cover.jpg" 
                      alt="Rain in Australia Project Cover" 
                      className="w-full h-auto object-cover rounded-lg shadow-lg border border-gray-600 cursor-pointer"
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
                      <li><a href="/projects/rain-in-australia/rain-in-australia.pptx" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">PowerPoint Presentation (.pptx)</a></li>
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
                  <div className="relative group">
                    <img 
                      src="/projects/consulcon25/consulcon25-cover.png" 
                      alt="ConsulCon25 Project Cover" 
                      className="w-full h-auto object-cover rounded-lg shadow-lg border border-gray-600 cursor-pointer"
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
                  <div className="relative group">
                    <img 
                      src="/projects/vgi-challenge/vgi-cover.png" 
                      alt="VGI Challenge Project Cover" 
                      className="w-full h-auto object-cover rounded-lg shadow-lg border border-gray-600 cursor-pointer"
                      onClick={() => setZoomedImage("/projects/vgi-challenge/vgi-cover.png")}
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" onClick={() => setZoomedImage("/projects/vgi-challenge/vgi-cover.png")}>
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
                      <img src="/projects/vgi-challenge/vgi-cover.png" alt="Hosted Website Preview" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
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
                  <div className="relative group">
                    <img 
                      src="/projects/holocaust-remembrance/data4good-cover.png" 
                      alt="Holocaust Remembrance Project Cover" 
                      className="w-full h-auto object-cover rounded-lg shadow-lg border border-gray-600 cursor-pointer"
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
                          { name: 'Olga Ivanova' }
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