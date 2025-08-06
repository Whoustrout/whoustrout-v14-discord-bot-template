const { EmbedBuilder } = require('discord.js');
const config = require('../../Settings/config.json');

module.exports = {
    name: 'info',
    description: 'Sunucu ve bot bilgilerini gösterir',
    aliases: ['bilgi', 'serverinfo'],
    async execute(message, args) {
        const guild = message.guild;
        const bot = message.client;
        
        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setTitle('📊 Sunucu Bilgileri')
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: 'Sunucu Adı', value: guild.name, inline: true },
                { name: 'Sunucu ID', value: guild.id, inline: true },
                { name: 'Sahip', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'Üye Sayısı', value: `${guild.memberCount}`, inline: true },
                { name: 'Kanal Sayısı', value: `${guild.channels.cache.size}`, inline: true },
                { name: 'Rol Sayısı', value: `${guild.roles.cache.size}`, inline: true },
                { name: 'Oluşturulma Tarihi', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`, inline: false },
                { name: 'Bot Gecikmesi', value: `${Math.round(bot.ws.ping)}ms`, inline: true },
                { name: 'Çalışma Süresi', value: `${Math.floor(bot.uptime / 60000)} dakika`, inline: true }
            )
            .setTimestamp();
            
        await message.reply({ embeds: [embed] });
    },
}; 