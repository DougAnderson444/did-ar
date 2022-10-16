import { describe, it, assert, expect, test, beforeAll, afterAll } from 'vitest';
import { arns, arnsResolver } from '$lib';
// import { arns } from '$lib';

const CacheOptions = { inMemory: true };

describe('Testing arns Resolver', () => {
	const arnsName = 'douganderson444';
	const doug444sANTContract = 'xbDYSB0x1JXCVAWq_9TS1m6vcLCS0KVljp8Yk38_iXA';
	const dougDID = 'did:ar:UGnqpxdraMbkmG-4F6jU7xkFhErNgaXLQf39tW7yYck';

	let arnsInstance;
	let antContractId;
	let did;

	it('should initialize', async () => {
		arnsInstance = await arns.init({ CacheOptions });
		// expect warp and resolve props
		expect(arnsInstance).toHaveProperty('warp');
		expect(arnsInstance).toHaveProperty('resolveARNS');
		expect(arnsInstance).toHaveProperty('resolveANT');
	});

	it('should resolve ARNS to ANT', async () => {
		antContractId = await arnsInstance.resolveARNS(arnsName);
		expect(antContractId).toBe(doug444sANTContract);
	});

	it('should resolve ANT to did', async () => {
		did = await arnsInstance.resolveANT(antContractId);
		expect(did).toEqual(dougDID);
	});

	it('should resolve ARNS to did directly too ', async () => {
		const directDid = await arnsResolver(arnsName, { CacheOptions });
		expect(directDid).toEqual(dougDID);
	});
});
