"use client";
import { useState } from "react";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <nav className="w-full bg-gray-950/80 backdrop-blur sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Ali Guliyev</a>
        {/* Hamburger button for mobile */}
        <button
          className="md:hidden flex items-center px-2 py-1 text-3xl focus:outline-none"
          aria-label="Toggle navigation menu"
          onClick={() => setNavOpen((open) => !open)}
        >
          <span>{navOpen ? "✕" : "☰"}</span>
        </button>
        {/* Nav links */}
        <div
          className={`${
            navOpen
              ? 'flex flex-col absolute top-full left-0 w-full bg-gray-950/95 backdrop-blur-md shadow-md md:static md:flex-row md:bg-transparent md:w-auto md:shadow-none z-50'
              : 'hidden md:flex md:flex-row'
          } gap-6 text-lg transition-all duration-200`}
          onClick={() => setNavOpen(false)}
        >
          <a href="/" className="hover:text-blue-400 transition-colors px-4 py-2 md:p-0">Home</a>
          <a href="/projects" className="hover:text-blue-400 transition-colors px-4 py-2 md:p-0">Projects</a>
          <a href="/services" className="hover:text-blue-400 transition-colors px-4 py-2 md:p-0">Services</a>
          <a href="/gallery" className="hover:text-blue-400 transition-colors px-4 py-2 md:p-0">Gallery</a>
          <a href="/contact" className="hover:text-blue-400 transition-colors px-4 py-2 md:p-0">Contact</a>
        </div>
      </div>
    </nav>
  );
} 