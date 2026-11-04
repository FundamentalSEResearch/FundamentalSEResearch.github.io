---
name: Software Diseconomies of Scale
discipline: software-engineering
adoption: native
purpose: prediction
summary: Effort grows faster than size, so productivity falls as software projects get larger.
origin:
  by: Barry Boehm, Software Engineering Economics (Prentice-Hall)
  year: 1981
propositions:
  - id: productivity-falls-with-size
    statement: Across projects, effort grows more than proportionally with product size, so larger projects have lower productivity.
scope: Software development projects compared across a range of sizes, with size measured in lines of code or function points.
---

## Statement

Communication, integration, and verification overhead grow faster than the product itself, so each additional unit of software costs more than the last.

## Notes on evidence

The evidence is contested. Some datasets show economies of scale for small projects and diseconomies only for large ones; others show none. Reanalyses suggest that the conclusion depends heavily on the dataset and the statistical model used.
