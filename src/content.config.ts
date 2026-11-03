import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const AREAS = {
  teams: 'Teams & Coordination',
  organization: 'Organization & Architecture',
  planning: 'Estimation & Planning',
  evolution: 'Software Evolution',
  design: 'Design & Development Process',
  quality: 'Software Quality',
  people: 'Developers & Human Factors',
} as const;

// The discipline a law or theory originated in. Most theories used in SE come from elsewhere (Hannay et al. 2007).
export const DISCIPLINES = {
  'software-engineering': 'Software engineering',
  psychology: 'Psychology',
  'organization-science': 'Organization science',
  economics: 'Economics',
  'design-research': 'Design research',
  'information-systems': 'Information systems',
  'human-computer-interaction': 'Human–computer interaction',
  'learning-sciences': 'Learning sciences',
} as const;

// How a claim entered software engineering (Sjøberg et al. 2008): built in SE, used as-is, or modified for SE.
export const ADOPTION = {
  native: 'Developed in SE',
  borrowed: 'Borrowed as-is',
  adapted: 'Adapted for SE',
} as const;

// What a claim is for, after Gregor (2006). Design-and-action knowledge lives in engineering methods, not here.
export const PURPOSES = {
  description: 'Description',
  prediction: 'Prediction',
  explanation: 'Explanation',
  'explanation-prediction': 'Explanation & prediction',
} as const;

// Variance theories relate variables; process theories explain how an entity changes (Markus & Robey 1988; Ralph 2015).
export const STRUCTURES = {
  variance: 'Variance',
  process: 'Process',
} as const;

// The four types of process theory (Van de Ven & Poole 1995, as adapted to SE by Ralph 2015).
export const PROCESS_TYPES = {
  teleological: 'Teleological',
  dialectic: 'Dialectic',
  evolutionary: 'Evolutionary',
  lifecycle: 'Lifecycle',
} as const;

// Levels of theory sophistication (Sjøberg et al. 2008).
export const LEVELS = {
  'working-relationship': 'Minor working relationship',
  'middle-range': 'Middle-range',
  general: 'General',
} as const;

// How a paper uses a claim (extended from Hannay et al. 2007).
export const RELATIONS = {
  proposes: 'Proposes the claim',
  tests: 'Tests it empirically',
  applies: 'Applies it and observes the outcome',
  reviews: 'Synthesizes other studies of it',
  modifies: 'Refines or extends it in light of evidence',
  compares: 'Tests it head-to-head against a rival',
  'post-hoc': 'Uses it to explain results after the fact (not a test)',
} as const;

/** Relations that count as empirical evaluation of a claim. */
export const EMPIRICAL_RELATIONS = ['tests', 'applies', 'reviews', 'modifies', 'compares'] as const;
/** Relations that carry no finding. */
const NO_FINDING = ['proposes', 'post-hoc'];

// Where the evidence comes from: the context dimensions of a theory's scope (Sjøberg et al. 2008).
export const SETTINGS = {
  industrial: 'Industrial',
  'open-source': 'Open source',
  laboratory: 'Laboratory',
  mixed: 'Mixed settings',
  simulated: 'Simulation',
} as const;
export const PARTICIPANTS = {
  professionals: 'Professionals',
  students: 'Students',
  mixed: 'Mixed participants',
  none: 'No participants',
} as const;
export const DOMAINS = {
  software: 'Software',
  other: 'Outside software',
  mixed: 'Software and other domains',
} as const;

const keys = <T extends Record<string, string>>(o: T) => Object.keys(o) as [keyof T & string, ...(keyof T & string)[]];
const slug = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Use a lowercase-hyphenated id');

// A fundamental scientific question about software engineering.
// Questions never list theories directly: the link is derived from paper evidence.
const questions = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/questions' }),
  schema: z.object({
    title: z.string().endsWith('?'),
    summary: z.string(),
    area: z.enum(keys(AREAS)),
  }),
});

// Laws and theories share their anatomy: propositions about the world, and the scope in which they are claimed to hold.
const claimFields = {
  name: z.string(),
  aka: z.array(z.string()).default([]),
  discipline: z.enum(keys(DISCIPLINES)),
  adoption: z.enum(keys(ADOPTION)),
  summary: z.string(),
  origin: z.object({
    by: z.string(),
    year: z.number().int(),
    // Optional because some originating works (old books, reports) have no DOI or stable URL.
    paper: reference('papers').optional(),
  }),
  // Testable statements. Evidence can target individual propositions by id.
  propositions: z.array(z.object({ id: slug, statement: z.string() })).min(1),
  // The actors, technologies, activities, and systems the claim is meant to cover.
  scope: z.string().min(20),
};

