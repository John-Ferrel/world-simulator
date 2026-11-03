import { readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const dir = resolve('packages/v4/content/generated');
const files = readdirSync(dir)
  .filter((file) => file.startsWith('p9-') && file.endsWith('.json'))
  .sort();
const imports = files.map((file, index) => `import pack${index} from './${file}';`).join('\n');
const entries = files.map((_, index) => `  pack${index},`).join('\n');
const content = `import type { SceneDefinition, TaskDefinition } from '../../domain.js';
import { compileGeneratedPack, compileGeneratedTasks, type GeneratedPack } from '../../generated.js';
${imports}

const PHASE9_PACKS = [
${entries}
] as unknown as GeneratedPack[];

export const PHASE9_TASK_PACKS = PHASE9_PACKS.filter((pack) => pack.kind === 'task');
export const PHASE9_EVENT_PACKS = PHASE9_PACKS.filter((pack) => pack.kind !== 'task');

export const PHASE9_TASKS: TaskDefinition[] = PHASE9_TASK_PACKS.flatMap((pack) =>
  compileGeneratedTasks(pack),
);
export const PHASE9_EVENT_SCENES: SceneDefinition[] = PHASE9_EVENT_PACKS.flatMap((pack) =>
  compileGeneratedPack(pack),
);
`;
writeFileSync(resolve(dir, 'phase9.ts'), content);
console.log(JSON.stringify({ files: files.length, packs: files.length }));
