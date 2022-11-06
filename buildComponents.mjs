// Inspired by https://www.raulmelo.dev/blog/build-javascript-library-with-multiple-entry-points-using-vite-3

import { build } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import preprocess from 'svelte-preprocess';

import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const outDir = './src/lib/bundled';
const components = ['DIDAr.svelte'];

export const buildComponents = async () => {
	// build the data field app that goes inside the contract data field to reolve the did/tag
	console.log('Building components...');
	for (const ComponentName of components) {
		console.log(`Building ${ComponentName}...`);
		await build({
			configFile: false,
			build: {
				outDir,
				lib: {
					entry: path.resolve(__dirname, `./package/${ComponentName}`), // use package so the typescript and css is already preprocessed for us
					fileName: ComponentName,
					name: ComponentName
				},
				emptyOutDir: false,
				minify: true,
				sourcemap: false,
				rollupOptions: {
					output: [
						{
							sourcemap: false,
							format: 'es',
							dir: outDir,
							manualChunks: false,
							inlineDynamicImports: true,
							name: 'app',
							compact: true,
							plugins: [terser()]
						}
					],
					plugins: [
						svelte({
							emitCss: false,
							preprocess: preprocess()
						}),
						terser()
					]
				}
			}
		});
		console.log(`Built ${ComponentName}!`);
	}
	// process.exit(0);
};
(async () => {
	console.log('Starting Individual Component build');
	await buildComponents();
	console.log('Done');
	process.exit(0);
})();
