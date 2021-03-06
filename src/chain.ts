import * as crypto from "crypto"
import { Block } from "./block"
import { Transaction } from "./transaction"

export class Chain {
    public static instance = new Chain();
    chain: Block[];

    constructor() {
        this.chain = [new Block(null, new Transaction(1000000000, 'genesis', 'ara'))]
    }

    get lastBlock() {
        return this.chain[this.chain.length - 1]
    }

    mine(nonce: bigint, start: string) {
        var solution = 1n
        console.log(`⛏️  Mining...`)

        while (true) {
            var hash = crypto.createHash('SHA3-256')
            hash.update(BigInt(nonce + solution).toString()).end()

            var attempt = hash.digest('hex')

            if (attempt.substr(0, 4) == start) {
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
            console.log(newBlock.start)
            this.mine(newBlock.nonce, newBlock.start)
            this.chain.push(newBlock)
        }
    }
}
