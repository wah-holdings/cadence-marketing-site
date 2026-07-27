# CAD-11976 Spoke Citation-Integrity Manifest

**Scope:** all 12 People Science spoke whitepapers (branch `feat/cad-11976-spokes`). Every reference in every spoke was verified to resolve to the named source twice: (1) by the drafting pass before inclusion, (2) independently re-verified in a consolidated sweep on 2026-07-27 (this manifest).

**Method:** DOIs → Crossref API title/year match (`api.crossref.org/works/<doi>`); the one DataCite-registered DOI (Barocas & Selbst, 10.15779/Z38BG31) → doi.org resolution + DataCite metadata; non-DOI URLs → HTTP 200 via followed redirects, with content/og-title checks during drafting. Unverifiable candidates were dropped or re-sourced during drafting, never cited (see per-spoke notes in the PR description).

**Result: 93/93 unique sources verified-resolve (63 DOIs, 30 URLs). Zero unverifiable citations shipped.**

## Per-spoke reference counts

| Spoke | File | DOI refs | URL refs |
|---|---|---|---|
| Tier 1: manager-effect | `src/pages/resources/manager-effect.md` | 5 | 5 |
| Tier 1: continuous-performance-management | `src/pages/resources/continuous-performance-management.md` | 7 | 6 |
| Tier 1: organizational-justice-fair-process | `src/pages/resources/organizational-justice-fair-process.md` | 7 | 0 |
| Tier 1: feedback-that-doesnt-backfire | `src/pages/resources/feedback-that-doesnt-backfire.md` | 7 | 3 |
| Tier 2: employee-recognition-science | `src/pages/resources/employee-recognition-science.md` | 6 | 3 |
| Tier 2: goal-setting-theory-practice | `src/pages/resources/goal-setting-theory-practice.md` | 8 | 2 |
| Tier 2: people-analytics-without-dashboard-theater | `src/pages/resources/people-analytics-without-dashboard-theater.md` | 8 | 1 |
| Tier 2: role-clarity-job-architecture | `src/pages/resources/role-clarity-job-architecture.md` | 6 | 4 |
| Tier 3: management-by-proximity-is-dead | `src/pages/resources/management-by-proximity-is-dead.md` | 3 | 3 |
| Tier 3: can-ai-be-fair | `src/pages/resources/can-ai-be-fair.md` | 4 | 4 |
| Tier 3: compounding-organization | `src/pages/resources/compounding-organization.md` | 11 | 0 |
| Tier 3: people-science-glossary | `src/pages/resources/people-science-glossary.md` | 15 | 16 |

## Verified DOI registry (63)

