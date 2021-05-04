import { Chain } from './src/chain';
import { Wallet } from './src/wallet';

let system = new Wallet();
let user1 = new Wallet();

system.sendMoney(10, user1.publicKey);
system.sendNFT('df9f5282067d1cb10b983d0f6b11a1db99f974e554834aee94b588b2ea28b556', user1.publicKey);

console.log(user1.balance);
