const { VolumeInterface } = require('discord.js');
const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji } = require('discord.js');
const client = require('../../index');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Veja a fila de músicas."),
        
    async execute(interaction){
        const { options, member, guild, channel } = interaction;
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

            const queuesongs = queue.songs.map(
                (song, id) => `\n*${id + 1}.* ${song.name} - \`${song.formattedDuration}\``
            );
            
            embed.setColor("Purple").setDescription(`${queuesongs.toString().length > 4096 ? "Lista de musicas muito grande, use o **/playing** para obter informações da música atual..." : queuesongs}`);
            
            return interaction.reply({ embeds: [embed], ephemeral: true });
            
        } catch(err){
            console.log(err);

            embed.setColor("Red").setDescription("⛔ | Algo deu errado...");

            return interaction.reply({ embeds: [embed], ephemeral: true });
            
        }
    }
}