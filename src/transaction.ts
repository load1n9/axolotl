export class Transaction {
    public constructor(
        public amount: number,
        public payer: string,
        public payee: string
    ) {}

    public toString():string {
        return JSON.stringify(this);
    }
}