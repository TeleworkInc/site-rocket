const rmrf = require('rmrf');
const fs = require('fs');
const { projectCheck, rocketLog, spawnGatsby } = require('../../utils/processes');

const clean = async () => {
    if (!projectCheck() || !fs.existsSync('./.build/src')) 
        return console.log("Skipping clean: Not in project or build dir does not exist.");

    rocketLog("Cleaning project...");
    await spawnGatsby("clean");
    rmrf('./.build/src');
}

module.exports = clean;