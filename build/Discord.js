"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chain_1 = require("./src/chain");
const wallet_1 = require("./src/wallet");
const discord_1 = require("@typeit/discord");
const discord_js_1 = require("discord.js");
let data = {};
let system = new wallet_1.Wallet();
let AppDiscord = class AppDiscord {
    createwallet(message) {
        try {
            data[(message.author.id).toString()] = {};
            data[(message.author.id).toString()].wallet = new wallet_1.Wallet();
            let attachment = new discord_js_1.MessageAttachment(Buffer.from(data[(message.author.id).toString()].wallet.publicKey, 'utf-8'), 'wallet.pem');
            message.channel.send('created a new wallet', attachment);
        }
        catch (e) { }
    }
    chain(message) {
        try {
            let attachment = new discord_js_1.MessageAttachment(Buffer.from(JSON.stringify(chain_1.Chain.instance), 'utf-8'), 'chain.txt');
            message.channel.send(JSON.stringify(chain_1.Chain.instance.lastBlock));
            message.channel.send(`full chain`, attachment);
        }
        catch (e) {
            message.channel.send("weird, something went wrong");
        }
    }
    mine(message) {
        try {
            system.sendMoney(0.0001, data[(message.author.id).toString()].wallet.publicKey);
            message.channel.send("⛏️ mined 0.0001 ara");
        }
        catch (e) {
            message.channel.send("you do not have a wallet create one with the $createwallet command");
        }
    }
    sendmoney(message) {
        try {
            let msg = message.content.split(" ");
            data[(message.author.id).toString()].wallet.sendMoney(msg[1].toString(), data[msg[2]].wallet.publicKey);
            message.channel.send(`sent ${msg[1]} ara to ${msg[2]} successfully `);
        }
        catch (e) {
            message.channel.send("you do not have a wallet create one with the $createwallet command");
        }
    }
    notFound(message) {
    }
};
tslib_1.__decorate([
    discord_1.Command("createwallet"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [discord_1.CommandMessage]),
    tslib_1.__metadata("design:returntype", void 0)
], AppDiscord.prototype, "createwallet", null);
tslib_1.__decorate([
    discord_1.Command("chain"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [discord_1.CommandMessage]),
    tslib_1.__metadata("design:returntype", void 0)
], AppDiscord.prototype, "chain", null);
tslib_1.__decorate([
    discord_1.Command("mine"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [discord_1.CommandMessage]),
    tslib_1.__metadata("design:returntype", void 0)
], AppDiscord.prototype, "mine", null);
tslib_1.__decorate([
    discord_1.Command("sendmoney"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [discord_1.CommandMessage]),
    tslib_1.__metadata("design:returntype", void 0)
], AppDiscord.prototype, "sendmoney", null);
tslib_1.__decorate([
    discord_1.CommandNotFound(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [discord_1.CommandMessage]),
    tslib_1.__metadata("design:returntype", void 0)
], AppDiscord.prototype, "notFound", null);
AppDiscord = tslib_1.__decorate([
    discord_1.Discord("$")
], AppDiscord);
//# sourceMappingURL=Discord.js.map