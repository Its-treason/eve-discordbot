module.exports = {
    fordern: function (message, fs, ehre, RichEmbed) {
        if (message.author.id !== '373882633089843210' || message.author.id !== '404341487845900288') {
            const embed = new RichEmbed()
                .setColor('#FF0000')
                .setTitle('Fehler')
                .setDescription('Du Marko darf dies tun!');
            message.channel.send(embed);
            console.log('[FAIL] ' + message.author.username + ' tried to demand honer');
            return;
        }
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
            //Hat Mention Ehre?
            if (!ehre[mention.id]) {
                ehre[mention.id] = {
                    ehre: 100
                };
                fs.writeFile("./ehre.json", JSON.stringify(ehre), (err) => {
                    if (err) console.log(err);
                });
            }
            //Hat der Autor Ehre?
            if (!ehre[message.author.id]) {
                ehre[message.author.id] = {
                    ehre: 100
                };
                fs.writeFile("./ehre.json", JSON.stringify(ehre), (err) => {
                    if (err) console.log(err);
                });
            }
            ehre[message.author.id] = {
                ehre: ehre[message.author.id].ehre + number
            };
            fs.writeFile("./ehre.json", JSON.stringify(ehre), (err) => {
                if (err) console.log(err);
            });
            ehre[mention.id] = {
                ehre: ehre[mention.id].ehre - number
            };
            fs.writeFile("./ehre.json", JSON.stringify(ehre), (err) => {
                if (err) console.log(err);
            });
            const embed = new RichEmbed()
                .setColor('#0000FF')
                .setTitle('Du hast erfolgreich ' + number + '<:Ehre:604620906014179328> von ' + mention.username + ' gommen');
            message.channel.send(embed);
            console.log('[ OK ] ' + message.author.username + ' hat ' + mention.username + ' ' + number + ' Ehre genommen');
        }
    }
};