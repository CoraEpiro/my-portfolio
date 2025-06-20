"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';

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
};

// Sample projects data
const projects: Project[] = [
  {
    id: 1,
    title: 'Rain in Australia',
    description: 'A data science project predicting rainfall in Australia using machine learning.',
    image: '/rain-in-australia-cover.jpg',
    technologies: ['Python', 'Jupyter', 'ML'],
    tags: ['Python', 'Jupyter', 'ML'],
    liveUrl: '#', // Special handling for modal
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform built with Next.js, featuring real-time inventory management and secure payment processing.",
    image: "/projects/ecommerce.jpg",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    liveUrl: "https://example.com/ecommerce",
    githubUrl: "https://github.com/your-username/ecommerce",
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    image: "/projects/task-manager.jpg",
    technologies: ["React", "Firebase", "Tailwind CSS"],
    tags: ["React", "Firebase", "Tailwind CSS"],
    liveUrl: "https://example.com/task-manager",
    githubUrl: "https://github.com/your-username/task-manager",
  },
  {
    id: 4,
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
  const [isNotebookExpanded, setIsNotebookExpanded] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [htmlExists, setHtmlExists] = useState(true);

  useEffect(() => {
    if (showRainModal) {
      fetch('/RainInAustralia.html', { method: 'HEAD' })
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
    if (showRainModal || isImageZoomed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showRainModal, isImageZoomed]);

  // Reset expanded state when modal closes
  useEffect(() => {
    if (!showRainModal) {
      setIsNotebookExpanded(false);
      setIsImageZoomed(false); // Also reset image zoom
    }
  }, [showRainModal]);

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
              onClick={() => project.title === 'Rain in Australia' && setShowRainModal(true)}
            >
              <div className="relative h-48 w-full flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-400 dark:from-blue-900 dark:to-blue-700">
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
                        src="/rain-in-australia-cover.jpg" 
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
                  </div>

                  {/* Right Column: HTML Preview or Fallback */}
                  <div className={`h-full flex flex-col transition-all duration-300 ${isNotebookExpanded ? 'p-4' : 'p-8'}`}>
                    <h3 className={`text-xl font-semibold text-white mb-3 ${isNotebookExpanded ? 'hidden' : ''}`}>Notebook Preview</h3>
                    {htmlExists ? (
                      <div className={`flex-grow rounded-lg overflow-hidden border border-gray-700 mb-4 transition-all duration-500 ease-in-out ${isNotebookExpanded ? 'h-full' : 'h-[600px]'}`}>
                        <iframe
                          src="/RainInAustralia.html"
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
                          <li><a href="/Rain in Australia.ipynb" download className="text-blue-400 hover:underline">Jupyter Notebook (.ipynb)</a></li>
                          <li><a href="/weatherAUS.csv" download className="text-blue-400 hover:underline">Dataset (.csv)</a></li>
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
                      src="/rain-in-australia-cover.jpg"
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
      </div>
    </main>
  );
} 