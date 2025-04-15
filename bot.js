import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';

import { joinVC } from './commands/join.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log('---------------------------------');
    console.log(`${client.user.tag} is now online!`);
    console.log('---------------------------------');
});

client.on('messageCreate', message => {
    if (message.content === '!ping') {
        message.reply('🏓 Pong!');
    }

    if (message.content === '!join') {
        joinVC(message);
    }

});

client.login(process.env.BOT_TOKEN);
