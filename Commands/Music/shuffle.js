const { VolumeInterface } = require('discord.js');
const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji } = require('discord.js');
const client = require('../../index');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("🔀 Ativar o modo ordem aleatória."),
        
    async execute(interaction){
        const { member, guild } = interaction;
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
            await queue.shuffle();
            embed.setColor("Purple").setDescription(`🔀 Modo ordem aleatória ativado `);
            return interaction.reply({ embeds: [embed], ephemeral: true });
            
        } catch(err){
            console.log(err);

            embed.setColor("Red").setDescription("⛔ | Algo deu errado...");

            return interaction.reply({ embeds: [embed], ephemeral: true });
            
        }
    }
}