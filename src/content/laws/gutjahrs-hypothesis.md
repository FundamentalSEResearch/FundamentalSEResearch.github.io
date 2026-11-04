---
name: Gutjahr's Hypothesis
discipline: software-engineering
adoption: native
purpose: prediction
summary: Partition testing is more effective than random testing at detecting faults.
origin:
  by: Walter Gutjahr
  year: 1999
  paper: gutjahr-1999
propositions:
  - id: partition-beats-random
    statement: For the same number of test cases, test sets selected by partitioning the input domain detect faults with higher probability than randomly selected test sets.
scope: Selection of test inputs for programs, compared by analysis, simulation, or experiment.
---

## Statement

Partitioning the input domain and sampling from each part spreads tests across behaviours where faults may hide. When the tester is uncertain where faults are, this systematic spreading should detect them more reliably than random sampling.

## Notes on evidence

Early analyses and simulations found random testing surprisingly competitive with partition testing. Later analysis showed that partition testing is expected to be better once uncertainty about failure rates within partitions is modelled, but the advantage depends on how well partitions match failure-causing inputs.
