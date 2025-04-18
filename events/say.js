import { createAudioPlayer, createAudioResource, getVoiceConnection, AudioPlayerStatus } from '@discordjs/voice';
import gTTS from 'gtts';
import fs from 'fs';

const userNicknames = JSON.parse(fs.readFileSync('./userNicknames.json', 'utf8'));

export async function sayInVC(message, text) {

    const connection = getVoiceConnection(message.guild.id);

    const userId = message.author.id;
    const userName = userNicknames[userId] || message.member.displayName || message.author.username;
    const ttsMessage = `${userName} says: ${text}`;

    const gtts = new gTTS(ttsMessage, 'th');
    const filePath = './tts.mp3';

    gtts.save(filePath, (err) => {
        if (err) {
            console.error('error generating tts:', err);
            return message.reply('failed to generate tts audio.');
        }

        const player = createAudioPlayer();
        const resource = createAudioResource(filePath);
        const subscription = connection.subscribe(player);

        if (!subscription) {
            return message.reply('failed to play audio in the vc.');
        }

        player.play(resource);

        player.on(AudioPlayerStatus.Idle, () => {
            player.stop();
        });

        player.on('error', (err) => {
            console.error('error playing audio:', err);
        });

        message.reply(`"${ttsMessage}"`);
    });
}
