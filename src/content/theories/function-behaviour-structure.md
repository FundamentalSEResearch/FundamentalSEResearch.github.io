---
name: Function–Behaviour–Structure Framework
aka: [FBS]
discipline: design-research
adoption: borrowed
purpose: explanation
structure: process
processType: lifecycle
level: general
summary: Designing proceeds through a defined set of transformations between a design's intended function, its expected and actual behaviour, and its structure.
origin:
  by: John S. Gero
  year: 1990
  paper: gero-1990
constructs:
  - name: Function
    definition: The purpose the designed artifact is meant to serve.
  - name: Expected behaviour
    definition: The behaviour the designer expects a structure to exhibit in order to achieve the function.
  - name: Structure
    definition: The components of the artifact and their relationships.
  - name: Actual behaviour
    definition: The behaviour derived from analyzing the structure.
  - name: Design description
    definition: The documentation of the structure produced at the end of designing.
propositions:
  - id: fbs-transformations
    statement: Designing consists of a defined set of transformations between function, behaviour, and structure (formulation, synthesis, analysis, evaluation, reformulation, and documentation).
scope: Design of artifacts in general, originally proposed for engineering design and later applied to software design.
---

## Explanation

The framework explains designing as the transformation of required function into a structure that achieves it. The designer formulates the function into expected behaviour, synthesizes a structure, analyzes the structure's actual behaviour, and evaluates it against the expected behaviour, reformulating when they diverge and finally documenting the result.

## Classification

The framework was proposed for design in general and is used here as a candidate account of software development. Following Ralph's comparison with [SCI](/theories/sensemaking-coevolution-implementation/), it is classified as a lifecycle process theory: a defined set of transformations that the designer cycles through, which Ralph contrasts with the ad hoc oscillation that SCI posits.
