export const metadata = {
  title: 'Projects | Ali Guliyev',
  description: 'A collection of my recent work and personal projects. Each project represents a unique challenge and learning experience.',
  alternates: {
    canonical: 'https://aliguliyev.com/projects',
  },
};

import ProjectsClient from './ProjectsClient';

export default function ProjectsPage() {
  return <ProjectsClient />;
}