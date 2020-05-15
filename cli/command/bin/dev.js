const process = require('process');
const path = require('path');
const chalk = require('chalk');
const chokidar = require('chokidar');
const { projectCheck, rocketLog, spawnGatsby, devDir, gatsbyOutputDir } = require('../../utils/processes');
const yamlayout = require('yamlayout');

const compileCallback = async (type, name, stat) => await yamlayout.build({
    root: devDir,
    input: name,
    output: gatsbyOutputDir
});

const gatsbyDevelop = async () => {
    await spawnGatsby('develop', '--host=0.0.0.0');
}

const dev = async() => {

    // exit if not inside project
    // clean
    if(!projectCheck()) return;
    await spawnGatsby('clean');

    chokidar
        .watch(devDir, {
            ignoreInitial: true,
        })
        .on('all', compileCallback);

    rocketLog("Preparing development bundle...");

    await yamlayout.build({
        input: devDir,
        output: gatsbyOutputDir,
        root: devDir
    });

    await gatsbyDevelop();
    
}

module.exports = dev;