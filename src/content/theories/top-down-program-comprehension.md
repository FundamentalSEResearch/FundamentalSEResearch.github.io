---
name: Top-Down Program Comprehension
aka: [Hypothesis-driven comprehension]
discipline: software-engineering
adoption: native
purpose: explanation-prediction
structure: process
processType: teleological
level: middle-range
summary: Programmers understand code by forming hypotheses about what it does from domain knowledge, then refining them using recognizable clues in the code.
origin:
  by: Ruven Brooks, International Journal of Man-Machine Studies 18(6)
  year: 1983
constructs:
  - name: Hypothesis
    definition: A programmer's expectation about what a program or part of it does, derived from knowledge of the problem domain and of programming.
  - name: Beacon
    definition: A recognizable feature of code (such as a characteristic statement or identifier) that signals the presence of a particular structure or operation.
  - name: Programming plan
    definition: A stereotypical piece of code knowledge that achieves a common goal, such as a running-total loop.
  - name: Comprehension
    definition: A mapping between the problem domain and the program text that the programmer can use to answer questions about the program.
propositions:
  - id: hypothesis-driven
    statement: Experienced programmers comprehend code primarily top-down, by generating hypotheses about its purpose and verifying them, rather than by building understanding from individual statements.
  - id: beacons
    statement: Beacons in the code speed comprehension and are attended to and remembered more than other parts of the code.
  - id: plan-knowledge
    statement: Experienced programmers rely on programming plans and conventions, so code that violates them is harder to understand.
scope: Individual programmers reading code they did not write, mostly short programs in procedural languages; the theory distinguishes experienced programmers, who have the knowledge needed for top-down comprehension, from novices.
---

## Explanation

Understanding a program means building a mapping from the problem domain to the code. Experienced programmers start at the domain end: they form a primary hypothesis about what the program does and decompose it into subsidiary hypotheses until they reach ones that can be checked against the code. They check them by scanning for beacons, features that typically indicate a particular operation, and by matching code against programming plans they already know. When a hypothesis fails, it is revised. Because comprehension is driven by goals and expectations, the theory is classified as a teleological process theory.

## Rival accounts

Bottom-up accounts, notably Pennington's, hold that programmers first build a representation of the program's control flow and only later a representation of what it does in the problem domain. Integrated models propose that programmers switch between the two strategies depending on familiarity with the code.
