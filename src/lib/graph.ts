import { getCollection, type CollectionEntry } from 'astro:content';

export type Question = CollectionEntry<'questions'>;
export type Theory = CollectionEntry<'theories'>;
export type Method = CollectionEntry<'methods'>;
export type Paper = CollectionEntry<'papers'>;
export type Finding = Paper['data']['evidence'][number]['finding'];

export interface Evidence {
  paper: Paper;
  question: Question;
  theory: Theory;
  methods: Method[];
  relation: Paper['data']['evidence'][number]['relation'];
  finding: Finding;
  note: string;
}

export interface Tally {
  supports: number;
  refutes: number;
  mixed: number;
  proposes: number;
}

let cached: Promise<ReturnType<typeof build>> | undefined;

/** Loads all collections, resolves references, and enforces the evidence policy. */
export function loadGraph() {
  cached ??= getAll().then(build);
  return cached;
}

async function getAll() {
  const [questions, theories, methods, papers] = await Promise.all([
    getCollection('questions'),
    getCollection('theories'),
    getCollection('methods'),
    getCollection('papers'),
  ]);
  return { questions, theories, methods, papers };
}

function build({ questions, theories, methods, papers }: Awaited<ReturnType<typeof getAll>>) {
  const problems: string[] = [];
  const index = <T extends { id: string }>(xs: T[]) => new Map(xs.map((x) => [x.id, x]));
  const qById = index(questions);
  const tById = index(theories);
  const mById = index(methods);
  const pById = index(papers);

  const need = <T>(map: Map<string, T>, id: string, where: string): T => {
    const hit = map.get(id);
    if (!hit) problems.push(`${where}: unknown reference "${id}"`);
    return hit as T;
  };

  const evidence: Evidence[] = papers.flatMap((paper) =>
    paper.data.evidence.map((e) => ({
      paper,
      question: need(qById, e.question.id, `paper ${paper.id}`),
      theory: need(tById, e.theory.id, `paper ${paper.id}`),
      methods: e.methods.map((m) => need(mById, m.id, `paper ${paper.id}`)),
      relation: e.relation,
      finding: e.finding,
      note: e.note,
    })),
  );

  for (const t of theories) {
    if (t.data.origin.paper) need(pById, t.data.origin.paper.id, `theory ${t.id}`);
    if (!evidence.some((e) => e.theory.id === t.id && e.relation !== 'proposes'))
      problems.push(`theory ${t.id}: needs at least one paper that tests, applies, or reviews it`);
  }
  for (const q of questions)
    if (!evidence.some((e) => e.question.id === q.id))
      problems.push(`question ${q.id}: needs at least one paper addressing it`);
  for (const m of methods) for (const r of m.data.references) need(pById, r.id, `method ${m.id}`);

  if (problems.length) throw new Error(`Evidence policy violations:\n  - ${problems.join('\n  - ')}`);

  const sortByYear = (xs: Evidence[]) => [...xs].sort((a, b) => a.paper.data.year - b.paper.data.year);

  return {
    questions,
    theories: [...theories].sort((a, b) => a.data.name.localeCompare(b.data.name)),
    methods: [...methods].sort((a, b) => a.data.name.localeCompare(b.data.name)),
    papers: [...papers].sort((a, b) => a.data.year - b.data.year || a.id.localeCompare(b.id)),
    evidence,
    paper: (id: string) => pById.get(id)!,
    forQuestion: (id: string) => sortByYear(evidence.filter((e) => e.question.id === id)),
    forTheory: (id: string) => sortByYear(evidence.filter((e) => e.theory.id === id)),
    forMethod: (id: string) => sortByYear(evidence.filter((e) => e.methods.some((m) => m.id === id))),
    citingMethod: (paperId: string) => methods.filter((m) => m.data.references.some((r) => r.id === paperId)),
    originOf: (paperId: string) => theories.filter((t) => t.data.origin.paper?.id === paperId),
  };
}

export function tally(xs: Evidence[]): Tally {
  const t: Tally = { supports: 0, refutes: 0, mixed: 0, proposes: 0 };
  for (const e of xs) {
    if (e.relation === 'proposes') t.proposes++;
    else if (e.finding !== 'n/a') t[e.finding]++;
  }
  return t;
}

/** Groups evidence by a key while preserving first-seen order. */
export function groupBy<K>(xs: Evidence[], key: (e: Evidence) => K) {
  const out = new Map<K, Evidence[]>();
  for (const e of xs) {
    const k = key(e);
    out.set(k, [...(out.get(k) ?? []), e]);
  }
  return out;
}

export function shortCite(p: Paper) {
  const fam = p.data.authors.map((a) => a.split(',')[0]);
  const who = fam.length === 1 ? fam[0] : fam.length === 2 ? `${fam[0]} & ${fam[1]}` : `${fam[0]} et al.`;
  return `${who} (${p.data.year})`;
}

export function paperLink(p: Paper) {
  return p.data.doi ? `https://doi.org/${p.data.doi}` : p.data.url!;
}

export function url(path: string) {
  return import.meta.env.BASE_URL.replace(/\/$/, '') + path;
}
