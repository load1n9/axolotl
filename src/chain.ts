import { createHash } from 'https://deno.land/std@0.95.0/hash/mod.ts';
import { Buffer } from 'https://deno.land/std@0.95.0/node/buffer.ts';
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
            hash.update((nonce + solution).toString()).end()

            const attempt = hash.digest('hex')

            if (attempt.substr(0,4) == '0000') {
                console.log(`Solved: ${solution}`)
                return solution
            }

            solution++
        }
    }

    addBlock(transaction: Transaction, senderPublicKey: string, signature: Buffer) {
        const verifier = crypto.createVerify('SHA256')
        verifier.update(transaction.toString())

        const isValid = verifier.verify(senderPublicKey, signature)

        if (isValid) {
            const newBlock = new Block(this.lastBlock.hash, transaction)
            this.mine(newBlock.nonce)
            this.chain.push(newBlock)
        }


    }
}
