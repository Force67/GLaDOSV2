//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS scc module.
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
            glados.main.db.all("SELECT * FROM admins", function(err, rows) {
               // meta.channel.sendMessage("`GLaDOS admins:\n-----------------------------------------`");
               let text = "";
                rows.forEach(function(row) {
                    let client = glados.main.client.users.get(row.discordid);
                //    meta.channel.sendMessage("`" + client.username + " (" + row.discordid + ")`");
                    text = text + client.username + "( " + row.discordid + " )" + "\n";
                });
         //       meta.channel.sendMessage("`----------------------------------------- \n`");


         ////////////
            meta.channel.sendMessage("",{embed :{
            color : 14383916, 
            author: {
                name: meta.client.user.username,
                icon_url: meta.client.user.avatarURL
            },
            title: 'GLaDOS Admins:',
           // description: text,
           fields: [
            {
              name: 'Force67',
              value: 'Test test test'
            },
            {
             name: 'MasterZero',
             value: 'Test'
             },
          ],

        }});
        ////////




            });
        });

    cmd
        .command('add ["discordid"]')
        .showHelpOnEmpty(false)
        .action((meta, id) => {
            glados.isAdmin(meta.author.id, function(t) {
                if (!t) {
                    return meta.reply(glados.main.norights);
                } else {
                    if (id == null)
                        return meta.reply("Usage: " + glados.main.prefix + "admin add \"discordid\"");

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

                            glados.main.db.run("INSERT INTO admins (discordid) VALUES(?1)", {
                                1: id
                            });
                            meta.channel.sendMessage("@here " + client.username + " is now GLaDOS admin!");
                        }
                    });
                }
            });
        });

    cmd
        .command('delete ["discordid"]')
        .showHelpOnEmpty(false)
        .action((meta, discordid) => {
            glados.isAdmin(meta.author.id, function(t) {
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
};