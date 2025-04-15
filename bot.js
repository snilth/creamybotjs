import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';

import { joinVC } from './commands/join.js';
import { sayInVC } from './commands/say.js';
import { getVoiceConnection } from '@discordjs/voice';


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.once('ready', () => {
    console.log('---------------------------------');
    console.log(`${client.user.tag} is now online!`);
    console.log('---------------------------------');
});


const sayChId = process.env.SAY_CHANNEL_ID;
client.on('messageCreate', message => {
    if (message.content === '!ping') {
        message.reply('🏓 Pong!');
    }

    if (message.content === '!join') {
        joinVC(message);
    }

    if (message.channel.id === sayChId) {
        if (message.author.bot) return;

        const connection = getVoiceConnection(message.guild.id);
            if (!connection) {
                return message.reply('i need to be in a vc first. can someone use !join to summon me?');
            }

        const text = message.content.trim();
        if (text) {
            sayInVC(message, text);
        }
    }

});

client.login(process.env.BOT_TOKEN);
