module.exports = {
    ehre: function (message, fs, ehre, RichEmbed) {
        if (!ehre[message.author.id]) {
            ehre[message.author.id] = {
                ehre: 100
            };
            fs.writeFile(__dirname + "/../data/ehre.json", JSON.stringify(ehre), (err) => {
                if (err) console.log(err);
            });
        }
        const embed = new RichEmbed()
            .setColor('#0000FF')
            .setTitle('Du hast ' + ehre[message.author.id].ehre + '<:Ehre:604620906014179328>');
        message.channel.send(embed);
        console.log('[ OK ] ' + message.author.username + 'checked his honer')
    }
}