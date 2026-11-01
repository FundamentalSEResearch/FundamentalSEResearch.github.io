---
name: Coordination Theory
discipline: organization-science
adoption: borrowed
purpose: explanation
structure: variance
level: general
summary: Coordination is the management of dependencies between activities; its cost depends on the kinds of dependencies and the mechanisms available to manage them.
origin:
  by: Malone & Crowston
  year: 1994
  paper: malone-crowston-1994
constructs:
  - name: Activity
    definition: A unit of work performed by an actor (a person, team, or system).
  - name: Dependency
    definition: A relationship between activities that constrains how they can be performed, such as a shared resource, a producer–consumer relation, or a simultaneity constraint.
  - name: Coordination mechanism
    definition: A process that manages a dependency, such as scheduling, standardization, or direct communication.
  - name: Coordination cost
    definition: The time and effort spent managing dependencies rather than doing the activities themselves.
propositions:
  - id: dependencies-need-coordination
    statement: Dividing work among actors creates dependencies, and the work can proceed efficiently only if coordination mechanisms manage those dependencies.
  - id: boundary-cost
    statement: Coordination is costlier, and dependent work slower, when dependencies cross boundaries that weaken the available coordination mechanisms.
scope: Any system of actors performing interdependent activities, across disciplines; in software engineering, work divided across people, teams, and sites.
---

## Explanation

Work that is split among actors creates dependencies (shared resources, producer–consumer relations, simultaneity constraints). Coordination is the set of processes that manage those dependencies, and its costs determine how efficiently divided work can proceed.

## Relevance to software engineering

Software modules are highly interdependent, so dividing development across people, teams, or sites creates dependencies that must be coordinated. The theory predicts delays where dependencies cross boundaries that weaken communication.
