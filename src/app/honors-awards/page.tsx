import type { Metadata } from "next";
import { readdir } from "node:fs/promises";
import path from "node:path";
import HonorsAwardsClient from "./HonorsAwardsClient";

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
    canonical: "/honors-awards",
  },
};

export default async function HonorsAwardsPage() {
  const awards = await getAwardPdfs();

  return (
    <main className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Honors & Awards
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A collection of my honors, awards, and certificate PDFs.
          </p>
        </div>

        <HonorsAwardsClient awards={awards} />
      </div>
    </main>
  );
}
