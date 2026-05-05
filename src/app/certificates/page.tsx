import type { Metadata } from 'next';
import CertificatesClient from './CertificatesClient';

export const metadata: Metadata = {
  title: 'Certificates | Ali Guliyev',
  description: 'Professional certificates, specializations, diplomas, and verified credentials of Ali Guliyev.',
  alternates: {
    canonical: 'https://aliguliyev.com/certificates',
  },
};

export default function CertificatesPage() {
  return <CertificatesClient />;
}