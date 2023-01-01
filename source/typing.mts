export type VitestCleanerProps = { filter: RegExp };
export type VitestCleanerOptions<Opts extends ( 'filter' | 'filter' )> = {
    [P in Extract<Opts, keyof VitestCleanerProps>]?: VitestCleanerProps[P]
};

type Plugin = unknown;  // accessible by import type { Plugin } from 'esbuild'.
declare function vitestCleaner(options?: VitestCleanerOptions<'filter'>): Plugin;
export { vitestCleaner };
export default vitestCleaner;