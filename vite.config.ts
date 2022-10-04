import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	// alias @douganderson/did-ar
	resolve: {
		alias: {
			'@peerpiper/did-ar': './src/lib/index'
		}
	},
	test: {
		deps: {
			inline: ['warp-contracts']
		},
		hookTimeout: 60000
	}
};

export default config;
