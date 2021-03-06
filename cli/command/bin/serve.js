const chalk = require('chalk');
const { projectCheck, rocketLog, spawnGatsby } = require('../../utils/processes');

const serve = async () => {

    // exit if not inside project
    if(!projectCheck()) return;

    rocketLog("Starting production server...");
    await spawnGatsby('serve', '--host=0.0.0.0');
}

module.exports = serve;