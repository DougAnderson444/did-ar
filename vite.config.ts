import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	// alias @douganderson/did-ar
	resolve: {
		alias: {
			'@peerpiper/did-ar': './src/lib/index.js',
			process: 'process/browser'
		}
	},
	build: {
		sourcemap: true
	},
	test: {
		deps: {
			inline: ['warp-contracts']
		},
		hookTimeout: 60000
	},
	define: {
		'process.env': {}
	}
};

export default config;
