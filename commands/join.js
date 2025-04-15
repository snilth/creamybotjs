import { joinVoiceChannel } from '@discordjs/voice';

export function joinVC(message) {
    const vc = message.member?.voice.channel;

    if (!vc) {
        return message.reply('u need to join a vc first.');
    }

    joinVoiceChannel({
        channelId: vc.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
    });

    message.reply(`creamy has joined ${vc.name}`);
}
