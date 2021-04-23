import { createHash } from 'https://deno.land/std@0.95.0/hash/mod.ts';
import { Transaction } from "./transaction.ts";
import randomBytes from 'https://deno.land/std@0.95.0/node/_crypto/randomBytes.ts';

export class Block {
    public nonce = parseInt(randomBytes(64).toString("hex"), 16)
    constructor(
        public prevHash: any,
        public transaction: Transaction,
        public ts = Date.now()
    ) {}


    get hash() {
        const str = JSON.stringify(this)
        const hash = createHash('sha256')
        hash.update(str)
        return hash.digest()
    }
}
