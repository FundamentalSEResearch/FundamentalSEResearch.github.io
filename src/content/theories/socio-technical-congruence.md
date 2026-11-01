---
name: Socio-Technical Congruence
discipline: software-engineering
adoption: native
purpose: explanation-prediction
structure: variance
level: middle-range
summary: Development is more productive when the coordination that actually happens matches the coordination that technical dependencies require.
origin:
  by: Cataldo, Herbsleb & Carley
  year: 2008
  paper: cataldo-herbsleb-carley-2008
constructs:
  - name: Technical dependency
    definition: A dependency between pieces of work, derived from the software artifacts they change (for example, files that are changed together).
  - name: Coordination requirements
    definition: The pairs of people who need to coordinate because the work they do is technically dependent.
  - name: Actual coordination
    definition: The coordination that takes place, observed through communication, shared team membership, or co-location.
  - name: Congruence
    definition: The proportion of coordination requirements that actual coordination covers.
  - name: Task completion time
    definition: The time taken to resolve a unit of work such as a modification request.
propositions:
  - id: congruence-speed
    statement: The higher the congruence between coordination requirements and actual coordination, the faster dependent tasks are completed.
scope: Developers working on interdependent tasks whose technical dependencies can be derived from code or change data; first studied in a single large software organization.
explains:
  - law: conways-law
    source: cataldo-herbsleb-carley-2008
---

## Explanation

Technical dependencies between pieces of work imply *coordination requirements* between the people doing that work. When those people actually coordinate, the dependencies are managed and work proceeds; when they do not, dependent changes stall. Congruence measures how well actual coordination covers the requirements, so higher congruence leads to faster task completion.

## Relationship to other theories

It operationalizes ideas from [Coordination Theory](/theories/coordination-theory/) and [Conway's Law](/laws/conways-law/) as a measurable quantity.
