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

Classify by what the claim *does*, not by its popular name. See the [About page](https://software-engineering-theories.github.io/about/) for the framework behind each field.

### Describing a law or theory

Both laws and theories state **propositions** (testable statements, each with an id) and a **scope**. Theories also define their **constructs** and must have an `## Explanation` section in the body saying *why* the propositions hold.

```yaml
# src/content/theories/socio-technical-congruence.md (frontmatter)
name: Socio-Technical Congruence
discipline: software-engineering   # software-engineering | psychology | organization-science | economics | design-research | information-systems
adoption: native                   # native (only for software-engineering) | borrowed | adapted
purpose: explanation-prediction    # theories: explanation | explanation-prediction; laws: description | prediction
structure: variance                # theories only: variance | process
# processType: teleological        # required when structure is process: teleological | dialectic | evolutionary | lifecycle
level: middle-range                # theories only: working-relationship | middle-range | general
summary: One sentence.
origin: { by: Cataldo, Herbsleb & Carley, year: 2008, paper: cataldo-herbsleb-carley-2008 }
constructs:                        # theories only
  - name: Congruence
    definition: The proportion of coordination requirements that actual coordination covers.
propositions:
  - id: congruence-speed
    statement: The higher the congruence, the faster dependent tasks are completed.
scope: Who and what the claim covers (actors, technologies, activities, systems).
explains:                          # theories only; each link cites the paper that makes it
  - law: conways-law
    source: cataldo-herbsleb-carley-2008
```

How to choose the classification fields:

- **purpose** follows Gregor (2006). Prescriptions ("design & action") belong in an engineering method, never in a law or theory.
- **structure**: a *variance* theory relates variables (more X, more Y). A *process* theory explains how something changes over time through activities and events. Pick the process type from Van de Ven & Poole (1995).
- **level** follows Sjøberg et al. (2008). Most SE theories are middle-range.
- **adoption**: was the claim developed in SE, used as-is from its home discipline, or modified for SE?

Do not turn a method (Scrum, Lean, the V-model) into a theory. Methods say what should happen; theories explain what does happen.

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
    relation: tests      # proposes | tests | applies | reviews | modifies | compares | post-hoc
    finding: supports    # supports | refutes | mixed | n/a (only with proposes and post-hoc)
    propositions: [assimilation]               # required when the claim has several propositions
    methods: [field-experiment]               # file names in methods/
    context: { setting: industrial, participants: professionals, domain: software }
    note: One or two sentences, in your own words, on what the paper found.
```

- **relation**: use `post-hoc` when a paper only invokes the claim to explain its results afterwards. It is recorded but does not count as support. Use `modifies` when a paper refines or extends the claim.
- **compares**: when a paper tests two rival claims against each other, record it once on either claim and name the other as `rival:` (same kind). The finding is for the claim you name; the rival automatically gets the opposite.
- **context**: `setting` is industrial | open-source | laboratory | mixed | simulated; `participants` is professionals | students | mixed | none; `domain` is software | other | mixed. Use `other` for studies outside software, such as general psychology experiments.

A paper can carry several evidence links, for example when it tests a law and a theory that explains it, or reaches different findings on different propositions.

## Rules enforced at build time

- Every paper has a DOI or a URL, and DOIs are checked against Crossref (`npm run check:dois`).
- Every question is addressed by at least one paper.
- Every law and theory has at least one paper that tests, applies, reviews, modifies, or compares it, in addition to its origin. Post-hoc explanations do not count.
- Every theory defines its constructs, states propositions and a scope, and has an `## Explanation` section.
- Evidence about a claim with several propositions lists the propositions it addresses, and every listed id exists.
- Every evidence entry except `proposes` records its methods and context.
- `compares` entries name a rival of the same kind; `adoption: native` is used exactly for software-engineering claims; process theories give a `processType`.
- Every `explains` link cites a source paper.
- Every method cites at least one methodological reference, and every engineering method names the laws or theories it is `derivedFrom`.
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
