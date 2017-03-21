//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS scc module. Made by Force67 & MasterZero
//
//////////////////////////////////////////////////////////////////////////

var glados = require('../glados.js');

module.exports = bot => {
    let cmd = bot
        .command(glados.main.prefix + 'scc')
        .showHelpOnEmpty(false)

    cmd
        .command('add ["name"] ["code"]')
        .showHelpOnEmpty(false)
        .action((meta, command, code) => {
            if (command == null || code == null)
                return meta.reply("Usage: " + glados.main.prefix + "scc add \"NAME\" \"CODE\"");
                let blacklist = ['process', 'glados', 'Buffer','console','while','for'];
                for (i = 0; i < blacklist.length; i++) {
                      if (code.includes(blacklist[i])) {
                          meta.reply("This type of call is not allowed!");
                            return;
                    }
            }

            glados.main.db.get("SELECT COUNT(*) AS co FROM scc WHERE command = ?1 AND serverid = ?2", {
                1: command,
                2: meta.guild.id
            }, function(err, row) {
                if (row.co || command == "add") {
                    meta.reply("SCC command " + command + " already exist for this server or is reserved!");
                } else {
                    glados.main.db.run("INSERT INTO scc (command, code, serverid) VALUES(?1, ?2, ?3)", {
                        1: command,
                        2: code,
                        3: meta.guild.id
                    });
                    meta.reply("SCC command " + command + " added for this server!");
                }
            });
        });
	cmd
		.command('delete ["command name"]')
		.showHelpOnEmpty(false)
		.action((meta,command) => {
			if(command == null)
				return meta.reply("Usage: " + glados.main.prefix + "scc delete \"NAME\"");
			glados.main.db.get("SELECT COUNT(*) AS co FROM scc WHERE command = ?1 AND serverid = ?2", {
                1: command,
                2: meta.guild.id
            }, function(err, row) {
				if (!row.co)
					return meta.reply("SCC command doesn't exist!")
				glados.main.db.run('DELETE FROM scc WHERE serverid=?1 AND command=?2', {
					1: meta.guild.id,
					2: command
				});
				meta.reply('SCC command ' + command + ' has been removed from this server!')
		});
		});
    cmd
        .command('run ["command name"]')
        .showHelpOnEmpty(false)
        .action((meta, name) => {
            if (name == null)
                return meta.reply("Usage: " + glados.main.prefix + "scc run \"NAME\"");

            glados.main.db.get("SELECT COUNT(*) AS co FROM scc WHERE command = ?1 AND serverid = ?2", {
                1: name,
                2: meta.guild.id
            }, function(err, row) {
                if (row.co) {
                    glados.main.db.get("SELECT * FROM scc WHERE command = ?1 AND serverid = ?2", {
                        1: name,
                        2: meta.guild.id
                    }, function(err, row) {
                        try {
                            const script = new glados.main.vm.Script(row.code, {
                                filename: 'myfile.vm'
                            });
                            meta.channel.sendMessage(script.runInThisContext());
                        } catch (e) {
                            meta.channel.sendMessage("Exception: " + e.message);
                        }
                    });
                } else {
                    meta.reply("SCC \"" + name + "\" not found for this server!");
                }
            });
        });

        cmd
        .command('list')
        .showHelpOnEmpty(false)
        .action((meta) => {
            glados.main.db.all("SELECT * FROM scc WHERE serverid = ?1", {
                1: meta.guild.id
            }, function(err, rows) {
                let list = "";
                rows.forEach(function (row) {
                    list = list + "**" + row.command + "**\n`" + row.code + "`\n\n";
                });


                meta.channel.sendMessage("",{embed :{
                    color : 41216, //rnd_selection(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916),
                    author: {
                        name: meta.client.user.username,
                        icon_url: meta.client.user.avatarURL
                    },
                    title: 'SCC:',
                    description: list,
                }});

            });
        });
};