---
name: Technology Acceptance Model
aka: [TAM]
discipline: information-systems
adoption: borrowed
purpose: explanation-prediction
structure: variance
level: middle-range
summary: People's intention to use a technology is determined mainly by how useful and how easy to use they perceive it to be.
origin:
  by: Fred D. Davis
  year: 1989
  paper: davis-1989
constructs:
  - name: Perceived usefulness
    definition: The degree to which a person believes that using a technology would improve their job performance.
  - name: Perceived ease of use
    definition: The degree to which a person believes that using a technology would be free of effort.
  - name: Behavioral intention
    definition: A person's stated intention to use the technology.
  - name: Use
    definition: The person's actual use of the technology.
propositions:
  - id: usefulness-intention
    statement: The more useful people perceive a technology to be, the stronger their intention to use it.
  - id: ease-intention
    statement: The easier people perceive a technology to be to use, the stronger their intention to use it, partly because ease of use makes it seem more useful.
scope: Individuals deciding whether to use an information technology in their work; in software engineering, developers deciding whether to use a development tool or methodology.
---

## Explanation

People adopt technologies they expect to pay off. Perceived usefulness captures the expected benefit and perceived ease of use the expected effort; together they shape attitudes and intentions, which in turn drive use. Ease of use also acts through usefulness, because a technology that takes less effort leaves more of its benefit.

## Relevance to software engineering

Development methodologies and tools are technologies that developers can choose to use or work around. Applying TAM to them tests whether the drivers of adopting end-user software also drive adopting development practices, which, unlike most end-user tools, change how developers do their work and are often mandated.
