const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require('../../Settings/config.json');

module.exports = {
    name: 'clear',
    description: 'Belirtilen sayıda mesajı siler',
    aliases: ['temizle', 'sil'],
    async execute(message, args) {
        // Kullanıcının mesajları yönetme yetkisi olup olmadığını kontrol et
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.reply('❌ Bu komutu kullanmak için mesajları yönetme yetkisine sahip olmalısınız!');
        }

        const amount = parseInt(args[0]);

        if (isNaN(amount) || amount < 1 || amount > 100) {
            return message.reply('❌ Lütfen 1-100 arasında geçerli bir sayı girin!');
        }

        try {
            // Önce komut mesajını sil
            await message.delete();
            
            // Belirtilen sayıda mesajı sil
            const deleted = await message.channel.bulkDelete(amount, true);
            
            // Onay mesajı gönder
            const embed = new EmbedBuilder()
                .setColor(config.embedColor)
                .setTitle('🗑️ Mesajlar Silindi')
                .setDescription(`${deleted.size} mesaj başarıyla silindi!`)
                .setTimestamp();
                
            const confirmationMsg = await message.channel.send({ embeds: [embed] });
            
            // Onay mesajını 5 saniye sonra sil
            setTimeout(() => {
                confirmationMsg.delete().catch(() => {});
            }, 5000);
            
        } catch (error) {
            console.error(error);
            // Hata mesajını yeni bir mesaj olarak gönder (reply yerine)
            const errorMsg = await message.channel.send('❌ Mesajları silerken bir hata oluştu!');
            
            // Hata mesajını 5 saniye sonra sil
            setTimeout(() => {
                errorMsg.delete().catch(() => {});
            }, 5000);
        }
    },
}; 