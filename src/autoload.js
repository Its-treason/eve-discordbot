const version = require('./version');
const ehre = require('./ehre');
const spenden = require('./spenden');
const fordern = require('./fordern');
const count = require('./count');
const show_time = require('./show_time');
const hug = require('./do_stuff/hug');
const bite = require('./do_stuff/bite');

module.exports = {
    version: version.version,
    ehre: ehre.ehre,
    spenden: spenden.spenden,
    fordern: fordern.fordern,
    hug: hug.hug,
    bite: bite.bite,
    count: count.count,
    show_time: show_time.show_time,
};