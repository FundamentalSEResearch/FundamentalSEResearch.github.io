---
name: Code Smell Hypothesis
aka: [Antipatterns harm maintainability]
discipline: software-engineering
adoption: native
purpose: prediction
summary: Code that contains smells or antipatterns is harder to maintain than code that does not.
origin:
  by: Martin Fowler & Kent Beck, Refactoring (Addison-Wesley)
  year: 1999
propositions:
  - id: change-proneness
    statement: Classes that contain code smells or antipatterns change more often than other classes.
  - id: fault-proneness
    statement: Classes that contain code smells or antipatterns are more fault-prone than other classes.
  - id: maintenance-effort
    statement: Maintaining code that contains code smells takes more effort than maintaining code that does not.
scope: Object-oriented source code and the classes or files in which smells such as God Class, Feature Envy, or Long Method are detected.
---

## Statement

Code smells are surface symptoms of design problems. Code with smells is expected to be harder to understand and change, and so to change more, break more, and cost more to maintain.

## Notes on evidence

Repository studies of open source systems consistently find that classes with smells are more change- and fault-prone, partly but not entirely because they are larger. A controlled study that measured the actual effort of professional developers found no smell associated with increased effort once file size and number of changes were accounted for.
