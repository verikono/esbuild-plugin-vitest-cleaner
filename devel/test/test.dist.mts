
import { expectTypeOf } from 'vitest'
import { describe, it, beforeEach, expect } from 'vitest';
import type { Plugin } from 'esbuild';


describe('pre-push tests', () => {

    let ESMImport: typeof import('esbuild-plugin-vitest-cleaner');
    let vitestCleaner: typeof import('esbuild-plugin-vitest-cleaner').vitestCleaner;

    beforeEach(async () => { 
        ESMImport = await import('esbuild-plugin-vitest-cleaner');
        vitestCleaner = ESMImport.default;
    })

    describe('ESM', () => {

        it('vitestCleaner is importable as named import from module', () => {
            const { vitestCleaner } = ESMImport;
            expectTypeOf(vitestCleaner).toBeFunction();
        });

        it('vitestCleaner is importable as default import from module', () => {
            expectTypeOf(vitestCleaner).toBeFunction();
        });

        it('vitestCleaner returnes ESBuild Plugin', () => 
            expectTypeOf(vitestCleaner).returns.toMatchTypeOf<Plugin>
        );
        
        it('vitestCleaner returns its name correctly', () => {
            const { name } = vitestCleaner();
            expectTypeOf(name).toBeString();
            expect(name).toEqual('vitest-cleaner');
        });

        it('vitestCleaner returns the setup closure', () => {
            const { setup } = vitestCleaner();
            expectTypeOf(setup).toBeFunction();
        });

    });

});