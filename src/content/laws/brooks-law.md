---
name: Brooks' Law
discipline: software-engineering
adoption: native
purpose: prediction
summary: Adding manpower to a late software project makes it later.
origin:
  by: Fred Brooks, The Mythical Man-Month (Addison-Wesley)
  year: 1975
propositions:
  - id: adding-people-delays
    statement: Adding people to a software project that is already late delays its completion further.
scope: Software projects that are already behind schedule, where new staff need to be trained and the remaining work cannot be fully partitioned.
---

## Statement

Adding people to a late software project delays it further.

## Proposed mechanism

New people need time to ramp up and take time from experienced members who train them. Communication paths grow roughly with the square of team size, and some tasks cannot be partitioned.

## Notes on evidence

Brooks stated the law from experience on IBM OS/360, not from a controlled study. Later simulation work suggests the cost effect is more robust than the schedule effect.
