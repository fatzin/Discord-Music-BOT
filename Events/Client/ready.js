const { Client, ActivityType } = require('discord.js');

module.exports = {
    name: "ready",
    once: true,
    execute(client){
        console.log(`${client.user.username} esta online!`);
        try{ 
            client.user.setActivity('Use /commands para ver a lista de comandos!', { type: ActivityType.Playing });
        } catch(err){
            console.log(err);
        }
    },
};