| DOI | Resolved title (Crossref/DataCite) | Year |
|---|---|---|
| `10.1002/hrm.21848` | Building credible human capital analytics for organizational competiti | 2017 |
| `10.1016/0030-5073(83)90156-3` | Feedback as an individual resource: Personal strategies of creating in | 1983 |
| `10.1016/0165-4101(94)00382-F` | Complementarities and fit strategy, structure, and organizational chan | 1995 |
| `10.1016/0749-5978(85)90020-2` | A meta-analysis and conceptual critique of research on role ambiguity | 1985 |
| `10.1016/S0149-2063(03)00079-5` | Reflections on the Looking Glass: A Review of Research on Feedback-See | 2003 |
| `10.1016/j.ijinfomgt.2018.08.002` | People analytics—A scoping review of conceptual boundaries and value p | 2018 |
| `10.1016/j.obhdp.2013.07.006` | The dark side of consecutive high performance goals: Linking goal sett | 2014 |
| `10.1016/j.orgdyn.2015.05.008` | Learning from practice: how HR analytics avoids being a management fad | 2015 |
| `10.1017/iop.2015.106` | Getting Rid of Performance Ratings: Genius or Folly? A Debate | 2016 |
| `10.1037/0003-066X.57.9.705` | Building a practically useful theory of goal setting and task motivati | 2002 |
| `10.1037/0003-066X.60.7.678` | Positive Affect and the Complex Dynamics of Human Flourishing. | 2005 |
| `10.1037/0021-9010.77.2.130` | Goal and process clarity: Specification of multiple constructs of role | 1992 |
| `10.1037/0021-9010.82.3.434` | Retaliation in the workplace: The roles of distributive, procedural, a | 1997 |
| `10.1037/0021-9010.85.6.956` | Understanding the latent structure of job performance ratings. | 2000 |
| `10.1037/0021-9010.86.3.425` | Justice at the millennium: A meta-analytic review of 25 years of organ | 2001 |
| `10.1037/0021-9010.87.2.268` | Business-unit-level relationship between employee satisfaction, employ | 2002 |
| `10.1037/0021-9010.87.4.611` | Trust in leadership: Meta-analytic findings and implications for resea | 2002 |
| `10.1037/0022-3514.63.2.221` | Marital processes predictive of later dissolution: Behavior, physiolog | 1992 |
| `10.1037/0033-2909.119.2.254` | The effects of feedback interventions on performance: A historical rev | 1996 |
| `10.1037/0033-2909.120.2.189` | An integrative framework for explaining reactions to decisions: Intera | 1996 |
| `10.1037/1040-3590.12.1.19` | Clinical versus mechanical prediction: A meta-analysis. | 2000 |
| `10.1037/a0031757` | Justice at the millennium, a decade later: A meta-analytic test of soc | 2013 |
| `10.1037/a0032850` | The complex dynamics of wishful thinking: The critical positivity rati | 2013 |
| `10.1037/a0033584` | Updated thinking on positivity ratios. | 2013 |
| `10.1037/a0034156` | Mechanical versus clinical data combination in selection and admission | 2013 |
| `10.1037/apl0000085` | Performance appraisal and performance management: 100 years of progres | 2017 |
| `10.1038/s41586-024-07500-2` | Hybrid working from home improves retention without damaging performan | 2024 |
| `10.1080/09585192.2016.1244699` | An evidence-based review of HR Analytics | 2016 |
| `10.1086/681097` | The Value of Bosses | 2015 |
| `10.1086/711409` | People Management Skills, Employee Attrition, and Manager Rewards: An | 2021 |
| `10.1093/qje/qju032` | Does Working from Home Work? Evidence from a Chinese Experiment | — |
| `10.1111/1467-8721.ep10772989` | Feedback Interventions | 1998 |
| `10.1111/1748-8583.12090` | HR and analytics: why HR is set to fail the big data challenge | 2016 |
| `10.1111/j.1467-8721.2006.00449.x` | New Directions in Goal-Setting Theory | 2006 |
| `10.1111/j.1744-6570.2005.00487.x` | THE RELATIONSHIP BETWEEN HR PRACTICES AND FIRM PERFORMANCE: EXAMINING | 2005 |
| `10.1111/j.1744-6570.2006.00045.x` | HOW MUCH DO HIGH‐PERFORMANCE WORK PRACTICES MATTER? A META‐ANALYSIS OF | 2006 |
| `10.1111/j.1744-6570.2010.01207.x` | DOING COMPETENCIES WELL: BEST PRACTICES IN COMPETENCY MODELING | 2011 |
| `10.1111/j.1748-8583.2010.00164.x` | Human resource management and performance: still searching for some an | 2011 |
| `10.1111/j.1754-9434.2011.01315.x` | Why Is Performance Management Broken? | 2011 |
| `10.1111/peps.12226` | Surveying the forest: A meta‐analysis, moderator investigation, and fu | 2017 |
| `10.1145/3351095.3372828` | Mitigating bias in algorithmic hiring | 2020 |
| `10.1177/0002764203260208` | The Role of Positivity and Connectivity in the Performance of Business | 2004 |
| `10.1177/0018726705055032` | The romance of human resource management and business performance, and | 2005 |
| `10.1177/0018726709353139` | How passive ‘face time’ affects perceptions of employees: Evidence of | 2010 |
| `10.1177/0019793916650451` | Boss Competence and Worker Well-Being | 2016 |
| `10.1177/014920630002600104` | Jackson and Schuler (1985) Revisited: A Meta-Analysis of the Relations | 2000 |
| `10.1177/0149206306293668` | Strategic Human Resources Management: Where Do We Go From Here? | 2006 |
| `10.1177/014920639001600208` | Organizational Justice: Yesterday, Today, and Tomorrow | 1990 |
| `10.1177/014920639201800205` | Theoretical Perspectives for Strategic Human Resource Management | 1992 |
| `10.1257/089533003321164994` | Beyond Incentive Pay: Insiders' Estimates of the Value of Complementar | 2003 |
| `10.15779/Z38BG31` | Big Data's Disparate Impact | — |
| `10.2307/2391486` | Role Conflict and Ambiguity in Complex Organizations | 1970 |
| `10.2307/256741` | THE IMPACT OF HUMAN RESOURCE MANAGEMENT PRACTICES ON TURNOVER, PRODUCT | 1995 |
| `10.2307/256835` | INTERACTIVE EFFECTS OF PROCEDURAL JUSTICE AND OUTCOME NEGATIVITY ON VI | 1994 |
| `10.2307/2666999` | Psychological Safety and Learning Behavior in Work Teams | 1999 |
| `10.3102/003465430298487` | The Power of Feedback | 2007 |
| `10.5465/ame.2000.2909845` | Feedback effectiveness: Can 360-degree appraisals be improved? | 2000 |
| `10.5465/ame.2005.15841964` | Learning versus performance goals: When should each be used? | 2005 |
| `10.5465/amj.2011.0088` | How Does Human Resource Management Influence Organizational Outcomes? | 2012 |
| `10.5465/amp.2009.37007999` | Goals Gone Wild: The Systematic Side Effects of Overprescribing Goal S | 2009 |
| `10.5465/amp.2009.37008000` | Has Goal Setting Gone Wild, or Have Its Attackers Abandoned Good Schol | 2009 |
| `10.5465/amp.2009.43479265` | On Good Scholarship, Goal Setting, and Scholars Gone Wild | 2009 |
| `10.5465/amr.2006.20208679` | Is there Such a thing as “Evidence-Based Management”? | 2006 |

