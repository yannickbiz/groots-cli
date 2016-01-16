var
    fs = require('fs'),
    path = require('path'),
    yesno = require('yesno'),
    exec = require('child_process').exec,
    Git = require('nodegit');

module.exports =  (url, dirName) => {

    var repository;

    fs.access(dirName, fs.F_OK, (err) => {

        if (!err) {

            yesno.ask('Groots already exists. Do you want to update ? (Y/n)', true, (ok) => {

                if (ok) {
                    var repo = Git.Repository.open(path.resolve(dirName))
                        .then((repo) => {
                            repository = repo;
                            console.log('fetching...');
                            return repository.fetchAll({}, true);
                        })
                        .then(() => {
                            console.log('updating...');
                            repository.mergeBranches("master", "origin/master");
                        })
                        .then(() => {
                            console.log('Groots has been updated');
                            process.exit(1);
                        })
                        .catch((err) => { console.log(err); });

                    return repo;
                } else {
                    console.log('Not updating !');
                    process.exit(1);
                }

            });

        } else {
            console.log(`Cloning ${dirName} from ${url}...`);
            repo = Git.Clone(url, dirName, null)
                .then(() => {
                    console.log(`running 'npm install' in ${dirName} directory.`);

                    var child = exec(`cd ${dirName} && npm install`, (err, stdout, stderr) => {
                        console.log('stdout: ' + stdout);
                        console.log('stderr: ' + stderr);
                        if (err !== null) {
                            console.log('exec error: ' + err);
                        }
                    });
                })
                .catch((err) => { console.log(err); });

            return repo;
        }



    });
};