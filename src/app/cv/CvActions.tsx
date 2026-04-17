"use client";

import { trackCVDownload } from "@/lib/analytics";

export default function CvActions() {
  const cvHref = "/resume/Ali_Guliyev_Resume_April_2026.pdf";
  const fileName = "Ali_Guliyev_Resume_April_2026.pdf";

  const handleDownload = () => {
    trackCVDownload();
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href={cvHref}
        download={fileName}
        onClick={handleDownload}
        className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-blue-400"
      >
        Download PDF
      </a>
      <a
        href={cvHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white/90 backdrop-blur transition-colors duration-300 hover:bg-white/10 hover:text-white"
      >
        Open raw PDF
      </a>
    </div>
  );
}