# Lab Search Design History

This file records daily build objectives and the user's original improvements to the agent's workflow or architecture. At the current stage, recorded improvements should materially improve the coverage, quality, consistency, or efficiency of the search task. It is historical and non-normative: `AGENTS.md` governs current behavior, `decisions.md` records current durable decisions, and `memory.md` provides the current handoff.

The dates below are reconstructed rather than verified event dates. The sequence begins with the oldest observable workspace modification date, August 8, 2026, and advances each entry by one day in the user-specified top-down order.

- user-initiated: benefit-add, daily-obj + user-initiated correction entry hierarchy to deliver logic/improvement more clearly.
- Daily Objective should be used, when project finishes, summarize and analyze the overall development logic, assisted by user-initiated correction/additions.
- Any writing convention related to decision_history.md may serve as note for developing skills.
- Current issue: though explicitly stated in AGENTS.md, memory.md would still sometimes amass redundant info. Cannot think of a solution yet. (no brain to think one)
- future: how to self-evolve skills （究竟到什么程度才可以做到24小时不停跑agent呢...）

## 2026-08-08 (Reconstructed) — Build the Initial Lab-Search Architecture

- **Daily objective:** Build the initial architecture for a task-specific UCSD lab-search agent.
- **Objective rationale:** The workspace did not yet have a mission, institutional boundary, workflow, or artifact structure. These foundations were required before any reusable search capability could be developed.
- **Phase:** Initial workspace design
- **Daily status:** Complete

## 2026-08-09 (Reconstructed) — Build the Agent Governance File

- **Daily objective:** Build `AGENTS.md` as the normative authority for future lab-search agents.
- **Objective rationale:** The initial mission and directory architecture existed, but future agents still lacked persistent rules for scope, evidence quality, approval boundaries, artifact governance, and completion.
- **Phase:** Agent-governance design
- **Daily status:** Complete
- **Resulting artifacts:** `AGENTS.md`

### User-Initiated Improvement 1 — Protect `AGENTS.md` from Unapproved Modification

- **Trigger:** The user recognized that accidental changes to the root governance file could alter the agent's authority, scope, or safeguards.
- **User correction or addition:** Require explicit user approval before `AGENTS.md` may be created, modified, renamed, moved, or deleted.
- **User rationale:** The user should retain control over changes to the workspace's governing rules.
- **Agent assistance:** Formalized the protection boundary and the procedure for authorized amendments.
- **Benefit of the improvement:** Governance remains stable while deliberate changes remain possible with user oversight.
- **Effect on search:** Search scope, evidence standards, and approval boundaries cannot be silently weakened during ordinary work.
- **Resulting artifacts:** The protection rule in `AGENTS.md`.
- **Reusable lesson:** Protect the highest-authority project rule file behind explicit user approval.
- **Status:** Active

## 2026-08-10 (Reconstructed) — Build the Session-Handoff Artifact

- **Daily objective:** Build `memory.md` to preserve current context, status, blockers, and next steps between sessions.
- **Objective rationale:** The workspace had a mission, directory architecture, and governing agent rules, but it lacked a concise mechanism for restoring unfinished context in a later session.
- **Phase:** Project-knowledge design
- **Daily status:** Complete
- **Resulting artifacts:** `memory.md`

## 2026-08-11 (Reconstructed) — Improve Project-Knowledge Governance

- **Daily objective:** Improve the knowledge architecture so current handoff information remains distinct from durable project reasoning.
- **Objective rationale:** `memory.md` existed, but it had begun accumulating chronological and outdated information. The workspace needed a correction before future agents became dependent on a stale handoff.
- **Phase:** Knowledge-governance correction
- **Daily status:** Complete

### User-Initiated Improvement 1 — Prevent Chronological Accumulation in `memory.md`

- **Trigger:** The user observed that completed operations and older context were accumulating in `memory.md`.
- **User correction or addition:** Restrict `memory.md` to verified current status, the active objective, actionable next steps, current blockers, and essential handoff context.
- **User rationale:** A future agent should not need to separate current facts from stale chronological information.
- **Agent assistance:** Formalized the required sections and reconciliation process.
- **Benefit of the improvement:** Future sessions can recover the active state more quickly and with less risk of following superseded information.
- **Effect on search:** Search work can resume from current constraints and next actions without repeating completed investigation or relying on stale assumptions.
- **Resulting artifacts:** `memory.md` and the reconciliation contract in `AGENTS.md`.
- **Reusable lesson:** A handoff artifact should represent current state, not project history.
- **Status:** Active

### User-Initiated Improvement 2 — Separate Durable Decisions into `decisions.md`

- **Trigger:** Removing durable rationale from `memory.md` created the need for a separate location for current architectural decisions.
- **User correction or addition:** Create `decisions.md` and route durable decisions and rationale there.
- **User rationale:** Current handoff state and enduring architectural reasoning serve different purposes.
- **Agent assistance:** Defined the authority relationship among `AGENTS.md`, canonical artifacts, `decisions.md`, and `memory.md`.
- **Benefit of the improvement:** Durable reasoning remains available without making the handoff large, chronological, or stale.
- **Effect on search:** Future agents can understand why search rules and architecture were selected without treating old implementation context as current search state.
- **Resulting artifacts:** `decisions.md`, `memory.md`, and `AGENTS.md`.
- **Reusable lesson:** Separate current-state recovery from durable architectural rationale.
- **Status:** Active

