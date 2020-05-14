const program = require('commander');
const process = require('process');
const intro = require('./utils/intro');

const { build, prod, create, dev, serve, clean } = require('./command');

const setupCommands = () => {

    // $ site-rocket create telework-landing

    program
        .command('create <name>')
        .description('Create a new site.')
        .action(create);

    program
        .command('dev')
        .description('Start the development server.')
        .action(dev);

    program
        .command('prod')
        .description('Build and run the production server.')
        .action(prod);

    program
        .command('build')
        .description(`Build the optimized project.`)
        .action(build);

    program
        .command('serve')
        .description('Start the production server.')
        .action(serve);

    program
        .command('clean')
        .description('Clean up project, including cached files.')
        .action(clean);

    program.parse(process.argv);
    console.log('');

}

module.exports = {

    init: () => {
        intro.show();
        setupCommands();
    }

}