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

  await client.login("ODE2MzcxODY0MTU4MDc2OTk4.YD5_iw.enhQ7wToyg3Y7vhjA9iZ-f6lMa8");
}
start()