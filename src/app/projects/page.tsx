export const metadata = {
  title: 'Projects',
  description: 'Data science and modelling projects by Ali Guliyev — next-day rainfall prediction on Australian weather data, passenger no-show modelling for rural transport, a bilingual legal LLM assistant, and hackathon-winning analytics work in Python.',
  alternates: {
    canonical: '/projects',
  },
};

import ProjectsClient from './ProjectsClient';

export default function ProjectsPage() {
  return <ProjectsClient />;
}