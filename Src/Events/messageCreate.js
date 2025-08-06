const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        // Bot mesajlarını yoksay
        if (message.author.bot) return;
        
        // Buraya ek mesaj işleme mantığı ekleyebilirsiniz
        // Örneğin: karşılama mesajları, otomatik moderasyon, vb.
        
        // Örnek: "merhaba" mesajlarına yanıt ver
        if (message.content.toLowerCase().includes('merhaba') || 
            message.content.toLowerCase().includes('selam')) {
            await message.reply('Merhaba! Ben bir Discord botuyum! 🖐️');
        }
        
        // Örnek: "nasılsın" mesajlarına yanıt ver
        if (message.content.toLowerCase().includes('nasılsın') || 
            message.content.toLowerCase().includes('naber')) {
            await message.reply('İyiyim, teşekkürler! Sen nasılsın? 😊');
        }
    },
}; 