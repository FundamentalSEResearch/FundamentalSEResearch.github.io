---
name: Core–Periphery Concentration
aka: [Onion model of open source]
discipline: software-engineering
adoption: native
purpose: description
summary: In open source projects, a small core of developers writes most of the code, surrounded by a larger group who fix defects and a still larger group who report them.
origin:
  by: Mockus, Fielding & Herbsleb
  year: 2002
  paper: mockus-fielding-herbsleb-2002
propositions:
  - id: small-core
    statement: A core group of no more than 10 to 15 developers produces about 80% of the new functionality of an open source project.
  - id: wider-periphery
    statement: The group that fixes defects is larger than the core, and the group that reports problems is larger still.
scope: Open source projects with public version control and issue tracking, from successful mid-sized projects to large ones.
---

## Statement

Development work in open source is highly concentrated: a small core writes most of the code, and participation widens with each step away from code writing toward defect fixing and reporting.

## Notes on evidence

The pattern was observed in Apache and stated as hypotheses that projects larger than a core of 10–15 developers would need additional coordination mechanisms. A replication on FreeBSD found the concentration in a larger group of top developers, suggesting the core size depends on how a project is organized.
