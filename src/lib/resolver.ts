// https://github.com/decentralized-identity/did-resolver
// import { WarpFactory } from 'warp-contracts';

export function getResolver() {
	/**
	 * @param {string} did
	 * @param {string} parsed.method
	 * @param {string} parsed.id
	 * @param {string} parsed.did
	 * @param {string} parsed.path
	 * @param {string} parsed.fragment
	 * @param {Resolver} didResolver
	 * @param {DIDResolutionOptions} options
	 */
	async function resolveAr(
		did: string,
		parsed: ParsedDID,
		didResolver: Resolver,
		options: DIDResolutionOptions
	): Promise<DIDDocument> {
		console.log(parsed);
		const { WarpFactory } = await import('warp-contracts');
		let warp = WarpFactory.forMainnet();

		const didDocument = (await warp.contract(parsed.id).readState()).cachedValue.state; // lookup doc
		// If you need to lookup another did as part of resolving this did document, the primary DIDResolver object is passed in as well
		// const parentDID = await didResolver.resolve(...)
		// Return the DIDResolutionResult object
		return {
			didResolutionMetadata: { contentType: 'application/did+ld+json' },
			didDocument,
			didDocumentMetadata: {}
		};
	}

	async function resolveArlocal(
		did: string,
		parsed: ParsedDID,
		didResolver: Resolver,
		options: DIDResolutionOptions
	): Promise<DIDDocument> {
		console.log(parsed);
		const { WarpFactory } = await import('warp-contracts');

		let warp = WarpFactory.forLocal();

		const didDocument = (await warp.contract(parsed.id).readState()).cachedValue.state; // lookup doc
		// If you need to lookup another did as part of resolving this did document, the primary DIDResolver object is passed in as well
		// const parentDID = await didResolver.resolve(...)
		// Return the DIDResolutionResult object
		return {
			didResolutionMetadata: { contentType: 'application/did+ld+json' },
			didDocument,
			didDocumentMetadata: {}
		};
	}

	return { ar: resolveAr, arlocal: resolveArlocal };
}
