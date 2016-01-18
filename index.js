#!/usr/bin/env node

const
    packageJson = require(`./package.json`),
    APP_NAME = `groots`,
    APP_REPO = `https://github.com/achampagnedev/submodules-test.git`;

var
    fs = require(`fs`),
    _ = require(`underscore`),
    cl = require(`./modules/cl`)(), // formatted command line passed
    build = require(`./modules/build`); // build commands

console.log(cl);

if (cl.cmd === `-v` || cl.cmd === `--version` && cl.subcmd === null) {

console.log(`~~~~~~~~~~~~~~~~~~
${APP_NAME} ${packageJson.version}
Brought to you by ${packageJson.author}
~~~~~~~~~~~~~~~~~~`);

} else if (cl.cmd === `-h` || cl.cmd === `--help` && cl.subcmd === null) {

    console.log(`${APP_NAME}: no such command type -h or --help for a list of commands.`);

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

    console.log(`${APP_NAME}: no such command type -h or --help for a list of commands.`);

} else {

    console.log(`${APP_NAME}: no such command type -h or --help for a list of commands.`);

}