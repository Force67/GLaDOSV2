//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS scc module. Made by Force67 & MasterZero
//
//////////////////////////////////////////////////////////////////////////

var glados = require('../glados.js');

module.exports = bot => {
    let cmd = bot
        .command(glados.main.prefix + 'admin')
        .showHelpOnEmpty(false)

    cmd
    //requires discord.js indev
        .command('list')
        .showHelpOnEmpty(false)
        .action((meta) => {
            glados.main.db.all("SELECT serverid,discordid,rank FROM admins" , function(err, rows) {
                let admins = "";
                rows.forEach(function(row) {
					let client = glados.main.client.users.get(row.id);
					if(row.serverid != meta.guild.id && row.serverid != 'GLOBAL')
						return;
                    admins = admins + "<@" + row.discordid + "> ("+row.rank+")\n";
                });
                meta.channel.sendMessage("",{embed :{
                    color : 3447003, //rnd_selection(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916),
                    author: {
                        name: meta.client.user.username,
                        icon_url: meta.client.user.avatarURL
                    },
                    title: 'GLaDOS Admins:',
                    description: admins,
                }});
                ////////
            });
        });

    cmd
        .command('addid ["discordid"] [rank]')
        .showHelpOnEmpty(false)
        .action((meta, id,rank) => {
            glados.isAdmin(meta.author.id,meta.guild.id, function(t) {
                if (!t) {
                    return meta.reply(glados.main.norights);
                } else {
                    if (id == null)
                        return meta.reply("Usage: " + glados.main.prefix + "admin addid \"discordid\"");

                    glados.isAdmin(id, function(t) {
                        if (t) {
                            let client = glados.main.client.users.get(id);
                            return meta.reply(client.username + " is already an admin! :)");
                        } else {
                            try {
                                let client = glados.main.client.users.get(id);
                            } catch (ex) {
                                return meta.reply("Invalid discordid!");
                            }
                            let client = glados.main.client.users.get(id);

                            glados.main.db.run("INSERT INTO admins (discordid,rank) VALUES(?1,?2)", {
                                1: id,
								2: rank
                            });
                            meta.channel.sendMessage("@here " + client.username + " is now GLaDOS admin!");
                        }
                    });
                }
            });
        });
	cmd
        .command('addname ["username"] [rank]')
        .showHelpOnEmpty(false)
        .action((meta, text,rank) => {
            glados.isAdmin(meta.author.id,meta.guild.id, function(t) {
                if (!t) {
                    return meta.reply(glados.main.norights);
                } else {
                    if (text == null)
                        return meta.reply("Usage: " + glados.main.prefix + "admin addname \"username\"");
					var users = meta.channel.guild.members.filter((member) => member.user.username == text).array();
					if(users.length == 1){
						glados.isAdmin(users[0].user.id, function(t) {
                        if (t) {
                            let client = glados.main.client.users.get(users[0].user.id);
                            return meta.reply(users[0].user.username + " is already an admin! :)");
                        } else {
                            try {
                                let client = glados.main.client.users.get(users[0].user.id);
                            } catch (ex) {
                                return meta.reply("Invalid username!");
                            }
                            let client = glados.main.client.users.get(users[0].user.id);

                            glados.main.db.run("INSERT INTO admins (discordid,rank) VALUES(?1,?2)", {
                                1: users[0].user.id,
								2: rank
                            });
                            meta.channel.sendMessage("@here " + users[0].user.username + " is now GLaDOS admin!");
                        }
                    });
				  }
				  else if(users.length > 1)
					  return meta.reply("Multiple users found! No action was done!")
                }
            });
        });
    cmd
        .command('deleteid ["discordid"]')
        .showHelpOnEmpty(false)
        .action((meta, discordid) => {
            glados.isAdmin(meta.author.id,meta.guild.id, function(t) {
                if (!t) {
                    return meta.reply(glados.main.norights);
                } else {
                    if (discordid == null)
                        return meta.reply("Usage: " + glados.main.prefix + "admin delete \"discordid\"");
                    try {
                        let client = glados.main.client.users.get(discordid);
                    } catch (ex) {
                        return meta.reply("Invalid discordid!");
                    }
                    let client = glados.main.client.users.get(discordid);

                    glados.isAdmin(discordid, function(t) {
                        if (!t) {
                            return meta.reply(client.username + " is not an admin! :)");
                        }
                    });

                    glados.main.db.run("DELETE FROM admins WHERE discordid = ?1", {
                        1: discordid
                    });
                    meta.channel.sendMessage("@here " + client.username + " is no more GLaDOS admin!");
                }
            });
        });
    cmd
        .command('deletename ["username"]')
        .showHelpOnEmpty(false)
        .action((meta, text) => {
            glados.isAdmin(meta.author.id,meta.guild.id, function(t) {
                if (!t) {
                    return meta.reply(glados.main.norights);
                } else {
                    if (text == null)
                        return meta.reply("Usage: " + glados.main.prefix + "admin delete \"username\"")
					var users = meta.channel.guild.members.filter((member) => member.user.username == text).array();
					if(users.length == 1){
                    try {
                    } catch (ex) {
                        return meta.reply("Invalid username!");
                    }
                    glados.isAdmin(users[0].user.id, function(t) {
                        if (!t) {
                            return meta.reply(users[0].user.username + " is not an admin! :)");
                        }
                    });

                    glados.main.db.run("DELETE FROM admins WHERE discordid = ?1", {
                        1: users[0].user.id
                    });
                    meta.channel.sendMessage("@here " + users[0].user.username + " is no more GLaDOS admin!");
					}
					else if(users.length > 1)
						return meta.reply("Multiple users found! No action was done!")
                }
            });
        });
};
