export async function handle(state, action) {
	const input = action.input;
	const caller = action.caller;

	function setVerificatioMethod() {
		if (input.verificationMethod) {
			if (!Array.isArray(input.verificationMethod) || input.verificationMethod.length === 0) {
				throw new ContractError('verificationMethod must be an array with at least one method');
			}
			state.verificationMethod = input.verificationMethod;
		}
	}

	async function assertController() {
		let flattenedAddresses;
		try {
			// Need to read the state of each of the controllers' dids and get the Arweave addresses and compare it to the caller value
			const promises = state.controller.map(async (did) => await getDidArweaveAddresses(did));
			const addresses = await Promise.all(promises);
			flattenedAddresses = addresses.flat();
		} catch (error) {
			throw new ContractError('Invalid controller');
		}

		// check if caller is listed in the array of state.controllers
		if (!flattenedAddresses.includes(caller)) {
			throw new ContractError('Caller is not a controller of this DID');
		}
	}

	async function getDidArweaveAddresses(did) {
		// remove did:ar*: from the start of the did string
		const contractId = did.replace(/^did:ar(.*?):/, '');

		// check if contractId match this contract
		let didDoc =
			contractId == SmartWeave.contract.id
				? state
				: await SmartWeave.contracts.readContractState(contractId);

		// get all publicKeyJwk.kty === "RSA" from verificationMethod
		const promises = didDoc.verificationMethod
			.filter((method) => method.publicKeyJwk.kty === 'RSA')
			.map(
				async (method) => await SmartWeave.arweave.wallets.ownerToAddress(method.publicKeyJwk.n)
			);

		return await Promise.all(promises);
	}

	if (input.function === 'update') {
		// Intialize = 1st update, only if caller is Contract owner
		if (!state.id && caller === SmartWeave.contract.owner) {
			if (!input?.id?.startsWith('did:ar') || !input.verificationMethod.length) {
				throw new ContractError('Invalid ID or missing verificationMethod');
			}
			state.id = input.id;
			state.controller = input?.controller || [input.id];
			setVerificatioMethod(); // initialize verificationMethods
		}

		// after initial update, any controller can make updates
		await assertController(state, caller);

		setVerificatioMethod();

		state.controller = input?.controller || state.controller; // array allows for multiple controllers, see: https://w3c.github.io/did-core/#independent-control
		state.authentication = input?.authentication || state.authentication;
		state.assertionMethod = input?.assertionMethod || state.assertionMethod;
		state.keyAgreement = input?.keyAgreement || state.keyAgreement;
		state.capabilityInvocation = input?.capabilityInvocation || state.capabilityInvocation;
		state.capabilityDelegation = input?.capabilityDelegation || state.capabilityDelegation;
		state.service = input?.service || state.service;
	}

	return { state };
}
