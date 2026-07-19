---
layout: ../../layouts/ArticleLayout.astro
title: "AI People Ops Privacy — What Stays Private, and From Whom"
slug: /resources/ai-people-ops-privacy
target-query: "AI HR platform privacy who can see AI coaching data"
funnel-stage: comparison
meta-description: What an AI people-ops platform actually keeps private — who sees AI summaries, whether coaching is confidential, and the questions to ask any vendor.
status: DRAFT — CAD-11173, not published
---

# What Does an AI People-Ops Platform Actually Keep Private?

Before any AI people-ops platform earns a seat in your company, it has to answer one question convincingly: **who sees what?**

Not "is the data encrypted" — every vendor says yes. Not "are you compliant" — every vendor has a page for that. The real question is architectural: when AI summarizes a 1:1, coaches a struggling manager, or helps an employee prepare for a hard conversation, *where does that content go, and who can read it?*

This article explains why that question decides whether AI in HR works at all, gives you the exact questions to ask any vendor (including us), and lays out Cadence's positions plainly — including the parts that are still in progress.

## Why Privacy Architecture Is the Adoption Question

Here is the failure mode that kills AI people-ops deployments, and it has nothing to do with model quality:

**People stop being candid.**

A 1:1 only works if both people can say true things in it. "I'm burned out." "I don't trust the new roadmap." "I'm struggling with this report and I don't know how to say it." The moment an employee suspects that an AI summary of that conversation flows upward — to their skip-level, to HR, to some dashboard — they stop saying those things. The meetings keep happening. The content evaporates. You've paid for software that made your management culture *worse*, because it converted honest conversations into performances.

The same is true for managers. A manager who wants AI coaching on "how do I give Priya hard feedback without demotivating her" will never ask that question if the coaching thread is visible to their director or to HR. Coaching requires the freedom to be bad at something in private first.

So the privacy architecture isn't a compliance checkbox. It is the mechanism that determines whether the product's core loop — candid conversation in, useful development out — functions at all. A platform with brilliant AI and leaky visibility produces worse outcomes than no platform, because it teaches your company that honesty gets recorded and routed.

This is why we'd argue you should evaluate the visibility model *before* you evaluate the AI. An AI feature you can't trust is a feature nobody uses honestly.

## "Private Coaching" Is Not "Secret Surveillance"

One distinction matters enough to state early, because the two get conflated: a private AI lane can point in two very different directions.

**Surveillance architecture** watches employees and reports to someone else. The employee is the *subject*; the beneficiary is above them. Sentiment scoring piped to management, flight-risk flags on individuals, tone analysis of messages — the data flows away from the person it's about.

**Coaching architecture** works for the person being coached. The employee (or manager) is the *client*. The AI helps them prepare, reflect, and improve — and the output stays with them. The data flows *to* the person it's about, not past them.

Cadence's coaching lanes are designed as the second kind, deliberately. Where enabled and configured, manager-lane coaching is scoped to that manager and employee-lane coaching is scoped to that employee, with lane visibility governed by the tenant configuration. The coaching is *for* you — and a lane only works as coaching when its configured boundary keeps it that way. If coaching were routinely visible upward, it would stop being coaching and start being evidence — and nobody speaks freely to a system that generates evidence about them.

When you evaluate any vendor's "private AI" claim, ask which direction the data flows. Privacy that protects the observer is surveillance. Privacy that protects the participant is coaching.

## The Questions to Ask Any Vendor

Use these in every evaluation, ours included. Vague answers to any of them are themselves an answer.

### 1. Who can see AI-generated summaries of conversations?

Get specific: can a skip-level manager see AI summaries of 1:1s two levels down? Can HR? Can an admin export them? The honest vendor answer names roles and boundaries, not adjectives. "Enterprise-grade access controls" is not an answer; "summaries of a 1:1 are visible to its participants" is.

### 2. Are AI coaching conversations private — and private from whom?

"Private" should mean private from the org chart above the coached person, not merely private from other companies. Ask directly: *Can my manager read my coaching thread? Can HR? Can the account admin?* Then ask how that promise is enforced — product architecture, or policy document.

### 3. Is our data used to train your models?

This is the question with the widest gap between what buyers assume and what contracts say. Ask for the default in writing: is customer content — transcripts, coaching exchanges, survey responses — used to train or fine-tune the vendor's models? If the answer is "no by default," ask what would change that default. The right mechanism is an explicit written agreement, not a buried settings toggle or a clause that lets the vendor flip the default later.

### 4. What are the retention and deletion controls?

How long is conversation and coaching content retained? Can your organization configure that? What happens on employee offboarding, and what happens at contract end? You're listening for whether retention is a real, controllable surface or an unexamined "we keep it."

### 5. Will you sign a DPA, and what does your compliance posture actually say?

A Data Processing Agreement should be available for review before you buy, not negotiated after. On certifications, insist on precise language. "SOC 2 certified," "SOC 2 in progress," and "we follow SOC 2 principles" are three different claims. A vendor who is precise about what they *haven't* finished yet is more trustworthy than one who rounds up.

### 6. Where does a human sit in the AI loop?

