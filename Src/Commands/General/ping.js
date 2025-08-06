const { EmbedBuilder } = require('discord.js');
const config = require('../../Settings/config.json');

module.exports = {
    name: 'ping',
    description: 'Bot gecikmesini gösterir',
    aliases: ['p'],
    async execute(message, args) {
        const sent = await message.reply('Ping ölçülüyor...');
        const latency = sent.createdTimestamp - message.createdTimestamp;
        
        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setTitle('🏓 Pong!')
            .addFields(
                { name: 'Bot Gecikmesi', value: `${latency}ms`, inline: true },
                { name: 'API Gecikmesi', value: `${Math.round(message.client.ws.ping)}ms`, inline: true }
            )
            .setTimestamp();
            
        await sent.edit({ content: null, embeds: [embed] });
    },
}; 