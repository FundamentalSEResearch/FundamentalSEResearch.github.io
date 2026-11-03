---
name: Coverage–Effectiveness Hypothesis
aka: [Coverage as test adequacy]
discipline: software-engineering
adoption: native
purpose: prediction
summary: Test suites that achieve higher code coverage are more effective at detecting faults.
origin:
  by: Test adequacy criteria literature (e.g., Zhu, Hall & May, ACM Computing Surveys)
  year: 1997
propositions:
  - id: coverage-predicts-effectiveness
    statement: The higher a test suite's code coverage, the more faults it detects, independently of the number of tests in the suite.
scope: Test suites for programs, with coverage measured by statement, branch, or similar criteria and effectiveness by detected faults or killed mutants.
---

## Statement

Code that is never executed by a test cannot be checked by it, so test suites that execute more of the code should find more faults. Coverage is therefore used as a measure of test suite quality.

## Notes on evidence

Studies agree that coverage and effectiveness are correlated, but disagree on how strongly once suite size is controlled for. Part of the disagreement stems from how effectiveness is measured: some mutation scores are normalized by coverage, which builds in a correlation.
