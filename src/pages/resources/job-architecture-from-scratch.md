---
layout: ../../layouts/ArticleLayout.astro
title: How to Build a Job Architecture From Scratch (Pragmatically)
slug: /resources/job-architecture-from-scratch
target-query: "how to build a job architecture from scratch"
funnel-stage: solution-aware
meta-description: A pragmatic sequence for building job families, levels, and role expectations from scratch — without the 18-month consulting project or the shelf-ware.
status: DRAFT — CAD-11173, not published
---

# How to Build a Job Architecture From Scratch — Without the 18-Month Project

Somewhere around fifty people, every company discovers it has been running compensation, promotion, and hiring on vibes. The discovery usually arrives as a specific, painful conversation: two engineers doing similar work at very different pay because they negotiated differently at hire. A "Senior Manager" managing nobody. A promotion denied with no articulable reason beyond "not yet," followed three weeks later by a resignation.

The fix is a job architecture. The trap is believing that fixing it requires a year of committees, a consulting engagement, and a 200-page leveling bible nobody reads. It doesn't. This guide is the pragmatic version: what a job architecture actually is, why ad-hoc titling breaks when it breaks, a build sequence you can run in a quarter, and — the part almost everyone gets wrong — how to keep it alive afterward.

## What is a job architecture?

A job architecture is the structured description of the work in your company, organized on three layers:

1. **Job families** — groupings of related work: Engineering, Design, Sales, Customer Success, People, Finance. Larger orgs subdivide (Engineering → Frontend, Infrastructure, Data). A family answers: *what kind of work is this?*
2. **Levels** — the seniority spine within and across families: what distinguishes a P2 from a P3 from a P4, and how an M1 relates to a P4. A level answers: *what scope and complexity of work is this?*
3. **Role definitions with expectations per level** — the intersection. For "Backend Engineer, P3," a written statement of the expected scope, autonomy, and impact. A role definition answers: *what does good look like in this seat?*

Get those three layers written down and versioned, and you have the substrate for almost every people process that matters: comp bands attach to levels, promotions become evidence-against-next-level-expectations, job postings inherit real requirements, performance conversations get an anchor, and 9-box calibration gets a shared bar for what "high performance" means at each level.

One clarification that saves months of argument: **titles are not architecture.** Titles are the external label; the architecture is the internal structure. You can map many titles to one level, keep customer-facing title inflation in Sales while holding internal leveling honest, and rename things without rebuilding anything — as long as the underlying family/level/expectations structure is the source of truth.

## Why ad-hoc titles break at ~50 people

Under about 30 people, everyone knows what everyone does, and the founder holds the leveling model in their head. The model doesn't scale, and it fails in three specific systems:

**Compensation.** Without levels, every offer is a one-off negotiation, and pay ends up correlated with negotiating confidence and hiring-market timing rather than scope of work. That's not just unfair — it's a compounding liability. Pay-equity questions are much harder to answer when there is no structure to answer them *against*, and every ad-hoc exception becomes a precedent someone will cite.

**Promotion.** Without written next-level expectations, a promotion case is a popularity contest adjudicated by whoever is in the room. Managers can't tell their people what to demonstrate; people can't self-assess; decisions look arbitrary because, structurally, they are. The best people notice fastest — high performers are exactly the population most sensitive to "I can't see how to grow here."

**Hiring.** Without role definitions, every job description is written from scratch, interview bars drift by interviewer, and new hires land with a title that mismatches an existing employee doing the same work — which manufactures the comp problem and the resentment problem simultaneously. Backfilling gets worse: nobody wrote down what the departed person's role actually required.

The common thread: each broken system generates exceptions, and exceptions generate more exceptions. The cost of building architecture is a quarter of focused work. The cost of not building it is permanent, distributed, and mostly invisible until someone resigns over it.

## The pragmatic build sequence

