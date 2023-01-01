import { copyFile, appendFile, rm, mkdir } from 'node:fs/promises';
import { build } from 'esbuild';
import { vitestCleaner } from '../../source/vitest-cleaner.mjs';
import type { BuildOptions } from 'esbuild';

const cjsOptions = { format: 'cjs', outfile: 'dist/common/index.cjs' };
const esmOptions = { format: 'esm', outfile: 'dist/esm/index.mjs' };
const legacyOptions = { format: 'iife', outfile: 'dist/legacy/index.js' };
const typeOptions = { outfile: 'dist/types/index.d.ts' };

await rm('dist', { recursive: true, force: true});
await Promise.all([cjsOptions, legacyOptions, esmOptions].map(async options =>
    build(Object.assign({
        entryPoints: [ 'source/index.mts' ],
        bundle: true,
        platform: 'node',
        target: 'node18',
        plugins:[vitestCleaner()]
    }, options) as BuildOptions)));

await mkdir('dist/types', {recursive: true});
await copyFile('./source/typing.mts', typeOptions.outfile);
await appendFile(typeOptions.outfile, '')