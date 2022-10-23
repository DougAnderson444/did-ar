import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	// alias @douganderson/did-ar
	resolve: {
		mainFields: ['browser', 'web', 'module', 'jsnext:main', 'jsnext'],
		alias: {
			'@peerpiper/did-ar':
				process.env.NODE_ENV === 'production' ? './src/lib/index.ts' : './src/lib/index', // build needs ./src/lib/index.js, but ssr needs ./src/lib/index
			process: 'process/browser',
			'warp-contracts':
				process.env.NODE_ENV === 'development' ? 'warp-contracts/web' : 'warp-contracts'
		}
	},
	// @ts-ignore
	test: {
		deps: {
			inline: ['warp-contracts']
		},
		hookTimeout: 60000,
		testTimeout: 60000
	},
	define: {
		'process.env': { NODE_DEBUG: false }
	},
	optimizeDeps: {
		// force these to be pre-bundled
		include: ['warp-contracts'],
		force: true
	},
	build: {
		sourcemap: true
	},
	server: {
		fs: {
			strict: false
		}
	}
};

export default config;
