"use client";

import { useEffect, useState } from "react";

type AwardPdf = {
  fileName: string;
  href: string;
  title: string;
};

export default function HonorsAwardsClient({ awards }: { awards: AwardPdf[] }) {
  const [selectedAward, setSelectedAward] = useState<AwardPdf | null>(null);

  useEffect(() => {
    if (!selectedAward) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedAward(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedAward]);

  if (awards.length === 0) {
    return (
      <div className="max-w-2xl mx-auto rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center bg-gray-50 dark:bg-gray-800/40">
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-2">No PDFs yet.</p>
        <p className="text-gray-600 dark:text-gray-300">
          Add files to <span className="font-semibold">public/honors-awards</span> and they will
          appear here automatically.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {awards.map((award) => (
          <article
            key={award.fileName}
            className="group relative rounded-xl border border-gray-200/70 dark:border-gray-700/70 shadow-lg overflow-hidden"
          >
            <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-900 overflow-hidden">
              <button
                type="button"
                onClick={() => setSelectedAward(award)}
                className="absolute inset-0 z-0 w-full h-full"
                aria-label={`Open ${award.title}`}
              >
                <iframe
                  src={`${award.href}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  title={award.title}
                  scrolling="no"
                  className="w-[calc(100%+32px)] h-full border-0 pointer-events-none"
                />
              </button>
              <div className="absolute inset-0 z-10 flex items-end justify-center gap-3 p-4 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <button
                  type="button"
                  onClick={() => setSelectedAward(award)}
                  className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-blue-600 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Open In Page
                </button>
                <a
                  href={award.href}
                  download
                  className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-gray-800/90 text-white px-4 py-2 text-sm font-semibold hover:bg-gray-700 transition-colors shadow-lg"
                >
                  Download
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {selectedAward && (
        <div
          className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 md:p-6"
          onClick={() => setSelectedAward(null)}
        >
          <div
            className="relative w-full max-w-6xl h-[88vh] rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedAward(null)}
              className="absolute top-3 right-3 z-10 inline-flex items-center justify-center rounded-full bg-black/60 text-white w-10 h-10 text-2xl hover:bg-black/80 transition-colors"
              aria-label="Close PDF viewer"
            >
              ×
            </button>
            <iframe
              src={`${selectedAward.href}#toolbar=1&navpanes=0&view=FitH`}
              title={selectedAward.title}
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </>
  );
}
