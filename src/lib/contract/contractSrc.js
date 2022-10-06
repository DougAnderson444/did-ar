export async function handle(state, action) {
	const input = action.input;
	const caller = action.caller;

	if (caller !== SmartWeave.contract.owner) {
		return { state };
	}

	if (input.function === 'update') {
		if (!state.id) {
			if (!input.id.startsWith('did:ar')) {
				throw new ContractError('Invalid ID');
			}
			state.id = input.id;
		}

		if (input.verificationMethod) {
			if (!Array.isArray(input.verificationMethod) || input.verificationMethod.length === 0) {
				throw new ContractError('verificationMethod must be an array with at least one method');
			}
			state.verificationMethod = input.verificationMethod;
		}
		state.authentication = input?.authentication || state.authentication;
		state.assertionMethod = input?.assertionMethod || state.assertionMethod;
		state.keyAgreement = input?.keyAgreement || state.keyAgreement;
		state.capabilityInvocation = input?.capabilityInvocation || state.capabilityInvocation;
		state.capabilityDelegation = input?.capabilityDelegation || state.capabilityDelegation;
		state.service = input?.service || state.service;
	}

	return { state };
}
