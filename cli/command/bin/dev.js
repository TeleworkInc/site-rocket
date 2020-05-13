const process = require('process');
const path = require('path');
const chalk = require('chalk');
const chokidar = require('chokidar');
const { rocketLog, spawnGatsby, devDir, gatsbyOutputDir } = require('../../utils/processes');
const { build, compile } = require('yamlayout');

const compileProject = async () => await build(
    devDir, { outputDir: gatsbyOutputDir }
);

const gatsbyDevelop = async (public = false) => {
    const developArgs = public ? ['--host=0.0.0.0'] : [];
    await spawnGatsby('develop', ...developArgs);
}

const dev = async(public = false) => {

    chokidar
        .watch(devDir, {
            ignoreInitial: true,
        })
        .on('all', compileProject);

    rocketLog("Preparing development bundle...");

    // console.log(chalk.bold.blue("\nPreparing development bundle."), 
    // "\nUse", chalk.bgBlue(' site-rocket build '), "to create a production build.\n");

    await compileProject();
    await gatsbyDevelop(public);
    
}

module.exports = dev;