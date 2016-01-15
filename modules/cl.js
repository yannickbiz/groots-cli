module.exports = () => {

    var cmds = {
            app: '',
            executable: '',
            cmd: '',
            flags: [],
            subcmd: []
        };

    // parses process.argv into organized object
    process.argv.forEach((item, index) => {
        if (index === 0) {
            cmds.app = item;
        } else if (index === 1) {
            cmds.executable = item;
        } else if (index === 2) {
            cmds.cmd = item;
        } else if (item.indexOf('-') === 0 && index >= 3) {
            cmds.flags.push(item);
        } else {
            cmds.subcmd.push(item);
        }
    });

    return cmds;
};