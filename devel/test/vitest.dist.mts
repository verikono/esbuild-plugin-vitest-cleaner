import { defineConfig } from 'vitest/config';
export default defineConfig({
    test: {
        include: ['devel/test/test.dist.mts'],
        includeSource: [ 'dist' ],
        alias: {
            'esbuild-plugin-vitest-cleaner': '../..'
        }
    }
});
