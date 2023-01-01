export type VitestCleanerProps = { filter: RegExp };
export type VitestCleanerOptions<Opts extends ( 'filter' | 'filter' )> = {
    [P in Extract<Opts, keyof VitestCleanerProps>]?: VitestCleanerProps[P]
};

export interface Plugin {
    name: string;
    // accessible by import type { PluginBuild } from 'esbuild'.
    setup: (build: unknown) => (void | Promise<void>);
}
declare function vitestCleaner(options?: VitestCleanerOptions<'filter'>): Plugin;
export { vitestCleaner };
export default vitestCleaner;