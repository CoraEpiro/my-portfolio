export const metadata = {
  // Home uses the layout's default title; child pages use its "%s | Ali Guliyev" template.
  description: 'Ali Guliyev — M.Sc. Mathematics in Data Science student at TUM, B.Sc. Data Science graduate with a 1.9 average, and Student Assistant in Secure Cloud Computing at LRZ.',
  alternates: {
    canonical: '/',
  },
};

import HomeClient from './HomeClient';

export default function HomePage() {
  return <HomeClient />;
}
