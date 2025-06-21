"use client";
import { useState } from "react";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-950/80 backdrop-blur sticky top-0 z-50 shadow-md animate-fade-in">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a 
          href="/" 
          className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 animate-slide-left"
          style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
        >
          Ali Guliyev
        </a>
        {/* Hamburger button for mobile */}
        <button
          className="md:hidden flex items-center px-2 py-1 text-3xl focus:outline-none hover:scale-110 transition-all duration-300 animate-slide-right"
          style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
          aria-label="Toggle navigation menu"
          onClick={() => setNavOpen((open) => !open)}
        >
          <span className={`transition-transform duration-300 ${navOpen ? 'rotate-90' : 'rotate-0'}`}>
            {navOpen ? "✕" : "☰"}
          </span>
        </button>
        {/* Nav links */}
        <div
          className={`${
            navOpen
              ? 'flex flex-col absolute top-full left-0 w-full bg-gray-950/95 backdrop-blur-md shadow-md md:static md:flex-row md:bg-transparent md:w-auto md:shadow-none z-50 animate-fade-in'
              : 'hidden md:flex md:flex-row'
          } gap-6 text-lg transition-all duration-300`}
          onClick={() => setNavOpen(false)}
        >
          {[
            { href: '/', label: 'Home' },
            { href: '/projects', label: 'Projects' },
            { href: '/services', label: 'Services' },
            { href: '/contact', label: 'Contact' }
          ].map((link, idx) => (
            <a 
              key={link.href}
              href={link.href} 
              className="hover:text-blue-400 hover:scale-105 transition-all duration-300 px-4 py-2 md:p-0 relative group animate-slide-right"
              style={{ animationDelay: `${0.3 + idx * 0.1}s`, animationFillMode: 'both' }}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
} 