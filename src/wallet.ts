import { FTokenTransaction, NFTokenTransaction } from './transaction';
import { Chain } from './chain';
import { STARTING_BALANCE } from './config';
import { Block } from './block'
import * as crypto from 'crypto';

export class Wallet {
    public publicKey: string;
    public privateKey: string;
  
    public constructor() {
      const keypair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
      });
  
      this.privateKey = keypair.privateKey;
      this.publicKey = keypair.publicKey;
    }
  
    public sendMoney(amount: number, payeePublicKey: string) {
      if (this.balance >= amount) {
        const transaction = new FTokenTransaction(amount, this.publicKey, payeePublicKey);
  
        const sign = crypto.createSign('SHA256');
        sign.update(transaction.toString()).end();
    
        const signature = sign.sign(this.privateKey); 
        Chain.instance.addBlock(transaction, this.publicKey, signature);
      }
    }

    public sendNFT(hash: string, payeePublicKey: string) {
      const nft = this.getNFT(hash);
      if (nft !== null) {
        const transaction = new NFTokenTransaction(nft.name, nft.desc, this.publicKey, payeePublicKey);
  
        const sign = crypto.createSign('SHA256');
        sign.update(transaction.toString()).end();
    
        const signature = sign.sign(this.privateKey); 
        Chain.instance.addBlock(transaction, this.publicKey, signature);
      }
    }

    public get balance(): number {
        let output: number = 0;
        Chain.instance.chain.forEach((block: Block) => {
            if (!(block.transaction instanceof FTokenTransaction)) {
                return;
            }
            if (block.transaction.payer === this.publicKey) {
                output -= block.transaction.amount;
            } 
            else if (block.transaction.payee === this.publicKey) {
                output += block.transaction.amount;
            }
        });
        return STARTING_BALANCE + output;
    }

    public getNFT(hash: string): NFTokenTransaction | null {
        let output: NFTokenTransaction | null = null;
        Chain.instance.chain.forEach((block: Block) => {
            if (!(block.transaction instanceof NFTokenTransaction)) {
                return;
            }
            if (block.transaction.id === hash) {
                if (block.transaction.payer === this.publicKey) {
                    output = null;
                }
                else if (block.transaction.payee === this.publicKey) {
                    output = block.transaction as NFTokenTransaction;
                }
            }
        });
        return output;
    }
}
