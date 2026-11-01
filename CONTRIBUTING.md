# Contributing

The catalog is organized **Question → Laws & Theories → Evidence**. Every claim must be backed by a published source, and the build enforces this.

## Data model

| Folder | One file per | Format |
|---|---|---|
| `src/content/questions/` | fundamental question | Markdown + frontmatter |
| `src/content/laws/` | law: a claimed regularity (*what* happens) | Markdown + frontmatter |
| `src/content/theories/` | theory: a proposed mechanism (*why* it happens) | Markdown + frontmatter |
| `src/content/methods/` | research or engineering method | Markdown + frontmatter |
| `src/content/papers/` | published work, **including its evidence links** | YAML |

### Law or theory?

- **Law**: states a regularity ("whenever X, then Y") without committing to why. Brooks' Law, Conway's Law, Lehman's Laws.
- **Theory**: proposes concepts and a mechanism that explains something. Coordination Theory, Socio-Technical Congruence.

Classify by what the claim *does*, not by its popular name. A theory may declare which laws it explains, and each link must cite the paper that makes the connection:

```yaml
# src/content/theories/socio-technical-congruence.md (frontmatter)
explains:
  - law: conways-law
    source: cataldo-herbsleb-carley-2008
```

### Evidence links

Questions, laws, and theories are never linked directly. A link exists only when a paper provides it:

```yaml
# src/content/papers/<first-author>-<year>.yaml
title: ...
authors: ["Family, G.", "Family, G."]
year: 2011
venue: IEEE Transactions on Software Engineering 37(5)
type: journal            # journal | conference | book | chapter | report | other
doi: 10.1109/TSE.2010.78 # or `url:` when no DOI exists
evidence:
  - question: why-estimates-are-optimistic   # file name in questions/
    theory: anchoring    # file name in theories/ (or `law:` with a file name in laws/; exactly one)
    relation: tests      # proposes | tests | applies | reviews
    finding: supports    # supports | refutes | mixed | n/a (only with proposes)
    methods: [field-experiment]               # file names in methods/
    note: One or two sentences, in your own words, on what the paper found.
```

A paper can carry several evidence links, for example when it tests a law and a theory that explains it.

## Rules enforced at build time

- Every paper has a DOI or a URL, and DOIs are checked against Crossref (`npm run check:dois`).
- Every question is addressed by at least one paper.
- Every law and theory has at least one paper that tests, applies, or reviews it, in addition to its origin.
- Every `explains` link cites a source paper.
- Every method cites at least one methodological reference.
- All references between files must resolve.

## Editorial guidelines

- **Write the finding in your own words.** Do not paste abstracts.
- **Record disconfirming evidence.** `refutes` and `mixed` findings are as valuable as `supports`.
- **Scope the claim.** If a study only covers one law of a set (e.g. one of Lehman's laws), say so in the note.
- **Law ≠ established.** Calling something a law describes the form of the claim, not its status. Record refutations.
- **Questions should be fundamental.** A good question can be answered with evidence, lasts longer than any single tool or practice, and has more than one plausible explanation.

## Local development

```sh
npm install
npm run dev          # http://localhost:4321
npm run check:dois   # verify DOIs
npm run build        # full validation + static build
```
