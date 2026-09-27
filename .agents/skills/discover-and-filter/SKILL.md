---
name: discover-and-filter
description: Discover, verify, normalize, deduplicate, and initially filter UC San Diego research, internship, project, and relevant on-campus employment opportunities. Use when Codex needs to run or resume a lab-first search, a REAL/Handshake portal-first search, or both; investigate an individual lead; produce evidence-backed candidate records; or prepare a viable candidate batch for secondary evaluation. Do not use for final prioritization, application or outreach drafting, external submission, communication, or follow-up.
---

# Discover and Filter

## Overview

Discover UC San Diego-affiliated opportunities and evidence-supported prospects. Produce normalized candidate records for `evaluate-and-prioritize`.

Answer: Which candidates are sufficiently relevant, eligible, current, and supported to deserve deeper comparison?

Do not rank viable candidates against one another or prepare persuasive application or outreach materials.

## Read Project Authority

Before searching:

1. Read the active root `AGENTS.md`.
2. Read `profile/student/student.yml`.
3. Read `search/criteria/criteria.yml`.
4. Read `search/sources/source_catalog.yml`.
5. Inspect relevant existing records under `opportunities/tracking/`.
6. Treat the user's latest instruction as highest authority.
7. Preserve unknown information rather than guessing.

Use `decisions.md` only for durable rationale and `memory.md` only for current handoff context. Do not treat either as overriding canonical artifacts or `AGENTS.md`.

## Select a Run Mode

- `both`: Run lab-first and portal-first discovery, then merge results. Use by default.
- `lab-first`: Search faculty, labs, groups, projects, and public research sources.
- `portal-first`: Search REAL and Handshake or process user-supplied portal listings.
- `resume`: Continue a documented incomplete run.
- `lead-check`: Verify and filter one explicitly supplied lead.

If the user has not bounded a potentially large search, choose a safe, useful initial batch and state the boundary. Temporary run parameters do not change canonical defaults unless explicitly requested.

## Create a Search Plan

Establish a search-run identifier, mode, target period, selected sources and order, query profiles, hard constraints, subject emphasis, workload boundary, previous coverage, access limitations, expansion conditions, and completion conditions.

Do not create a persistent search-run artifact for planning alone unless actual search work begins or the user explicitly requests it.

## Run Selected Pipelines

For lab-first work, read [references/lab-first-pipeline.md](references/lab-first-pipeline.md).

For REAL, Handshake, or supplied portal listings, read [references/portal-first-pipeline.md](references/portal-first-pipeline.md).

When running `both`, research the pipelines independently when useful, then normalize and merge their results before primary filtering. An inaccessible portal must not prevent accessible lab-first work from continuing.

## Normalize and Deduplicate Candidates

Read [references/candidate-contract.md](references/candidate-contract.md) before creating or modifying candidate records.

For every candidate, identify discovery provenance; separate facts, inferences, and unknowns; attach evidence and dates; verify scope; capture status, eligibility, compensation or credit, timing, arrangement, and route; preserve conflicts; and record a concrete next action.

Do not treat research activity as proof of recruitment or portal presence as proof of UCSD affiliation.

Check duplicates before filtering and again before handoff. Merge true duplicates while retaining every source, discovery path, conflict, and claim-specific verification date.

## Apply the Primary Filter

Evaluate only institutional scope, meaningful relevance, minimum evidence sufficiency, verified hard eligibility, current status, target-period compatibility, and duplication.

Use one disposition:

- `advance`: Ready for secondary evaluation.
- `investigate_first`: Promising, but verify a material fact before comparison.
- `monitor`: Relevant, but not currently actionable.
- `exclude`: A verified scope, relevance, eligibility, timing, or status reason prevents advancement.

Support every exclusion with evidence and, when meaningful, a reconsideration condition. Do not automatically exclude a candidate because compensation, international-student eligibility, availability, or another field is unstated.

Do not compare mentorship, resume value, strategic value, or compensation-versus-research tradeoffs among viable candidates. Pass those questions to `evaluate-and-prioritize`.

## Produce the Run Result

Return candidates by disposition, duplicate merges, a coverage report, access limitations, unresolved conflicts, and a recommended continuation.

The coverage report must identify pipelines completed or incomplete, sources searched or skipped, query profiles, authentication limitations, expansions, meaningful gaps, counts by disposition, duplicate count, and verification date.

Do not claim comprehensive coverage when a selected portal, source, query, or result set could not be inspected.

## Persist Actual Work

When authorized to track locally, store search-run state under `opportunities/tracking/search-runs/` and candidate records under `opportunities/tracking/candidates/`. Update existing records instead of competing copies, preserve unrelated work, and reconcile affected `memory.md` content.

Do not edit `AGENTS.md` without explicit authorization or modify protected tooling during ordinary search work.

## Respect Approval Boundaries

Research, evaluate initial suitability, organize evidence, and write authorized local records. Do not apply, submit forms, upload documents, communicate externally, contact third parties, modify external accounts, or represent the user.

## Complete the Run

Complete a run when every selected pipeline is complete or explicitly incomplete; sources, queries, dates, gaps, and access limitations are recorded; candidates use the shared contract; duplicates are merged; exclusions are supported; unknowns remain visible; every candidate has a disposition and next action; and the `advance` batch is ready for secondary evaluation.

Treat finding no viable candidates as a valid completed result.
