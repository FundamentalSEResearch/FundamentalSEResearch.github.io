---
name: Hetzel–Myers Law
discipline: software-engineering
adoption: native
purpose: prediction
summary: A combination of different verification and validation methods outperforms any single method alone.
origin:
  by: William Hetzel (1976) and Glenford Myers
  year: 1978
  paper: myers-1978
propositions:
  - id: techniques-complementary
    statement: Different verification techniques (such as functional testing, structural testing, and code reading) tend to detect different defects.
  - id: combination-better
    statement: Combining several verification techniques detects more defects than applying any single technique with the same total effort.
scope: Defect detection in programs and designs by people applying testing, reading, or inspection techniques.
---

## Statement

No single verification technique finds all kinds of defects. Because techniques overlap only partly, a mix of them finds more defects than any one alone.

## Notes on evidence

Controlled experiments since the 1970s find large variation between individuals and only partial overlap between the defects different techniques reveal. Which single technique performs best varies across experiments, which itself argues for combining them.
