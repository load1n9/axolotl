import * as crypto from "crypto";

export class Transaction {
    constructor(
        public amount: number,
        public payer: string,
        public payee: string
    ) {}

    toString() {
        return JSON.stringify(this)
    }
}