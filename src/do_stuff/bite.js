module.exports = {
    bite: function (message, RichEmbed) {
        const mention = message.mentions.users.first();
        if (!message.guild.member(mention)) {
            const embed = new RichEmbed()
                .setColor('#FF0000')
                .setTitle('Fehler')
                .setDescription('Es wurde kein Benutzer erwähnt');
            message.channel.send(embed);
            console.log('[FAIL] ' + message.author.username + ' didnt mention someone');
            return;
        }
        const gifs = require('./bites');
        let gif = gifs[Math.floor(Math.random() * Math.floor(4))];
        const embed = new RichEmbed()
            .setColor('#ff63f6')
            .setTitle(message.author.username + ' bit ' + mention.username)
            .setImage(gif);
        message.channel.send(embed);
        console.log('[ OK ] ' + message.author.username + ' bit ' + mention.username)
    }
}