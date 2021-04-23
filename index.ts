import { Chain } from "./src/chain.ts"
import { Wallet } from "./src/wallet.ts"




let system = new Wallet()
let user1 = new Wallet()


system.sendMoney(10,user1.publicKey)

console.log(Chain)