const { EmbedBuilder } = require('discord.js');
const config = require('../../Settings/config.json');

module.exports = {
    name: 'avatar',
    description: 'Kullanıcının avatarını gösterir',
    aliases: ['av', 'pp'],
    async execute(message, args) {
        const user = message.mentions.users.first() || message.author;
        
        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setTitle(`${user.username} Avatar`)
            .setImage(user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setTimestamp();
            
        await message.reply({ embeds: [embed] });
    },
}; 