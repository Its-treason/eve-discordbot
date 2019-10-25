const {Client, RichEmbed, ClientUser} = require('discord.js');
const fs = require("fs");
const { prefix, token, activity } = require('./conf.json');


const client = new Client();
let ehre = require("./ehre.json"); // include ehre file

// login the Client
client.login(token).then(r => {
    console.log('[INFO] Login token is: ' + r)
}).catch( e => {
    console.log('[FAIL] Is the login token wrong?');
    console.log('[INFO] Program will be stopped!');
});

// Ready Event
client.on('ready', () => {
    console.log('[ OK ] I am ready!');
    client.user.setActivity(activity, { type: '',}).then(r => {
        console.log('[ OK ] Bot activity is set to: ' + r.game.name)
    });
});

client.on('error' , console.error);


const functions = require('./src/autoload');


client.on(`message`, message => {
    message.content = message.content.toLowerCase();

    if (message.content.startsWith(prefix + 'ehre')) {
        functions.ehre(message, fs, ehre, RichEmbed)
    }

    if (message.content.startsWith(prefix + 'spenden')) {
        functions.spenden(message, fs, ehre, RichEmbed)
    }

    if (message.content.startsWith(prefix + 'fordern')) {
        functions.fordern(message, fs, ehre, RichEmbed)
    }

    if(message.content.startsWith(prefix + 'version' || prefix + 'help')) {
        functions.version(RichEmbed, message)
    }

    if(message.content.startsWith(prefix + 'hug')) {
        functions.hug(message, RichEmbed)
    }

    if(message.content.startsWith(prefix + 'bite')) {
        functions.bite(message, RichEmbed)
    }
});
