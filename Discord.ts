import { Chain } from "./src/chain"
import { Wallet } from "./src/wallet"
import {
    Discord,
    On,
    Client,
    Command,
    CommandMessage,
    CommandNotFound
} from "@typeit/discord";

import { MessageAttachment, MessageEmbed } from "discord.js"

let data: any = {}

let system = new Wallet()

@Discord('$')
abstract class AppDiscord {
    @Command('createwallet')
    private createwallet(message: CommandMessage) {
        try {
            data[(message.author.id).toString()] = {}
            data[(message.author.id).toString()].wallet = new Wallet()
            let attachment = new MessageAttachment(Buffer.from(data[(message.author.id).toString()].wallet.publicKey, 'utf-8'), 'wallet.pem');
            message.channel.send('Created a new wallet', attachment);
        } catch (e) { }
    }

    @Command('chain')
    private chain(message: CommandMessage) {
        try {
            let attachment = new MessageAttachment(Buffer.from(JSON.stringify(Chain.instance), 'utf-8'), 'chain.json');
            message.channel.send(JSON.stringify(Chain.instance.lastBlock));
            message.channel.send('Full chain', attachment)
        } catch (e) {
            message.channel.send('Weird, something went wrong.')
        }
    }

    @Command('mine')
    private mine(message: CommandMessage) {
        try {
            system.sendMoney(0.0001, data[(message.author.id).toString()].wallet.publicKey)
            message.channel.send('⛏️ Mined 0.0001 ara.')
        } catch (e) {
            message.channel.send('You do not have a wallet. Create one with the $createwallet command.')
        }
    }

    @Command('sendmoney')
    private sendmoney(message: CommandMessage) {
        try {
            let msg: any = message.content.split(" ")
            data[(message.author.id).toString()].wallet.sendMoney(msg[1].toString(), data[msg[2]].wallet.publicKey)
            message.channel.send(`Sent ${msg[1]} ara to ${msg[2]} successfully.`)
        } catch (e) {
            message.channel.send('You do not have a wallet. Create one with the $createwallet command.')
        }
    }

    @CommandNotFound()
    private notFound(message: CommandMessage) {
        message.channel.send('Command not found.')
    }
}