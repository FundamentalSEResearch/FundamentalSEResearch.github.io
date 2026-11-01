import type { APIRoute } from 'astro';
import { loadGraph } from '../lib/graph';

export const GET: APIRoute = async () => {
  const g = await loadGraph();
  const body = {
    questions: g.questions.map((q) => ({ id: q.id, ...q.data })),
    theories: g.theories.map((t) => ({ id: t.id, ...t.data, origin: { ...t.data.origin, paper: t.data.origin.paper?.id } })),
    methods: g.methods.map((m) => ({ id: m.id, ...m.data, references: m.data.references.map((r) => r.id) })),
    papers: g.papers.map((p) => ({ id: p.id, ...p.data, evidence: undefined })),
    evidence: g.evidence.map((e) => ({
      paper: e.paper.id,
      question: e.question.id,
      theory: e.theory.id,
      methods: e.methods.map((m) => m.id),
      relation: e.relation,
      finding: e.finding,
      note: e.note,
    })),
  };
  return new Response(JSON.stringify(body, null, 2), { headers: { 'Content-Type': 'application/json' } });
};