Does the platform position AI output as decision-support reviewed by humans, or does AI content flow into records and decisions unreviewed? In HR especially, you want the former stated as policy — because AI summaries and suggestions will sometimes be wrong, and the question is whether the system assumes that or pretends otherwise.

## Cadence's Positions, Stated Plainly

Here is where Cadence stands on each of those questions. These are the positions we put in writing; the security page is the canonical version.

**Coaching lanes, where enabled and configured.** Where enabled and configured during preview-tenant setup, Cadence provides manager- and employee-lane AI coaching. The applicable tenant configuration governs lane visibility; confirm that configuration before relying on a coaching lane as a private space.

**No model training on your data by default.** Customer data — audio, transcripts, coaching outputs, survey responses, ER records, performance and recognition records, scorecard telemetry — is not used to train Cadence AI models by default. That default changes only if your company explicitly agrees in writing. Not a toggle, not a terms-of-service update: a written agreement your legal team has seen.

**Human decisions stay human.** Cadence surfaces patterns, coaching prompts, and review queues. It does not decide discipline, promotion, termination, compensation, or performance ratings. AI output in Cadence is decision-support with humans in the loop — human-reviewed AI is the operating posture, not a marketing line. This matters for privacy because it bounds the stakes: AI content in Cadence informs people, it doesn't silently become an adverse action.

**DPA available.** Our Data Processing Agreement is available for review as part of evaluation. Bring your counsel; that's what it's for.

**SOC 2: readiness in progress.** We are not going to round this up. Cadence's SOC 2 readiness work is in progress — we are not SOC 2 certified today, and we won't imply otherwise. If a vendor's certification language is fuzzy, ask them the same question you should ask us: *certified, or in progress?* We'll tell you which, and we'd suggest treating any vendor's willingness to answer that precisely as a trust signal in itself.

**Configurable data retention is an Enterprise-tier capability.** Enterprise customers can configure custom retention periods within policy bounds. If retention configurability is a hard requirement for you, that's the conversation to have, and it routes to a human.

## What Honest Trade-offs Look Like

Two tensions in this space are real, and any vendor who claims they've dissolved them is skipping the hard part.

**Privacy vs. organizational visibility.** Leaders reasonably want to know how management is going. Employees reasonably want their candid words to stay in the room. You cannot fully maximize both on the same data. Cadence's resolution is to separate the layers: individual conversation and coaching content stays with its participants, while organizational insight comes from layers designed to be seen — aggregate pulse-survey analytics, an org-health heatmap on the Culture Scorecard, goal and OKR tracking that is explicitly shared. Leaders get signal from surfaces built for visibility, not from reading beneath people's private lanes.

**Privacy vs. legitimate process.** Some workplace matters — an employee-relations case, for instance — genuinely require documentation and appropriate access. That is a different surface with a different purpose: Cadence's ER Command Center handles case lifecycle for the people who are supposed to handle cases. The point is not that nothing in a people platform is ever shared; it's that *coaching* and *casework* are different rooms with different doors, and a trustworthy platform never quietly turns one into the other.

## How to Run This Evaluation

A practical sequence for evaluating any AI people-ops vendor on privacy:

1. **Map the visibility model first.** Before the demo dazzles you, get a written answer to "who can see AI summaries and coaching content, by role." Draw it as a diagram. If the vendor can't, that's your finding.
2. **Get the training-data default in the contract.** Not in the FAQ — in the DPA or order form.
3. **Pressure-test with the candor scenario.** Ask the vendor: "An employee tells their manager in a 1:1 that they're interviewing elsewhere. Trace exactly where that sentence can appear in your product, and who can see each appearance." The quality of that answer tells you most of what you need.
4. **Check certification language for rounding.** Certified vs. readiness-in-progress vs. "aligned with." Precise vendors are safer vendors.
5. **Ask your own employees.** Pilot with a volunteer group and ask them directly whether they'd be candid with the tool. Adoption is consent; you can't procure your way around it.

The pattern across all five: trust the vendors who are specific, including about what they haven't built or finished yet. In AI people ops, precision *is* the trust product.

## FAQ

**Q: Can a manager or HR read an employee's AI coaching conversations in Cadence?**
A: Where a coaching lane is enabled and configured for a preview tenant, its visibility follows that tenant configuration. Confirm the configured access boundary before relying on a coaching lane as private from a manager, HR, or an account administrator.

**Q: Does Cadence train its AI models on our company's data?**
A: Not by default. Customer data — transcripts, coaching outputs, survey responses, ER records, performance and recognition records — is not used to train Cadence models unless your company explicitly agrees in writing.

**Q: Is Cadence SOC 2 certified?**
A: SOC 2 readiness is in progress; Cadence is not SOC 2 certified today, and we won't claim otherwise. A DPA is available for review, and Enterprise evaluations route to a human-led process that can address security questionnaires directly.

**Q: Can Cadence's AI decide or recommend terminations, promotions, or ratings?**
A: No. Cadence's AI surfaces patterns, coaching prompts, and review queues as decision-support. Discipline, promotion, termination, compensation, and performance ratings are human decisions — that boundary is a stated product position, not a configuration.

---

*Evaluating AI people-ops platforms on privacy? Cadence's security positions — coaching-lane privacy, training-data defaults, and current compliance status — are documented at [cadencehr.ai/security](https://cadencehr.ai/security).*
