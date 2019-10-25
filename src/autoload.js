const version = require('./version.js');
const ehre = require('./ehre');
const spenden = require('./spenden');
const fordern = require('./fordern');
const hug = require('./do_stuff/hug');
const bite = require('./do_stuff/bite');

module.exports = {
    version: version.version,
    ehre: ehre.ehre,
    spenden: spenden.spenden,
    fordern: fordern.fordern,
    hug: hug.hug,
    bite: bite.bite,
};