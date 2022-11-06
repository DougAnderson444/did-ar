import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			autoPreprocess: {
				replace: [
					[/process\.env\.NODE_ENV/g, JSON.stringify(process.env.NODE_ENV)],
					[/process\.env\.NODE_DEBUG/g, false]
				]
			},
			postcss:
				process.env.NODE_ENV === 'development'
					? true // use app.css when developing to preview the styles
					: {
							// use @import when building packages for distribution
							configFilePath: path.resolve(__dirname, './postcss.config.js'),
							prependData: `@import '${path.resolve('./src/utilities.css')}';`
					  }
		})
	],

	kit: {
		adapter: adapter({
			pages: 'docs',
			assets: 'docs'
		}),
		paths: {
			// change below to your repo name
			base: '/did-ar'
		}
	}
};

export default config;
