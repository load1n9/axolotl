import * as crypto from 'crypto';
import { BaseTransaction } from './transaction';

export class Block {
    public nonce = Math.round(Math.random() * 999999999);
  
    constructor(
      public prevHash: string, 
      public transaction: BaseTransaction, 
      public ts = Date.now()
    ) {}
  
    get hash() {
      const str = JSON.stringify(this);
      const hash = crypto.createHash('SHA256');
      hash.update(str).end();
      return hash.digest('hex');
    }
}
