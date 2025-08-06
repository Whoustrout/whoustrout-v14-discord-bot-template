const { Events, ActivityFlags, Activity } = require('discord.js');
const config = require('../Settings/config.json');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        const fs = require('fs');
        const path = require('path');

        // Get bot name from package.json
        let botName = 'Bot';
        try {
            const pkg = require(path.join(__dirname, '..', 'package.json'));
            botName = pkg.name || botName;
        } catch (e) {}

        // Helper to pad and align columns
        function pad(str, len) {
            str = String(str);
            return str + ' '.repeat(Math.max(0, len - str.length));
        }

        // Gather commands
        const commandsDir = path.join(__dirname, '..', 'Commands');
        let commandRows = [];
        try {
            const categories = fs.readdirSync(commandsDir).filter(f => fs.statSync(path.join(commandsDir, f)).isDirectory());
            for (const category of categories) {
                const categoryPath = path.join(commandsDir, category);
                const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.js'));
                for (const file of files) {
                    let commandName = file.replace('.js', '');
                    try {
                        const cmd = require(path.join(categoryPath, file));
                        commandName = cmd.name || commandName;
                    } catch {}
                    commandRows.push({ category, commandName });
                }
            }
        } catch {}

        // Gather events
        const eventsDir = path.join(__dirname);
        let eventRows = [];
        try {
            const files = fs.readdirSync(eventsDir).filter(f => f.endsWith('.js') && f !== 'ready.js');
            for (const file of files) {
                let eventName = file.replace('.js', '');
                try {
                    const evt = require(path.join(eventsDir, file));
                    eventName = evt.name || eventName;
                } catch {}
                eventRows.push({ file: file, eventName });
            }
        } catch {}

        // Calculate column widths
        const catCol = Math.max(10, ...commandRows.map(r => r.category.length));
        const cmdCol = Math.max(10, ...commandRows.map(r => r.commandName.length));
        const evtFileCol = Math.max(10, ...eventRows.map(r => r.file.length));
        const evtNameCol = Math.max(10, ...eventRows.map(r => r.eventName.length));

        // Print fancy table
        console.log('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓');
        console.log(`┃ ${botName.toUpperCase().padEnd(48)}     ┃`);
        console.log('┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫');
        console.log('┃ Komutlar                                             ┃');
        console.log('┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫');
        if (commandRows.length > 0) {
            console.log(`┃ ${pad('Klasör', catCol)} │ ${pad('Komut', cmdCol)} │ Durum                      ┃`);
            console.log(`┣${'━'.repeat(catCol+2)}┿${'━'.repeat(cmdCol+2)}┿━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫`);
            for (const row of commandRows) {
                console.log(`┃ ${pad(row.category, catCol)} │ ${pad(row.commandName, cmdCol)} │ Yüklendi                   ┃`);
            }
        } else {
            console.log('┃ Komut bulunamadı.                                   ┃');
        }
        console.log('┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫');
        console.log('┃ Eventler                                             ┃');
        console.log('┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫');
        // ready.js dahil tüm event dosyalarını (alt klasörler dahil) bulmak için recursive fonksiyon
        function getAllEventFiles(dir) {
            let results = [];
            const list = fs.readdirSync(dir);
            for (const file of list) {
                const filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);
                if (stat && stat.isDirectory()) {
                    results = results.concat(getAllEventFiles(filePath));
                } else if (file.endsWith('.js')) {
                    results.push(path.relative(eventsDir, filePath));
                }
            }
            return results;
        }

        const allEventFiles = getAllEventFiles(eventsDir);
        if (allEventFiles.length > 0) {
            const evtFileCol = Math.max(10, ...allEventFiles.map(f => f.length));
            console.log(`┃ ${pad('Dosya', evtFileCol)} │ Durum                             ┃`);
            console.log(`┣${'━'.repeat(evtFileCol+2)}┿━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫`);
            for (const file of allEventFiles) {
                console.log(`┃ ${pad(file, evtFileCol)} │ Yüklendi                          ┃`);
            }
        } else {
            console.log('┃ Event bulunamadı.                                   ┃');
        }
        console.log('┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫');
        console.log(`┃ ${'Bot hazır!'.padEnd(48)}     ┃`);
        console.log('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛');
        
        // Set bot status
        client.user.setPresence({
            activities: [{ name: 'Developed by Whoustrout', type: 0 }],
            status: config.status
        });
    },
}; 