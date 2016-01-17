var
    fs = require('fs');

module.exports = {

    fileExists: (file, successCb, failCb) => {

        fs.access(file, fs.F_OK, (err) => {

            if (!err) {

                successCb();

            } else {

                failCb();

            }

        });

    }

};