Five stages: **inventory → families → levels → expectations → governance.** For an organization of 50–300 people, this is roughly a quarter of part-time work for one owner (usually a People lead or a founder) plus a few hours per function head. Not a committee. Not a year.

### Stage 1: Inventory what exists (1–2 weeks)

Export every current title, its holder, manager, team, and compensation. Put it in one sheet. Resist the urge to fix anything yet — you're mapping the terrain, not grading it.

What you'll find, at nearly every company that does this: title collisions (three different jobs called "Operations Manager"), title inflation clusters (usually wherever hiring was hardest), orphan roles that fit no obvious family, and at least one comp anomaly nobody can explain. Write these down as a findings list. They become your test cases — a proposed architecture that can't cleanly place your weird real cases isn't done.

### Stage 2: Define job families (1 week)

Group the inventory into families. Aim for the smallest set that covers the work — typically 6–10 families for a sub-300-person company. Rules of thumb:

- A family should share a broad skill base and a plausible internal career path.
- If a family would contain two people, it's probably part of another family.
- Don't mirror the org chart. Families describe *work*, not *reporting lines*; reorgs shouldn't rewrite your architecture.

### Stage 3: Build the leveling spine (2–3 weeks)

This is the load-bearing stage. Build **one company-wide spine** first — commonly P1–P5/P6 for individual contributors and M1–M3+ for managers — and define each level on dimensions that generalize across families:

| Dimension | What increases with level |
|---|---|
| Scope | Task → feature → system → cross-functional domain → company-level bets |
| Autonomy | Executes defined work → defines the work → defines what work matters |
| Ambiguity | Clear problems → unclear problems → unclear problem *spaces* |
| Influence | Own output → team's output → other teams' direction → org direction |
| Time horizon | Weeks → quarters → year-plus |

Two decisions to make explicitly, on purpose, in writing:

- **Dual track.** Management is a role change, not a promotion. Publish an IC track that reaches senior levels without managing people, and map M-levels against P-levels so a move into management isn't a leveling event. If you skip this, you will manufacture bad managers out of good ICs for years.
- **Fewer levels than you think.** Every level boundary is a future promotion dispute. Five or six IC levels is plenty below a thousand people. You can split levels later with far less pain than merging them.

### Stage 4: Write expectations per level, per family (3–4 weeks)

Now intersect the spine with the families: for each family, what do the spine dimensions concretely look like at each level? This is where the generic ("influences the team") becomes real ("designs and ships systems other engineers build on; unblocks others across the team without being asked").

Constraints that keep this stage from ballooning:

- **One page per role-level.** If it doesn't fit on a page, it won't be read, and it won't be used in a promotion conversation.
- **Observable over aspirational.** Every expectation should be something a manager could cite evidence for or against. "Demonstrates leadership" fails the test; "leads projects involving 2+ other engineers end-to-end" passes.
- **Describe the level, not your current people.** Writing expectations reverse-engineered from incumbents bakes today's anomalies into tomorrow's standard. Write the bar, *then* map people to it — and where someone doesn't map cleanly, that's a development conversation, not a reason to bend the bar.
- **Draft with function heads, not by committee.** One owner drafts from a template; each function head gets one structured review pass; done. Committees produce lowest-common-denominator language and eight-month timelines.

Then run your Stage 1 test cases through it. Place the weird roles. If the architecture can't place them, fix the architecture now, before launch.

### Stage 5: Versioning and governance (1 week to set up, forever to run)

Decide, before launch:

- **Who owns changes.** One named owner (People lead or equivalent) with function heads as reviewers. Not a standing committee.
- **When changes happen.** Batch non-urgent edits into a semi-annual revision window. Ad-hoc mid-cycle edits are how architectures get quietly negotiated one exception at a time.
- **How versions are kept.** Every role definition carries a version and an effective date, and prior versions stay retrievable. This is not bureaucracy — when someone asks why a 2025 promotion decision used different language than today's, "here is v2, effective at the time" is the difference between a governed system and an argument.
- **How people are mapped.** Every person is assigned to a role definition at a version and level. Unmapped people are unpriced, unpromotable-with-evidence, and invisible to every process the architecture is supposed to power.

