import { serialize, deserialize } from "./serialize/index.ts";

export class Transaction {
    constructor(
        public amount: number,
        public payer: string,
        public payee: string
    ) {}

    toString() {
        return serialize(this)
    }
}