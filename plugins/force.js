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
          meta.delete();
            glados.isAdmin(meta.author.id,meta.guild.id, function(t) {
				if(t == 5)
                    process.exit(1);
				else
				return meta.reply('You are not allowed to use this command!');
                });
        });
};
