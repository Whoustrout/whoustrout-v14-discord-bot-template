# 🤖 Whoustrout Discord Bot Template

Bu Discord bot şablonu, Discord.js v14 kullanılarak oluşturulmuş modern ve kullanıcı dostu bir bot altyapısıdır.

## ✨ Özellikler

- ✅ **Prefix Komut Sistemi** - `!komut` formatında kolay kullanım
- ✅ **Modüler Handler Sistemi** - Ayrı command, event ve message handler'ları
- ✅ **Event Sistemi** - Modüler ve genişletilebilir event yönetimi
- ✅ **Modüler Yapı** - Kolay geliştirme ve bakım
- ✅ **Embed Mesajlar** - Güzel görünümlü yanıtlar
- ✅ **Hata Yönetimi** - Güvenli ve stabil çalışma
- ✅ **Alias Desteği** - Komutlar için kısayollar
- ✅ **Türkçe Destek** - Tam Türkçe arayüz ve mesajlar

## 🚀 Kurulum

### Gereksinimler
- **Node.js** 16.9.0 veya üzeri
- **Discord Bot Token** (Discord Developer Portal'dan)
- **Git** (opsiyonel)

### Adım Adım Kurulum

#### 1. Projeyi İndirin
```bash
git clone https://github.com/your-username/discord-bot-template.git
cd discord-bot-template
```

#### 2. Bağımlılıkları Yükleyin
```bash
npm i
```

#### 3. Konfigürasyonu Düzenleyin
`Src/Settings/config.json` dosyasını açın ve aşağıdaki bilgileri girin:

```json
{
  "token": "Bot Tokeni",
  "clientId": "Bot IDsi",
  "guildId": "Sunucu IDsi",
  "prefix": "!",
  "embedColor": "#0099ff"
}
```

#### 4. Discord Developer Portal'dan Bilgileri Alın
1. [Discord Developer Portal](https://discord.com/developers/applications) adresine gidin
2. **"New Application"** butonuna tıklayın
3. Bot için bir isim verin ve **"Create"** butonuna tıklayın
4. **"General Information"** sekmesinden **"Application ID"**'yi kopyalayın
5. Sol menüden **"Bot"** sekmesine gidin
6. **"Token"** bölümünden token'ı kopyalayın
7. Gerekli izinleri aktif edin:
   - Send Messages
   - Manage Messages
   - Embed Links
   - Read Message History
   - Use Slash Commands

#### 5. Botu Çalıştırın
```bash
node .
```

## 📋 Mevcut Komutlar

### 🎯 Genel Komutlar
|   Komut   |          Kısayollar          |                Açıklama                |
|-----------|------------------------------|----------------------------------------|
|  `!ping`  |             `!p`             |        Bot gecikmesini gösterir        |
|  `!help`  | `!h`, `!komutlar`, `!yardım` |         Tüm komutları listeler         |
|  `!info`  |   `!bilgi`, `!serverinfo`    |   Sunucu ve bot bilgilerini gösterir   |
| `!avatar` |         `!av`, `!pp`         |     Kullanıcının avatarını gösterir    |

### 🛡️ Admin Komutları
|   Komut   |          Kısayollar          |                Açıklama                |
|-----------|------------------------------|----------------------------------------|
|  `!clear` |      `!temizle`, `!sil`      | Belirtilen sayıda mesajı siler (1-100) |

## 📁 Proje Yapısı

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ WhoustroutBot/                                     ┃
┃ ├── app.js                  # Ana bot dosyası      ┃
┃ ├── package.json            # Proje bağımlılıkları ┃
┃ ├── README.md               # Bu dosya             ┃
┃ └── Src/                                           ┃
┃     ├── Commands/          # Komut klasörleri      ┃
┃     │   ├── General/       # Genel komutlar        ┃
┃     │   │   ├── ping.js                            ┃
┃     │   │   ├── help.js                            ┃
┃     │   │   ├── info.js                            ┃
┃     │   │   └── avatar.js                          ┃
┃     │   └── Admin/         # Admin komutları       ┃
┃     │       └── clear.js                           ┃
┃     ├── Events/            # Event dosyaları       ┃
┃     │   ├── ready.js                               ┃
┃     │   └── messageCreate.js                       ┃
┃     ├── Handlers/          # Handler dosyaları     ┃
┃     │   ├── commandHandler.js                      ┃
┃     │   ├── eventHandler.js                        ┃
┃     │   └── messageHandler.js                      ┃
┃     ├── Settings/          # Ayarlar               ┃
┃     │   └── config.json    # Bot konfigürasyonu    ┃
┃     └── Databases/         # Veritabanı dosyaları  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

## 🔧 Handler Sistemi

### Command Handler (`Src/Handlers/commandHandler.js`)
- Tüm komutları otomatik olarak yükler
- Komut dosyalarını kontrol eder
- Hata durumlarını raporlar
- Yüklenen komut sayısını gösterir

### Event Handler (`Src/Handlers/eventHandler.js`)
- Tüm event dosyalarını otomatik olarak yükler
- Once ve normal event'leri ayırt eder
- Yüklenen event sayısını gösterir

### Message Handler (`Src/Handlers/messageHandler.js`)
- Prefix komutlarını işler
- Alias'ları kontrol eder
- Hata yönetimi sağlar

## 🔧 Yeni Komut Ekleme

### 1. Komut Dosyası Oluşturun
`Src/Commands/General/` klasörüne yeni bir `.js` dosyası oluşturun.

> **Not:** İsterseniz `Src/Commands/` klasöründe yeni bir alt klasör (örneğin `Moderation`, `Register` gibi) oluşturarak komutlarınızı kategorilere ayırabilirsiniz. Her kategori için ayrı bir klasör açıp, ilgili komut dosyalarını o klasöre ekleyebilirsiniz. Bot, tüm alt klasörlerdeki komutları otomatik olarak yükler.

### 2. Komut Yapısı
```javascript
const { EmbedBuilder } = require('discord.js');
const config = require('../../Settings/config.json');

module.exports = {
    name: 'komutadi',
    description: 'Komut açıklaması',
    aliases: ['kısayol1', 'kısayol2'], // Opsiyonel
    async execute(message, args) {
        // Komut kodu buraya
        await message.reply('Komut çalıştı!');
    },
};
```

### 3. Örnek Komut
```javascript
const { EmbedBuilder } = require('discord.js');
const config = require('../../Settings/config.json');

module.exports = {
    name: 'merhaba',
    description: 'Kullanıcıyı selamlar',
    aliases: ['selam', 'hi'],
    async execute(message, args) {
        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setTitle('👋 Merhaba!')
            .setDescription(`Selam ${message.author.username}!`)
            .setTimestamp();
            
        await message.reply({ embeds: [embed] });
    },
};
```

## 🎭 Yeni Event Ekleme

### 1. Event Dosyası Oluşturun
`Src/Events/` klasörüne yeni bir `.js` dosyası oluşturun.

### 2. Event Yapısı
```javascript
const { Events } = require('discord.js');

module.exports = {
    name: Events.EventName,
    once: false, // veya true (bir kez çalışması için)
    execute(client) {
        // Event kodu buraya
    },
};
```

### 3. Örnek Event
```javascript
const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        const channel = member.guild.channels.cache.find(ch => ch.name === 'hoşgeldin');
        if (channel) {
            await channel.send(`🎉 ${member.user.username} sunucuya katıldı!`);
        }
    },
};
```

## ⚙️ Konfigürasyon

### Prefix Değiştirme
`Src/Settings/config.json` dosyasındaki `prefix` değerini değiştirin:

```json
{
  "prefix": "!"
}
```

### Embed Rengi Değiştirme
```json
{
  "embedColor": "#ff0000"
}
```

## 🐛 Sorun Giderme

### Bot Çalışmıyor
1. Token'ın doğru olduğundan emin olun
2. Node.js sürümünün 16.9.0+ olduğunu kontrol edin
3. `npm install` komutunu çalıştırdığınızdan emin olun

### Komutlar Çalışmıyor
1. Prefix'in doğru olduğunu kontrol edin
2. Bot'un mesaj okuma yetkisi olduğundan emin olun
3. Konsol hatalarını kontrol edin

### Handler Hataları
1. Handler dosyalarının doğru konumda olduğunu kontrol edin
2. Dosya isimlerinin doğru olduğundan emin olun
3. Konsol çıktılarını kontrol edin

### Mesaj Silme Hatası
1. Bot'un "Manage Messages" yetkisi olduğundan emin olun
2. Bot'un kendi mesajlarını silebilmesi için yetki verin

## 📝 Lisans

Bu proje **MIT License** altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## 📞 Destek

Destek için profilimdeki başta Discord olmak üzere sosyal medya hesaplarından bana ulaşabilirsiniz!

## 🙏 Teşekkürler

Bu bot şablonunu kullandığınız için teşekkürler! 

**Geliştirici:** Whoustrout  
**Versiyon:** 1.0.0  
**Son Güncelleme:** 2025 