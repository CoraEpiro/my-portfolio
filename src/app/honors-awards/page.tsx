import type { Metadata } from "next";
import { readdir } from "node:fs/promises";
import path from "node:path";

type AwardPdf = {
  fileName: string;
  href: string;
  title: string;
};

function toTitle(fileName: string): string {
  return fileName
    .replace(/\.pdf$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

async function getAwardPdfs(): Promise<AwardPdf[]> {
  const awardsDir = path.join(process.cwd(), "public", "honors-awards");

  try {
    const files = await readdir(awardsDir, { withFileTypes: true });

    return files
      .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".pdf"))
      .map((entry) => ({
        fileName: entry.name,
        href: `/honors-awards/${entry.name}`,
        title: toTitle(entry.name),
      }))
      .sort((a, b) => a.fileName.localeCompare(b.fileName));
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: "Honors & Awards | Ali Guliyev",
  description: "Honors, awards, and certificate PDFs for Ali Guliyev.",
  alternates: {
    canonical: "https://aliguliyev.com/honors-awards",
  },
};

export default async function HonorsAwardsPage() {
  const awards = await getAwardPdfs();

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Honors & Awards
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A collection of my honors, awards, and certificate PDFs.
          </p>
        </div>

        {awards.length === 0 ? (
          <div className="max-w-2xl mx-auto rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center bg-gray-50 dark:bg-gray-800/40">
            <p className="text-lg text-gray-700 dark:text-gray-200 mb-2">No PDFs yet.</p>
            <p className="text-gray-600 dark:text-gray-300">
              Add files to <span className="font-semibold">public/honors-awards</span> and they will
              appear here automatically.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award) => (
              <article
                key={award.fileName}
                className="rounded-xl border border-gray-200/70 dark:border-gray-700/70 bg-white dark:bg-gray-800 p-6 shadow-lg"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2">
                  {award.title}
                </h2>
                <div className="flex gap-3">
                  <a
                    href={award.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white px-5 py-2.5 font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Open PDF
                  </a>
                  <a
                    href={award.href}
                    download
                    className="inline-flex items-center justify-center rounded-full bg-gray-700 text-white px-5 py-2.5 font-semibold hover:bg-gray-600 transition-colors"
                  >
                    Download
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
