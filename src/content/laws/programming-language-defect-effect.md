---
name: Programming Language Defect Effect
aka: [Static typing prevents bugs]
discipline: software-engineering
adoption: native
purpose: prediction
summary: The programming language used, and in particular whether it is statically typed, affects how many defects a program contains.
origin:
  by: Long-standing claim in language design, tested at scale by Ray, Posnett, Filkov & Devanbu (FSE)
  year: 2014
propositions:
  - id: language-affects-defects
    statement: Projects written in some programming languages have measurably more defects than comparable projects written in others.
  - id: static-typing-fewer-defects
    statement: Static type checking detects a substantial share of the defects that would otherwise reach a code base.
scope: Real-world software projects, compared across languages or across typed and untyped versions of the same code.
---

## Statement

Language features constrain the mistakes programmers can make. Strong, static type systems in particular catch some errors before the program runs, so programs in such languages should contain fewer defects.

## Notes on evidence

A large GitHub study reported small but significant differences between languages. A reproduction that corrected data and statistical issues found that most of those associations disappeared. Studies of specific type systems give a more concrete estimate: about 15% of fixed bugs in JavaScript projects would have been caught by adding static types.
