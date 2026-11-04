---
name: Turnover Quality Effect
discipline: software-engineering
adoption: native
purpose: prediction
summary: Developer turnover leads to more defects in the code the departing and arriving developers work on.
origin:
  by: Audris Mockus
  year: 2010
  paper: mockus-2010
propositions:
  - id: leavers-defects
    statement: Code worked on by developers who later leave, or by developers who have recently left the organization, has more defects.
  - id: newcomers-defects
    statement: Code changed by developers who have recently joined has more defects.
scope: Software organizations and open source projects with traceable histories of who changed which code.
---

## Statement

Developers carry knowledge of the code, its design, and its history. When they leave, that knowledge is lost; when newcomers arrive, they lack it. Both make defects more likely.

## Notes on evidence

The two propositions have fared differently in different settings. In an industrial organization, recent departures were associated with more customer-reported defects but newcomers were not. In five open source projects, activity by newcomers from outside the core team was associated with more bug fixes, while departures showed no significant effect.
