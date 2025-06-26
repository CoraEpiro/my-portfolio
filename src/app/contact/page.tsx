'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isVisible, setIsVisible] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Initial fade-in
    setIsVisible(true);
    
    // Staggered animations for different elements
    const elements = ['header', 'contact-info', 'social-links', 'form'];
    elements.forEach((element, idx) => {
      setTimeout(() => {
        setVisibleElements(prev => new Set(prev).add(element));
      }, 200 + idx * 200);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <Head>
        <link rel="canonical" href="https://aliguliyev.com/contact" />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className={`text-center mb-12 transition-all duration-1000 ease-out ${
              visibleElements.has('header') ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-gray-300">
                Have a question or want to work together? Feel free to reach out!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div className={`bg-white/5 backdrop-blur-lg rounded-xl p-6 transition-all duration-700 ease-out hover:bg-white/10 hover:scale-105 ${
                  visibleElements.has('contact-info') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}>
                  <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300 group-hover:scale-110">
                        <svg className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">Email</p>
                        <a href="mailto:Ali.Guliyev@stud.ku.de" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 hover:underline">
                          Ali.Guliyev@stud.ku.de
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors duration-300 group-hover:scale-110">
                        <svg className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">Location</p>
                        <p className="text-white group-hover:text-blue-100 transition-colors duration-300">Ingolstadt, Germany</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`bg-white/5 backdrop-blur-lg rounded-xl p-6 transition-all duration-700 ease-out hover:bg-white/10 hover:scale-105 ${
                  visibleElements.has('social-links') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`} style={{ transitionDelay: '200ms' }}>
                  <h3 className="text-xl font-semibold text-white mb-4">Connect with Me</h3>
                  <div className="flex gap-4">
                    <a 
                      href="https://github.com/CoraEpiro" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:rotate-12 group"
                    >
                      <svg className="w-5 h-5 text-white group-hover:text-blue-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/ali-guliyev-389837238/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:rotate-12 group"
                    >
                      <svg className="w-5 h-5 text-white group-hover:text-blue-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Response Time Info */}
                <div className={`bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-lg rounded-xl p-6 border border-blue-500/20 transition-all duration-700 ease-out hover:scale-105 ${
                  visibleElements.has('social-links') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`} style={{ transitionDelay: '400ms' }}>
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    <span className="animate-pulse">⚡</span>
                    Quick Response
                  </h3>
                  <p className="text-gray-300 text-sm">
                    I typically respond within 24 hours. For urgent matters, please mention it in your subject line.
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className={`transition-all duration-700 ease-out ${
                visibleElements.has('form') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                    { id: 'email', label: 'Email', type: 'email', placeholder: 'your.email@example.com' },
                    { id: 'subject', label: 'Subject', type: 'text', placeholder: "What's this about?" }
                  ].map((field, idx) => (
                    <div 
                      key={field.id}
                      className={`transition-all duration-500 ease-out ${
                        visibleElements.has('form') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: `${600 + idx * 100}ms` }}
                    >
                      <label htmlFor={field.id} className="block text-sm font-medium text-gray-300 mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        id={field.id}
                        value={formData[field.id as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/10 focus:scale-105"
                        placeholder={field.placeholder}
                        required
                      />
                    </div>
                  ))}
                  
                  <div className={`transition-all duration-500 ease-out ${
                    visibleElements.has('form') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`} style={{ transitionDelay: '900ms' }}>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/10 focus:scale-105 resize-none"
                      placeholder="Your message..."
                      required
                    />
                  </div>
                  
                  <div className={`transition-all duration-500 ease-out ${
                    visibleElements.has('form') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`} style={{ transitionDelay: '1000ms' }}>
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 text-lg font-semibold group relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Send Message
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Additional Contact Methods */}
            <div className={`mt-16 text-center transition-all duration-1000 ease-out ${
              visibleElements.has('form') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '1200ms' }}>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <h3 className="text-lg font-semibold text-white mb-2">Prefer Other Methods?</h3>
                <p className="text-gray-300 mb-4">
                  You can also reach out through my social media or schedule a virtual meeting.
                </p>
                <div className="flex justify-center gap-4">
                  <span className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
                    📧 Email Response: 24hrs
                  </span>
                  <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30">
                    💬 Available for Calls
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 