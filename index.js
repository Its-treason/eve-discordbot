const {Client, RichEmbed, ClientUser} = require('discord.js');
const fs = require("fs");

const client = new Client();
let ehre = require("./ehre.json"); // include ehre file
const prefix = '?'; // set prefix

// login the Client
client.login('NjA1NDI2Nzg5Mzk2Nzc0OTEy.XaMFgA.zC5VjNTSY64SUE3scUsrjfMC65Q').then(r => {
    console.log('[INFO] Login token is: ' + r)
}).catch( e => {
    console.log('[FAIL] Is the login token wrong?');
    console.log('[INFO] Program will be stopped!');
});

// Ready Event
client.on('ready', () => {
    console.log('[ OK ] I am ready!');
    client.user.setActivity('Jederzeit für sie da!', { type: '',}).then(r => {
        console.log('[ OK ] Bot activity is set to: ' + r.game.name)
    });
});


// @Function: Ehre Überprüfen
client.on(`message`, message => {
    message.content = message.content.toLowerCase();
    if (message.content.startsWith(prefix + 'ehre')) {
        if (!ehre[message.author.id]) {
            ehre[message.author.id] = {
                ehre: 100
            };
            fs.writeFile("./ehre.json", JSON.stringify(ehre), (err) => {
                if (err) console.log(err);
            });
        }
        message.channel.send(`Du hast  **${ehre[message.author.id].ehre}**<:Ehre:604620906014179328>`);
        console.log('[ OK ] User' + message.author.username + 'checked his ehre')
    }
});


// @Function: Ehre spenden
client.on("message", message => {
    message.content = message.content.toLowerCase();
    if (message.content.startsWith(prefix + 'spenden')) {
        const str = message.content.split(" ");
        const mention = message.mentions.users.first();
        if (!message.guild.member(mention)) {
            message.channel.send("Syntaxfehler: Der User ist entweder kein Mitglied auf dem Server oder existiert nicht. Der Syntax für !spenden ist der folgende: ```!spenden [@User#1234] [Ehre(Zahl)]```");
            return;
        }
        let number = parseInt(str[2]);
        if (isNaN(number)) number = parseInt(str[3]);
        if (isNaN(number)) number = parseInt(str[4]);
        if (isNaN(number)) number = parseInt(str[5]);
        if (isNaN(number)) {
            message.channel.send("Syntaxfehler: Anzahl ist keine Zahl. Der Syntax für !spenden ist der folgende: ```!spenden [@User#1234] [Ehre(Zahl)]```");
            return;
        }
        if (message.guild.member(mention)) {
            if (!ehre[message.author.id]) {
                ehre[message.author.id] = {
                    ehre: 100
                };
                fs.writeFile("./ehre.json", JSON.stringify(ehre), (err) => {
                    if (err) console.log(err);
                });
            }
            let i = ehre[message.author.id].ehre - number;

            if (i < 0) { //Weil man nicht unter 0 Ehre fallen soll
                message.channel.send("Du hast nicht genug Ehre");
                console.log('[FAIL] ' + message.author.id + ' hat nicht genug ehre! ' + number)
            } else { //dem spender die ehre nehmen
                ehre[message.author.id] = {
                    ehre: ehre[message.author.id].ehre - number
                };
                fs.writeFile("./ehre.json", JSON.stringify(ehre), (err) => {
                    if (err) console.log(err);
                });
                if (!ehre[mention.id]) {
                    ehre[mention.id] = {
                        ehre: 100
                    };
                    fs.writeFile("./ehre.json", JSON.stringify(ehre), (err) => {
                        if (err) console.log(err);
                    });
                }
                ehre[mention.id] = {
                    ehre: ehre[mention.id].ehre + number
                };
                fs.writeFile("./ehre.json", JSON.stringify(ehre), (err) => {
                    if (err) console.log(err);
                });
                message.channel.send(`Du hast ${number}<:Ehre:604620906014179328>an <@${mention.id}> gespendet`);
                console.log('[ OK ] ' + message.author.username + ' hat ' + mention.username + ' ' + number + ' Ehre gespendet')
            }
        }
    }
});


// @Function: Ehre fordern
client.on("message", message => {
    message.content = message.content.toLowerCase();
    if (message.content.startsWith(prefix + "fordern")) {
        if (message.author.id !== '373882633089843210' || message.author.id !== '404341487845900288') {
            message.channel.send("Nur Marko darf dies tun");
            console.log('[FAIL] ' + message.author.username + ' hat versucht Ehre zu fordern');
            return;
        }
        const str = message.content.split(" ");
        const mention = message.mentions.users.first();
        let number = parseInt(str[2]);
        if (isNaN(number)) number = parseInt(str[3]);
        if (isNaN(number)) number = parseInt(str[4]);
        if (isNaN(number)) number = parseInt(str[5]);
        if (isNaN(number)) {
            message.channel.send("Syntaxfehler: Anzahl ist keine Zahl. der Systax für !spenden ist der folgende: ```!spenden [@User#1234] [Ehre(Zahl)]```");
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
            message.channel.send(`Du hast ${number}<:Ehre:604620906014179328> von <@${mention.id}> genommen`);
            console.log('[ OK ] ' + message.author.username + ' hat ' + mention.username + ' ' + number + ' Ehre genommen');
        }
    }
});

// @Function: get version
client.on('message', message => {
    message.content = message.content.toLowerCase();
    if(message.content.startsWith(prefix + 'version' || prefix + 'help')) {
       const embed = new RichEmbed()
           .setColor('blue')
           .setTitle('EVE Version: 1.0.0')
           .setDescription('Created by Timon Schünemann')
           .addBlankField()
           .setThumbnail('https://cdn.discordapp.com/app-icons/605426789396774912/c7d8ad657013c2ca5dc8ddf4ee8df7af.png?size=512')
           .addField('Befehle', 'Folgende Befehle sind verfügbar:')
           .addField('!ehre', 'Gibt deine Ehre aus')
           .addField('!spenden [@user#1337] [Anzahl]','Spendet Ehre an den erwähnten Benutzer')
           .addField('!fordern [@user#1337] [Anzahl]', 'Fordert Ehre von dem erwähnten Benutzer')
           .addField('!version', 'Gibt dies aus');
       message.channel.send(embed);
       console.log('[ OK ] ' + message.author.username + ' hat die Version abgefragt (EVE v1.0)');
   }
});
