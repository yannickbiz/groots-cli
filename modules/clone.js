var
    Git = require('nodegit'),
    exec = require('child_process').exec;

module.exports =  (url, dirName) => {
    console.log(`Cloning groots from ${url}...`);

    var repo = Git.Clone(url, dirName, null)
                .then((repository) => {
                    console.log(`running 'npm install' in groots directory.`);

                    var child = exec(`cd groots && npm install`, (err, stdout, stderr) => {
                        console.log('stdout: ' + stdout);
                        console.log('stderr: ' + stderr);
                        if (err !== null) {
                            console.log('exec error: ' + err);
                        }
                    });
                })
                .catch((err) => { console.log(err); });

    return repo;
};