import type { Metadata } from 'next';
import CertificatesClient from './CertificatesClient';

export const metadata: Metadata = {
  title: 'Certificates',
  description: 'Verified credentials of Ali Guliyev, including the Google Advanced Data Analytics professional certificate and IBM Deep Learning with PyTorch, Keras and TensorFlow — each linked to its Coursera verification page.',
  alternates: {
    canonical: '/certificates',
  },
};

export default function CertificatesPage() {
  return <CertificatesClient />;
}