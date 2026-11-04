// Verifies every paper's DOI against Crossref: the DOI must resolve, and the
// recorded year and first author's family name must match Crossref's metadata.
import { readdir, readFile } from 'node:fs/promises';
import { parse } from 'yaml';

const dir = new URL('../src/content/papers/', import.meta.url);
const files = (await readdir(dir)).filter((f) => f.endsWith('.yaml'));
// Transliterations differ (Jørgensen → Jorgensen, Sjøberg → Sjoeberg), so compare every variant.
const variants = (s) =>
  ['o', 'oe'].map((o) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[øØ]/g, o).toLowerCase().replace(/[^a-z]/g, ''));
// Compound surnames (Méndez Fernández) are sometimes indexed under one part, so a containment match also counts.
const sameName = (a, b) =>
  variants(a).some((x) => variants(b).some((y) => x.slice(0, 5) === y.slice(0, 5) || x.includes(y) || y.includes(x)));

async function crossref(doi) {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, {
      headers: { 'User-Agent': 'fundamental-se-research (https://github.com/FundamentalSEResearch)' },
    });
    if ((res.status !== 429 && res.status < 500) || attempt === 5) return res;
    await new Promise((r) => setTimeout(r, 1000 * 2 ** attempt));
  }
}

let failures = 0;
for (const file of files) {
  const p = parse(await readFile(new URL(file, dir), 'utf8'));
  if (!p.doi) continue;
  const res = await crossref(p.doi);
  if (!res.ok) {
    console.error(`✗ ${file}: DOI ${p.doi} not found (${res.status})`);
    failures++;
    continue;
  }
  const m = (await res.json()).message;
  const years = ['published-print', 'published-online', 'issued', 'published']
    .map((k) => m[k]?.['date-parts']?.[0]?.[0])
    .filter(Boolean);
  const first = m.author?.[0]?.family;
  const problems = [];
  if (years.length && !years.some((y) => Math.abs(y - p.year) <= 1)) problems.push(`year ${p.year} vs Crossref ${years.join('/')}`);
  if (first && !sameName(first, p.authors[0].split(',')[0]))
    problems.push(`first author "${p.authors[0]}" vs Crossref "${first}"`);
  if (problems.length) {
    console.error(`✗ ${file}: ${problems.join('; ')}`);
    failures++;
  } else console.log(`✓ ${file}`);
}
if (failures) process.exit(1);