## Verified non-DOI URL registry (30)

All returned HTTP 200 (followed redirects) on 2026-07-27:

- https://arxiv.org/abs/1609.05807
- https://blog.adobe.com/en/publish/2013/07/25/forget-reviews-lets-look-forward
- https://hbr.org/2015/04/reinventing-performance-management
- https://hbr.org/2015/08/ges-real-time-performance-development
- https://hbr.org/2016/10/the-performance-management-revolution
- https://hbr.org/2016/11/lets-not-kill-performance-evaluations-yet
- https://news.gallup.com/businessjournal/182792/managers-account-variance-employee-engagement.aspx
- https://www.aihr.com/blog/9-box-grid/
- https://www.aihr.com/blog/calculating-span-of-control/
- https://www.aihr.com/blog/employee-pulse-surveys/
- https://www.aihr.com/blog/proximity-bias/
- https://www.apa.org/ed/accreditation/personnel-selection-procedures.pdf
- https://www.cipd.org/en/knowledge/factsheets/analytics-factsheet/
- https://www.cipd.org/en/knowledge/factsheets/relations-employees-factsheet/
- https://www.consumerfinance.gov/about-us/newsroom/consumer-financial-protection-bureau-fines-wells-fargo-100-million-widespread-illegal-practice-secretly-opening-unauthorized-accounts/
- https://www.eeoc.gov/laws/guidance/employment-tests-and-selection-procedures
- https://www.gallup.com/401384/indicator-hybrid-work.aspx
- https://www.gallup.com/analytics/472658/workplace-recognition-research.aspx
- https://www.gallup.com/workplace/231593/why-great-managers-rare.aspx
- https://www.gallup.com/workplace/236441/employee-recognition-low-cost-high-impact.aspx
- https://www.gallup.com/workplace/321725/gallup-q12-meta-analysis-report.aspx
- https://www.gallup.com/workplace/356063/gallup-q12-employee-engagement-survey.aspx
- https://www.gallup.com/workplace/390632/future-hybrid-work-key-questions-answered-data.aspx
- https://www.microsoft.com/en-us/worklab/work-trend-index/hybrid-work-is-just-work
- https://www.nist.gov/itl/ai-risk-management-framework
- https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page
- https://www.occ.gov/news-issuances/news-releases/2016/nr-occ-2016-106.html
- https://www.onetcenter.org/content.html
- https://www.prnewswire.com/news-releases/performance-reviews-dont-remove-the-ratings-300357682.html
- https://www.whatmatters.com/get-started

---
*Compiled by Maya Chen (CAD-11976), 2026-07-27. The hub whitepaper's 22-reference manifest is separate: `docs/CAD-11976-citation-integrity-manifest.md`.*
