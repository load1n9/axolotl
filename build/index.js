"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_1 = require("@typeit/discord");
const dotenv = require("dotenv");
dotenv.config();
async function start() {
    const client = new discord_1.Client({
        classes: [
            `${__dirname}/*Discord.ts`,
            `${__dirname}/*Discord.js`
        ],
        silent: false,
        variablesChar: ":"
    });
    await client.login(process.env.TOKEN);
}
start();
//# sourceMappingURL=index.js.map