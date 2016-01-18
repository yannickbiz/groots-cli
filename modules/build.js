var
    fs = require('fs'),
    path = require('path'),
    yesno = require('yesno'),
    exec = require('child_process').exec,
    hlp = require('./helpers');

module.exports = {

    install: (url, dirName) => {

        hlp.fileExists(dirName, () => {

            console.log(`${dirName} is already installed.`);

        }, () => {

            console.log(`Cloning ${dirName} from ${url}...`);

            console.log(`running 'npm install' in ${dirName} directory.`);

            exec(`git clone ${url} ${dirName} && cd ${dirName} && npm install`, (err, stdout, stderr) => {
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                if (err !== null) {
                    console.log(`exec error: ${err}`);
                }
            });

        });

    },

    update: (url, dirName) => {

        hlp.fileExists(dirName, () => {

            yesno.ask(`Proceed with update ? (Y/n)`, true, (ok) => {

                if (ok) {

                    console.log(`Updating ${dirName} and running 'npm install'.`);

                    exec(`cd ${dirName} && git fetch --all && git pull origin master && npm install`, (err, stdout, stderr) => {
                        console.log(`${stdout}`);
                        console.log(`${stderr}`);

                        if (err !== null) {
                            console.log(`err: ${err}`);
                            process.exit(1);
                        }

                        console.log(`Updated ${dirName} from ${url}.`);
                        process.exit(1);
                        return 1;
                    });

                } else {

                    console.log(`Canceling update...`);
                    process.exit(1);
                    return 0;

                }

            });

        }, () => {

            console.log(`${dirName} is not installed yet. Try running 'groots install' first.`);
            return 0;

        });

    },

    uninstall: (dirName) => {

        hlp.fileExists(dirName, () => {

            yesno.ask(`Proceed with uninstall ? (Y/n)`, true, (ok) =>{

                if (ok) {

                    console.log(`uninstalling...`);

                    return exec(`rm -rf ./${dirName}`, (err, stdout, stderr) => {

                        if (stdout !== '') { console.log(`stdout: ${stdout}`) };
                        if (stderr !== '') { console.log(`stderr: ${stderr}`) };

                        if (err !== null) {
                            console.log(`exec error: ${err}`);
                            return 0;
                        }
                        console.log(`${dirName} has been uninstalled.`);
                        process.exit(1);
                        return 1;

                    });

                } else {

                    console.log(`Canceling uninstall...`);
                    process.exit(1);
                    return 0;

                }

            });

        }, () => {

            console.log(`${dirName} is not installed.`);
            return 0;

        });

    }

};