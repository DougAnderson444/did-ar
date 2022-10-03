export async function handle(state, action) {
	const id = state.id;
	const input = action.input;
	const caller = action.caller;

	if (input.function === 'create') {
		// check if the caller is the owner
		// if (caller !== SmartWeave.contract.owner) {
		// 	throw new ContractError('Only the owner can create a claim');
		// }

		// set DID id to did:ar:contractTxId by setting state.id to contractTxId
		state.id = `did:ar:${action.input.id}`;
	}

	return { state };
}
