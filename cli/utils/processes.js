const child_process = require('child_process');

const fs = require('fs');
const process = require('process');
const path = require('path');
const gatsbyCli = require('gatsby-cli/lib/create-cli');

const chalk = require('chalk');
const insideProject = () => fs.existsSync('.rocket');
const error = (msg) => console.log('\n', chalk.bold.red('ERROR! ') + msg);
const success = (msg) => console.log(chalk.bold.blue('SUCCESS! ') + msg);

class BackgroundCommand {
    constructor (cmd, args = {}) {
        this.cmd = cmd;
        this.silent = ("silent" in args) && args.silent;
        this.args = args;
    }

    open() {
        return child_process.fork(
            `${path.resolve(__dirname, '..')}/command/${this.cmd}.js`,
            this.args instanceof Array ? this.args : [this.args], 
            {
                detached: true,
                silent: this.silent
            }
        );
    }
}

const callGatsby = (cmd) => {
    // stored in PROJECT/build
    const buildDir = path.resolve(process.cwd(), 'build');
    
    process.chdir(buildDir);

    // call gatsby command
    gatsbyCli('__' + cmd);

    // process.chdir(path.resolve(buildDir, '..'));
}

const sendStatus = async (state) => await process.send({
    success: true,
    state: state
});

module.exports = {
    BackgroundCommand,
    insideProject,
    error,
    success,
    sendStatus,
    callGatsby
}