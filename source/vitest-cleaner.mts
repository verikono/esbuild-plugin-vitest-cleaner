import { readFile } from 'node:fs/promises';
import type { OnLoadArgs, PluginBuild, OnLoadResult, Plugin } from 'esbuild';
import type { VitestCleanerOptions, VitestCleanerProps } from './typing.mjs';



export const vitestCleaner = (options: VitestCleanerOptions<'filter'> = {}): Plugin => {
    const opts: VitestCleanerProps = Object.assign({}, { filter: /\./ }, options);
    const { filter } = opts;
    return {
        name: 'vitest-cleaner',
        setup(build: PluginBuild) {
            build.onLoad({filter}, vitestCleanOnLoad)
        }
    };
};


const vitestCleanOnLoad = async (options: OnLoadArgs): Promise<OnLoadResult> =>
    ({ contents: await vitestCleanerFn(options), loader: 'ts' });



const vitestCleanerFn = async (props: { path: string } ):Promise<string> => {

    const text = await readFile(props.path, {encoding: 'utf-8'});
    const linebreak = text.indexOf('\\r\\n') === -1 ? '\\n' : '\\r\\n';
    const lines = text.split(new RegExp(linebreak, 'g'));
    
    const result = lines.reduce<{ lines: Array<string>; depth: number; }>(({lines, depth}, line) => {
        if(!depth) {
            const compact = line.replace(/ /g, '');
            if(compact.includes(('if(import__meta__vitest){'.replace(/__/g,  '.')))) {
                depth = 1;
                return { lines, depth };
            }
            return { lines: lines.concat([line]), depth };
        }

        let retainLine = false;

        [...line].forEach(char => {
            if(char === '{'){ ++depth; retainLine = true }
            if(char === '}'){ --depth; retainLine = true }
        });
        if(!depth && !retainLine) lines = lines.concat([line])

        return { lines, depth };

    }, {lines:[], depth: 0}).lines.join(linebreak.replace('\\n', '\n'));
    return result;
}




/**
 * In source tests.
 * 
 */
if(import.meta.vitest) {

    const { describe, it, expect } = import.meta.vitest;
    
    describe('vitestCleanerFn', async () => {

        let result: string;

        it('invoke as esbuild mock', async () => {
            const { fileURLToPath } = await import('node:url');
            const path = fileURLToPath(import.meta.url)
            result = await vitestCleanerFn({path});
            expect(result).to.be.string;
        });

        it('returns a string', () => expect(result).to.be.a.string);
        it('string has a decent length', () => expect(result).to.have.length.greaterThan(100));
        it('does not include import.vitest.meta', () => expect(result).to.not.include('import.vitest.meta'));

    });

}
