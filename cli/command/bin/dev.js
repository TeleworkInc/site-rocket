const process = require('process');
const path = require('path');
const chalk = require('chalk');
const chokidar = require('chokidar');
const { projectCheck, rocketLog, spawnGatsby, devDir, gatsbyOutputDir } = require('../../utils/processes');
const yamlayout = require('yamlayout');

const compileProject = async () => await yamlayout.build();

const gatsbyDevelop = async (public = false) => {
    const developArgs = public ? ['--host=0.0.0.0'] : [];
    await spawnGatsby('develop', ...developArgs);
}

const dev = async(public = false) => {

    // exit if not inside project
    if(!projectCheck()) return;

    chokidar
        .watch(devDir, {
            ignoreInitial: true,
        })
        .on('all', compileProject);

    rocketLog("Preparing development bundle...");

    await compileProject();
    await gatsbyDevelop(public);
    
}

module.exports = dev;