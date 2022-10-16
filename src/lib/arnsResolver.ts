const REGISTRY = 'bLAgYxAdX2Ry-nt6aH2ixgvJXbpsEYm28NgJgyqfs-U';

// if you're only doing a single resolution, use this
export async function arnsResolver(
	arnsName: string,
	{ CacheOptions }: { CacheOptions: { inMemory: boolean } } = {}
) {
	const arnsInstance = await init({ CacheOptions });
	const antContractId = await arnsInstance.resolveARNS(arnsName);
	const did = await arnsInstance.resolveANT(antContractId);
	return did;
}

// if resolveing lots of names, use this
// it keeps the warp instance around
export async function init({ local, CacheOptions } = { local: false, CacheOptions: {} }) {
	// make warp
	const { WarpFactory } = await import('warp-contracts');
	const warp = local ? WarpFactory.forLocal(CacheOptions) : WarpFactory.forMainnet(CacheOptions);

	return {
		warp,
		resolveARNS,
		resolveANT
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
