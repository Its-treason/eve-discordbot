module.exports = {
    count: function (fs, user, status, tmp_time) {
        if (status) {
            tmp_time[user.id] = Math.round((new Date()).getTime() / 1000);
        } else if(tmp_time[user.id] !== undefined) {
            let new_time = Math.round((new Date()).getTime() / 1000) - tmp_time[user.id];

            delete tmp_time[user.id];

            let time = require(__dirname + "/../data/time.json"); // include time file

            Date.prototype.getWeek = function() {
                var onejan = new Date(this.getFullYear(),0,1);
                var today = new Date(this.getFullYear(),this.getMonth(),this.getDate());
                var dayOfYear = ((today - onejan + 86400000)/86400000);
                return Math.ceil(dayOfYear/7)
            };
            let date = new Date();

            if (time[user.id] === undefined) {
                time[user.id] = {};

                time[user.id].all = new_time;
                time[user.id].month = new_time;
                time[user.id].month_note = date.getMonth() + "-" + date.getFullYear();
                time[user.id].week = new_time;
                time[user.id].week_note = date.getWeek() + "-" + date.getFullYear();
            } else {
                time[user.id].all += new_time;

                if (time[user.id].month_note === date.getMonth() + "-" + date.getFullYear()) {
                    time[user.id].month += new_time;
                } else {
                    time[user.id].month = new_time;
                }

                if (time[user.id].week_note === date.getWeek() + "-" + date.getFullYear()) {
                    time[user.id].week += new_time;
                } else {
                    time[user.id].week = new_time;
                }

                time[user.id].month_note = date.getMonth() + "-" + date.getFullYear();
                time[user.id].week_note = date.getWeek() + "-" + date.getFullYear();
            }

            fs.writeFile(__dirname + "/../data/time.json", JSON.stringify(time), (err) => {
                if (err) console.log(err);
            });
        }

        return tmp_time;
    }
}