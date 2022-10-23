import type { CacheOptions } from 'warp-contracts';
const REGISTRY = 'bLAgYxAdX2Ry-nt6aH2ixgvJXbpsEYm28NgJgyqfs-U';

// if you're only doing a single resolution, use this
export async function arnsResolver(
	arnsName: string,
	{ CacheOptions }: { CacheOptions?: CacheOptions } = {}
) {
	const arnsInstance = await init({ CacheOptions });
	const antContractId = await arnsInstance.resolveARNS(arnsName);
	const did = await arnsInstance.resolveANT(antContractId);
	const didDoc = await arnsInstance.resolveDID(did);
	return didDoc;
}

// if resolveing lots of names, use this
// it keeps the warp instance around
export async function init({ local, CacheOptions }: {local?: boolean; CacheOptions?: CacheOptions } = { local: false, CacheOptions: undefined }) {
	// make warp
	const { WarpFactory } = await import('warp-contracts');
	const warp = local ? WarpFactory.forLocal(undefined, undefined, CacheOptions) : WarpFactory.forMainnet(CacheOptions);

	return {
		warp,
		resolveARNS,
		resolveANT,
		resolveDID
	};
}

export async function resolveARNS(arnsName: string): Promise<string> {
	const registry = (await this.warp.contract(REGISTRY).readState()).cachedValue.state; // lookup doc

	// match arnsName as key in registry and return value
	const antContractId = registry.records[arnsName];

	return antContractId;
}

export async function resolveANT(antContractId: string): Promise<string> {
	const registry = (await this.warp.contract(antContractId).readState()).cachedValue.state; // lookup doc
	const did = `did:ar:${registry.records['did-ar'].transactionId}`;
	return did;
}

export async function resolveDID(did: string): Promise<string> {
	// split did:ar:identitifier by the part fater did:ar: into "did:ar" and "identitifier"
	const identifier = did.replace('did:ar:', '');
	const didDocument = (await this.warp.contract(identifier).readState()).cachedValue.state;
	return didDocument;
}
