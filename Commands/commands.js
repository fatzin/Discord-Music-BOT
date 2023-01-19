// console.log(path.resolve(__dirname, '..', 'Music'))
//console.log(path.resolve(__dirname, '..', 'Public'))
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const ascii = require('ascii-table');
const client = require('../../index');


module.exports = {
    data: new SlashCommandBuilder()
    .setName("commands")
        .setDescription("Ver os comandos do Purity BOT."),

    async execute(interaction){
        const { options, member, guild, channel } = interaction;
        const embed = new EmbedBuilder();
        try{
            
            embed.setColor("Blue").setDescription(`**Comandos do Purity** - ***Use / antes de cada comando*** \n
            \`play\` - ***Escolha uma musica e insira um nome ou url para a musica.***\n
            \`skip\` - ***Passe para a proxima musica da fila.***\n
            \`playing\` - ***Ver a musica que está tocando agora.***\n
            \`queue\` - ***Ver a fila de músicas.***\n
            \`forward\` - ***Avançe um tempo (em segundos) de uma música.***\n
            \`loop\` - ***Mostra as opções do comando de loop.***\n
            \`rewind\` - ***Volte um tempo (em segundos) de uma música.***\n
            \`shuffle\` - ***Ativa o modo ordem aleatória.***\n
            \`stop\` - ***Parar a atividade do purity bot.***\n
            \`volume\` - ***Altere o volume do bot.***\n
            \`pause\` - ***Pause a musica.***\n
            \`resume\` - ***Despause a musica.***\n`);
            return interaction.reply({ embeds: [embed], ephemeral: true });
            
        } catch(err){
            console.log(err);

            embed.setColor("Red").setDescription("⛔ | Algo deu errado...");

            return interaction.reply({ embeds: [embed], ephemeral: true });
            
        }
    }
}