### User-Initiated Improvement 3 — Replace Duplicate Rules with Authority Pointers

- **Trigger:** The user identified that repeating rules across project-knowledge files could create stale or conflicting copies.
- **User correction or addition:** Keep each rule or fact in its canonical authority and use short pointers from other artifacts when context is needed.
- **User rationale:** Minimizing duplication makes the architecture easier to maintain and reduces ambiguity about which statement governs.
- **Agent assistance:** Clarified the authority order and the distinct roles of `AGENTS.md`, canonical artifacts, `decisions.md`, and `memory.md`.
- **Benefit of the improvement:** Updates occur in one authoritative location, reducing drift and handoff overhead.
- **Effect on search:** Future agents can apply current scope, eligibility, evidence, and workflow rules without relying on stale duplicates.
- **Resulting artifacts:** The source-of-authority and reconciliation rules in `AGENTS.md`, with pointers in project-knowledge files.
- **Reusable lesson:** Store each durable fact or rule once and reference its authoritative home elsewhere.
- **Status:** Active

## 2026-08-12 (Reconstructed) — Build the Verified Student Baseline

- **Daily objective:** Build the canonical CV and structured student profile before beginning personalized opportunity searches.
- **Objective rationale:** Governance and knowledge-handoff artifacts existed, but the workspace lacked verified information about the student's education, experience, skills, and eligibility. Personalized evaluation could not be reliable without that baseline.
- **Phase:** Canonical user-context development
- **Daily status:** Complete
- **Resulting artifacts:** `profile/cv/cv.md` and `profile/student/student.yml`

## 2026-08-13 (Reconstructed) — Build the Search-Source Catalog

- **Daily objective:** Build a structured catalog of official starting URLs before implementing the complete search skill.
- **Objective rationale:** The workspace had governance, handoff knowledge, and a verified student baseline, but it lacked a persistent inventory of where searches should begin. Building the larger search workflow first would have forced each run to rediscover its source pages.
- **Phase:** Search infrastructure
- **Daily status:** Complete
- **Resulting artifacts:** `search/sources/source_catalog.yml`, the local YAML parser, catalog validator, tests, and integrity controls

### User-Initiated Improvement 1 — Protect Local YAML and Validation Tooling

- **Trigger:** After the local YAML parser and validation system were installed, the user identified a risk that ordinary work could alter their trusted behavior.
- **User correction or addition:** Protect parser, dependency, validator, test, and integrity-control files from modification except during an explicit tooling update.
- **User rationale:** Catalog parsing and validation should remain stable and should not be silently weakened by later requests or routine edits.
- **Agent assistance:** Defined a practical protected scope, an authorized-update path, and integrity verification rather than imposing an absolute no-change rule.
- **Benefit of the improvement:** Tooling remains reproducible and tamper-evident while still permitting intentional upgrades.
- **Effect on search:** The source catalog can be loaded and checked consistently, reducing the risk of malformed or silently misinterpreted search configuration.
- **Resulting artifacts:** Protected-tooling rules, an integrity manifest and checker, validation tests, and the `npm run check` gate.
- **Reusable lesson:** Protect trusted local tooling during ordinary work while preserving a verified path for explicit updates.
- **Status:** Active

## 2026-08-14 (Reconstructed) — Improve Search Query Coverage and Efficiency

- **Daily objective:** Improve the query architecture so the future search skill can efficiently discover both advertised roles and less explicitly presented research opportunities.
- **Objective rationale:** The source catalog existed and contained operational terms for REAL and Handshake, but its terms were weighted toward conventional employment titles. The catalog needed broader discovery language and reusable query organization before a search skill could use it effectively.
- **Phase:** Source-catalog and search-skill architecture
- **Daily status:** Complete

### User-Initiated Improvement 1 — Broaden Search Beyond Employment Titles

- **Trigger:** The user observed that terms such as research assistant, programmer, and data analyst were too narrowly focused on advertised employment.
- **User correction or addition:** Add broad terms such as `CSE`, `computer science`, `computing`, `research`, and `undergraduate research`.
- **User rationale:** Relevant labs, faculty groups, and research projects may not describe themselves using employment terminology.
- **Agent assistance:** Developed a progressive narrowing strategy from academic domain to lab or project and then to an opening, application, or contact route.
- **Benefit of the improvement:** The search can discover research structures and potential outreach leads even when no formal position title is published.
- **Effect on search:** Recall improves because the search no longer requires a page to contain a conventional job title before it can become a candidate.
- **Resulting artifacts:** Broad academic-discovery terms in `search/sources/source_catalog.yml` and the search-skill draft in `memory.md`.
- **Reusable lesson:** Begin research-opportunity discovery with broad academic language before applying role-specific filters.
- **Status:** Active

