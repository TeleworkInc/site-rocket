const rmrf = require('rmrf');
const { projectCheck, rocketLog, spawnGatsby } = require('../../utils/processes');

const clean = async () => {
    if (!projectCheck()) return;

    rocketLog("Cleaning project...");
    await spawnGatsby("clean");
    rmrf('./.build/src');
}

module.exports = clean;