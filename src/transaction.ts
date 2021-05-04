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

export class NFTokenTransaction {
    public constructor() {

    }

    public toString():string {
        return JSON.stringify(this)
    }
}