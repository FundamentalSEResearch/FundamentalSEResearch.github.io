---
name: Information Foraging Theory
aka: [IFT]
discipline: psychology
adoption: adapted
purpose: explanation-prediction
structure: variance
level: general
summary: People seeking information behave like animals foraging for food, following cues (scent) to the patches of information that promise the highest gain for the least effort.
origin:
  by: Pirolli & Card
  year: 1999
  paper: pirolli-card-1999
constructs:
  - name: Predator and prey
    definition: The person seeking information and the information they seek.
  - name: Patch
    definition: A location containing information, such as a file, method, or web page.
  - name: Information scent
    definition: The perceived relevance of a cue, such as a word or identifier, to the information being sought.
  - name: Topology
    definition: The links between patches that the forager can traverse, such as calls and references in code.
propositions:
  - id: scent-guides-navigation
    statement: People navigate toward patches whose cues have the highest information scent relative to their goal.
  - id: scent-predicts
    statement: A model of scent and topology predicts where people will navigate better than models that ignore scent.
scope: Information seeking in structured environments; adapted to software engineering as a model of how developers navigate source code during debugging and maintenance.
---

## Explanation

Foragers adapt their strategies to maximize the rate of gain. For information seekers, the gain is relevant information and the cost is time and effort. Cues in the environment carry scent: they signal how likely a path is to lead to valuable information, and people follow the strongest scent along the available links. Navigation can therefore be predicted from the environment and the goal without modeling detailed internal states.

## Relevance to software engineering

Debugging requires finding the few relevant places in a large code base, with bug reports and identifiers as cues and calls and references as links. The theory was adapted to code by defining patches, scent, and topology in terms of source code.
