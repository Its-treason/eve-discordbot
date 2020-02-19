module.exports = {
    version: function version(RichEmbed, message) {
        const embed = new RichEmbed()
            .setColor('#0000FF')
            .setTitle('EVE Version: 1.2.0')
            .setDescription('Programmiert von its-treason')
            .setThumbnail('https://cdn.discordapp.com/app-icons/605426789396774912/c7d8ad657013c2ca5dc8ddf4ee8df7af.png?size=512')
            .setURL("https://github.com/Its-treason/eve-discordbot");
        message.channel.send(embed);
        console.log('[ OK ] ' + message.author.username + ' checked version');
    }
}
