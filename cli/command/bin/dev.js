const process = require('process');
const path = require('path');
const chalk = require('chalk');
const chokidar = require('chokidar');
const { projectCheck, rocketLog, spawnGatsby, devDir, gatsbyOutputDir } = require('../../utils/processes');
const yamlayout = require('yamlayout');

const defaults = {
    input: "dev",
    outputDir: "build/src"
}

const compileProject = async (args = defaults) => await yamlayout.build(args);

const gatsbyDevelop = async (public = false) => {
    const developArgs = public ? ['--host=0.0.0.0'] : [];
    await spawnGatsby('develop', ...developArgs);
}

const dev = async(public = false) => {

    // exit if not inside project
    // clean
    if(!projectCheck()) return;
    await spawnGatsby('clean');

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