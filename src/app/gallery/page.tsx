export const metadata = {
  title: 'Gallery | Ali Guliyev',
  description: 'A visual showcase of selected works, projects, and highlights from Ali Guliyev\'s portfolio.',
  alternates: {
    canonical: 'https://aliguliyev.com/gallery',
  },
};

import GalleryClient from './GalleryClient';

export default function GalleryPage() {
  return <GalleryClient />;
} 