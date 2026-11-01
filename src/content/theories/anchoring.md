---
name: Anchoring and Adjustment
discipline: psychology
adoption: borrowed
purpose: explanation-prediction
structure: variance
level: middle-range
summary: Numeric judgments are pulled toward an initial value (an anchor), even when that value is irrelevant.
origin:
  by: Tversky & Kahneman
  year: 1974
  paper: tversky-kahneman-1974
constructs:
  - name: Anchor
    definition: A numeric value available to the person before or while they make a judgment, whether or not it is relevant.
  - name: Adjustment
    definition: The movement from the anchor toward the final judgment.
  - name: Judgment
    definition: The numeric estimate the person finally gives, such as an effort estimate.
propositions:
  - id: assimilation
    statement: Judgments are biased toward a salient anchor, even when the anchor is irrelevant to the quantity being judged.
  - id: insufficient-adjustment
    statement: Adjustment away from an anchor is typically too small, so the judgment stays closer to the anchor than it should.
scope: Individual numeric judgments made under uncertainty; in software engineering, expert judgment-based estimates of effort and duration.
---

## Explanation

When estimating a quantity, people start from an available value and adjust away from it, but usually not far enough. Anchors can come from customer expectations, earlier estimates, budgets, or entirely irrelevant numbers.

## Relevance to software engineering

Effort estimates are typically produced with plenty of anchors in view, such as customer expectations, earlier estimates, and requirement documents of varying length. This makes anchoring a candidate explanation for systematic estimation error.