## Avoiding the two failure modes

**The 18-month consulting project.** The maximalist failure: a full market-pricing study, custom competency models per function, committee sign-off at every stage — and an org that changed shape twice before launch. If your build plan is longer than two quarters, cut scope, not corners: fewer families, one spine, one page per role-level, ship at 80% and version from there. An imperfect architecture in use beats a perfect one in progress, because the feedback that actually improves it only arrives once real promotion and hiring decisions run through it.

**Shelf-ware.** The opposite failure: a beautiful leveling guide, launched with fanfare, consulted never. Architecture dies when it lives in a PDF nobody opens at the moment of decision. It stays alive when it's *load-bearing* — when the promotion case template literally quotes next-level expectations, when job postings are generated from role definitions, when managers anchor growth conversations in 1:1s to the person's actual role expectations, and when calibration sessions define "high performance" as performance *against the written level*, not against the room's mood. The test of a living architecture is simple: if it disappeared tomorrow, which decisions would get harder? If the honest answer is "none," you built shelf-ware.

## Where Cadence fits

Cadence is a management operating plane for hybrid and remote-first organizations — the system your managers already work in for 1:1s, goals, recognition, and talent calibration. It is not an HRIS, and job architecture is a good illustration of the difference: an HRIS records who holds which job code for payroll; Cadence makes the architecture *usable at the moment of management*.

**Job architecture is live in Cadence today**: you can import your architecture, maintain **versioned role definitions**, and **assign roles** to people so that every employee maps to a definition at a level. Because definitions are versioned in the product, the governance model above stops being a filing discipline and becomes the default — revise in your semi-annual window, and the history stays retrievable. **Level context** then travels to where decisions happen: a manager preparing a growth conversation or a calibration placement is working against the person's actual role expectations rather than a half-remembered PDF, and [9-box calibration](https://cadencehr.ai/product) runs against a shared, written bar.

Consistent with how Cadence draws the line on AI: the platform gives managers role and level context as decision support — it does not decide promotions, set compensation, or rate performance. Those calls stay human; the architecture just makes them defensible.

If you're mid-build, the sequence above works fine in documents and spreadsheets — start there. When you want the architecture load-bearing rather than shelf-ware, see [cadencehr.ai/product](https://cadencehr.ai/product) or the plan details at [cadencehr.ai/pricing](https://cadencehr.ai/pricing).

## FAQ

**What's the difference between a job architecture and a career ladder?**
A career ladder is usually one function's leveling document. A job architecture is the company-wide system: job families, a common leveling spine across families, and versioned role definitions with expectations at each level. Ladders are components; architecture is the structure that keeps them consistent with each other.

**At what company size do you need a job architecture?**
The pain typically becomes undeniable around 50 people — that's when ad-hoc titles start visibly breaking compensation fairness, promotion decisions, and hiring consistency. Building a lightweight version at 30–40 people is cheaper than retrofitting one at 80, because you're structuring fewer precedents and fewer exceptions.

**How many job levels should a company have?**
For organizations under roughly a thousand people: five or six individual-contributor levels and two or three management levels is usually enough. Fewer levels mean clearer differences between them and fewer boundary disputes. It's much easier to split a level later than to merge two levels someone's title depends on.

**How do you keep a job architecture from becoming shelf-ware?**
Make it load-bearing: promotion cases argue evidence against written next-level expectations, job postings derive from role definitions, managers use level context in growth conversations, and calibration uses the levels as its performance bar. Version it, name one owner, and batch revisions into a scheduled window so it evolves deliberately instead of eroding through exceptions.

---

*Ready to make your role definitions something managers actually use? Take a look at how versioned job architecture works in Cadence at [cadencehr.ai/product](https://cadencehr.ai/product).*
