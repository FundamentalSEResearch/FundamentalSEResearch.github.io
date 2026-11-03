---
name: Distance Matters
discipline: human-computer-interaction
adoption: borrowed
purpose: explanation-prediction
structure: variance
level: middle-range
summary: Geographic distance makes collaboration harder unless the work is loosely coupled, collaborators share common ground, and they are ready for collaboration and its technology.
origin:
  by: Olson & Olson
  year: 2000
  paper: olson-olson-2000
constructs:
  - name: Common ground
    definition: The knowledge, beliefs, and context collaborators share and know they share.
  - name: Coupling of work
    definition: How much the parts of a task depend on frequent, ambiguous interaction between the people doing them.
  - name: Collaboration readiness
    definition: How willing and accustomed people are to share work and information.
  - name: Collaboration technology readiness
    definition: How prepared people and organizations are to use communication and coordination technology effectively.
propositions:
  - id: distance-slows
    statement: Tightly coupled work done across distance takes longer than comparable co-located work.
  - id: distance-degrades-quality
    statement: Products of work done across distance have lower quality than comparable products of co-located work, unless common ground and coordination support compensate.
scope: Synchronous and asynchronous group work across sites; in software engineering, development of interdependent components and work items by people at different locations.
---

## Explanation

Co-location supplies rich, cheap, and frequent interaction: people notice each other's context, repair misunderstandings quickly, and build common ground informally. Distance removes much of this, so tightly coupled work, which depends on such interaction, slows down and suffers more misunderstandings. Shared ground, loosely coupled work, and readiness to use collaboration technology reduce the penalty.

## Relevance to software engineering

Software components are interdependent, so distributing their development creates coupled work across sites. The theory predicts delays and quality problems where tightly coupled work is split across locations, and smaller penalties where organizations keep coupling low and invest in shared context.
