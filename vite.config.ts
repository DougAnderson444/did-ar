import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	// alias @douganderson/did-ar-component
	resolve: {
		alias: {
			'@douganderson/did-ar-component': './src/lib/index'
		}
	}
};

export default config;
