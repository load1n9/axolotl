import  { buildSchema } from 'graphql';
 

export const schema = buildSchema(`
    type Query {
        getChain: String
        getLatestBlock: String
        createWallet: String
    }

    type Mutation {
        getBalance(publicKey: String): Int
        sendMoney(selfKey: String, p2Key:String, amount: Int ): String
    }

`);