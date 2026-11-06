import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { StatePack } from '../state/registry.js';
import { statePackHash } from '../state/registry.js';
import type { StateContentValidation } from './validate.js';

export type RegistryEntry = {
  id: string;
  version: number;
  hash: string;
  status: 'validated' | 'rejected' | 'published';
  briefId?: string;
  author: string;
  model?: string;
  file: string;
  createdAt: string;
  tokens?: number;
  usedFallback: boolean;
  stateCount: number;
  kernelCount: number;
  errors: string[];
  warnings: string[];
  compiledScenes?: number;
  compiledTasks?: number;
};

export type ContentFactoryRegistry = {
  version: 1;
  updatedAt: string;
  entries: RegistryEntry[];
};

export function contentFactoryDir(root = process.cwd()): string {
  return resolve(root, 'data/phase15-content');
}

export function loadRegistry(root = process.cwd()): ContentFactoryRegistry {
  const file = resolve(contentFactoryDir(root), 'registry.json');
  if (!existsSync(file)) return { version: 1, updatedAt: new Date(0).toISOString(), entries: [] };
  return JSON.parse(readFileSync(file, 'utf8')) as ContentFactoryRegistry;
}

export function saveRegistry(registry: ContentFactoryRegistry, root = process.cwd()): void {
  const dir = contentFactoryDir(root);
  mkdirSync(dir, { recursive: true });
  registry.updatedAt = new Date().toISOString();
  writeFileSync(resolve(dir, 'registry.json'), `${JSON.stringify(registry, null, 2)}\n`);
}

export function storePack(
  pack: StatePack,
  validation: StateContentValidation,
  options: {
    root?: string;
    usedFallback: boolean;
    tokens?: number;
    status?: RegistryEntry['status'];
  },
): { file: string; entry: RegistryEntry; registry: ContentFactoryRegistry } {
  const root = options.root ?? process.cwd();
  const dir = contentFactoryDir(root);
  const packsDir = resolve(dir, 'packs');
  mkdirSync(packsDir, { recursive: true });
  const file = resolve(packsDir, `${pack.id}-v${pack.version}.json`);
  writeFileSync(file, `${JSON.stringify(pack, null, 2)}\n`);
  const hash = statePackHash(pack);
  const entry: RegistryEntry = {
    id: pack.id,
    version: pack.version,
    hash,
    status: options.status ?? (validation.ok ? 'validated' : 'rejected'),
    ...(pack.sourceBriefId ? { briefId: pack.sourceBriefId } : {}),
    author: pack.author,
    ...(pack.model ? { model: pack.model } : {}),
    file: file.slice(root.length + 1),
    createdAt: new Date().toISOString(),
    ...(options.tokens !== undefined ? { tokens: options.tokens } : {}),
    usedFallback: options.usedFallback,
    stateCount: pack.states.length,
    kernelCount: pack.kernels?.length ?? 0,
    errors: validation.errors,
    warnings: validation.warnings,
    compiledScenes: validation.compiledScenes,
    compiledTasks: validation.compiledTasks,
  };
  const registry = loadRegistry(root);
  const existingIndex = registry.entries.findIndex(
    (candidate) => candidate.id === pack.id && candidate.version === pack.version,
  );
  if (existingIndex >= 0) registry.entries[existingIndex] = entry;
  else registry.entries.push(entry);
  registry.entries.sort((a, b) => a.id.localeCompare(b.id) || a.version - b.version);
  saveRegistry(registry, root);
  return { file, entry, registry };
}

export function listStoredPacks(root = process.cwd()): StatePack[] {
  const registry = loadRegistry(root);
  const result: StatePack[] = [];
  for (const entry of registry.entries) {
    if (entry.status === 'rejected') continue;
    const file = resolve(root, entry.file);
    if (!existsSync(file)) continue;
    result.push(JSON.parse(readFileSync(file, 'utf8')) as StatePack);
  }
  return result;
}
