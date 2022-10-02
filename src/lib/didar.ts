import * as WarpSdk from 'warp-contracts';

export class DIDAr {
    warp: WarpSdk.Warp;
    wallet: JWKInterface;

    constructor(config = { dev: true, wallet: null }) {
        // default config is mainnet
        if(!config?.wallet) throw new Error("Wallet required as param")
        this.wallet = config.wallet

        this.warp = config?.dev ?
            WarpSdk.WarpFactory.forLocal()
            : WarpSdk.WarpFactory.forMainnet()
    }

    async deploy(){
        const { contractTxId, srcTxId } = await this.warp.createContract.deploy({
            wallet,
            initState: {}, // no state needed, we're just saving the source code
            data: {},
            src: contractSrc,
            tags
          });
    }

    async create(srcTx) {
        // deploy the DID contract, 
        // then use it to set the initial state to DID Doc
        // with RSA and Ed25519 keys set
        let initState = makeDIDDoc({RSAPublicKey, Ed25519PublicKey});


        // Subsequent users can use the srcTxId and save a step 
        if(srcTx) {
            const { contractTxId } = await this.warp.createContract.deployFromSourceTx({
                wallet: this.wallet,
                initState: initialState,
                srcTxId: srcTx
              });
        }

    }
}