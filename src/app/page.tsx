export const metadata = {
  // Home uses the layout's default title; child pages use its "%s | Ali Guliyev" template.
  description: 'Data Science professional with 2+ years experience in Python, Machine Learning, and Analytics. Hackathon winner specializing in predictive modeling, data visualization, and AI solutions.',
  alternates: {
    canonical: '/',
  },
};

import HomeClient from './HomeClient';

export default function HomePage() {
  return <HomeClient />;
}