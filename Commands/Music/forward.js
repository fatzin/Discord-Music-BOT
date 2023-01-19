const { VolumeInterface } = require('discord.js');
const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji } = require('discord.js');
const client = require('../../index');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("forward")
    .setDescription("Passe segundos para frente de uma música.")
    .addIntegerOption(option =>
        option.setName("seconds")
        .setDescription("Tempo em segundos para a frente. (10 = 10s)")
        .setMinValue(0)
        .setRequired(true)
    ),
        
    async execute(interaction){
        const { member, guild, options } = interaction;
        const seconds = options.getInteger("seconds");
        const voiceChannel = member.voice.channel;

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
            const queue = await client.distube.getQueue(voiceChannel);
                    
            if(!queue){
                embed.setColor("Red").setDescription("Não há fila ativa.");
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }
            
            await queue.seek(queue.currentTime + seconds);
            embed.setColor("Orange").setDescription(`⏩ A musica foi avançada em ${seconds} segundos.`);
            return interaction.reply({ embeds: [embed], ephemeral: true });
            
        } catch(err){
            console.log(err);

            embed.setColor("Red").setDescription("⛔ | Algo deu errado...");

            return interaction.reply({ embeds: [embed], ephemeral: true });
            
        }
    }
}