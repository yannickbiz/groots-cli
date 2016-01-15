const
    packageJson = require('./package.json'),
    APP_NAME = packageJson.name,
    APP_REPO = packageJson.repository.url;

var
    fs = require('fs'),
    _ = require('underscore'),
    cl = require('./modules/cl')(), // formatted command line passed
    clone = require('./modules/clone'); // clone repo;

console.dir(cl);

if (cl.cmd === 'install') {

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