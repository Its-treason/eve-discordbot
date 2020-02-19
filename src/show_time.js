module.exports = {
    show_time: function (message, fs, RichEmbed) {
        let time = require(__dirname + "/../data/time.json"); // include time file

        let user_id = message.author.id;
        let username = message.author.username;
        if (message.mentions.users.first() !== undefined) {
            user_id = message.mentions.users.first().id;
            username = message.mentions.users.first().username;
        }

        Date.prototype.getWeek = function() {
            var onejan = new Date(this.getFullYear(),0,1);
            var today = new Date(this.getFullYear(),this.getMonth(),this.getDate());
            var dayOfYear = ((today - onejan + 86400000)/86400000);
            return Math.ceil(dayOfYear/7)
        };
        let date = new Date();

        if (time[user_id] === undefined) {
            time[user_id] = {};

            time[user_id].all = 0;
            time[user_id].month = 0;
            time[user_id].month_note = date.getMonth() + "-" + date.getFullYear();
            time[user_id].week = 0;
            time[user_id].week_note = date.getWeek() + "-" + date.getFullYear();

            fs.writeFile(__dirname + "/../data/time.json", JSON.stringify(time), (err) => {
                if (err) console.log(err);
            });
        }

        if (time[user_id].week_note !== date.getWeek() + "-" + date.getFullYear()) {
            time[user_id].week = 0;
        }

        if (time[user_id].month_note !== date.getMonth() + "-" + date.getFullYear()) {
            time[user_id].Month = 0;
        }

        let time_all = time[user_id].all;
        let time_week = time[user_id].week;
        let time_month = time[user_id].month;

        let time_all_secs = time_all % 60;
        let time_all_mins = Math.round(time_all / 60) % 60;
        let time_all_hour = Math.round(time_all / 3600) % 600;
        let time_all_days = Math.round(time_all / 86400);

        let time_all_string = time_all_days + " Tage, " + time_all_hour + " Stunden, " +
             time_all_mins + " Minuten und " + time_all_secs + " Sekunden";

        let time_month_secs = time_month % 60;
        let time_month_mins = Math.round(time_month / 60) % 60;
        let time_month_hour = Math.round(time_month / 3600) % 600;
        let time_month_days = Math.round(time_month / 86400);

        let time_month_string = time_month_days + " Tage, " + time_month_hour +
            " Stunden, " + time_month_mins + " Minuten und " + time_month_secs + " Sekunden";

        let time_week_secs = time_week % 60;
        let time_week_mins = Math.round(time_week / 60) % 60;
        let time_week_hour = Math.round(time_week / 3600) % 600;
        let time_week_days = Math.round(time_week / 86400);

        let time_week_string = time_week_days + " Tage, " + time_week_hour +
            " Stunden, " + time_week_mins + " Minuten und " + time_week_secs + " Sekunden";

        const embed = new RichEmbed()
            .setColor('#0000FF')
            .setTitle('Zeit im Channel von: ' + username)
            .addField('Gesamt', time_all_string)
            .addField('Monat', time_month_string)
            .addField('Woche', time_week_string);
        message.channel.send(embed);
        console.log('[ OK ] ' + message.author.username + ' checked his time')
    }
}