type ClaimData = { discipline: string; adoption: string; propositions: { id: string }[] };
const checkClaim = (c: ClaimData, ctx: z.RefinementCtx) => {
  if ((c.discipline === 'software-engineering') !== (c.adoption === 'native'))
    ctx.addIssue({ code: 'custom', path: ['adoption'], message: "Use 'native' exactly when the discipline is software-engineering" });
  const ids = c.propositions.map((p) => p.id);
  if (new Set(ids).size !== ids.length) ctx.addIssue({ code: 'custom', path: ['propositions'], message: 'Proposition ids must be unique' });
};

// A law describes WHAT happens: an observed or claimed regularity, with no commitment to a mechanism.
const laws = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/laws' }),
  schema: z
    .object({
      ...claimFields,
      purpose: z.enum(['description', 'prediction']),
    })
    .superRefine(checkClaim),
});

// A theory explains WHY something happens: constructs, propositions, an explanation (the Markdown body), and scope.
// `explains` links a theory to the laws it accounts for; each link must cite a paper that makes it.
const theories = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/theories' }),
  schema: z
    .object({
      ...claimFields,
      purpose: z.enum(['explanation', 'explanation-prediction']),
      structure: z.enum(keys(STRUCTURES)),
      processType: z.enum(keys(PROCESS_TYPES)).optional(),
      level: z.enum(keys(LEVELS)),
      constructs: z.array(z.object({ name: z.string(), definition: z.string() })).min(1),
      explains: z.array(z.object({ law: reference('laws'), source: reference('papers') })).default([]),
    })
    .superRefine(checkClaim)
    .refine((t) => (t.structure === 'process') === !!t.processType, {
      path: ['processType'],
      message: 'Give a processType exactly when structure is process',
    }),
});

// A research method (how evidence is produced) or an engineering method (a practice derived from a law or theory).
// Engineering methods prescribe; laws and theories describe and explain. Keep the two apart (Ralph 2015).
const methods = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/methods' }),
  schema: z
    .object({
      name: z.string(),
      kind: z.enum(['research', 'engineering']),
      summary: z.string(),
      references: z.array(reference('papers')).min(1),
      derivedFrom: z
        .array(z.object({ law: reference('laws').optional(), theory: reference('theories').optional() }))
        .default([]),
    })
    .refine((m) => (m.kind === 'engineering') === m.derivedFrom.length > 0, {
      path: ['derivedFrom'],
      message: 'Engineering methods must name the laws or theories they derive from; research methods must not',
    })
    .refine((m) => m.derivedFrom.every((d) => !!d.law !== !!d.theory), {
      path: ['derivedFrom'],
      message: 'Each derivedFrom entry must name exactly one of `law` or `theory`',
    }),
});

// A published work. Its `evidence` entries are the edges of the knowledge graph:
// "this paper <relation> <law or theory> on <question> using <methods>, and found <finding>".
const papers = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/papers' }),
  schema: z
    .object({
      title: z.string(),
      authors: z.array(z.string()).min(1), // "Family, G." format
      year: z.number().int(),
      venue: z.string(),
      type: z.enum(['journal', 'conference', 'book', 'chapter', 'report', 'other']),
      doi: z.string().regex(/^10\.\d{4,9}\/\S+$/).optional(),
      url: z.string().url().optional(),
      evidence: z
        .array(
          z.object({
            question: reference('questions'),
            law: reference('laws').optional(),
            theory: reference('theories').optional(),
            relation: z.enum(keys(RELATIONS)),
            finding: z.enum(['supports', 'refutes', 'mixed', 'n/a']),
            // Required for `compares`: the id of the rival law or theory (same kind). The finding is for the named claim;
            // the rival automatically receives the opposite finding.
            rival: slug.optional(),
            // Ids of the claim's propositions this evidence bears on. Required when the claim has more than one.
            propositions: z.array(slug).default([]),
            // Where the evidence comes from. Required except for `proposes`.
            context: z
              .object({
                setting: z.enum(keys(SETTINGS)),
                participants: z.enum(keys(PARTICIPANTS)),
                domain: z.enum(keys(DOMAINS)),
              })
              .optional(),
            methods: z.array(reference('methods')).default([]),
            note: z.string().min(20), // what the paper found, in our own words
          }),
        )
        .default([]),
    })
    .refine((p) => p.doi || p.url, { message: 'Every paper needs a DOI or a URL' })
    .refine((p) => p.evidence.every((e) => !!e.law !== !!e.theory), {
      message: 'Each evidence entry must name exactly one of `law` or `theory`',
    })
    .refine((p) => p.evidence.every((e) => NO_FINDING.includes(e.relation) === (e.finding === 'n/a')), {
      message: "Use finding 'n/a' exactly when relation is 'proposes' or 'post-hoc'",
    })
    .refine((p) => p.evidence.every((e) => (e.relation === 'compares') === !!e.rival), {
      message: "Name a `rival` exactly when relation is 'compares'",
    })
    .refine((p) => p.evidence.every((e) => e.relation === 'proposes' || (e.context && e.methods.length > 0)), {
      message: 'Every evidence entry except `proposes` needs a `context` and at least one method',
    }),
});

export const collections = { questions, laws, theories, methods, papers };
