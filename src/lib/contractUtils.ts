// https://github.com/ArweaveTeam/SmartWeave/blob/4d09c66d832091805f583ba73e8da96cde2c0190/src/contract-interact.ts#L291
// not exported by arweave-js, so re-written here
export async function createTx(
	contractId: string,
	input: any,
	tags?: { name: string; value: string }[] = [],
	target?: string = '',
	winstonQty?: string = '0',
	reward?: string
): Promise<Transaction> {
	const options: Partial<CreateTransactionInterface> = {
		data: Math.random().toString().slice(-4),
		reward
	};

	if (target && target.length) {
		options.target = target.toString();
		if (winstonQty && +winstonQty > 0) {
			options.quantity = winstonQty.toString();
		}
	}

	const interactionTx = await this.arweave.createTransaction(options, this.wallet);

	if (!input) {
		throw new Error(`Input should be a truthy value: ${JSON.stringify(input)}`);
	}

	if (tags && tags.length) {
		for (const tag of tags) {
			interactionTx.addTag(tag.name.toString(), tag.value.toString());
		}
	}
	interactionTx.addTag('App-Name', 'SmartWeaveAction');
	interactionTx.addTag('App-Version', '0.3.0');
	interactionTx.addTag('Contract', contractId);
	interactionTx.addTag('Input', JSON.stringify(input));

	try {
		const id = await this.post(interactionTx);
		console.log(`Posted interaction tx`, { interactionTx }, { id }, interactionTx.id === id);
		return id;
	} catch (error) {
		throw new Error(`Error posting transaction: ${error}`);
	}
}

/**
 * Updates an existing Areave Contract with a new state.ardagtxid
 */
// export async function updateContract(ardagtxid: string): Promise<void> {
// 	// Create, Sign, Post
// 	const tx = await this.createTx(this.contractId, { function: 'ArDagTx', ardagtxid });
// 	await this.arweave.transactions.sign(tx, this.wallet);
// 	await this.post(tx);
// }

// smartweave without the post
/**
 * Create a new contract from a contract source file and an initial state.
 * Returns the contract id.
 *
 * @param arweave       an Arweave client instance
 * @param wallet        a wallet private or public key
 * @param contractSrc   the contract source as string.
 * @param initState     the contract initial state, as a JSON string.
 */
export async function createContract(
	arweave: Arweave,
	wallet: JWKInterface | 'use_wallet',
	contractSrc: string,
	initState: string,
	reward?: string
): Promise<string> {
	const srcTx = await arweave.createTransaction({ data: contractSrc, reward }, wallet);

	srcTx.addTag('App-Name', 'SmartWeaveContractSource');
	srcTx.addTag('App-Version', '0.3.0');
	srcTx.addTag('Content-Type', 'application/javascript');

	// post does: sign & post
	const id = await this.post(srcTx);

	try {
		const contractTxId = await this.createContractFromTx(arweave, wallet, id, initState);
		return { contractTxId, srcTxId: srcTx.id };
	} catch {
		// return new Error(`Unable to write Contract Source: ${JSON.stringify(response ?? '')}`);
	}
}

/**
 * Create a new contract from an existing contract source tx, with an initial state.
 * Returns the contract id.
 *
 * @param arweave   an Arweave client instance
 * @param wallet    a wallet private or public key
 * @param srcTxId   the contract source Tx id.
 * @param state     the initial state, as a JSON string.
 * @param tags          an array of tags with name/value as objects.
 * @param target        if needed to send AR to an address, this is the target.
 * @param winstonQty    amount of winston to send to the target, if needed.
 */
export async function createContractFromTx(
	arweave: Arweave,
	wallet: JWKInterface | 'use_wallet',
	srcTxId: string,
	state: string,
	tags: { name: string; value: string }[] = [],
	target: string = '',
	winstonQty: string = '',
	reward?: string
): Promise<string> {
	let contractTX = await arweave.createTransaction({ data: state, reward }, wallet);
	let address = await arweave.wallets.jwkToAddress(wallet);

	if (target && winstonQty && target.length && +winstonQty > 0) {
		contractTX = await arweave.createTransaction(
			{
				data: state,
				target: target.toString(),
				quantity: winstonQty.toString(),
				reward
			},
			wallet
		);
	}

	if (tags && tags.length) {
		for (const tag of tags) {
			contractTX.addTag(tag.name.toString(), tag.value.toString());
		}
	}
	contractTX.addTag('DID-AR', 'True');
	contractTX.addTag('DID-AR-Owner', address);

	contractTX.addTag('App-Name', 'SmartWeaveContract');
	contractTX.addTag('App-Version', '0.3.0');
	contractTX.addTag('Contract-Src', srcTxId);
	contractTX.addTag('Content-Type', 'application/json');

	try {
		const id = await this.post(contractTX);
		return id;
	} catch (error) {
		// return new Error('Unable to write Contract Initial State', error);
	}
}
