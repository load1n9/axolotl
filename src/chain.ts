import { Block } from './block';
import { BaseTransaction, FTokenTransaction, NFTokenTransaction } from './transaction';
import * as crypto from 'crypto';

export class Chain {
    public static instance = new Chain();

    chain: Block[];

    constructor() {
      this.chain = [
        new Block('', new FTokenTransaction(100, 'genesis', 'satoshi')),
        new Block('', new NFTokenTransaction('weirdo', {'some': 'object'}, 'genesis', 'satoshi'))
      ];
    }

    get lastBlock() {
      return this.chain[this.chain.length - 1];
    }

    mine(nonce: number) {
      let solution = 1;
      console.log('⛏️  mining...')

      var hash: crypto.Hash | null;
      var attempt: string | null = null;
      while (true) {
        hash = crypto.createHash('SHA256');
        hash.update((nonce + solution).toString()).end();

        attempt = hash.digest('hex');

        if (attempt.substr(0, 4) === '0000'){
          console.log(`Solved: ${solution}`);
          return solution;
        }
        attempt = null;
        hash = null;

        solution += 1;
      }
    }

    addBlock(transaction: BaseTransaction, senderPublicKey: string, signature: Buffer) {
      const verify = crypto.createVerify('SHA256');
      verify.update(transaction.toString());

      const isValid = verify.verify(senderPublicKey, signature);

      if (isValid) {
        const newBlock = new Block(this.lastBlock.hash, transaction);
        this.mine(newBlock.nonce);
        this.chain.push(newBlock);
      }
    }
}
