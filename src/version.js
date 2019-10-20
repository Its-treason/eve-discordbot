module.exports = {
    version: function version(RichEmbed, message) {
        const embed = new RichEmbed()
            .setColor('#0000FF')
            .setTitle('EVE Version: 1.1.0')
            .setDescription('Created by Timon Schünemann')
            .setThumbnail('https://cdn.discordapp.com/app-icons/605426789396774912/c7d8ad657013c2ca5dc8ddf4ee8df7af.png?size=512')
        message.channel.send(embed);
        console.log('[ OK ] ' + message.author.username + ' checked version (EVE v1.1.0)');
    }
}
