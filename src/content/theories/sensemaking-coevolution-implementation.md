---
name: Sensemaking–Coevolution–Implementation Theory
aka: [SCI]
discipline: software-engineering
adoption: native
purpose: explanation
structure: process
processType: teleological
level: general
summary: Teams build software by switching, in no fixed order, between making sense of an ambiguous context, developing their understanding of the problem and the design together, and implementing the system.
origin:
  by: Paul Ralph
  year: 2015
  paper: ralph-2015-sci
constructs:
  - name: Design agent
    definition: The team (or individual) that builds the system and chooses its own sequence of activities in pursuit of its goals.
  - name: Context
    definition: The environment the system will operate in, including stakeholders, constraints, and existing systems.
  - name: Sensemaking
    definition: Organizing perceptions of an ambiguous, problematic context into a usable understanding of it.
  - name: Coevolution
    definition: Refining understanding of the context and of the space of possible designs together, each reshaping the other.
  - name: Implementation
    definition: Constructing, debugging, and deploying software artifacts that manifest the team's understanding of the design.
  - name: Context schema and design space schema
    definition: The team's mental representations of the context and of the possible designs, which coevolution refines.
propositions:
  - id: sensemaking
    statement: Teams face ambiguous situations and construct their understanding of the context and its goals, rather than receiving them fully formed.
  - id: coevolution
    statement: Understanding of the problem and of the design develop together, each changing the other.
  - id: ad-hoc-oscillation
    statement: Sensemaking, coevolution, and implementation occur in any order or in parallel, not as a fixed sequence of phases.
scope: Collocated software development teams in organizations building complex software systems.
---

## Explanation

SCI is a teleological process theory: it explains development as the goal-directed behavior of an agent that chooses its own actions. Because the context is ambiguous, the team must first make sense of it, and because problems and solutions shape each other, its picture of what to build changes as it explores designs. Building the system then exposes new information about the context. The team therefore moves among the three activities as the situation demands, rather than completing analysis before design and design before coding.

## Rival theories

SCI was developed as an alternative to phase-based accounts of development such as the [Function–Behaviour–Structure Framework](/theories/function-behaviour-structure/). Its main empirical test compared the two directly.
