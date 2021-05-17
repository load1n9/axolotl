import { Chain } from './chain';
import { Wallet } from './wallet';


let db:any = {

}



export const root:any = {
    getChain: () => {
        return JSON.stringify(Chain.instance.chain)
    },

    getLatestBlock: () => {
        return JSON.stringify(Chain.instance.chain[Chain.instance.chain.length-1])
    },
    createWallet: () => {
        let test = new Wallet();

        db[test.publicKey] = test

        return test.publicKey

    },

    getBalance: ({publicKey}) => {
        return db[publicKey].balance
    },
    sendMoney: ({selfKey, p2Key, amount}) => {
        return db[selfKey].sendMoney(amount,p2Key)
    }
};

