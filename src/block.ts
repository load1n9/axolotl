import * as crypto from "crypto"
import { Transaction } from "./transaction"

export class Block {
    public nonce: bigint = BigInt(`0x${crypto.randomBytes(64).toString('hex')}`)
    public start: string = crypto.randomBytes(2).toString('hex')
    constructor(
        public prevHash: any,
        public transaction: Transaction,
        public ts = Date.now()
    ) {}

    get hash() {
        const str = JSON.stringify(this)
        const hash = crypto.createHash('SHA3-256')
        hash.update(str).end()
        return hash.digest('hex')
    }
}
