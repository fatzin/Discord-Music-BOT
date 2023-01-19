
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const client = require('../../index');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("Mostra as opções do comando de loop.")
    .addStringOption(option =>
        option.setName("options")
        .setDescription("Loop options: off, musica, queue")
        .addChoices(
            { name: "off", value: "off" },
            { name: "musica", value: "musica" },
            { name: "queue", value: "queue" },
        )
        .setRequired(true)
    ),
        
    async execute(interaction){
        const { member, guild, options } = interaction;
        const option = options.getString("options");
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
            
            let mode = null;
            switch(option){
                case "off":
                    mode = 0;
                    break;
                case "musica":
                    mode = 1;
                    break;
                case "queue":
                    mode = 2;
                    break;
            }
            
            mode = await queue.setRepeatMode(mode);

            mode = mode? (mode === 2? "Repetir a fila" : "Repetir a musica") : "Off";

            embed.setColor("Orange").setDescription(`🔁 Modo repetição setado para \`${mode}\`.`);
            return interaction.reply({ embeds: [embed], ephemeral: true });
        } catch(err){
            console.log(err);

            embed.setColor("Red").setDescription("⛔ | Algo deu errado...");

            return interaction.reply({ embeds: [embed], ephemeral: true });
            
        }
    }
}