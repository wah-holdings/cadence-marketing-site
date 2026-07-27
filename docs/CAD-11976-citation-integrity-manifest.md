# CAD-11976 Citation-Integrity Manifest — People Science hub (revised)

**Scope:** every reference in `src/pages/resources/people-science.md` (revised hub).
**Verification date:** 2026-07-27.
**Methods:**
- **Crossref** = DOI queried against `api.crossref.org/works/{doi}`; registered DOI with title matching the cited work. (Publisher landing pages typically return 403 to non-browser agents, so Crossref registry metadata is the authoritative resolution check for DOIs.)
- **HTTP 200** = URL fetched with a browser user-agent; returned 200 on the named page.

| # | Reference | Identifier | Method | verified-resolves |
|---|---|---|---|---|
| 1 | Kluger & DeNisi (1996), Psychological Bulletin 119(2) | doi:10.1037/0033-2909.119.2.254 | Crossref (title match) | yes |
| 2 | Locke & Latham (2002), American Psychologist 57(9) | doi:10.1037/0003-066X.57.9.705 | Crossref (title match) | yes |
| 3 | Locke & Latham (2006), Current Directions in Psychological Science 15(5) | doi:10.1111/j.1467-8721.2006.00449.x | Crossref (title match) | yes |
| 4 | Ordóñez, Schweitzer, Galinsky & Bazerman (2009), Academy of Management Perspectives 23(1) | doi:10.5465/amp.2009.37007999 | Crossref (title match: "Goals Gone Wild…") | yes |
| 5 | Harter, Schmidt & Hayes (2002), Journal of Applied Psychology 87(2) | doi:10.1037/0021-9010.87.2.268 | Crossref (title match) | yes |
| 6 | Gallup Q12 Meta-Analysis, 11th edition | https://www.gallup.com/workplace/321725/gallup-q12-meta-analysis-report.aspx | HTTP 200; edition confirmed via Gallup page ("11th Edition") | yes |
| 7 | Gallup, State of the American Manager (2015) / "Managers Account for 70% of Variance in Employee Engagement" | https://news.gallup.com/businessjournal/182792/managers-account-variance-employee-engagement.aspx | HTTP 200; exact wording "at least 70% of the variance" confirmed | yes |
| 8 | Colquitt et al. (2001), Journal of Applied Psychology 86(3) | doi:10.1037/0021-9010.86.3.425 | Crossref (title match) | yes |
| 9 | Kuncel et al. (2013), Journal of Applied Psychology 98(6) | doi:10.1037/a0034156 | Crossref (title match) | yes |
| 10 | EEOC, "Employment Tests and Selection Procedures" (Uniform Guidelines, 29 C.F.R. 1607) | https://www.eeoc.gov/laws/guidance/employment-tests-and-selection-procedures | HTTP 200 | yes |
| 11 | Gallup, "The Importance of Employee Recognition: Low Cost, High Impact" | https://www.gallup.com/workplace/236441/employee-recognition-low-cost-high-impact.aspx | HTTP 200 | yes |
| 12 | Gallup, "Gallup's Q12 Employee Engagement Survey" | https://www.gallup.com/workplace/356063/gallup-q12-employee-engagement-survey.aspx | HTTP 200 | yes |
| 13 | Microsoft WorkLab, 2022 Work Trend Index Pulse ("Hybrid Work Is Just Work…") | https://www.microsoft.com/en-us/worklab/work-trend-index/hybrid-work-is-just-work | HTTP 200 | yes |
| 14 | Gallup, "The Future of Hybrid Work: 5 Key Questions Answered With Data" | https://www.gallup.com/workplace/390632/future-hybrid-work-key-questions-answered-data.aspx | HTTP 200 | yes |
| 15 | AIHR, "9 Box Grid: A Practitioner's Guide" | https://www.aihr.com/blog/9-box-grid/ | HTTP 200 | yes |
| 16 | Sawyer (1992), Journal of Applied Psychology 77(2) | doi:10.1037/0021-9010.77.2.130 | Crossref (title match) | yes |
| 17 | O*NET Resource Center, "The O*NET Content Model" | https://www.onetcenter.org/content.html | HTTP 200 | yes |
| 18 | SIOP, Principles for the Validation and Use of Personnel Selection Procedures, 5th ed. (2018) | https://www.apa.org/ed/accreditation/personnel-selection-procedures.pdf | HTTP 200 (PDF) | yes |
| 19 | Campion et al. (2011), Personnel Psychology 64 | doi:10.1111/j.1744-6570.2010.01207.x | Crossref (title match) | yes |
| 20 | CIPD, "People Analytics" factsheet | https://www.cipd.org/en/knowledge/factsheets/analytics-factsheet/ | HTTP 200 | yes |
| 21 | Rousseau (2006), Academy of Management Review 31(2) | doi:10.5465/amr.2006.20208679 | Crossref (title match) | yes |
| 22 | Jiang, Lepak, Hu & Baer (2012), Academy of Management Journal 55(6) | doi:10.5465/amj.2011.0088 | Crossref (title match) | yes |

**Result: 22/22 verified-resolves: yes.** No citation was added that could not be verified; no claim rests on an unverifiable source.

**In-text factual pins (beyond reference resolution):**
- "more than one-third of feedback interventions reduced performance" — Kluger & DeNisi (1996) abstract (ref 1).
- "7,939 business units across 36 companies" — Harter et al. (2002) abstract (ref 5).
- "at least 70% of the variance" — exact Gallup wording (ref 7); softened to "about 70%" nowhere in the revised text.
- "11th edition, the largest study of its kind, … eleven performance outcomes" — Gallup Q12 meta-analysis page (ref 6).
- "85% of leaders / 87% of employees" and "81% … less than one-third" — Microsoft 2022 Work Trend Index Pulse (ref 13).
