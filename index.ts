import { Client } from "@typeit/discord"
import * as dotenv from "dotenv"

dotenv.config()

// Polyfill
declare global {
    interface BigInt {
        toJSON(): string;
    }
}

BigInt.prototype.toJSON = function() {
    return this.toString()
}

async function start() {
    const client = new Client({
        classes: [
            `${__dirname}/*Discord.ts`, 
            `${__dirname}/*Discord.js` 
        ],
        silent: false,
        variablesChar: ':'
    });
    await client.login(process.env.TOKEN)
}

start()
