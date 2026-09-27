# Candidate and Search-Run Contract

Use one shared record format for both discovery pipelines.

## Search-Run Record

```yaml
schema_version: "1.0"
search_run:
  id: "YYYYMMDD-mode-sequence"
  created_on: "YYYY-MM-DD"
  updated_on: "YYYY-MM-DD"
  mode: "both | lab-first | portal-first | resume | lead-check"
  status: "planned | active | complete | incomplete | blocked"
  target_period:
    label: null
    start_date: null
    end_date: null
  boundaries:
    maximum_candidates: null
    selected_departments: []
    selected_subjects: []
    selected_source_ids: []
  pipelines:
    lab_first:
      selected: false
      status: "not_selected | pending | active | complete | incomplete"
    portal_first:
      selected: false
      status: "not_selected | pending | active | complete | incomplete"
  query_profiles_used: []
  sources_searched: []
  sources_skipped: []
  access_limitations: []
  expansion_performed: []
  coverage_gaps: []
  results:
    advance: 0
    investigate_first: 0
    monitor: 0
    exclude: 0
    duplicates_merged: 0
  recommended_continuation: null
```

## Candidate Record

```yaml
schema_version: "1.0"
candidate:
  id: null
  created_on: null
  updated_on: null
  identity:
    name: null
    candidate_kind: null
    organization: null
    supervisor: null
    official_identifier: null
    canonical_url: null
  discovery:
    pipelines: []
    search_run_ids: []
    source_ids: []
    discovery_terms: []
  institutional_scope:
    status: "verified | unresolved | outside_scope"
    qualifying_condition: null
    explanation: null
  opportunity:
    status: "Open | Potential | Unclear | Closed | Stale | Ineligible"
    subjects: []
    responsibilities: []
    undergraduate_pathway: null
    current_activity: null
  eligibility:
    overall: "eligible | likely_eligible | unresolved | ineligible"
    verified_requirements: []
    verified_matches: []
    verified_conflicts: []
    unknown_requirements: []
  timing:
    target_period: null
    deadline: null
    expected_start: null
    expected_end: null
    hours_per_week: null
    schedule_notes: null
  arrangement:
    mode: "onsite | hybrid | remote | unknown"
    location: null
  compensation:
    status: "paid | unpaid | academic_credit | mixed | unknown"
    amount: null
    currency: null
    period: null
    notes: null
  route:
    route_type: "official_application | inquiry | direct_outreach | monitor | none | unknown"
    destination: null
    instructions: null
  evidence: []
  unknowns: []
  conflicts: []
  primary_filter:
    disposition: "advance | investigate_first | monitor | exclude"
    reasons: []
    hard_exclusions: []
    reconsideration_condition: null
    evidence_confidence: "High | Medium | Low"
  recommended_next_action: null
```

## Evidence Item

```yaml
- claim: null
  value: null
  fact_type: "verified | inferred | unknown"
  source_url: null
  source_title: null
  source_authority: null
  verified_on: "YYYY-MM-DD"
  notes: null
```

Use `inferred` only for a reasonable, visible inference. Do not encode an inference as verified fact.

## Candidate Identifiers

Until a deterministic identifier script exists, prefer an official listing identifier. Otherwise combine a normalized organization or supervisor, candidate name or project, and target period. Preserve the identifier after creation and reuse it when merging duplicates. The final algorithm remains pending design and validation.

## Deduplication

Treat records as possible duplicates when they share an official identifier, canonical URL, title and organization, professor/lab/project identity, or materially identical responsibilities and application route.

Before merging, confirm the same opportunity or prospect, preserve every source and pipeline, retain conflicts and claim-specific dates, and use the strongest current source for the current field value. Do not merge separate openings merely because they share a professor, lab, or employer.

## State Transitions

Use `discovered → captured → scope_checked → relevance_checked → eligibility_screened → deduplicated → ready_for_evaluation` as the normal progression.

Allow `needs_verification`, `monitor`, `excluded`, `closed`, and `stale` as alternate states. When persistent history is implemented, record previous state, new state, date, reason, evidence, and responsible process.

## Secondary-Evaluation Handoff

Require a sufficiently stable identity, verified institutional scope, supported responsibilities or subject, no verified hard ineligibility, visible status and freshness, recorded unknowns, sources and dates, an `advance` disposition, and a concrete next action. Keep evidence confidence separate from later fit scoring.
