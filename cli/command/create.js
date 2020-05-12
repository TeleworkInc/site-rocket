const process = require('process');
const fs = require('fs-extra');
const path = require('path');
const touch = require('touch');
const execa = require('execa');
const chalk = require('chalk');

const homedir = require('os').homedir();
const configLocation = `${homedir}/.config/gatsby/config.json`;
const gatsbyConfig = fs.existsSync(configLocation) ? require(configLocation) : {};

const { initStarter } = require('gatsby-cli/lib/init-starter');
const { BackgroundCommand, success, error, sendStatus } = require('../utils/processes');

const spawnWithArgs = (
    file,
    args,
    options
) => execa(file, args, { stdio: `inherit`, preferLocal: false, ...options });

const displaySuccess = (name) => {
    console.log('\n\n--------\nEND GATSBY LOGS\n--------\n\n');
    success('Site created at ' + chalk.bold.blue(name) + '.');

    console.log('\nYou can preview your new site with:');
    console.log(chalk.bold.blue('site-rocket dev'));

    console.log('\nOr build it with:');
    console.log(chalk.bold.blue('site-rocket build'));
    console.log('\n');

    process.exit(0);
}

const setGatsbyPMPreference = () => {
    // Check to see if gatsby cli.packageManager
    // preference is set. Set to yarn if not

    if (!('cli' in gatsbyConfig))
        gatsbyConfig.cli = {};

    const PMPreference = gatsbyConfig.cli.packageManager;
    if (PMPreference != 'yarn')
        gatsbyConfig.cli.packageManager = 'yarn';

    fs.writeFileSync(configLocation, JSON.stringify(gatsbyConfig));
}

const init = async (name) => {

    await sendStatus('settingPreferences');
    setGatsbyPMPreference();
    await sendStatus('newGatsbyProject');

    console.log("Setting up Site Rocket project structure...");    
    const url = 'https://github.com/TeleworkInc/site-rocket-default.git',
          args = ['clone', '--recurse-submodules', '--depth=1', url, name];
    
    await spawnWithArgs('git', args);
    await fs.remove(path.resolve(name, `.git`))

    await initStarter(
        'https://github.com/TeleworkInc/yamlayout-gatsby-starter', {
            'rootPath': `./${name}/build`
        }
    );

    await touch(`${name}/.rocket`);
}

process.on('message', async(msg) => {
    if (msg.command != 'run' || !msg.name) return;
    await init(msg.name);
    process.exit(1);
});

module.exports = async (name) => {

    if (fs.existsSync(name))
        return error(' Directory ' + chalk.bold.blue(name) + ' already exists.');

    console.log('Creating new site...');
    console.log('Initializing Gatsby backend...');

    const background = new BackgroundCommand('create', { name: name }).open();
    var failed = false;

    await background.send({ command: 'run', name: name });
    await background.on('message', async(msg) => {

        if (!msg.success) return;

        switch (msg.state) {
            case 'settingPreferences':
                console.log('Setting default package manager for Gatsby...');
                break;

            case 'newGatsbyProject':
                console.log(
                    `Gatsby package manager set to ${chalk.bold.blue('yarn')}. Creating project...`,
                    `\n\n--------\nGATSBY LOGS:\n--------\n`
                );
                break;
        }
    });
    await process.on('SIGINT', () => {
        failed = true;
        
        process.kill(-background.pid);
        error("Caught SIGINT! Killing child processes, including running servers.");
        
        process.exit();
    });
    await background.on('exit', async() => {
        if(!failed) displaySuccess(name);
    });

}