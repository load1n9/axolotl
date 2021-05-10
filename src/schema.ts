import  { buildSchema } from 'graphql';
 

export const schema = buildSchema(`
    type Query {
        getChain: String
        getLatestBlock: String
        createWallet: String
    }

    type Mutation {
        getBalance(publicKey: String): Int
    }

`);