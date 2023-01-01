**esbuild-plugin-vitest-cleaner**

Plugin will remove any reference and related code block prior to rendition. Anyone feeling i should of just RTFM is welcome because this wouldn't be the first time I've chosen to jump the gun when a perfectly good feature is available if only I read the manual ;)

|

usage:
.. code-block:

  import { build } from 'esbuild';
  import { vitestCleaner } from 'esbuild-plugin-vitest-cleaner';
  
  await build({
    ..esbuild configuration..
    plugins[vitestCleaner()]
  });


filtering to specific files simply supplying a regex:
.. code-block:

  await build ({
    ... esbuild configuration ...

    plugins[vitestCleaner({filter:/*.select.mts/})]
  });

|

known issues:

- JSDocs that commentate the import.meta.vitest evaluation remain so i'll replace this implementation with a TS AST parsed version soon enough.
