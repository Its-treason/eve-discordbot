module.exports = {
    spenden: function (message, fs, ehre, RichEmbed) {
        const str = message.content.split(" ");
        const mention = message.mentions.users.first();
        if (!message.guild.member(mention)) {
            const embed = new RichEmbed()
                .setColor('#FF0000')
                .setTitle('Fehler')
                .setDescription('Du hast niemanden erwähnt');
            message.channel.send(embed);
            console.log('[FAIL] ' + message.author.username + ' didnt mentioned someone');
            return;
        }
        let number = parseInt(str[2]);
        if (isNaN(number)) number = parseInt(str[3]);
        if (isNaN(number)) number = parseInt(str[4]);
        if (isNaN(number)) number = parseInt(str[5]);
        if (isNaN(number)) {
            const embed = new RichEmbed()
                .setColor('#FF0000')
                .setTitle('Fehler')
                .setDescription('Wert ist keine Zahl');
            message.channel.send(embed);
            console.log('[FAIL] ' + message.author.username + ' didnt wrote a number');
            return;
        }
        if (message.guild.member(mention)) {
            if (!ehre[message.author.id]) {
                ehre[message.author.id] = {
                    ehre: 100
                };
                fs.writeFile(__dirname + "/../data/ehre.json", JSON.stringify(ehre), (err) => {
                    if (err) console.log(err);
                });
            }
            let i = ehre[message.author.id].ehre - number;

            if (i < 0) { //Weil man nicht unter 0 Ehre fallen soll
                const embed = new RichEmbed()
                    .setColor('#FF0000')
                    .setTitle('Fehler')
                    .setDescription('Du hast nicht genug Ehre')
                message.channel.send(embed);
                console.log('[FAIL] ' + message.author.id + ' does not have enough honer. Try: ' + number + ' Has: ' + ehre[message.author.id])
            } else { //dem spender die ehre nehmen
                ehre[message.author.id] = {
                    ehre: ehre[message.author.id].ehre - number
                };
                fs.writeFile(__dirname + "/../data/ehre.json", JSON.stringify(ehre), (err) => {
                    if (err) console.log(err);
                });
                if (!ehre[mention.id]) {
                    ehre[mention.id] = {
                        ehre: 100
                    };
                    fs.writeFile(__dirname + "/../data/ehre.json", JSON.stringify(ehre), (err) => {
                        if (err) console.log(err);
                    });
                }
                ehre[mention.id] = {
                    ehre: ehre[mention.id].ehre + number
                };
                fs.writeFile(__dirname + "/../data/ehre.json", JSON.stringify(ehre), (err) => {
                    if (err) console.log(err);
                });
                const embed = new RichEmbed()
                    .setColor('#0000FF')
                    .setTitle('Du hast erflogreich  ' + number + '<:Ehre:604620906014179328>an ' + mention.username + ' gespendet!');
                message.channel.send(embed);
                console.log('[ OK ] ' + message.author.username + ' donated ' + number + ' honer to ' + mention.username)
            }
        }
    }
};