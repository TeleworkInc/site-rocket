const build = require('./build');
const serve = require('./serve');
const { projectCheck } = require('../../utils/processes');

const prod = async () => {

    // exit if not inside project
    if(!projectCheck()) return;

    await build();
    await serve();
}

module.exports = prod;