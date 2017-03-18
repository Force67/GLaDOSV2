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
            glados.isAdmin(meta.author.id,"GLOBAL", function(t) {
				if(t == 5)
                    process.exit(1);
				else
				return meta.reply('You are not allowed to use this command!');
                });
        });
	cmd.command('setusr')
		.action((meta,text) => {
		meta.delete();
		if(meta.channel.guild != undefined)
			return;
		glados.isAdmin(meta.author.id,"GLOBAL", function(t) {
			if(t == 5) {
				if(text == null)
					return meta.reply('You cant set username to null...');
				glados.webusr = text;
				meta.reply('Sucessfully set administrator username to: ' + text);
			}
		});
	});
	cmd.command('setpwd')
		.action((meta,text) => {
		meta.delete();
		if(meta.channel.type != 'dm')
			return;
		glados.isAdmin(meta.author.id,"GLOBAL", function(t) {
			if(t == 5) {
				if(text == null)
					return meta.reply('You cant set password to null...');
				glados.webpw = text;
				meta.reply('Sucessfully set administrator password to: ' + text);
			}
		});
	});
};
