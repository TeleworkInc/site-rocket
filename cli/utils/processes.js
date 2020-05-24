const fs = require('fs');
const process = require('process');
const execa = require('execa');
const path = require('path');
const chalk = require('chalk');

const insideProject = () => fs.existsSync('.rocket');

const projectCheck = () => !insideProject()
    ? error('Not inside a Site Rocket project.')
    : true;

const gracefulExit = (code = 0) => {
    process.kill(-process.pid);
    process.exit(code);
}

const devDir = path.resolve('./dev'),
      gatsbyDir = path.resolve('./.build'),
      gatsbyOutputDir = path.resolve(gatsbyDir, 'src');

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

const spawnGatsby = async (...args) => {
    fs.mkdirSync(gatsbyDir, { recursive: true });
    process.chdir(gatsbyDir);
    await spawn('gatsby', args);
    process.chdir('..');
}

const rocketLog = msg => console.log(chalk.blue("\n[SITE ROCKET]", chalk.bold.blue(msg)));

module.exports = {
    devDir,
    gatsbyDir,
    gatsbyOutputDir,
    rocketLog,
    insideProject,
    projectCheck,
    gracefulExit,
    spawnGatsby,
    spawn,
    error,
    success,
}