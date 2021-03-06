import { Chain } from "./src/chain"
import { Wallet } from "./src/wallet"
import {
    Discord,
    On,
    Client,
    Command,
    CommandMessage,
    CommandNotFound,
    Description
} from "@typeit/discord"

import { MessageAttachment, MessageEmbed } from "discord.js"

let data: any = {}

let system = new Wallet()

let commands = `$createwallet - Generate wallet
$chain - Show chain
$mine - Mine blocks
$sendmoney <amount> <user mention> - Send money to another user
$help - Show this message`
let help_message = 'My prefix is `$`\n' + '```' + commands + '```'

@Discord('$')
abstract class AppDiscord {
    @Command('createwallet')
    private createwallet(message: CommandMessage) {
        try {
            data[(message.author.id).toString()] = {}
            data[(message.author.id).toString()].wallet = new Wallet()
            let attachment = new MessageAttachment(Buffer.from(data[(message.author.id).toString()].wallet.publicKey, 'utf-8'), 'wallet.pem')
            message.channel.send('Created a new wallet', attachment)
        } catch (e) { }
    }

    @Command('chain')
    private chain(message: CommandMessage) {
        try {
            let attachment = new MessageAttachment(Buffer.from(JSON.stringify(Chain.instance), 'utf-8'), 'chain.txt')
            message.channel.send(JSON.stringify(Chain.instance.lastBlock))
            message.channel.send('Full chain', attachment)
        } catch (e) {
            message.channel.send('Weird, something went wrong')
        }
    }

    @Command('mine')
    private mine(message: CommandMessage) {
        try {
            message.channel.send(':pick:️ Mining...').then((msg) => {
                system.sendMoney(0.0001, data[(message.author.id).toString()].wallet.publicKey)
                msg.edit(`:pick:️ <@${message.author.id}> Mined 0.0001 ara`)
            });
        } catch (e) {
            message.channel.send('You do not have a wallet. Create one with the $createwallet command')
            console.log(e)
        }
    }

    @Command('sendmoney')
    private sendmoney(message: CommandMessage) {
        try {
            let msg: any = message.content.split(' ')
            data[(message.author.id).toString()].wallet.sendMoney(msg[1].toString(), data[msg[2]].wallet.publicKey)
            message.channel.send(`Sent ${msg[1]} ara to ${msg[2]} successfully`)
        } catch (e) {
            message.channel.send('You do not have a wallet. Create one with the $createwallet command')
        }
    }

    @Command('help')
    @Description('Show the help message')
    private help(message: CommandMessage) {
        message.channel.send(help_message)
    }

    @CommandNotFound()
    private notFound(message: CommandMessage) { }
}
