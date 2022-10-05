// https://github.com/decentralized-identity/did-resolver
// import { WarpFactory } from 'warp-contracts';
export interface DIDDocumentMetadata extends Extensible {
	created?: string;
	updated?: string;
	deactivated?: boolean;
	versionId?: string;
	nextUpdate?: string;
	nextVersionId?: string;
	equivalentId?: string;
	canonicalId?: string;
}

export type DIDDocument = {
	'@context'?: 'https://www.w3.org/ns/did/v1' | string | string[];
	id: string;
	alsoKnownAs?: string[];
	controller?: string | string[];
	verificationMethod?: VerificationMethod[];
	service?: Service[];
	/**
	 * @deprecated
	 */
	publicKey?: VerificationMethod[];
} & {
	[x in KeyCapabilitySection]?: (string | VerificationMethod)[];
};

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
		const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

		const { WarpFactory } = await import('warp-contracts'); // build process needs node version

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
		const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

		const { WarpFactory } = await import('warp-contracts'); // build process needs node version

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
