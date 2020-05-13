const child_process = require('child_process');
const fs = require('fs');
const process = require('process');
const execa = require('execa');
const path = require('path');
const gatsbyCli = require('gatsby-cli/lib/create-cli');

const chalk = require('chalk');
const insideProject = () => fs.existsSync('.rocket');

const gracefulExit = (code = 0) => {
    process.kill(-process.pid);
    process.exit(code);
}

const spawn = async(
    file,
    args,
    options
) => await execa(file, args, { stdio: `inherit`, preferLocal: false, ...options });

const error = (msg) => {
    console.log('\n', chalk.bold.red('ERROR! ') + msg, '\n');
    gracefulExit(1);
}

const success = (msg) => {
    console.log(chalk.bold.blue('SUCCESS! ') + msg);
    gracefulExit(0);
}

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
    
}

const sendStatus = async (state) => await process.send({
    success: true,
    state: state
});

module.exports = {
    BackgroundCommand,
    insideProject,
    gracefulExit,
    spawn,
    error,
    success,
    sendStatus,
    callGatsby
}