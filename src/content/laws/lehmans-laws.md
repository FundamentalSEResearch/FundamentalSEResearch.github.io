---
name: Lehman's Laws of Software Evolution
discipline: software-engineering
adoption: native
purpose: prediction
summary: Software used in the real world must keep changing, and as it changes its complexity grows unless work is done to reduce it.
origin:
  by: Meir M. Lehman
  year: 1980
  paper: lehman-1980
propositions:
  - id: continuing-change
    statement: A system must be continually adapted, or it becomes progressively less satisfactory.
  - id: increasing-complexity
    statement: As a system evolves, its complexity increases unless work is done to maintain or reduce it.
  - id: continuing-growth
    statement: The functional content of a system must keep increasing to maintain user satisfaction.
  - id: declining-growth
    statement: The rate at which a system grows declines as the system gets larger.
scope: E-type systems, meaning software embedded in and used in a real-world domain, observed across releases over years.
---

## Statement

Lehman's laws describe *E-type* systems, meaning software embedded in and used in the real world. The 1980 formulation included continuing change and increasing complexity; continuing growth and a declining growth rate were added in later formulations, alongside laws such as self-regulation that this catalog does not yet track.

## Notes on evidence

The evidence differs from law to law, so each law is recorded as a separate proposition and evaluated individually rather than as a package.
