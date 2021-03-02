"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_1 = require("@typeit/discord");
async function start() {
    const client = new discord_1.Client({
        classes: [
            `${__dirname}/*Discord.ts`,
            `${__dirname}/*Discord.js`
        ],
        silent: false,
        variablesChar: ":"
    });
    await client.login("ODE2MzcxODY0MTU4MDc2OTk4.YD5_iw.enhQ7wToyg3Y7vhjA9iZ-f6lMa8");
}
start();
//# sourceMappingURL=index.js.map