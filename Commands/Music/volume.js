const { VolumeInterface } = require('discord.js');
const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji } = require('discord.js');
const client = require('../../index');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Altere o volume do bot.")
    .addIntegerOption(option=>
        option.setName("porcentagem")
            .setDescription("10 = 10%")
            .setMinValue(1)
            .setMaxValue(100)
            .setRequired(true)
    ),    
    async execute(interaction){
        const { member, guild, options } = interaction;
        const voiceChannel = member.voice.channel;
        const volume = options.getInteger("porcentagem");
        const embed = new EmbedBuilder();

        if(!voiceChannel){
            embed.setColor("Red").setDescription("Voce deve estar em um canal de voz para executar comandos de musica.");
            return interaction.reply({ embeds: [embed], ephemeral: true});
        }
        if(!member.voice.channelId == guild.members.me.voice.channelId){
            embed.setColor("Red").setDescription(`Voce não pode usar o tocador de musica se já está ativo em ${guild.members.me.voice.channelId}.`);
            return interaction.reply({ embeds: [embed], ephemeral: true});
        }

        try{

            client.distube.setVolume(voiceChannel, volume);
            return interaction.reply({ content: `🔉 Volume alterado para ${volume}%.` });
            
        } catch(err){
            console.log(err);

            embed.setColor("Red").setDescription("⛔ | Algo deu errado...");

            return interaction.reply({ embeds: [embed], ephemeral: true });
            
        }
    }
}