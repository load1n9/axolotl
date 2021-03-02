"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chain = void 0;
const crypto = require("crypto");
const block_1 = require("./block");
const transaction_1 = require("./transaction");
class Chain {
    constructor() {
        this.chain = [new block_1.Block(null, new transaction_1.Transaction(1000000000, "genesis", "ara"))];
    }
    get lastBlock() {
        return this.chain[this.chain.length - 1];
    }
    mine(nonce) {
        let solution = 1;
        console.log(`⛏️  mining...`);
        while (true) {
            const hash = crypto.createHash("md5");
            hash.update((nonce + solution).toString()).end();
            const attempt = hash.digest('hex');
            if (attempt.substr(0, 4) == '0000') {
                console.log(`Solved: ${solution}`);
                return solution;
            }
            solution++;
        }
    }
    addBlock(transaction, senderPublicKey, signature) {
        const verifier = crypto.createVerify('SHA256');
        verifier.update(transaction.toString());
        const isValid = verifier.verify(senderPublicKey, signature);
        if (isValid) {
            const newBlock = new block_1.Block(this.lastBlock.hash, transaction);
            this.mine(newBlock.nonce);
            this.chain.push(newBlock);
        }
    }
}
exports.Chain = Chain;
Chain.instance = new Chain();
//# sourceMappingURL=chain.js.map