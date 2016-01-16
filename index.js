#!/usr/bin/env node

const
    packageJson = require('./package.json'),
    APP_NAME = 'groots',
    APP_REPO = 'https://github.com/achampagnedev/submodules-test.git';

var
    fs = require('fs'),
    _ = require('underscore'),
    cl = require('./modules/cl')(), // formatted command line passed
    clone = require('./modules/clone'); // clone repo;

if (cl.cmd === '' || cl.cmd === '-v' || cl.cmd === '--version') {

console.log(`~~~~~~~~~~~~~~~~~~
Groots ${packageJson.version}
Brought to you by Globalia Inc.
~~~~~~~~~~~~~~~~~~`);

} else if (cl.cmd === 'install') {

    if (_.contains(cl.flags, '-flag')) {

        console.log('flag test pass');

    } else if (_.isEmpty(cl.flags)) {

        clone(APP_REPO, APP_NAME);

    }

} else if (cl.cmd === 'update') {

    if (_.contains(cl.flags, '-js')) {

        console.log('updating javascript modules...');

    } else if (_.contains(cl.flags, '-scss')) {

        console.log('updating scss components...');

    } else if (_.isEmpty(cl.flags)) {

        console.log('update');

    }

}