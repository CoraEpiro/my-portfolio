'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  category: 'data-science' | 'mathematics' | 'consulting';
  availability: 'available' | 'limited' | 'unavailable';
}

const services: Service[] = [
  {
    id: 1,
    title: 'Data Science Projects',
    description: 'Specialized in machine learning, statistical analysis, and predictive modeling. Perfect for businesses looking to leverage their data for insights and automation.',
    icon: '📊',
    category: 'data-science',
    availability: 'available',
  },
  {
    id: 2,
    title: 'Mathematical Consulting',
    description: 'Expert consultation in Linear Algebra, Analysis, Differential Equations, and Measure Theory. Ideal for complex mathematical problem-solving and optimization.',
    icon: '🔢',
    category: 'mathematics',
    availability: 'available',
  },
  {
    id: 3,
    title: 'Hackathon Mentoring',
    description: 'Share my experience and expertise in hackathon competitions. Help teams prepare, strategize, and develop winning solutions.',
    icon: '🏆',
    category: 'consulting',
    availability: 'limited',
  },
  {
    id: 4,
    title: 'Data Analysis Workshops',
    description: 'Interactive workshops on data analysis techniques, tools, and best practices. Perfect for teams looking to enhance their data literacy.',
    icon: '📈',
    category: 'data-science',
    availability: 'limited',
  },
  {
    id: 5,
    title: 'Research Collaboration',
    description: 'Collaborate on research projects combining mathematics and data science. Open to academic and industry partnerships.',
    icon: '🔬',
    category: 'mathematics',
    availability: 'limited',
  },
];

const additionalServices = [
  {
    id: 6,
    title: 'JIRA & Confluence Workflow Setup',
    description: 'Configure and optimize JIRA and Confluence for project management and team collaboration. Automate workflows, set up dashboards, and train teams for efficient operations.',
    icon: '🗂️',
    category: 'consulting' as const,
    availability: 'available' as const,
  },
  {
    id: 7,
    title: 'Power BI Dashboards & Reporting',
    description: 'Design interactive Power BI dashboards tailored to business or research needs. Automate data refreshes and create insightful visualizations for decision-making.',
    icon: '📊',
    category: 'data-science' as const,
    availability: 'available' as const,
  },
  {
    id: 8,
    title: 'IT & Systems Administration Support',
    description: 'Set up, maintain, and troubleshoot IT infrastructure for small teams or organizations. Experience with scaling networks, user management, and cloud/on-prem solutions.',
    icon: '🖥️',
    category: 'consulting' as const,
    availability: 'limited' as const,
  },
  {
    id: 9,
    title: 'Data Cleaning & Validation Services',
    description: 'Clean, validate, and prepare datasets for analysis or reporting. Reduce errors and ensure data quality using Python and best practices.',
    icon: '🧹',
    category: 'data-science' as const,
    availability: 'available' as const,
  },
  {
    id: 10,
    title: 'Custom Automation Scripts',
    description: 'Develop Python scripts to automate repetitive tasks, data processing, or reporting. Save time and reduce manual work for your business or research projects.',
    icon: '⚙️',
    category: 'data-science' as const,
    availability: 'available' as const,
  },
];

const allServices = [...services, ...additionalServices];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | Service['category']>('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleServices, setVisibleServices] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Initial fade-in
    setIsVisible(true);
    
    // Staggered service card animations
    const timer = setTimeout(() => {
      allServices.forEach((_, idx) => {
        setTimeout(() => {
          setVisibleServices(prev => new Set(prev).add(idx));
        }, idx * 100);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const filteredServices = allServices.filter(service =>
    selectedCategory === 'all' ? true : service.category === selectedCategory
  );

  return (
    <>
      <Head>
        <link rel="canonical" href="https://aliguliyev.com/services" />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className={`text-center mb-12 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                What I Can Do For You
              </h1>
              <p className="text-xl text-gray-300 mb-4">
                As a student, freelancer, and professional, I offer a unique blend of expertise and fresh perspectives.
              </p>
              <div className="text-blue-400 font-medium">
                Contact me to check current availability.
              </div>
            </div>
            
            {/* Category Filter */}
            <div className={`flex justify-center gap-4 mb-12 flex-wrap transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: '200ms' }}>
              {[
                { key: 'all', label: 'All Services' },
                { key: 'data-science', label: 'Data Science' },
                { key: 'mathematics', label: 'Mathematics' },
                { key: 'consulting', label: 'Consulting' }
              ].map((category, idx) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key as any)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                    selectedCategory === category.key
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                  style={{ transitionDelay: `${300 + idx * 100}ms` }}
                >
                  {category.label}
                </button>
              ))}
            </div>
            
            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredServices.map((service, idx) => (
                <div
                  key={service.id}
                  className={`bg-white/5 backdrop-blur-lg rounded-xl p-6 cursor-pointer transform transition-all duration-700 ease-out hover:scale-105 hover:shadow-2xl hover:bg-white/10 group ${
                    visibleServices.has(idx) 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                  onClick={() => setSelectedService(service)}
                  style={{ transitionDelay: `${400 + idx * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:animate-bounce">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-300 mb-3 group-hover:text-gray-200 transition-colors duration-300">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                          service.availability === 'available' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : service.availability === 'limited'
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {service.availability === 'available' ? '✓ Available' : 
                           service.availability === 'limited' ? '⚡ Limited' : '✗ Unavailable'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Service Details Modal */}
            {selectedService && (
              <div
                className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
                onClick={() => setSelectedService(null)}
              >
                <div
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-8 max-w-2xl w-full border border-white/20 shadow-2xl animate-scale-in"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl animate-bounce">{selectedService.icon}</div>
                      <h2 className="text-2xl font-bold text-white">
                        {selectedService.title}
                      </h2>
                    </div>
                    <button
                      className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110"
                      onClick={() => setSelectedService(null)}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {selectedService.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                      selectedService.availability === 'available' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : selectedService.availability === 'limited'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {selectedService.availability === 'available' ? '✓ Currently Available' : 
                       selectedService.availability === 'limited' ? '⚡ Limited Availability' : '✗ Currently Unavailable'}
                    </span>
                    <a
                      href="/contact"
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                    >
                      Get in Touch
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
} 