import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  defaultManifestPath,
  projectRoot,
  protectedFiles,
  verifyToolingIntegrity,
  writeIntegrityManifest,
} from "../scripts/verify-tooling-integrity.mjs";

test("canonical protected tooling matches the integrity manifest", () => {
  const manifest = verifyToolingIntegrity();
  assert.deepEqual(Object.keys(manifest.files).sort(), [...protectedFiles].sort());
});

test("integrity verification detects a protected-file modification", (context) => {
  const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "lab-search-integrity-"));
  context.after(() => fs.rmSync(temporaryRoot, { recursive: true, force: true }));

  for (const relativePath of protectedFiles) {
    const destination = path.join(temporaryRoot, relativePath);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(path.join(projectRoot, relativePath), destination);
  }

  const temporaryManifest = path.join(temporaryRoot, "scripts", "tooling-integrity.json");
  writeIntegrityManifest({ root: temporaryRoot, manifestPath: temporaryManifest });
  fs.appendFileSync(path.join(temporaryRoot, "package.json"), "\n", "utf8");

  assert.throws(
    () => verifyToolingIntegrity({ root: temporaryRoot, manifestPath: temporaryManifest }),
    /package\.json: hash mismatch/,
  );
});

test("canonical manifest uses the expected location", () => {
  assert.equal(defaultManifestPath, path.join(projectRoot, "scripts", "tooling-integrity.json"));
});
