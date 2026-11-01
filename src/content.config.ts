import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const AREAS = {
  teams: 'Teams & Coordination',
  organization: 'Organization & Architecture',
  planning: 'Estimation & Planning',
  evolution: 'Software Evolution',
} as const;

const areaKeys = Object.keys(AREAS) as [keyof typeof AREAS, ...(keyof typeof AREAS)[]];

// A fundamental scientific question about software engineering.
// Questions never list theories directly: the link is derived from paper evidence.
const questions = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/questions' }),
  schema: z.object({
    title: z.string().endsWith('?'),
    summary: z.string(),
    area: z.enum(areaKeys),
  }),
});

// A candidate explanation (law, theory, hypothesis, heuristic...) for one or more questions.
const theories = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/theories' }),
  schema: z.object({
    name: z.string(),
    kind: z.enum(['law', 'theory', 'hypothesis', 'heuristic', 'model']),
    aka: z.array(z.string()).default([]),
    discipline: z.string(),
    summary: z.string(),
    origin: z.object({
      by: z.string(),
      year: z.number().int(),
      // Optional because some originating works (old books, reports) have no DOI or stable URL.
      paper: reference('papers').optional(),
    }),
  }),
});

// A research method (how evidence is produced) or an engineering method (a practice derived from a theory).
const methods = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/methods' }),
  schema: z.object({
    name: z.string(),
    kind: z.enum(['research', 'engineering']),
    summary: z.string(),
    references: z.array(reference('papers')).min(1),
  }),
});

// A published work. Its `evidence` entries are the edges of the knowledge graph:
// "this paper <relation> <theory> on <question> using <methods>, and found <finding>".
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
            theory: reference('theories'),
            relation: z.enum(['proposes', 'tests', 'applies', 'reviews']),
            finding: z.enum(['supports', 'refutes', 'mixed', 'n/a']),
            methods: z.array(reference('methods')).min(1),
            note: z.string().min(20), // what the paper found, in our own words
          }),
        )
        .default([]),
    })
    .refine((p) => p.doi || p.url, { message: 'Every paper needs a DOI or a URL' })
    .refine((p) => p.evidence.every((e) => (e.relation === 'proposes') === (e.finding === 'n/a')), {
      message: "Use finding 'n/a' exactly when relation is 'proposes'",
    }),
});

export const collections = { questions, theories, methods, papers };
