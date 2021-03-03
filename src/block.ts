import * as crypto from "crypto";
import { Transaction } from "./transaction";

export class Block {
    public nonce = parseInt(crypto.randomBytes(64).toString('hex'), 16)
    constructor(
        public prevHash: any,
        public transaction: Transaction,
        public ts = Date.now()
    ) {}

    get hash() {
        const str = JSON.stringify(this)
        const hash = crypto.createHash('blake2b512')
        hash.update(str).end()
        return hash.digest('hex')
    }
}
