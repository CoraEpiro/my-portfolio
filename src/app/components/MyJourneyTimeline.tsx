"use client";
import React from "react";

const events = [
  {
    title: "ConsulCon25",
    color: "text-teal-400 border-teal-400 bg-teal-900/40",
    date: "Apr 2025",
    icon: "🎤",
    subtitle: "International Conference Presentation",
    description: "Presented Consul Democracy Analytics Tool in Las Palmas at an international conference.",
  },
  {
    title: "Würzburg Hackathon",
    color: "text-pink-400 border-pink-400 bg-pink-900/40",
    date: "Jan 2025",
    icon: "🏆",
    subtitle: "1st Place at HackaCon Würzburg",
    description: "1st Place at HackaCon Würzburg; qualified to present at ConsulCon25.",
  },
  {
    title: "VGI Challenge",
    color: "text-purple-400 border-purple-400 bg-purple-900/40",
    date: "Dec 2024",
    icon: "🏆",
    subtitle: "2nd Place, €3,000 Prize",
    description: "2nd Place, €3,000 prize for transport optimization project in Ingolstadt.",
  },
  {
    title: "Salzburg Hackathon",
    color: "text-blue-400 border-blue-400 bg-blue-900/40",
    date: "Nov 2024",
    icon: "🏆",
    subtitle: "€1,000 Prize (Open Source)",
    description: "€1,000 prize for smart tourism recommendation system (open–source).",
  },
];

export default function MyJourneyTimeline() {
  return (
    <div className="relative w-full max-w-3xl mx-auto py-8">
      {/* Central vertical line */}
      <div className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-blue-400 via-purple-400 via-pink-400 to-teal-400 z-0" style={{ transform: 'translateX(-50%)' }} />
      <div className="space-y-16 relative z-10">
        {events.map((event, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div key={idx} className="relative flex flex-col md:flex-row items-center justify-between w-full">
              {/* Left side */}
              {isLeft && (
                <div className="w-full md:w-1/2 pr-8 md:pr-8 text-right flex flex-col items-end">
                  <div className={`rounded-xl shadow-lg p-6 max-w-md border-l-4 ${event.color} transition-transform bg-white/10 hover:scale-105`}> 
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{event.icon}</span>
                      <h3 className={`text-lg font-bold ${event.color}`}>{event.title}</h3>
                    </div>
                    <div className="text-gray-300 font-semibold mb-1">{event.subtitle}</div>
                    <div className="text-gray-400 text-sm mb-2">{event.description}</div>
                  </div>
                </div>
              )}
              {/* Center date circle */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 bg-gray-900 font-bold text-lg mb-2 ${event.color}`}>{event.date}</div>
              </div>
              {/* Right side */}
              {!isLeft && (
                <div className="w-full md:w-1/2 pl-8 md:pl-8 text-left flex flex-col items-start">
                  <div className={`rounded-xl shadow-lg p-6 max-w-md border-r-4 ${event.color} transition-transform bg-white/10 hover:scale-105`}> 
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{event.icon}</span>
                      <h3 className={`text-lg font-bold ${event.color}`}>{event.title}</h3>
                    </div>
                    <div className="text-gray-300 font-semibold mb-1">{event.subtitle}</div>
                    <div className="text-gray-400 text-sm mb-2">{event.description}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
} 