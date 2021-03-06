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

    mine(nonce: number) {
        let solution = 1
        console.log(`⛏️  Mining...`)

        while (true) {
            var hash = crypto.createHash('md5')
            hash.update((nonce + solution).toString()).end()

            var attempt = hash.digest('hex')

            console.log(attempt)

            if (attempt.substr(0, 4) == '0') {
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
