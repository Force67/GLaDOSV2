//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS Force Module. Made by Force67 & MasterZero
//
//////////////////////////////////////////////////////////////////////////

var glados = require('../glados.js');

module.exports = bot => {
    let cmd = bot
        .command(glados.main.prefix + 'force')
        .showHelpOnEmpty(false)

    cmd.command('shutdown')
        .action((meta) => {
            if (glados.isAdmin(id, function(t) {
                    t ? process.exit(1) : meta.reply('You are not allowed to use this command!');
                }));
        });
};
