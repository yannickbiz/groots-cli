#!/usr/bin/env node

const
    packageJson = require(`./package.json`),
    APP_NAME = `groots`,
    APP_REPO = `http://git.globaliadev.com/globalia/frontend-app.git`;

var
    fs = require(`fs`),
    _ = require(`underscore`),
    cl = require(`./modules/cl`)(), // formatted command line passed
    build = require(`./modules/build`); // build commands

if (_.contains(cl.flags, `-v`) || _.contains(cl.flags, `--version`) && cl.cmd === null && cl.subcmd === null) {

console.log(`
~~~~~~~~~~~~~~~~~~
${APP_NAME} ${packageJson.version}
Brought to you by ${packageJson.author}
~~~~~~~~~~~~~~~~~~
`);

} else if (_.contains(cl.flags, `-h`) || _.contains(cl.flags, `--help`) && cl.cmd === null && cl.subcmd === null) {

console.log(`
Here's a list of ${APP_NAME}'s commands you can execute:
    -v --version    outputs the current ${APP_NAME} version
    install         installs the current version of ${APP_NAME}
    update          updates the current version of ${APP_NAME}
    uninstall       uninstalls ${APP_NAME}
`);

} else if (cl.cmd === `install`) {

    if (_.contains(cl.flags, `-flag`)) {

        console.log(`flag test pass`);

    } else if (_.isEmpty(cl.flags)) {

        build.install(APP_REPO, APP_NAME);

    }

} else if (cl.cmd === `update`) {

    if (_.contains(cl.flags, `-js`)) {

        console.log(`updating javascript modules...`);

    } else if (_.contains(cl.flags, `-scss`)) {

        console.log(`updating scss components...`);

    } else if (_.isEmpty(cl.flags)) {

        build.update(APP_REPO, APP_NAME);

    }

} else if (cl.cmd === `uninstall`) {

    build.uninstall(APP_NAME);

} else if (typeof cl.cmd === 'undefined') {

    console.log(`${APP_NAME}: no such command type '${APP_NAME} -h' or '${APP_NAME} --help' for a list of commands.`);

} else {

    console.log(`${APP_NAME}: no such command type '${APP_NAME} -h' or '${APP_NAME} --help' for a list of commands.`);

}