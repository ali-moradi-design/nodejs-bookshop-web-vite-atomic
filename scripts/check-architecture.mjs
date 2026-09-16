#!/usr/bin/env node
/**
 * Atomic Design boundary checks.
 * Fails on: upward UI imports, leftover FSD paths, forbidden layer coupling.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('../src/', import.meta.url).pathname;
const UI_LAYERS = ['atoms', 'molecules', 'organisms', 'templates', 'pages'];
const UI_RANK = Object.fromEntries(UI_LAYERS.map((l, i) => [l, i]));

const FORBIDDEN_TOP = ['entities', 'features', 'widgets', 'shared'];
/** Top-level src/pages is FSD; allowed pages live under components/pages */
const errors = [];

function walk(dir) {
  const files = [];
  if (!existsSync(dir)) return files;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) files.push(...walk(p));
    else if (/\.(ts|tsx)$/.test(name) && !name.endsWith('.d.ts')) files.push(p);
  }
  return files;
}

// Leftover FSD directories
for (const name of FORBIDDEN_TOP) {
  if (existsSync(join(ROOT, name))) {
    errors.push(`Forbidden FSD directory still present: src/${name}`);
  }
}
if (existsSync(join(ROOT, 'pages')) && !existsSync(join(ROOT, 'components/pages'))) {
  errors.push('Forbidden top-level src/pages (use src/components/pages)');
}
if (existsSync(join(ROOT, 'pages'))) {
  // If both exist, still forbid top-level pages
  errors.push('Forbidden top-level src/pages — migrate to src/components/pages');
}

const IMPORT_RE = /from\s+['"]([^'"]+)['"]/g;
const DYNAMIC_RE = /import\(\s*['"]([^'"]+)['"]\s*\)/g;

function uiLayerOf(rel) {
  // components/atoms/... → atoms
  const m = rel.match(/^components\/(atoms|molecules|organisms|templates|pages)(?:\/|$)/);
  return m ? m[1] : null;
}

function resolveSpec(fromFile, spec) {
  if (spec.startsWith('@/')) return spec.slice(2);
  if (!spec.startsWith('.')) return null;
  const fromDir = join(fromFile, '..');
  return relative(ROOT, join(fromDir, spec)).replaceAll('\\', '/');
}

function checkSpec(importerRel, spec) {
  // Ban FSD-style aliases
  if (
    spec.startsWith('@/entities') ||
    spec.startsWith('@/features') ||
    spec.startsWith('@/widgets') ||
    spec.startsWith('@/shared/') ||
    spec === '@/shared' ||
    /^@\/pages(\/|$)/.test(spec)
  ) {
    errors.push(`${importerRel}: forbidden FSD import '${spec}'`);
    return;
  }

  const importedRel = resolveSpec(join(ROOT, importerRel), spec);
  if (!importedRel || importedRel.startsWith('..')) return;

  const fromLayer = uiLayerOf(importerRel);
  const toLayer = uiLayerOf(importedRel.replace(/\.(ts|tsx)$/, ''));
  if (!fromLayer || !toLayer) {

  // Atoms may only touch lib/utils (e.g. cn) — no domain hooks/api
  if (fromLayer === 'atoms' && importedRel.startsWith('lib/') && !importedRel.startsWith('lib/utils')) {
    errors.push(
      `${importerRel}: atoms must not import domain lib via '${spec}' (only @/lib/utils)`,
    );
  }
    return;
  }

  if (UI_RANK[toLayer] > UI_RANK[fromLayer]) {
    errors.push(
      `${importerRel}: upward import of ${toLayer} via '${spec}' (from ${fromLayer})`,
    );
  }
}

const files = walk(ROOT);
for (const file of files) {
  const rel = relative(ROOT, file).replaceAll('\\', '/');
  const src = readFileSync(file, 'utf8');
  for (const re of [IMPORT_RE, DYNAMIC_RE]) {
    re.lastIndex = 0;
    for (const match of src.matchAll(re)) {
      checkSpec(rel, match[1]);
    }
  }
}

if (errors.length) {
  console.error(
    `Architecture check failed (${errors.length}):\n` + errors.map((e) => `  - ${e}`).join('\n'),
  );
  process.exit(1);
}
console.log(`Architecture check passed (${files.length} files).`);
