const program = require('commander');
const process = require('process');
const chalk = require('chalk');
const ora = require('ora');

const fs = require('fs');
const intro = require('./utils/intro');

const { insideProject, error, success } = require('./utils/processes');
const { build, create, dev, serve } = require('./command');

const setupCommands = () => {

    // $ site-rocket create telework-landing

    program
        .command('create <name>')
        .description('Create a new site.')
        .action(create);

    // $ site-rocket dev

    program
        .command('dev')
        .description('Start the development server.')
        .action(dev);

    program
        .command('serve')
        .description('Start the production server.')
        .action(serve);

    // $ site-rocket build

    program
        .command('build')
        .description('Build the optimized project with `gatsby build`.')
        .action(build);

    program.parse(process.argv);
    console.log('');

}

module.exports = {

    init: () => {
        intro.show();
        setupCommands();
    }

}