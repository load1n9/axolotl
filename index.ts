import { Client } from "@typeit/discord";

async function start() {
  const client = new Client({
    classes: [
      `${__dirname}/*Discord.ts`, 
      `${__dirname}/*Discord.js` 
    ],
    silent: false,
    variablesChar: ":"
  });

  await client.login(process.env.TOKEN);
}
start()
