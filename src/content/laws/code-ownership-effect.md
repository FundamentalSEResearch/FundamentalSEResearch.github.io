---
name: Code Ownership Effect
discipline: software-engineering
adoption: native
purpose: prediction
summary: Software components with a strong owner have fewer defects than components changed by many minor contributors.
origin:
  by: Bird, Nagappan, Murphy, Gall & Devanbu (ESEC/FSE)
  year: 2011
propositions:
  - id: ownership-fewer-defects
    statement: The larger the share of a component's changes made by its top contributor, and the fewer minor contributors it has, the fewer defects it has.
scope: Components, binaries, files, or directories of large software products, with ownership measured from version control history.
---

## Statement

When one person makes most changes to a component, that person knows it well and is accountable for it. Components changed by many people who each contribute little are more likely to accumulate defects.

## Notes on evidence

Studies of Microsoft products found that ownership measures relate to pre- and post-release failures. A replication on open source projects raised doubts about whether the effect generalizes, but a later replication across four Microsoft products confirmed it at file and directory level.
