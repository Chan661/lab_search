import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const defaultManifestPath = path.join(
  projectRoot,
  "scripts",
  "tooling-integrity.json",
);

export const protectedFiles = [
  ".gitignore",
  "package.json",
  "package-lock.json",
  "scripts/validate-source-catalog.mjs",
  "scripts/verify-tooling-integrity.mjs",
  "test/source-catalog.test.mjs",
  "test/tooling-integrity.test.mjs",
];

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

export function buildIntegrityManifest(root = projectRoot) {
  const files = {};
  for (const relativePath of protectedFiles) {
    const absolutePath = path.join(root, relativePath);
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`Protected tooling file is missing: ${relativePath}`);
    }
    files[relativePath] = sha256(absolutePath);
  }
  return {
    schema_version: "1.0",
    algorithm: "sha256",
    files,
  };
}

export function writeIntegrityManifest({
  root = projectRoot,
  manifestPath = defaultManifestPath,
} = {}) {
  const manifest = buildIntegrityManifest(root);
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  return manifest;
}

export function verifyToolingIntegrity({
  root = projectRoot,
  manifestPath = defaultManifestPath,
} = {}) {
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Tooling integrity manifest is missing: ${manifestPath}`);
  }

  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch (error) {
    throw new Error(`Tooling integrity manifest is invalid JSON: ${error.message}`);
  }

  if (manifest.schema_version !== "1.0" || manifest.algorithm !== "sha256") {
    throw new Error("Tooling integrity manifest has an unsupported schema or algorithm");
  }
  if (manifest.files === null || typeof manifest.files !== "object" || Array.isArray(manifest.files)) {
    throw new Error("Tooling integrity manifest files must be a mapping");
  }

  const expectedPaths = [...protectedFiles].sort();
  const manifestPaths = Object.keys(manifest.files).sort();
  if (JSON.stringify(expectedPaths) !== JSON.stringify(manifestPaths)) {
    throw new Error("Tooling integrity manifest file set does not match the protected file set");
  }

  const failures = [];
  for (const relativePath of protectedFiles) {
    const absolutePath = path.join(root, relativePath);
    if (!fs.existsSync(absolutePath)) {
      failures.push(`${relativePath}: missing`);
      continue;
    }
    const actual = sha256(absolutePath);
    const expected = manifest.files[relativePath];
    if (typeof expected !== "string" || !/^[a-f0-9]{64}$/.test(expected)) {
      failures.push(`${relativePath}: invalid expected hash`);
    } else if (actual !== expected) {
      failures.push(`${relativePath}: hash mismatch`);
    }
  }

  if (failures.length > 0) {
    throw new Error(`Tooling integrity verification failed:\n- ${failures.join("\n- ")}`);
  }
  return manifest;
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : null;
if (invokedPath === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.includes("--write")) {
      const manifest = writeIntegrityManifest();
      console.log(`Wrote tooling integrity manifest for ${Object.keys(manifest.files).length} files.`);
    } else {
      const manifest = verifyToolingIntegrity();
      console.log(`Verified tooling integrity for ${Object.keys(manifest.files).length} files.`);
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
