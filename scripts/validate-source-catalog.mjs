import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const defaultCatalogPath = path.join(
  projectRoot,
  "search",
  "sources",
  "source_catalog.yml",
);

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function requireString(value, field, errors) {
  if (typeof value !== "string" || value.trim() === "") {
    errors.push(`${field} must be a non-empty string`);
  }
}

function requireStringArray(value, field, errors, { allowEmpty = false } = {}) {
  if (!Array.isArray(value)) {
    errors.push(`${field} must be an array`);
    return;
  }
  if (!allowEmpty && value.length === 0) {
    errors.push(`${field} must not be empty`);
  }
  if (value.some((item) => typeof item !== "string" || item.trim() === "")) {
    errors.push(`${field} must contain only non-empty strings`);
  }
  if (new Set(value).size !== value.length) {
    errors.push(`${field} must not contain duplicates`);
  }
}

function validateDate(value, field, errors) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    errors.push(`${field} must use YYYY-MM-DD`);
    return;
  }
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) {
    errors.push(`${field} must be a real calendar date`);
  }
}

export function loadAndValidateCatalog(catalogPath = defaultCatalogPath) {
  const sourceText = fs.readFileSync(catalogPath, "utf8");
  let catalog;
  try {
    catalog = YAML.parse(sourceText);
  } catch (error) {
    throw new Error(`YAML parse failed: ${error.message}`);
  }

  const errors = [];
  if (!isObject(catalog)) {
    throw new Error("Catalog root must be a mapping");
  }

  requireString(catalog.schema_version, "schema_version", errors);
  if (!isObject(catalog.ranking_policy)) {
    errors.push("ranking_policy must be a mapping");
  }
  if (!isObject(catalog.query_profiles)) {
    errors.push("query_profiles must be a mapping");
  }
  if (!Array.isArray(catalog.sources) || catalog.sources.length === 0) {
    errors.push("sources must be a non-empty array");
  }

  const profileNames = new Set();
  if (isObject(catalog.query_profiles)) {
    for (const [name, profile] of Object.entries(catalog.query_profiles)) {
      profileNames.add(name);
      if (!isObject(profile)) {
        errors.push(`query_profiles.${name} must be a mapping`);
        continue;
      }
      requireStringArray(profile.terms, `query_profiles.${name}.terms`, errors);
    }
  }

  const ids = new Set();
  if (Array.isArray(catalog.sources)) {
    catalog.sources.forEach((source, index) => {
      const prefix = `sources[${index}]`;
      if (!isObject(source)) {
        errors.push(`${prefix} must be a mapping`);
        return;
      }

      requireString(source.id, `${prefix}.id`, errors);
      if (typeof source.id === "string") {
        if (ids.has(source.id)) errors.push(`${prefix}.id duplicates ${source.id}`);
        ids.add(source.id);
      }
      requireString(source.name, `${prefix}.name`, errors);
      requireString(source.source_type, `${prefix}.source_type`, errors);
      requireString(source.authority, `${prefix}.authority`, errors);
      requireString(source.extraction_method, `${prefix}.extraction_method`, errors);
      requireString(
        source.institutional_scope_assumption,
        `${prefix}.institutional_scope_assumption`,
        errors,
      );

      try {
        const parsedUrl = new URL(source.url);
        if (parsedUrl.protocol !== "https:") errors.push(`${prefix}.url must use HTTPS`);
      } catch {
        errors.push(`${prefix}.url must be a valid URL`);
      }

      if (source.priority !== null && ![1, 2, 3].includes(source.priority)) {
        errors.push(`${prefix}.priority must be 1, 2, 3, or null`);
      }
      if (source.domain_tier !== null && ![1, 2, 3].includes(source.domain_tier)) {
        errors.push(`${prefix}.domain_tier must be 1, 2, 3, or null`);
      }
      if (typeof source.enabled !== "boolean") {
        errors.push(`${prefix}.enabled must be boolean`);
      }
      if (!isObject(source.access)) {
        errors.push(`${prefix}.access must be a mapping`);
      } else {
        requireString(source.access.mode, `${prefix}.access.mode`, errors);
        if (typeof source.access.authentication_required !== "boolean") {
          errors.push(`${prefix}.access.authentication_required must be boolean`);
        }
      }

      requireStringArray(source.discovery_targets, `${prefix}.discovery_targets`, errors);
      requireStringArray(source.preferred_subjects, `${prefix}.preferred_subjects`, errors, {
        allowEmpty: true,
      });
      validateDate(source.last_verified_on, `${prefix}.last_verified_on`, errors);

      if (source.query_profiles !== undefined) {
        requireStringArray(source.query_profiles, `${prefix}.query_profiles`, errors);
        if (Array.isArray(source.query_profiles)) {
          for (const profile of source.query_profiles) {
            if (!profileNames.has(profile)) {
              errors.push(`${prefix}.query_profiles references unknown profile ${profile}`);
            }
          }
        }
      }

      const prohibitedText = `${source.id ?? ""} ${source.name ?? ""} ${source.url ?? ""}`.toLowerCase();
      if (prohibitedText.includes("uers") || prohibitedText.includes("canva.com/design")) {
        errors.push(`${prefix} contains a prohibited UERS directory source`);
      }
    });
  }

  if (errors.length > 0) {
    throw new Error(`Catalog validation failed:\n- ${errors.join("\n- ")}`);
  }

  return catalog;
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : null;
if (invokedPath === fileURLToPath(import.meta.url)) {
  try {
    const catalog = loadAndValidateCatalog(process.argv[2] ?? defaultCatalogPath);
    console.log(
      `Valid source catalog: ${catalog.sources.length} sources, ${Object.keys(catalog.query_profiles).length} query profiles.`,
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
