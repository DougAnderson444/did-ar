// import { error } from '@sveltejs/kit';

// export const prerender = true;

/** @type {import('./$types').PageLoad} */
export function load({ params, url, routeId }) {
	// passes this data to +page.svelte as data.params & data.url
	return { params, url };
}
