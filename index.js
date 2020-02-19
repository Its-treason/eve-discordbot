const {Client, RichEmbed, ClientUser} = require('discord.js');
const fs = require("fs");
const {prefix, token, activity} = require('./conf.json');

const client = new Client();
let ehre = require("./data/ehre.json"); // include ehre file

// login the Client
client.login(token).then(token => {
    console.log('[INFO] Login token is: ' + token)
}).catch(e => {
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

let tmp_time = [];

client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;

    if(oldUserChannel === undefined && newUserChannel !== undefined) {
        let user = newMember.user;

        tmp_time = functions.count(fs, user, true, tmp_time);
    } else if(newUserChannel === undefined){
        let user = oldMember.user;

        tmp_time = functions.count(fs, user, false, tmp_time);
    }
});

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

    if(message.content.startsWith(prefix + 'time')) {
        functions.show_time(message, fs, RichEmbed)
    }
});
