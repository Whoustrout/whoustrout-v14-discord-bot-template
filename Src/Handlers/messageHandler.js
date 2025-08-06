const config = require('../Settings/config.json');

module.exports = (client) => {
    // Prefix komutları için mesaj event handler'ı
    client.on('messageCreate', async message => {
        if (message.author.bot) return;
        if (!message.content.startsWith(config.prefix)) return;

        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName) || 
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        try {
            await command.execute(message, args);
        } catch (error) {
            console.error(error);
            await message.reply('Komut çalıştırılırken bir hata oluştu!');
        }
    });
}; 