"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const crypto = require("crypto");
class Block {
    constructor(prevHash, transaction, ts = Date.now()) {
        this.prevHash = prevHash;
        this.transaction = transaction;
        this.ts = ts;
        this.nonce = parseInt(crypto.randomBytes(64).toString("hex"), 16);
    }
    get hash() {
        const str = JSON.stringify(this);
        const hash = crypto.createHash('SHA256');
        hash.update(str).end();
        return hash.digest('hex');
    }
}
exports.Block = Block;
//# sourceMappingURL=block.js.map