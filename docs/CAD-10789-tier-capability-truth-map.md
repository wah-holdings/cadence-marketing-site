# CAD-10789 — Tier → Capability Truth Map

**Owner:** Quinn Hart  
**As of:** 2026-07-11  
**Truth source:** `src/content/capabilities.json`

## Job Architecture / role-expectations scope

| Capability advertised on a tiered or comparison surface | Essentials | Professional | Enterprise | Production truth / marketing constraint |
|---|---|---|---|---|
| Job Architecture (admin import, role definitions, level context, assignment) | LIVE in prod | LIVE in prod | LIVE in prod | GA 2026-06-26; `job_architecture`. This is an administrative foundation, not a career-path promise. |
| Role expectations that guide shared manager–employee 1:1 agendas | Coming | Coming | Coming | `job_architecture.role_expectations_in_one_on_one`; not production-verified. Never call live or included; AI suggestions require human approval and must not score people. |

## Decision rule

When a public surface and the capability registry disagree, the registry wins. A role-expectations workflow is not marketable as live until it is GA, marked `available`, dated, and production-render-verified for both the manager and employee 1:1 surfaces.
