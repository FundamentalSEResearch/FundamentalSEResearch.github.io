---
name: Constantine's Law
aka: [Low coupling, high cohesion]
discipline: software-engineering
adoption: native
purpose: prediction
summary: A structure is stable, and easier to get right and change, if its modules are strongly cohesive and loosely coupled.
origin:
  by: Stevens, Myers & Constantine
  year: 1974
  paper: stevens-myers-constantine-1974
propositions:
  - id: coupling-faults
    statement: The more a module is coupled to other modules, the more faults it contains.
  - id: cohesion-faults
    statement: The less cohesive a module is, the more faults it contains.
scope: Modules, classes, and components of software systems, with coupling and cohesion measured from the code or design.
---

## Statement

Modules that do one thing (high cohesion) and depend little on one another (low coupling) are easier to understand, test, and change, so they contain fewer errors and change less riskily.

## Notes on evidence

Studies of object-oriented metrics consistently find that coupling predicts fault-proneness. Evidence for cohesion is weaker, partly because cohesion metrics are hard to define and validate.
