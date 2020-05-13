const fs = require('fs-extra');
const path = require('path');
const touch = require('touch');
const chalk = require('chalk');

const homedir = require('os').homedir();
const configLocation = `${homedir}/.config/gatsby/config.json`;
const gatsbyConfig = fs.existsSync(configLocation) ? require(configLocation) : {};

const { rocketLog, spawn, gracefulExit, success, error } = require('../../utils/processes');

const gatsbyStarter = async(loc) => await spawn(
    'gatsby', ['new', loc, 'https://github.com/TeleworkInc/yamlayout-gatsby-starter']
);

const displaySuccess = (name) => {
    console.log('\n\n--------\nEND GATSBY LOGS\n--------\n\n');
    success('Site created at ' + chalk.bold.blue(name) + '.');

    console.log('\nYou can preview your new site with:');
    console.log(chalk.bold.blue('site-rocket dev'));

    console.log('\nOr build it with:');
    console.log(chalk.bold.blue('site-rocket build'));
    console.log('\n');

    gracefulExit();
}

const setGatsbyPMPreference = () => {

    rocketLog('Setting default package manager for Gatsby...');

    // Set package manager to yarn
    if (!('cli' in gatsbyConfig))
        gatsbyConfig.cli = {};

    const PMPreference = gatsbyConfig.cli.packageManager;
    if (PMPreference != 'yarn')
        gatsbyConfig.cli.packageManager = 'yarn';

    fs.writeFileSync(configLocation, JSON.stringify(gatsbyConfig));

    rocketLog('Gatsby package manager preference set to yarn.');
}

const setupProject = async(name) => {

    setGatsbyPMPreference();
    const projectDir = path.resolve(name);

    rocketLog("Setting up Site Rocket project structure...");
    const url = 'https://github.com/TeleworkInc/site-rocket-default.git',
        args = ['clone', '--recurse-submodules', '--depth=1', url, projectDir];

    await spawn('git', args);
    await fs.removeSync(path.resolve(projectDir, `.git`), { recursive: true })

    await touch(path.resolve(projectDir, '.rocket'));
    await gatsbyStarter(path.resolve(projectDir, 'build'));

}

const create = async(name) => {

    if (fs.existsSync(name))
        return error(' Directory ' + chalk.bold.blue(name) + ' already exists.');

    rocketLog('Setting up new project...');
    await setupProject(name);
    await displaySuccess(name);

}

module.exports = create;