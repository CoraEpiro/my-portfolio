export const metadata = {
  title: 'Projects',
  description: 'A collection of my recent work and personal projects. Each project represents a unique challenge and learning experience.',
  alternates: {
    canonical: '/projects',
  },
};

import ProjectsClient from './ProjectsClient';

export default function ProjectsPage() {
  return <ProjectsClient />;
}