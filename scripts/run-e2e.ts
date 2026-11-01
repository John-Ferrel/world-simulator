import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const localLibs = resolve('.data/browser-libs/root/usr/lib/x86_64-linux-gnu');
const env = { ...process.env };
if (existsSync(localLibs))
  env.LD_LIBRARY_PATH = [localLibs, env.LD_LIBRARY_PATH].filter(Boolean).join(':');
const child = spawn(
  process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm',
  ['exec', 'playwright', 'test', ...process.argv.slice(2)],
  {
    stdio: 'inherit',
    env,
  },
);
child.on('exit', (code, signal) => process.exit(signal ? 1 : (code ?? 1)));
