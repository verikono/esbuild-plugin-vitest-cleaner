import { copyFile, appendFile } from 'node:fs/promises';
import { build } from 'esbuild';
import { vitestCleaner } from './source/vitest-cleaner.mjs';
import type { BuildOptions } from 'esbuild';

const cjsOptions = { format: 'cjs', outfile: 'dist/common/index.cjs' };
const esmOptions = { format: 'esm', outfile: 'dist/esm/index.mjs' };
const typeOptions = { outfile: 'dist/types/index.d.ts' };

await Promise.all([cjsOptions, esmOptions].map(async options =>
    build(Object.assign({
        entryPoints: [ 'source/index.mts' ],
        bundle: true,
        platform: 'node',
        target: 'node18',
        plugins:[vitestCleaner()]
    }, options) as BuildOptions)));

await copyFile('source/typing.mts', typeOptions.outfile);
await appendFile(typeOptions.outfile)