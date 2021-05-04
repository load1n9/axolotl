import { Chain } from "./src/chain"
import { Wallet } from "./src/wallet"




let system = new Wallet()
let user1 = new Wallet()


system.sendMoney(10,user1.publicKey)

console.log(Chain.instance.chain[1].transaction)


console.log(user1.balance)