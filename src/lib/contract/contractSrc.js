export async function handle(state, action) {
	const input = action.input;
	const caller = action.caller;

	if (caller !== SmartWeave.contract.owner) {
		return { state };
	}

	if (input.function === 'create' && !state.id) {
		if (!input.id.startsWith('did:ar')) {
			throw new ContractError('Invalid ID');
		}
		state.id = input.id;
	}

	if (input.function === 'update') {
		if (action.input.verificationMethod) {
			// verify that action.input.verificationMethod is an array
			if (
				!Array.isArray(action.input.verificationMethod) ||
				action.input.verificationMethod.length == 0
			) {
				throw new ContractError('verificationMethod must be an array with at least one method');
			}
			state.verificationMethod = action.input.verificationMethod;
		}
		state.authentication = action.input.authentication;
		state.assertionMethod = action.input.assertionMethod;
		state.keyAgreement = action.input.keyAgreement;
		state.capabilityInvocation = action.input.capabilityInvocation;
		state.capabilityDelegation = action.input.capabilityDelegation;
		state.service = action.input.service;
	}

	return { state };
}
