---
name: Linus's Law
aka: ["Given enough eyeballs, all bugs are shallow"]
discipline: software-engineering
adoption: native
purpose: prediction
summary: With enough people reviewing and testing code, defects are found and fixed quickly, so fewer remain.
origin:
  by: Eric S. Raymond, The Cathedral and the Bazaar
  year: 1999
propositions:
  - id: more-eyes-fewer-defects
    statement: The more people who inspect a piece of code, the fewer defects remain in it.
scope: Code developed collaboratively, especially in open source projects, where the number of reviewers, testers, and contributors varies across components.
---

## Statement

Given a large enough base of reviewers and testers, almost every problem will be found quickly and the fix will be obvious to someone.

## Notes on evidence

Raymond stated the law from experience with Linux and his own projects. Studies of code review participation support the narrow version (more review participation, fewer post-release defects), but studies counting developers who *change* a file find that many contributors can be associated with more vulnerabilities, so the number of people involved is not uniformly beneficial.
