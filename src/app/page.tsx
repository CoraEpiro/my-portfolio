export const metadata = {
  // Home uses the layout's default title; child pages use its "%s | Ali Guliyev" template.
  description: 'Ali Guliyev — B.Sc. Data Science and B.Sc. Mathematics, based near Munich. Probabilistic and statistical modelling in Python, five-time hackathon winner, working toward catastrophe and climate risk modelling.',
  alternates: {
    canonical: '/',
  },
};

import HomeClient from './HomeClient';

export default function HomePage() {
  return <HomeClient />;
}