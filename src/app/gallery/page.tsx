'use client';

import { useState } from 'react';
import Head from 'next/head';

interface MediaItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  title: string;
  description: string;
  event: string;
  date: string;
}

const mediaItems: MediaItem[] = [
  {
    id: 1,
    type: 'image',
    url: '/images/hackathon1.jpg',
    title: 'Salzburg Hackathon',
    description: 'Winning moment at the Salzburg Hackathon',
    event: 'Salzburg Hackathon',
    date: 'November 2023',
  },
  {
    id: 2,
    type: 'video',
    url: '/videos/hackathon1.mp4',
    title: 'Project Presentation',
    description: 'Presenting our winning solution',
    event: 'VGI Challenge',
    date: 'December 2023',
  },
  // Add more media items as needed
];

export default function GalleryPage() {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');

  const filteredItems = mediaItems.filter(item => 
    filter === 'all' ? true : item.type === filter
  );

  return (
    <>
      <Head>
        <link rel="canonical" href="https://aliguliyev.com/gallery" />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
            Media Gallery
          </h1>
          <p className="text-xl text-gray-300 text-center mb-12">
            Photos and videos from my hackathon journey
          </p>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full transition-all ${
                filter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('image')}
              className={`px-6 py-2 rounded-full transition-all ${
                filter === 'image'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              Photos
            </button>
            <button
              onClick={() => setFilter('video')}
              className={`px-6 py-2 rounded-full transition-all ${
                filter === 'video'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              Videos
            </button>
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white/5 rounded-xl overflow-hidden cursor-pointer transform transition-all hover:scale-105"
                onClick={() => setSelectedItem(item)}
              >
                <div className="aspect-w-16 aspect-h-9">
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <video
                      src={item.url}
                      className="object-cover w-full h-full"
                      controls
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 mb-2">{item.description}</p>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{item.event}</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal */}
          {selectedItem && (
            <div
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedItem(null)}
            >
              <div className="relative max-w-4xl w-full">
                <button
                  className="absolute top-4 right-4 text-white hover:text-gray-300"
                  onClick={() => setSelectedItem(null)}
                >
                  <svg
                    className="w-8 h-8"
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
                <div className="bg-white/5 rounded-xl overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    {selectedItem.type === 'image' ? (
                      <img
                        src={selectedItem.url}
                        alt={selectedItem.title}
                        className="object-contain w-full h-full"
                      />
                    ) : (
                      <video
                        src={selectedItem.url}
                        className="object-contain w-full h-full"
                        controls
                        autoPlay
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      {selectedItem.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{selectedItem.description}</p>
                    <div className="flex justify-between text-gray-400">
                      <span>{selectedItem.event}</span>
                      <span>{selectedItem.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
} 