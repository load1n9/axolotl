import * as crypto from 'crypto';

export class BaseTransaction {
    public constructor(
        public amount: number,
        public payer: string,
        public payee: string
    ) {}

    public toString(): string {
        return JSON.stringify(this);
    }
}

export class FTokenTransaction extends BaseTransaction {}

export class NFTokenTransaction extends BaseTransaction {
    public id: string;

    public constructor(
        public name: string,
        public desc: Object,
        public payer: string,
        public payee: string,
    ) {
        super(1, payer, payee);
        const hash = crypto.createHash('SHA256');
        const str = JSON.stringify({name, desc});
        //const random = crypto.randomBytes(64).toString("hex");
        hash.update(str).end();
        this.id = hash.digest('hex');
    }
}
//}@@${(new Date()).getTime()}//${random}`
