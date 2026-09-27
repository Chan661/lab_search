# Current Status

- The lab-search workspace has the canonical directory structure defined in `AGENTS.md` Section 10.2.
- `AGENTS.md` version 0.5.0 is the active governance file.
- The canonical CV, student profile, and search criteria exist in their directories under `profile/` and `search/criteria/`.
- The canonical search-source catalog exists at `search/sources/source_catalog.yml`; no opportunity-tracking, outreach, application, or preparation artifact has been populated yet.
- The non-normative architecture history exists at `decision_history.md`; its update and approval contract is governed by `AGENTS.md` Section 11.1.
- The source catalog has a working project-local validation layer.
- The four-stage workflow is approved in `decisions.md`. Its first stage, the instruction-first repo-local `discover-and-filter` skill, is implemented and structurally validated; the orchestrator and the other three stage skills are not implemented.

# Active Objective

Validate `discover-and-filter` behavior on bounded public-source and later authenticated-portal examples, then use the observed candidate records to refine the shared contract before designing `evaluate-and-prioritize`.

# Next Steps

1. Run a bounded lab-first public-source test and verify candidate normalization, evidence handling, filtering, deduplication, coverage reporting, and handoff behavior.
2. When authenticated browser access is available, run a bounded REAL or Handshake test and verify that incomplete authentication coverage is reported honestly.
3. Refine and approve the persistent opportunity schema and deterministic validation needs from those observed records.
4. Define the default and session-specific secondary-evaluation profile, scoring or comparison rules, and missing-evidence behavior before implementing `evaluate-and-prioritize`.
5. Decide when to implement the lightweight orchestrator and remaining stage skills.

# Current Blockers

- Skill 1 has not yet been behaviorally tested on a live public-source search or authenticated portal listing.
- The persistent opportunity schema remains an instruction-level contract rather than a deterministically validated schema.
- The secondary-evaluation criteria and profile schema remain intentionally pending.

# Important Context

- Current profile and search constraints are canonical in `profile/student/student.yml` and `search/criteria/criteria.yml`.
- Institutional scope and external-action approval are governed by `AGENTS.md` Sections 4 and 6.
- Approved architecture: a lightweight orchestrator coordinates four sequential skills—`discover-and-filter`, `evaluate-and-prioritize`, `prepare-application-or-outreach`, and `manage-follow-up`. The durable stage contracts and implemented first-stage architecture are canonical in `decisions.md` under **Four-Stage Opportunity Workflow** and **Discover-and-Filter Architecture**.
- The proposed search design has two complementary discovery pipelines that converge on the same capture, verification, eligibility, evaluation, and action stages:
  - **Lab-first pipeline:** Start with preferred UCSD research-area, faculty, and lab sources in CSE, HDSI/data science, AI, and bioinformatics. Use broad academic-discovery and lab/project terms to move from research area to active faculty or lab, then inspect current projects, evidence of undergraduate participation, and any opening or contact route. Expand selectively to ECE, Bioengineering, Jacobs, or other UCSD-affiliated sources only when the work is substantially computational or preferred sources yield too few viable leads. A lab or active research program supports discovery but is not proof of recruitment; classify the result as `Open`, `Potential`, `Unclear`, `Closed`, or `Stale` from current evidence.
  - **Portal-first pipeline:** Start with UCSD REAL and Handshake to find advertised research, project, internship, and relevant on-campus employment listings. In REAL, combine broad academic, lab/project, advertised-role, and technical-specialization query profiles; in Handshake, require the on-campus filter and use broad academic, advertised-role, technical-specialization, and portal-specific terms. Open each viable listing rather than relying on cards or snippets, then verify UCSD institutional scope because portal presence alone does not establish affiliation.
- Both pipelines must preserve source and verification dates, keep compensation or credit and unknown fields visible, deduplicate leads before deeper work, and give every viable lead a concrete next action. Portal-first leads normally proceed toward an official application route; lab-first leads without a confirmed opening normally proceed toward targeted verification or a recipient-specific outreach draft. No external action occurs without the approval required by `AGENTS.md` Section 6.
- Deterministic scripts remain proposed for stable opportunity identifiers, duplicate detection, state transitions, deadlines, follow-up timing, and missing-field checks; canonical workspace artifacts would hold persistent state rather than hidden agent memory.
- The orchestrator should normally process one lead or an explicitly bounded batch and keep discovery, verification, eligibility, evaluation, and drafting distinct.
- The workspace contains a `.git` directory, but Git currently reports that the workspace is not a valid repository; Git-based verification is unavailable.
- The sandboxed Windows runner is unreliable in this environment, although the approved host PowerShell path has allowed local inspection.
