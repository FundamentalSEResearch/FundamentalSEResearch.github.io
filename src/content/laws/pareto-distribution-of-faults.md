---
name: Pareto Distribution of Faults
aka: [80/20 rule for defects]
discipline: software-engineering
adoption: native
purpose: prediction
summary: A small proportion of a system's modules contains most of its faults.
origin:
  by: Software quality folklore, stated as testable hypotheses by Fenton & Ohlsson
  year: 2000
  paper: fenton-ohlsson-2000
propositions:
  - id: concentration
    statement: A small proportion of modules (roughly 20%) contains most of the faults (roughly 80%).
  - id: persistence
    statement: Modules that are fault-prone in one phase of testing or release remain fault-prone in later phases.
scope: Faults found in testing and operation of large software systems, measured per module or file, mostly in industrial telecommunications and similar systems.
---

## Statement

Faults are not spread evenly across a system. A minority of modules accounts for the majority of faults, and the same modules are expected to remain fault-prone.

## Notes on evidence

Replications in telecommunications systems consistently find the concentration. Whether fault-proneness persists is less settled: the original study found that modules most fault-prone before release were among the least fault-prone in operation, while a later replication found fault-proneness persisting across test phases. Module size does not explain the concentration well.
