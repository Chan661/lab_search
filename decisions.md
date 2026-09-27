# Project Decisions

This file records durable project decisions and their rationale. `AGENTS.md` remains the normative authority for agent behavior; this file explains why stable choices were made and does not duplicate full operating rules.

## Base CV Format

- **Decision:** Store the user-supplied base CV as Markdown at `profile/cv/cv.md`.
- **Rationale:** Preserve the supplied source format and make the CV easy to inspect and adapt locally.
- **Normative rule:** `AGENTS.md` Section 10.2.
- **Canonical artifact:** `profile/cv/cv.md`.

## Search Source Catalog Format

- **Decision:** Store callable search starting points and source-routing metadata in YAML at `search/sources/source_catalog.yml`.
- **Rationale:** YAML is human-editable, consistent with existing canonical configuration artifacts, and supports deterministic source selection, ranking, freshness checks, and later validation without maintaining a duplicate Markdown catalog.
- **Parser and validation:** Use the project-local Node `yaml` dependency, `scripts/validate-source-catalog.mjs`, protected-tooling integrity verification, and Node's built-in test runner. This keeps parsing reproducible within the workspace without a global installation and detects unintended tooling changes.
- **Normative rule:** `AGENTS.md` Sections 10.2 and 11.
- **Canonical artifact:** `search/sources/source_catalog.yml`.

## Four-Stage Opportunity Workflow

- **Decision:** Organize the opportunity lifecycle as four sequential, stage-specific skills coordinated by a lightweight orchestrator: `discover-and-filter`, `evaluate-and-prioritize`, `prepare-application-or-outreach`, and `manage-follow-up`.
- **Rationale:** Each stage has a distinct trigger, evidence requirement, output, and stopping condition. Separating evaluation from drafting prevents persuasive application work from biasing comparisons, while separating follow-up preserves time-dependent communication state and the requirement for a new approval before each external action.
- **Stage contracts:**

  | Skill | Required input | Responsibilities | Main output and stopping condition |
  | --- | --- | --- | --- |
  | `discover-and-filter` | Canonical profile, search criteria, source catalog, and institutional scope | Run the lab-first and REAL/Handshake portal-first pipelines; verify scope, initial relevance, hard eligibility, and source evidence; deduplicate; classify status; retain material unknowns | Viable candidate records ready for comparison; do not produce a final ranking |
  | `evaluate-and-prioritize` | Viable candidate records plus default and session-specific user criteria | Apply secondary gates, weighted preferences, contextual judgment, evidence confidence, advantages, disadvantages, unknowns, and effort-versus-value assessment | Reproducible shortlist categorized as `Prioritize`, `Consider`, `Investigate first`, `Hold`, or `Reject`; do not draft persuasive materials |
  | `prepare-application-or-outreach` | A selected lead and its verified supporting evidence | Choose the official-application or direct-outreach branch; tailor only verified qualifications; prepare accurate, recipient-specific materials; check unsupported claims and sensitive information | Final application or outreach materials presented for approval; stop before external action unless the specific action, destination, and final content are explicitly approved |
  | `manage-follow-up` | Contact or application history, current opportunity state, and relevant recipient instructions | Determine whether follow-up is appropriate; apply timing and unanswered-follow-up limits; stop after rejection, opt-out, or confirmed closure; draft a contextual follow-up or reply | Follow-up decision, next action, and optional draft; require separate approval for every external message |

- **Evaluation-profile rule:** Use canonical default criteria while allowing the user to add, remove, reweight, or temporarily promote criteria for a particular evaluation session. Record the exact profile used so the result is explainable and reproducible; do not silently replace defaults with temporary priorities. Keep fit assessment separate from evidence confidence, and do not convert every contextual tradeoff into a numerical score.
- **Orchestration rule:** The orchestrator passes canonical records between stages and enforces prerequisites and state transitions without duplicating stage-specific reasoning. It should prevent application or outreach preparation until a lead has passed verification and secondary evaluation, normally process one lead or an explicitly bounded batch, and preserve the external-action approval boundaries in `AGENTS.md` Section 6.
- **Normative relationship:** The institutional boundary, evidence standards, evaluation requirements, follow-up policy, approval checkpoints, and artifact routing remain governed by `AGENTS.md` Sections 4–11.

