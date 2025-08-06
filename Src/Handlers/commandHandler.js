const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    // Komutları yükle
    const commandsPath = path.join(__dirname, '..', 'Commands');
    const commandFolders = fs.readdirSync(commandsPath);

    for (const folder of commandFolders) {
        const folderPath = path.join(commandsPath, folder);
        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
        
        for (const file of commandFiles) {
            const filePath = path.join(folderPath, file);
            const command = require(filePath);
            
            if ('name' in command && 'execute' in command) {
                client.commands.set(command.name, command);
            } else {
                return;
            }
        }
    }
}; 