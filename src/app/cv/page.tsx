import type { Metadata } from 'next';
import CvActions from './CvActions';

export const metadata: Metadata = {
  title: 'CV',
  description: 'CV of Ali Guliyev — B.Sc. Data Science (Eichstätt-Ingolstadt) and B.Sc. Mathematics (Baku State University), working toward catastrophe and climate risk modelling in Munich. View or download as PDF.',
  alternates: {
    canonical: '/cv',
  },
};

export default function CvPage() {
  const cvHref = '/resume/Ali_Guliyev_Resume_April_2026.pdf';

  return (
    <main className="min-h-screen bg-[#070b14] text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_top_left,rgba(59,130,246,0.22),transparent_35%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_30%),radial-gradient(circle_at_bottom,rgba(14,165,233,0.14),transparent_28%)]" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-1 text-sm font-medium text-blue-200">
              Curriculum Vitae
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Ali Guliyev — CV
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl">
              Preview my CV below, or download a copy for your records.
            </p>
            <CvActions />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl shadow-black/20 backdrop-blur">
          <div className="flex items-center justify-between px-4 py-3 text-sm text-slate-300">
            <span>PDF preview</span>
            <span>{cvHref.split('/').pop()}</span>
          </div>
          <div className="overflow-hidden rounded-2xl bg-black">
            <iframe
              src={cvHref}
              title="Ali Guliyev CV preview"
              className="h-[80vh] w-full"
            />
          </div>
        </div>
      </section>
    </main>
  );
}