## Discover-and-Filter Architecture

- **Status:** Implemented as an instruction-first repo-local skill at `.agents/skills/discover-and-filter/` and structurally validated on 2026-08-16. Live public-source and authenticated-portal behavioral tests remain pending. No deterministic identifier, schema-validation, duplicate-detection, or state-transition script has been implemented, and no opportunity-tracking record has yet been created through the skill.
- **Decision:** Implement the first stage as one `discover-and-filter` skill containing two source-specific discovery pipelines and one shared convergence path. The pipelines differ in how they discover and initially substantiate candidates, but both emit the same evidence-backed candidate record and use the same deduplication, primary-filter, and handoff rules.
- **Purpose and boundary:** Answer which UCSD-affiliated candidates are sufficiently relevant, eligible, current, and supported to deserve deeper comparison. Do not produce a final ranking, compare mentorship or strategic value among viable candidates, or prepare persuasive application or outreach materials; those responsibilities belong to later stages.
- **Internal architecture:** Use five components: a search-run controller, a lab-first pipeline, a REAL/Handshake portal-first pipeline, shared normalization and deduplication, and a shared primary filter and handoff.

### Search-Run Contract

- **Required inputs:** Canonical student profile, search criteria, source catalog, current-university scope, target period, pipeline mode, and a bounded workload.
- **Modes:** Support `both` as the default, plus `lab-first`, `portal-first`, and `resume`. A run may also bound departments, sources, research areas, queries, or candidate count without silently changing canonical defaults.
- **Plan:** Before discovery, record selected pipelines and sources, query profiles, target period, hard constraints, known access limitations, prior coverage, expansion conditions, and completion conditions.

### Lab-First Pipeline Contract

- **Progression:** Move from research area to faculty, lab, or group; then to current activity, relevant projects, evidence of undergraduate participation, and finally an opening, inquiry route, or appropriate contact route.
- **Ordering:** Begin with CSE, HDSI/data science, AI, and bioinformatics or computational biology. Expand selectively to ECE, Bioengineering, Jacobs, and other qualifying UCSD units only for substantially computational work or when preferred sources yield too few viable candidates.
- **Queries:** Use broad academic, lab/project, and technical-specialization profiles; use advertised-role terms only when looking for explicit openings.
- **Verification:** Check current UCSD appointment or qualifying affiliation, current research activity, relevant subject or project, undergraduate-participation evidence, availability evidence, and application or contact route. Preserve unstated compensation, credit, availability, and eligibility as unknown.
- **Recruitment safeguard:** Current research activity is not evidence that a lab is recruiting. Apply the `Open`, `Potential`, `Unclear`, `Closed`, and `Stale` meanings from `AGENTS.md` Section 8.3.
- **Output types:** Distinguish advertised opportunities, formal projects, credit-bearing or volunteer possibilities, evidence-supported outreach prospects, and research structures that lack enough evidence to become candidates.

### Portal-First Pipeline Contract

- **REAL:** Search with broad academic, lab/project, advertised-role, and technical-specialization profiles so discovery includes research projects, internships, volunteer or credit opportunities, and relevant listings beyond conventional job titles.
- **Handshake:** Require the on-campus filter unless scope is explicitly changed; use broad academic, advertised-role, technical-specialization, and portal-specific terms.
- **Verification:** Open full listings rather than relying on cards or snippets. Capture title, organization, responsibilities, status, eligibility, prerequisites, deadline, target period, compensation or credit, work arrangement, and application route when available. Independently verify UCSD affiliation because portal presence alone does not establish institutional scope.
- **Access failures:** If authentication prevents inspection, mark the affected portal, query, or listing incomplete; do not claim full coverage. Continue accessible work, preserve a concrete resume step, and do not invalidate results completed through the other pipeline.