### User-Initiated Improvement 2 — Separate Terms into Layered Query Profiles

- **Trigger:** Reusable terms were embedded directly in individual REAL and Handshake source records.
- **User correction or addition:** Separate the terms from individual sources and organize them into broad academic discovery, lab and project discovery, advertised roles, and technical specialization.
- **User rationale:** Different search stages require different types of language, and shared terms should not be duplicated across portals.
- **Agent assistance:** Defined the four profiles and connected each source to the appropriate layers while retaining portal-specific filters and terms.
- **Benefit of the improvement:** Shared terms have one canonical definition, sources can select only relevant query layers, and later changes require fewer duplicated edits.
- **Effect on search:** Search execution becomes more efficient and consistent across REAL, Handshake, and faculty or lab discovery.
- **Resulting artifacts:** Top-level `query_profiles` and source-level query-profile references in `search/sources/source_catalog.yml`.
- **Reusable lesson:** Separate reusable search intent from source-specific execution and apply query layers according to each source's role.
- **Status:** Active

## 2026-08-16 — Build and Behaviorally Validate the First-Stage Search Skill

- **Daily objective:** Build the `discover-and-filter` skill as the first executable stage of the four-stage opportunity workflow, then test it on a bounded public-source search to identify necessary refinements before stabilizing its candidate contract.
- **Objective rationale:** The workspace already had governance, a verified student profile, search criteria, a source catalog, and the conceptual lab-first and portal-first pipelines, but no callable skill connected those components. Implementing and exercising the first stage was the appropriate next step before developing deterministic opportunity tooling or the secondary-evaluation skill.
- **Phase:** First-stage skill implementation and behavioral validation
- **Daily status:** In progress
- **Resulting artifacts:** `.agents/skills/discover-and-filter/SKILL.md`, `.agents/skills/discover-and-filter/agents/openai.yaml`, and the lab-first, portal-first, and candidate-contract references under `.agents/skills/discover-and-filter/references/`

### User-Initiated Improvement 1 — Introduce Comprehensive Secondary Evaluation and Prioritization

- **Trigger:** The initial pipeline design moved from discovery and filtering toward application or outreach without a distinct stage for comparing the viable opportunities that survived the primary filter.
- **User correction or addition:** Insert a dedicated `evaluate-and-prioritize` stage between primary filtering and application or outreach. Allow this stage to combine canonical criteria with additional user-defined criteria for a particular evaluation session.
- **User rationale:** Passing a primary filter only establishes that an opportunity is viable; it does not determine which viable opportunities best match the user’s preferences, constraints, and current priorities.
- **Agent assistance:** Developed a separate stage contract covering secondary gates, weighted preferences, contextual judgment, evidence confidence, advantages, disadvantages, unknowns, and effort-versus-value assessment. Distinguished this evaluation from both initial filtering and persuasive application preparation.
- **Benefit of the improvement:** Viable opportunities can be compared transparently and reproducibly before the user invests effort in applications or outreach.
- **Effect on search:** The opportunity workflow becomes four stages: discovery and primary filtering, comprehensive evaluation and prioritization, application or outreach, and follow-up. The exact evaluation profile used must remain visible, including temporary user-defined criteria.
- **Resulting artifacts:** The **Four-Stage Opportunity Workflow** decision and proposed `evaluate-and-prioritize` contract in `decisions.md`.
- **Reusable lesson:** Separate viability screening from comprehensive prioritization, and allow explicit session-specific criteria without silently replacing canonical preferences.
- **Status:** Active as an approved architectural decision; the skill is not yet implemented

### User-Initiated Improvement 2 — Add Primary-Relevance Ordering Before Secondary Evaluation

- **Trigger:** The bounded test returned viable candidates without ordering them, placing a strongly aligned AI/data lab on the same presentation level as a lower-preference embedded-systems lab.
- **User correction or addition:** Allow Skill 1 to apply a limited degree of ordering so opportunities matching preferred areas such as computer vision, AI/ML, data science, and bioinformatics appear ahead of more distant but still relevant areas such as embedded systems.
- **User rationale:** A prohibition on all ranking prevents the discovery stage from applying the user’s established search preferences and makes bounded results less useful.
- **Agent assistance:** Distinguished coarse primary-relevance ordering from the comprehensive, user-configurable evaluation reserved for Skill 2.
- **Benefit of the improvement:** Bounded searches can spend attention and result capacity on the most relevant domains without prematurely deciding which opportunity is ultimately best.
- **Effect on search:** Skill 1 should organize viable candidates by canonical thematic fit and show actionability separately; Skill 2 remains responsible for final prioritization using mentorship, compensation, scheduling, effort, strategic value, and session-specific criteria.
- **Resulting artifacts:** Proposed refinement to the `discover-and-filter` contract; not yet implemented.
- **Reusable lesson:** Separate discovery-priority ordering from comprehensive opportunity prioritization instead of prohibiting all comparative ordering in the discovery stage.
- **Status:** Proposed; awaiting implementation and verification
