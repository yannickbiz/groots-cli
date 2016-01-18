module.exports = () => {

    var cmds = {
            app: null,
            executable: null,
            cmd: null,
            flags: [],
            subcmd: null
        };

    // parses process.argv into organized object
    process.argv.forEach((item, index) => {

        item = item.toLowerCase();

        if (index === 0) {

            cmds.app = item;

        } else if (index === 1) {

            cmds.executable = item;

        } else if (index === 2 || item.indexOf('-') === 0) {

            cmds.cmd = item;

        } else if (item.indexOf('-') === 0 && index >= 3) {

            cmds.flags.push(item);

        } else {

            cmds.subcmd = item;

        }

    });

    return cmds;
};