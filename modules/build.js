var
    fs = require('fs'),
    path = require('path'),
    yesno = require('yesno'),
    exec = require('child_process').exec,
    Git = require('nodegit'),
    hlp = require('./helpers');

module.exports = {

    install: (url, dirName) => {

        hlp.fileExists(dirName, () => {

            yesno.ask(`${dirName} already exists. Do you want to update ? (Y/n)`, true, (ok) => {

                if (ok) {

                    return Git.Repository.open(path.resolve(dirName))
                        .then((repo) => {
                            repository = repo;
                            console.log(`fetching...`);
                            return repository.fetchAll({});
                        })
                        .then(() => {
                            console.log(`updating...`);
                            repository.mergeBranches(`master`, `origin/master`);
                        })
                        .then(() => {
                            console.log(`${dirName} has been updated.`);
                            process.exit(1);
                        })
                        .catch((err) => {
                            console.log(err);
                        });

                } else {

                    console.log(`Not updating !`);
                    process.exit(1);

                }

            });

        }, () => {

            console.log(`Cloning ${dirName} from ${url}...`);

            return Git.Clone(url, dirName, null)
                .then(() => {
                    console.log(`running 'npm install' in ${dirName} directory.`);

                    return exec(`cd ${dirName} && npm install`, (err, stdout, stderr) => {
                        console.log(`stdout: ${stdout}`);
                        console.log(`stderr: ${stderr}`);
                        if (err !== null) {
                            console.log(`exec error: ${err}`);
                        }
                    });
                })
                .catch((err) => {
                    console.log(err);
                });

        });

    },

    update: (url, dirName) => {

        var repository;

        hlp.fileExists(dirName, () => {

            yesno.ask(`Proceed with update ? (Y/n)`, true, (ok) => {

                if (ok) {

                    return Git.Repository.open(path.resolve(dirName))
                        .then((repo) => {
                            repository = repo;
                            console.log(`fetching...`);
                            return repository.fetchAll({}, true);
                        })
                        .then(() => {
                            console.log(`updating...`);
                            repository.mergeBranches(`master`, `origin/master`);
                        })
                        .then(() => {
                            console.log(`running 'npm install' in ${dirName} directory.`);

                            return exec(`cd ${dirName} && npm install`, (err, stdout, stderr) => {
                                console.log(`stdout: ${stdout}`);
                                console.log(`stderr: ${stderr}`);
                                if (err !== null) {
                                    console.log(`exec error: ${err}`);
                                }
                            });
                        })
                        .then(() => {
                            console.log(`${dirName} has been updated`);
                            process.exit(1);
                        })
                        .catch((err) => { console.log(err); });

                } else {

                    console.log(`Canceling update...`);
                    process.exit(1);

                }

            });

        }, () => {

            console.log(`${dirName} is not installed yet. Try running 'groots install' first.`);

        });

    },

    uninstall: (dirName) => {

        yesno.ask(`Proceed with uninstall ? (Y/n)`, true, (ok) =>{

            if (ok) {

                return exec(`rm -rf ./${dirName}`, (err, stdout, stderr) => {

                    console.log(`stdout: ${stdout}`);
                    console.log(`stderr: ${stderr}`);
                    if (err !== null) {
                        console.log(`exec error: ${err}`);
                    }
                    console.log(`${dirName} has been uninstalled.`);
                    process.exit(1);

                });

            } else {

                console.log(`Canceling uninstall...`);
                process.exit(1);

            }

        });

    }

};