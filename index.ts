import { Client } from "@typeit/discord";
import * as dotenv from "dotenv"
dotenv.config()

async function start() {
  const client = new Client({
    classes: [
      `${__dirname}/*Discord.ts`, 
      `${__dirname}/*Discord.js` 
    ],
    silent: false,
    variablesChar: ":"
  });
  console.log(`token: ${process.env.TOKEN}`)
  await client.login(process.env.TOKEN);
}
start()
