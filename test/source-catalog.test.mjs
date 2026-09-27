import assert from "node:assert/strict";
import test from "node:test";
import {
  defaultCatalogPath,
  loadAndValidateCatalog,
} from "../scripts/validate-source-catalog.mjs";

test("canonical source catalog parses and validates", () => {
  const catalog = loadAndValidateCatalog(defaultCatalogPath);

  assert.equal(catalog.schema_version, "1.0");
  assert.equal(catalog.sources.length, 19);
  assert.deepEqual(Object.keys(catalog.query_profiles), [
    "broad_academic_discovery",
    "lab_and_project_discovery",
    "advertised_roles",
    "technical_specialization",
  ]);
  assert.equal(new Set(catalog.sources.map((source) => source.id)).size, 19);
});

test("catalog excludes UERS and numeric Priority 4", () => {
  const catalog = loadAndValidateCatalog(defaultCatalogPath);
  const searchableText = JSON.stringify(catalog).toLowerCase();

  assert.equal(searchableText.includes("uers"), false);
  assert.equal(searchableText.includes("canva.com/design"), false);
  assert.equal(catalog.sources.some((source) => source.priority === 4), false);
});
