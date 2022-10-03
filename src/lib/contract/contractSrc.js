export async function handle(state, action) {
	const id = state.id;
	const input = action.input;
	const caller = action.caller;

	if (caller !== SmartWeave.contract.owner) {
		return { state };
	}

	if (input.function === 'create' && !state.id) {
		state.id = `did:ar:${action.input.id}`;
	}

	if (input.function === 'update') {
		if (action.input.verificationMethod) {
			state.verificationMethod = action.input.verificationMethod;
		}
	}

	return { state };
}
