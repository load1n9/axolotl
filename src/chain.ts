import { RSA } from "https://deno.land/x/god_crypto/rsa.ts";
import { createHash } from 'https://deno.land/std@0.95.0/hash/mod.ts';
import { Block } from "./block.ts";
import { Transaction } from "./transaction.ts";

export class Chain {
    
    public static instance = new Chain();
    chain: Block[];

    constructor() {
        this.chain = [new Block(null, new Transaction(1000000000, "genesis", "ara"))]

    }

    get lastBlock() {
        return this.chain[this.chain.length - 1]
    }

    mine(nonce: number) {
        let solution = 1;
        console.log(`⛏️  mining...`)
        while (true) {
            const hash = createHash("md5")
            hash.update((nonce + solution).toString())

            const attempt = hash.digest().toString()

            if (attempt.substr(0,4) == '0000') {
                console.log(`Solved: ${solution}`)
                return solution
            }

            solution++
        }
    }

    public async addBlock(transaction: Transaction, senderPublicKey: any, signature: any) {
        const verifier = new RSA(senderPublicKey);
        await verifier.verify(signature, transaction.toString(), { algorithm: "rsassa-pkcs1-v1_5", hash: "sha256" });
        const isValid = verifier.verify(senderPublicKey, signature)

        if (isValid) {
            const newBlock = new Block(this.lastBlock.hash, transaction)
            this.mine(newBlock.nonce)
            this.chain.push(newBlock)
        }


    }
}
