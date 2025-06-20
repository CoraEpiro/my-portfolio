'use client';

import { useState } from 'react';

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

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | Service['category']>('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const filteredServices = services.filter(service =>
    selectedCategory === 'all' ? true : service.category === selectedCategory
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
            What I Can Do For You
          </h1>
          <p className="text-xl text-gray-300 text-center mb-4">
            As a student, freelancer, and professional, I offer a unique blend of expertise and fresh perspectives.
          </p>
          <div className="text-center text-blue-400 font-medium mb-8">
            Contact me to check current availability.
          </div>
          {/* Category Filter */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              All Services
            </button>
            <button
              onClick={() => setSelectedCategory('data-science')}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === 'data-science'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              Data Science
            </button>
            <button
              onClick={() => setSelectedCategory('mathematics')}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === 'mathematics'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              Mathematics
            </button>
            <button
              onClick={() => setSelectedCategory('consulting')}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === 'consulting'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              Consulting
            </button>
          </div>
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 cursor-pointer transform transition-all hover:scale-105"
                onClick={() => setSelectedService(service)}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{service.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 mb-2">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
            {/* Additional Service Cards */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 flex items-start gap-4 cursor-pointer transform transition-all hover:scale-105">
              <span className="text-4xl">🗂️</span>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">JIRA & Confluence Workflow Setup</h3>
                <p className="text-gray-300 mb-2">Configure and optimize JIRA and Confluence for project management and team collaboration. Automate workflows, set up dashboards, and train teams for efficient operations.</p>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 flex items-start gap-4 cursor-pointer transform transition-all hover:scale-105">
              <span className="text-4xl">📊</span>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Power BI Dashboards & Reporting</h3>
                <p className="text-gray-300 mb-2">Design interactive Power BI dashboards tailored to business or research needs. Automate data refreshes and create insightful visualizations for decision-making.</p>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 flex items-start gap-4 cursor-pointer transform transition-all hover:scale-105">
              <span className="text-4xl">🖥️</span>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">IT & Systems Administration Support</h3>
                <p className="text-gray-300 mb-2">Set up, maintain, and troubleshoot IT infrastructure for small teams or organizations. Experience with scaling networks, user management, and cloud/on-prem solutions.</p>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 flex items-start gap-4 cursor-pointer transform transition-all hover:scale-105">
              <span className="text-4xl">🧹</span>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Data Cleaning & Validation Services</h3>
                <p className="text-gray-300 mb-2">Clean, validate, and prepare datasets for analysis or reporting. Reduce errors and ensure data quality using Python and best practices.</p>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 flex items-start gap-4 cursor-pointer transform transition-all hover:scale-105">
              <span className="text-4xl">⚙️</span>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Custom Automation Scripts</h3>
                <p className="text-gray-300 mb-2">Develop Python scripts to automate repetitive tasks, data processing, or reporting. Save time and reduce manual work for your business or research projects.</p>
              </div>
            </div>
          </div>
          {/* Service Details Modal */}
          {selectedService && (
            <div
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedService(null)}
            >
              <div
                className="bg-white/5 backdrop-blur-lg rounded-xl p-8 max-w-2xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{selectedService.icon}</div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedService.title}
                    </h2>
                  </div>
                  <button
                    className="text-gray-400 hover:text-white"
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
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-300 mb-6">{selectedService.description}</p>
                <div className="pt-4 border-t border-white/10">
                  <a
                    href="/contact"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105"
                  >
                    Get in Touch
                  </a>
                </div>
              </div>
            </div>
          )}
          {/* Note about Current Work */}
          <div className="mt-16 bg-white/5 backdrop-blur-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              A Note About My Current Work
            </h3>
            <p className="text-gray-300">
              While I am currently engaged in various projects and studies, I maintain a balanced approach to taking on new work. 
              I carefully manage my commitments to ensure I can deliver high-quality results for each project. 
              My diverse experience allows me to bring fresh perspectives and innovative solutions to your challenges.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 