import type { Metadata } from "next";
import { readdir } from "node:fs/promises";
import path from "node:path";

type AwardPdf = {
  fileName: string;
  href: string;
  title: string;
};

type PageSearchParams = {
  file?: string;
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
        href: `/honors-awards/${encodeURIComponent(entry.name)}`,
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

async function resolveSearchParams(
  searchParams?: PageSearchParams | Promise<PageSearchParams>
): Promise<PageSearchParams> {
  if (!searchParams) {
    return {};
  }
  if (typeof (searchParams as Promise<PageSearchParams>).then === "function") {
    return await (searchParams as Promise<PageSearchParams>);
  }
  return searchParams as PageSearchParams;
}

export default async function HonorsAwardsPage({
  searchParams,
}: {
  searchParams?: PageSearchParams | Promise<PageSearchParams>;
}) {
  const awards = await getAwardPdfs();
  const params = await resolveSearchParams(searchParams);
  const selectedAward =
    awards.find((award) => award.fileName === params.file) ?? (awards.length > 0 ? awards[0] : null);

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
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {awards.map((award) => (
                <article
                  key={award.fileName}
                  className={`rounded-xl border bg-white dark:bg-gray-800 shadow-lg overflow-hidden ${
                    selectedAward?.fileName === award.fileName
                      ? "border-blue-500 ring-2 ring-blue-500/50"
                      : "border-gray-200/70 dark:border-gray-700/70"
                  }`}
                >
                  <a
                    href={`/honors-awards?file=${encodeURIComponent(award.fileName)}`}
                    className="block h-48 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
                  >
                    <iframe
                      src={`${award.href}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                      title={`${award.title} preview`}
                      className="w-full h-full pointer-events-none"
                    />
                  </a>
                  <div className="p-5">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 line-clamp-2">
                      {award.title}
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={`/honors-awards?file=${encodeURIComponent(award.fileName)}`}
                        className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white px-4 py-2 font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Open In Page
                      </a>
                      <a
                        href={award.href}
                        download
                        className="inline-flex items-center justify-center rounded-full bg-gray-700 text-white px-4 py-2 font-semibold hover:bg-gray-600 transition-colors"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {selectedAward && (
              <section className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-5 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Viewing: {selectedAward.title}
                  </h2>
                  <a
                    href={selectedAward.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white px-5 py-2.5 font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Open In New Tab
                  </a>
                </div>
                <div className="h-[75vh] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
                  <iframe
                    src={`${selectedAward.href}#toolbar=1&navpanes=0&view=FitH`}
                    title={selectedAward.title}
                    className="w-full h-full"
                  />
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
