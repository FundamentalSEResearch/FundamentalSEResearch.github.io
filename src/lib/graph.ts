import { getCollection, type CollectionEntry } from 'astro:content';

export type Question = CollectionEntry<'questions'>;
export type Law = CollectionEntry<'laws'>;
export type Theory = CollectionEntry<'theories'>;
/** A law (what happens) or a theory (why it happens). Tell them apart with `collection`. */
export type Claim = Law | Theory;
export type Method = CollectionEntry<'methods'>;
export type Paper = CollectionEntry<'papers'>;
export type Finding = Paper['data']['evidence'][number]['finding'];

export interface Evidence {
  paper: Paper;
  question: Question;
  claim: Claim;
  methods: Method[];
  relation: Paper['data']['evidence'][number]['relation'];
  finding: Finding;
  note: string;
}

export interface Explanation {
  theory: Theory;
  law: Law;
  source: Paper;
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
  const [questions, laws, theories, methods, papers] = await Promise.all([
    getCollection('questions'),
    getCollection('laws'),
    getCollection('theories'),
    getCollection('methods'),
    getCollection('papers'),
  ]);
  return { questions, laws, theories, methods, papers };
}

function build({ questions, laws, theories, methods, papers }: Awaited<ReturnType<typeof getAll>>) {
  const problems: string[] = [];
  const index = <T extends { id: string }>(xs: T[]) => new Map(xs.map((x) => [x.id, x]));
  const qById = index(questions);
  const lById = index(laws);
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
      claim: e.law ? need(lById, e.law.id, `paper ${paper.id}`) : need(tById, e.theory!.id, `paper ${paper.id}`),
      methods: e.methods.map((m) => need(mById, m.id, `paper ${paper.id}`)),
      relation: e.relation,
      finding: e.finding,
      note: e.note,
    })),
  );

  const explanations: Explanation[] = theories.flatMap((theory) =>
    theory.data.explains.map((x) => ({
      theory,
      law: need(lById, x.law.id, `theory ${theory.id}`),
      source: need(pById, x.source.id, `theory ${theory.id}`),
    })),
  );

  for (const c of [...laws, ...theories]) {
    const where = `${kindOf(c)} ${c.id}`;
    if (c.data.origin.paper) need(pById, c.data.origin.paper.id, where);
    if (!evidence.some((e) => e.claim.id === c.id && e.relation !== 'proposes'))
      problems.push(`${where}: needs at least one paper that tests, applies, or reviews it`);
  }
  for (const q of questions)
    if (!evidence.some((e) => e.question.id === q.id))
      problems.push(`question ${q.id}: needs at least one paper addressing it`);
  for (const m of methods) for (const r of m.data.references) need(pById, r.id, `method ${m.id}`);

  if (problems.length) throw new Error(`Evidence policy violations:\n  - ${problems.join('\n  - ')}`);

  const sortByYear = (xs: Evidence[]) => [...xs].sort((a, b) => a.paper.data.year - b.paper.data.year);
  const byName = <T extends Claim | Method>(xs: T[]) => [...xs].sort((a, b) => a.data.name.localeCompare(b.data.name));
  const sortedLaws = byName(laws);
  const sortedTheories = byName(theories);

  return {
    questions,
    laws: sortedLaws,
    theories: sortedTheories,
    /** Laws first, then theories. */
    claims: [...sortedLaws, ...sortedTheories] as Claim[],
    methods: byName(methods),
    papers: [...papers].sort((a, b) => a.data.year - b.data.year || a.id.localeCompare(b.id)),
    evidence,
    explanations,
    paper: (id: string) => pById.get(id)!,
    forQuestion: (id: string) => sortByYear(evidence.filter((e) => e.question.id === id)),
    forClaim: (c: Claim) => sortByYear(evidence.filter((e) => sameClaim(e.claim, c))),
    forMethod: (id: string) => sortByYear(evidence.filter((e) => e.methods.some((m) => m.id === id))),
    explainedBy: (lawId: string) => explanations.filter((x) => x.law.id === lawId),
    citingMethod: (paperId: string) => methods.filter((m) => m.data.references.some((r) => r.id === paperId)),
    originOf: (paperId: string) => [...laws, ...theories].filter((c) => c.data.origin.paper?.id === paperId) as Claim[],
    explanationSourcedBy: (paperId: string) => explanations.filter((x) => x.source.id === paperId),
  };
}

export function kindOf(c: Claim) {
  return c.collection === 'laws' ? 'law' : 'theory';
}

export function sameClaim(a: Claim, b: Claim) {
  return a.collection === b.collection && a.id === b.id;
}

/** Stable key for a claim, unique across laws and theories. */
export function claimKey(c: Claim) {
  return `${kindOf(c)}-${c.id}`;
}

export function claimUrl(c: Claim) {
  return url(`/${c.collection}/${c.id}/`);
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
