const { EmbedBuilder } = require('discord.js');
const config = require('../../Settings/config.json');

module.exports = {
    name: 'help',
    description: 'Tüm komutları gösterir',
    aliases: ['h', 'komutlar', 'yardım'],
    async execute(message, args) {
        const commands = message.client.commands;
        
        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setTitle('🤖 Bot Komutları')
            .setDescription('İşte tüm mevcut komutlar:')
            .setTimestamp();
            
        const categories = new Map();
        
        commands.forEach(command => {
            const category = command.name.includes('admin') ? 'Admin' : 'Genel';
            if (!categories.has(category)) {
                categories.set(category, []);
            }
            categories.get(category).push(command);
        });
        
        categories.forEach((commands, category) => {
            const commandList = commands.map(cmd => {
                const aliases = cmd.aliases ? ` (${cmd.aliases.join(', ')})` : '';
                return `**${config.prefix}${cmd.name}**${aliases} - ${cmd.description}`;
            }).join('\n');
            
            embed.addFields({
                name: `${category} Komutları`,
                value: commandList,
                inline: false
            });
        });
        
        await message.reply({ embeds: [embed] });
    },
}; 