### Shared Candidate and Convergence Contract

- **Candidate record:** Both pipelines must emit one common structure covering stable candidate and search-run identifiers, discovery pipeline and source identifiers, candidate kind, opportunity or prospect name, organization and supervisor, affiliation and scope status, subject or responsibilities, opportunity status, eligibility, compensation or credit, target period, deadline, work arrangement, application or contact route, claim-level evidence, verification date, unknowns, primary-filter disposition, and recommended next action.
- **Evidence:** Associate each material claim with its source, authority level, verification date, and whether it is verified, inferred, or unknown. Keep evidence confidence separate from opportunity fit.
- **Deduplication:** Check official identifiers, canonical URLs, title and organization, and professor/lab/project identity before filtering and again before handoff. Merge cross-pipeline duplicates without discarding sources, discovery provenance, conflicting values, or claim-specific verification dates.
- **Primary-filter scope:** Check institutional scope, meaningful relevance, minimum evidence sufficiency, verified hard ineligibility, current status, target-period fit, and duplication. Do not use unknown compensation or unverified eligibility as an automatic exclusion.
- **Dispositions:** Use `Advance`, `Investigate first`, `Monitor`, or `Exclude`. Every exclusion must record an evidence-supported reason and any condition under which it should be reconsidered.

### Output and Completion Contract

- **Search-run package:** Return candidate batches by disposition, an exclusion log, a coverage report, and a recommended continuation. The coverage report must identify pipelines and sources searched or skipped, query profiles, authentication limitations, expansions, gaps, duplicates, verification date, and counts by disposition.
- **State path:** Use a planned progression of `discovered → captured → scope_checked → relevance_checked → eligibility_screened → deduplicated → ready_for_evaluation`, with `needs_verification`, `monitor`, `excluded`, `closed`, and `stale` as alternate waiting or terminal states. Each transition should retain date, reason, evidence, and responsible process.
- **Completion:** A run is complete when every selected pipeline is completed or explicitly incomplete; coverage and access gaps are visible; candidates are normalized and deduplicated; exclusions are supported; unknowns remain visible; every candidate has a disposition and next action; and the batch passed to `evaluate-and-prioritize` is internally consistent. Finding no viable candidates is a valid completed result.
- **Implemented packaging:** Keep shared selection and convergence logic in `.agents/skills/discover-and-filter/SKILL.md`; keep detailed lab-first, portal-first, and candidate-contract material in directly linked reference files. The skill is implicitly invocable and uses `both` as its default mode. Add deterministic scripts for identifiers, schema validation, duplicate detection, state transitions, coverage, and missing-field checks only after the common candidate contract has been exercised on real examples and explicitly approved for tooling work.
- **Normative relationship:** `AGENTS.md` Sections 4, 5, 8, 9, 10, and 13–14 remain authoritative for scope, evidence, honesty, artifact routing, failure handling, and completion.

## Design History Artifact

- **Decision:** Preserve provenance-aware, chronological architecture evolution in `decision_history.md` while keeping `decisions.md` limited to current durable decisions and `memory.md` limited to the current handoff.
- **Rationale:** The user wants to identify reusable patterns in building task-specific search agents while emphasizing user-originated architectural improvements. A separate non-normative history retains those lessons without weakening current-state knowledge governance.
- **Normative relationship:** `AGENTS.md` Sections 10.1, 11, and 11.1 remain authoritative.
- **Historical artifact:** `decision_history.md`.

## Governance Version 0.5.0

- **Decision:** Advance governance from version 0.4.0 to 0.5.0.
- **Rationale:** Add a decision-history update contract defining daily-entry structure, qualification of user-initiated architectural improvements, explicit approval before history edits, and limits on reconstruction.
- **Normative rule:** `AGENTS.md` Section 12.
