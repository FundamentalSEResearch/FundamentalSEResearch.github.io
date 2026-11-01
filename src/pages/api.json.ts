import type { APIRoute } from 'astro';
import { kindOf, loadGraph, type Claim } from '../lib/graph';

const claimJson = (c: Claim) => ({
  id: c.id,
  ...c.data,
  origin: { ...c.data.origin, paper: c.data.origin.paper?.id },
  ...('explains' in c.data && {
    explains: c.data.explains.map((x) => ({ law: x.law.id, source: x.source.id })),
  }),
});

export const GET: APIRoute = async () => {
  const g = await loadGraph();
  const body = {
    questions: g.questions.map((q) => ({ id: q.id, ...q.data })),
    laws: g.laws.map(claimJson),
    theories: g.theories.map(claimJson),
    methods: g.methods.map((m) => ({ id: m.id, ...m.data, references: m.data.references.map((r) => r.id) })),
    papers: g.papers.map((p) => ({ id: p.id, ...p.data, evidence: undefined })),
    evidence: g.evidence.map((e) => ({
      paper: e.paper.id,
      question: e.question.id,
      [kindOf(e.claim)]: e.claim.id,
      methods: e.methods.map((m) => m.id),
      relation: e.relation,
      finding: e.finding,
      note: e.note,
    })),
  };
  return new Response(JSON.stringify(body, null, 2), { headers: { 'Content-Type': 'application/json' } });
};
