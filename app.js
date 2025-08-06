const { Client, GatewayIntentBits, Collection } = require('discord.js');

// Konfigürasyonu yükle
const config = require('./Src/Settings/config.json');

// Handler'ları yükle
const commandHandler = require('./Src/Handlers/commandHandler');
const eventHandler = require('./Src/Handlers/eventHandler');
const messageHandler = require('./Src/Handlers/messageHandler');

// Gerekli intentlerle client oluştur
const Whoustrout = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// Komutlar ve eventler için koleksiyonlar
Whoustrout.commands = new Collection();
Whoustrout.events = new Collection();


// Event handler'ını yükle
eventHandler(Whoustrout);

// Komut handler'ını yükle
commandHandler(Whoustrout);

// Mesaj handler'ını yükle
messageHandler(Whoustrout);


// Discord'a giriş yap
Whoustrout.login(config.token);
