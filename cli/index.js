const program = require('commander');
const process = require('process');
const chalk = require('chalk');
const intro = require('./utils/intro');

const { build, prod, create, dev, serve } = require('./command');

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

    // program
    //     .command('prod')
    //     .description('Build and run the production server.')
    //     .action(prod);

    program
        .command('build')
        .description(`Build the optimized project.`)
        .action(build);

    program
        .command('serve')
        .description('Start the production server.')
        .action(serve);

    program.parse(process.argv);
    console.log('');

}

module.exports = {

    init: () => {
        intro.show();
        setupCommands();
    }

}