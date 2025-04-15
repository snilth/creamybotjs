import { joinVoiceChannel } from '@discordjs/voice';

export function joinVC(message) {
    const vc = message.member?.voice.channel;

    if (!vc) {
        return message.reply('u need to join a vc first.');
    }

    joinVoiceChannel({
        chId: vc.id,
        guildId: vc.guild.id,
        adapterCreator: vc.guild.voiceAdapterCreator,
    });

    message.reply(`creamy joined ${vc.name}`);
}
