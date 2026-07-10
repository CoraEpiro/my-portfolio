import type { Metadata } from "next";
import { readdir } from "node:fs/promises";
import path from "node:path";
import HonorsAwardsClient from "./HonorsAwardsClient";

type AwardPdf = {
  fileName: string;
  href: string;
  title: string;
  subtitle?: string;
  previewSrc?: string;
};

// Display names for known documents; anything new falls back to a
// cleaned-up version of its file name.
const KNOWN_AWARDS: Record<string, { title: string; subtitle?: string }> = {
  "camscanner-27-05-26-23-44-1.pdf": {
    title: "Deutschlandstipendium 2025",
    subtitle: "German national scholarship for high-achieving students",
  },
  "camscanner-28-05-26-00-10.pdf": {
    title: "Deutschlandstipendium 2026",
    subtitle: "German national scholarship for high-achieving students",
  },
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
  const previewsDir = path.join(awardsDir, "previews");

  let previews = new Set<string>();
  try {
    previews = new Set(await readdir(previewsDir));
  } catch {
    // no previews generated yet
  }

  try {
    const files = await readdir(awardsDir, { withFileTypes: true });

    return files
      .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".pdf"))
      .map((entry) => {
        const base = entry.name.replace(/\.pdf$/i, "");
        const previewFile = `${base}.jpg`;
        const known = KNOWN_AWARDS[entry.name];
        return {
          fileName: entry.name,
          href: `/honors-awards/${encodeURIComponent(entry.name)}`,
          title: known?.title ?? toTitle(entry.name),
          subtitle: known?.subtitle,
          previewSrc: previews.has(previewFile)
            ? `/honors-awards/previews/${encodeURIComponent(previewFile)}`
            : undefined,
        };
      })
      .sort((a, b) => a.fileName.localeCompare(b.fileName));
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: "Honors & Awards",
  description: "Honors and award documents of Ali Guliyev, including the Deutschlandstipendium national scholarship.",
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
            The original award documents, collected in a portfolio you can flip through.
          </p>
        </div>

        <HonorsAwardsClient awards={awards} />
      </div>
    </main>
  );
}
