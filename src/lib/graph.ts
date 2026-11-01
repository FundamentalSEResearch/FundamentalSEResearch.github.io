import { getCollection, type CollectionEntry } from 'astro:content';
import { EMPIRICAL_RELATIONS } from '../content.config';

export type Question = CollectionEntry<'questions'>;
export type Law = CollectionEntry<'laws'>;
export type Theory = CollectionEntry<'theories'>;
/** A law (what happens) or a theory (why it happens). Tell them apart with `collection`. */
export type Claim = Law | Theory;
export type Method = CollectionEntry<'methods'>;
export type Paper = CollectionEntry<'papers'>;
type RawEvidence = Paper['data']['evidence'][number];
export type Finding = RawEvidence['finding'];
export type Relation = RawEvidence['relation'];
export type Context = NonNullable<RawEvidence['context']>;

export interface Evidence {
  paper: Paper;
  question: Question;
  claim: Claim;
  methods: Method[];
  relation: Relation;
  finding: Finding;
  /** Proposition ids of `claim` this evidence bears on. Empty means the claim as a whole. */
  propositions: string[];
  context?: Context;
  /** For `compares`: the claim it was tested against. */
  rival?: Claim;
  /** True for the entry derived for the rival side of a comparison. */
  mirrored: boolean;
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
  'post-hoc': number;
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

const OPPOSITE: Record<Finding, Finding> = { supports: 'refutes', refutes: 'supports', mixed: 'mixed', 'n/a': 'n/a' };

export function isEmpirical(e: Evidence) {
  return (EMPIRICAL_RELATIONS as readonly string[]).includes(e.relation);
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

  const direct: Evidence[] = papers.flatMap((paper) =>
    paper.data.evidence.map((e) => {
      const where = `paper ${paper.id}`;
      const claims: Map<string, Claim> = e.law ? lById : tById;
      const claim: Claim = need(claims, e.law?.id ?? e.theory!.id, where);
      const rival: Claim | undefined = e.rival ? need(claims, e.rival, where) : undefined;
      if (claim) {
        const ids = claim.data.propositions.map((p) => p.id);
        for (const p of e.propositions)
          if (!ids.includes(p)) problems.push(`${where}: ${kindOf(claim)} ${claim.id} has no proposition "${p}"`);
        if (ids.length > 1 && !e.propositions.length && e.relation !== 'proposes')
          problems.push(`${where}: ${kindOf(claim)} ${claim.id} has several propositions; list the ones this evidence addresses (${ids.join(', ')})`);
        if (rival && rival.id === claim.id) problems.push(`${where}: a claim cannot be its own rival`);
      }
      return {
        paper,
        question: need(qById, e.question.id, where),
        claim,
        methods: e.methods.map((m) => need(mById, m.id, where)),
        relation: e.relation,
        finding: e.finding,
        propositions: e.propositions,
        context: e.context,
        rival,
        mirrored: false,
        note: e.note,
      };
    }),
  );
  // A comparison is evidence about both claims: the rival gets the opposite finding.
  const evidence: Evidence[] = [
    ...direct,
    ...direct
      .filter((e) => e.relation === 'compares' && e.rival)
      .map((e) => ({ ...e, claim: e.rival!, rival: e.claim, finding: OPPOSITE[e.finding], propositions: [], mirrored: true })),
  ];

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
    if (!evidence.some((e) => sameClaim(e.claim, c) && isEmpirical(e)))
      problems.push(`${where}: needs at least one paper that tests, applies, reviews, modifies, or compares it`);
  }
  // A theory must say why, not just what (Sjøberg et al. 2008).
  for (const t of theories)
    if (!/^## Explanation\s*$/m.test(t.body ?? '')) problems.push(`theory ${t.id}: body needs an "## Explanation" section`);
  for (const q of questions)
    if (!evidence.some((e) => e.question.id === q.id))
      problems.push(`question ${q.id}: needs at least one paper addressing it`);
  for (const m of methods) {
    for (const r of m.data.references) need(pById, r.id, `method ${m.id}`);
    for (const d of m.data.derivedFrom)
      d.law ? need(lById, d.law.id, `method ${m.id}`) : need(tById, d.theory!.id, `method ${m.id}`);
  }

  if (problems.length) throw new Error(`Evidence policy violations:\n  - ${problems.join('\n  - ')}`);

  const sortByYear = (xs: Evidence[]) => [...xs].sort((a, b) => a.paper.data.year - b.paper.data.year);
  const byName = <T extends Claim | Method>(xs: T[]) => [...xs].sort((a, b) => a.data.name.localeCompare(b.data.name));
  const sortedLaws = byName(laws);
  const sortedTheories = byName(theories);
  const derivedClaims = (m: Method): Claim[] =>
    m.data.derivedFrom.map((d) => (d.law ? lById.get(d.law.id)! : tById.get(d.theory!.id)!));

  return {
    questions,
    laws: sortedLaws,
    theories: sortedTheories,
    /** Laws first, then theories. */
    claims: [...sortedLaws, ...sortedTheories] as Claim[],
    methods: byName(methods),
    papers: [...papers].sort((a, b) => a.data.year - b.data.year || a.id.localeCompare(b.id)),
    /** Every evidence link, including the derived rival side of each comparison. */
    evidence,
    /** Evidence exactly as recorded in paper files (no derived rival entries). */
    recorded: direct,
    explanations,
    paper: (id: string) => pById.get(id)!,
    forQuestion: (id: string) => sortByYear(evidence.filter((e) => e.question.id === id)),
    forClaim: (c: Claim) => sortByYear(evidence.filter((e) => sameClaim(e.claim, c))),
    forMethod: (id: string) => sortByYear(direct.filter((e) => e.methods.some((m) => m.id === id))),
    explainedBy: (lawId: string) => explanations.filter((x) => x.law.id === lawId),
    citingMethod: (paperId: string) => methods.filter((m) => m.data.references.some((r) => r.id === paperId)),
    derivedClaims,
    methodsDerivedFrom: (c: Claim) => methods.filter((m) => derivedClaims(m).some((d) => sameClaim(d, c))),
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
  const t: Tally = { supports: 0, refutes: 0, mixed: 0, proposes: 0, 'post-hoc': 0 };
  for (const e of xs) {
    if (e.relation === 'proposes' || e.relation === 'post-hoc') t[e.relation]++;
    else if (e.finding !== 'n/a') t[e.finding]++;
  }
  return t;
}

/** The badge shown for one piece of evidence. */
export function evidenceBadge(e: Evidence) {
  return e.relation === 'proposes' || e.relation === 'post-hoc' ? e.relation : e.finding;
}

/** Evidence bearing on one proposition: entries naming it, plus entries about the claim as a whole. */
export function forProposition(xs: Evidence[], id: string) {
  return xs.filter((e) => !e.propositions.length || e.propositions.includes(id));
}

/**
 * The parts of a claim's evaluation that can be computed from the evidence (Sjøberg et al. 2008):
 * empirical support, and generality across the contexts it has been tested in.
 * Testability, parsimony, explanatory power, and utility are judgments, so the catalog does not score them.
 */
export function evaluate(xs: Evidence[]) {
  const empirical = xs.filter(isEmpirical);
  const uniq = <T>(ys: T[]) => [...new Set(ys)];
  return {
    tally: tally(empirical),
    studies: uniq(empirical.map((e) => e.paper.id)).length,
    settings: uniq(empirical.map((e) => e.context!.setting)),
    participants: uniq(empirical.map((e) => e.context!.participants)),
    domains: uniq(empirical.map((e) => e.context!.domain)),
    methods: uniq(empirical.flatMap((e) => e.methods)),
  };
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
