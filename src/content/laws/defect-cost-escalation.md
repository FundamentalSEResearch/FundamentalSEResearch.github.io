---
name: Defect Cost Escalation
aka: [Delayed issue effect, "Fix it early, it's cheaper"]
discipline: software-engineering
adoption: native
purpose: prediction
summary: The later in the life cycle a defect is found and fixed, the more it costs to fix, often by an order of magnitude or more.
origin:
  by: Barry Boehm, Software Engineering Economics (Prentice-Hall)
  year: 1981
propositions:
  - id: later-costlier
    statement: The effort to resolve a defect increases with the time between the phase in which it is introduced and the phase in which it is found and fixed.
scope: Defects in software projects that pass through identifiable phases such as requirements, design, coding, testing, and operation.
---

## Statement

A defect that is fixed in the phase in which it was introduced is cheap; the same defect found in testing or after release costs many times more, because more work products must be changed and retested.

## Notes on evidence

The original figures came from large projects of the 1970s with sequential processes. A study of 171 more recent projects using a disciplined, phase-based process found no consistent increase in resolution effort for issues fixed later, suggesting the effect is not universal.
