"use client";

import { useEffect, useState } from "react";

type AwardPdf = {
  fileName: string;
  href: string;
  title: string;
  subtitle?: string;
  previewSrc?: string;
};

const TURN_EASING = "cubic-bezier(0.645, 0.045, 0.355, 1)";

export default function HonorsAwardsClient({ awards }: { awards: AwardPdf[] }) {
  const [opened, setOpened] = useState(false);
  const [idx, setIdx] = useState(0); // current page; sheet j is turned iff j < idx
  const [pdfView, setPdfView] = useState<AwardPdf | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  const count = awards.length;
  const current = awards[Math.min(idx, count - 1)];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Keyboard: flip pages while the book is open, Escape closes the PDF viewer.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPdfView(null);
        return;
      }
      if (!opened || pdfView) return;
      if (event.key === "ArrowRight") setIdx((i) => Math.min(i + 1, count - 1));
      if (event.key === "ArrowLeft") setIdx((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [opened, pdfView, count]);

  if (count === 0) {
    return (
      <div className="max-w-2xl mx-auto rounded-xl border border-dashed border-gray-700 p-8 text-center bg-gray-800/40">
        <p className="text-lg text-gray-200 mb-2">No documents yet.</p>
        <p className="text-gray-300">
          Add PDF files to <span className="font-semibold">public/honors-awards</span> and they
          will appear here automatically.
        </p>
      </div>
    );
  }

  const closeBook = () => {
    setOpened(false);
    setIdx(0);
  };

  const sheetTransition = (turned: boolean) =>
    reduceMotion
      ? "none"
      : `transform 900ms ${TURN_EASING}, opacity 300ms linear ${turned ? "450ms" : "60ms"}`;

  return (
    <>
      {/* Clip so pages rotating past the spine never cause horizontal scroll */}
      <div className="overflow-x-clip">
        <div className="mx-auto flex flex-col items-center" style={{ perspective: "2200px" }}>
          <div className="relative w-[min(88vw,440px)] aspect-[1/1.414]" style={{ transformStyle: "preserve-3d" }}>
            {/* Page-block thickness behind the book (pushed back in Z so depth sorting keeps it behind) */}
            <div className="absolute inset-0 rounded-lg rounded-l-sm bg-slate-300/70 border border-slate-400/40" style={{ transform: "translate3d(7px, 7px, -14px)" }} aria-hidden />
            <div className="absolute inset-0 rounded-lg rounded-l-sm bg-slate-100/80 border border-slate-300/50" style={{ transform: "translate3d(3px, 3px, -12px)" }} aria-hidden />

            {/* Award sheets */}
            {awards.map((award, j) => {
              const turned = j < idx;
              return (
                <div
                  key={award.fileName}
                  className="absolute inset-0"
                  style={{
                    transformOrigin: "left center",
                    transformStyle: "preserve-3d",
                    // translateZ ladder: earlier sheets sit closer to the viewer
                    transform: `rotateY(${turned ? -180 : 0}deg) translateZ(${-0.8 * (j + 1)}px)`,
                    opacity: turned ? 0 : 1,
                    zIndex: turned ? 100 + j : count - j,
                    transition: sheetTransition(turned),
                    pointerEvents: turned ? "none" : "auto",
                  }}
                >
                  {/* Front: the document */}
                  <div
                    className="absolute inset-0 overflow-hidden rounded-lg rounded-l-sm bg-white shadow-xl shadow-black/40 [backface-visibility:hidden]"
                    onClick={() => opened && j < count - 1 && setIdx(j + 1)}
                    role={opened && j < count - 1 ? "button" : undefined}
                    aria-label={opened && j < count - 1 ? "Turn to next page" : undefined}
                  >
                    {award.previewSrc ? (
                      <img
                        src={award.previewSrc}
                        alt={`${award.title} — award document`}
                        className="h-full w-full object-contain select-none"
                        loading={j === 0 ? "eager" : "lazy"}
                        decoding="async"
                        draggable={false}
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-slate-50 p-8 text-center">
                        <p className="text-lg font-bold text-slate-800">{award.title}</p>
                        <p className="text-sm text-slate-500">PDF document — open below</p>
                      </div>
                    )}
                    {/* Spine shadow */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/15 via-black/5 to-transparent" aria-hidden />
                  </div>
                  {/* Back: plain paper */}
                  <div
                    className="absolute inset-0 rounded-lg rounded-r-sm bg-slate-100 [backface-visibility:hidden]"
                    style={{ transform: "rotateY(180deg)" }}
                    aria-hidden
                  >
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/10 to-transparent" />
                  </div>
                </div>
              );
            })}

            {/* Cover */}
            <div
              className="absolute inset-0"
              style={{
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
                // closest to the viewer while closed
                transform: `rotateY(${opened ? -180 : 0}deg) translateZ(2px)`,
                opacity: opened ? 0 : 1,
                zIndex: opened ? 99 : 200,
                transition: sheetTransition(opened),
                pointerEvents: opened ? "none" : "auto",
              }}
            >
              <button
                type="button"
                onClick={() => setOpened(true)}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 overflow-hidden rounded-lg rounded-l-sm border border-white/10 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 shadow-xl shadow-black/50 [backface-visibility:hidden]"
                aria-label="Open the honors and awards portfolio"
              >
                <span className="text-xs uppercase tracking-[0.3em] text-blue-300/80">Portfolio</span>
                <span className="px-6 text-3xl font-bold text-white">Honors & Awards</span>
                <span className="h-1 w-16 rounded-full bg-blue-400/80" aria-hidden />
                <span className="text-base text-slate-300">Ali Guliyev</span>
                <span className="absolute bottom-6 text-sm text-slate-400">Click to open</span>
                {/* Spine highlight */}
                <span className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white/10 via-white/[0.03] to-transparent" aria-hidden />
              </button>
              <div
                className="absolute inset-0 rounded-lg rounded-r-sm bg-slate-200 [backface-visibility:hidden]"
                style={{ transform: "rotateY(180deg)" }}
                aria-hidden
              />
            </div>
          </div>

          {/* Caption + controls */}
          <div className="mt-6 flex w-full max-w-xl flex-col items-center gap-4">
            {opened ? (
              <>
                <div className="text-center" aria-live="polite">
                  <p className="text-lg font-semibold text-white">{current.title}</p>
                  {current.subtitle && <p className="text-sm text-gray-400">{current.subtitle}</p>}
                  <p className="mt-1 text-sm text-gray-500">
                    Page {Math.min(idx + 1, count)} of {count}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIdx((i) => Math.max(i - 1, 0))}
                    disabled={idx === 0}
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setIdx((i) => Math.min(i + 1, count - 1))}
                    disabled={idx >= count - 1}
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next →
                  </button>
                  <button
                    type="button"
                    onClick={() => setPdfView(current)}
                    className="inline-flex items-center justify-center rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-400"
                  >
                    Open PDF
                  </button>
                  <a
                    href={current.href}
                    download
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Download
                  </a>
                  <button
                    type="button"
                    onClick={closeBook}
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    Close
                  </button>
                </div>
                <p className="text-xs text-gray-500">Tip: use the arrow keys, or click the page, to flip.</p>
              </>
            ) : (
              <p className="text-sm text-gray-400">
                {count} award document{count === 1 ? "" : "s"} inside
              </p>
            )}
          </div>

          {/* Plain links for screen readers and crawlers */}
          <nav className="sr-only" aria-label="Award documents">
            <ul>
              {awards.map((award) => (
                <li key={award.fileName}>
                  <a href={award.href}>{award.title}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Full-document viewer */}
      {pdfView && (
        <div
          className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 md:p-6"
          onClick={() => setPdfView(null)}
        >
          <div
            className="relative w-full max-w-6xl h-[88vh] rounded-xl border border-gray-700 bg-gray-900 shadow-2xl overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPdfView(null)}
              className="absolute top-3 right-3 z-10 inline-flex items-center justify-center rounded-full bg-black/60 text-white w-10 h-10 text-2xl hover:bg-black/80 transition-colors"
              aria-label="Close PDF viewer"
            >
              ×
            </button>
            <iframe
              src={`${pdfView.href}#toolbar=1&navpanes=0&view=FitH`}
              title={pdfView.title}
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </>
  );
}
