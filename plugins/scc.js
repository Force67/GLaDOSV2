//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS scc module.
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
        .command('run ["name"]')
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
                meta.channel.sendMessage("`SCC commands for this server:\n-----------------------------------------`");
                rows.forEach(function (row) {
                    meta.channel.sendMessage("`NAME -> " + row.command + "\nCODE -> " + row.code + "`");
                });
                meta.channel.sendMessage("`----------------------------------------- \n`");
            });
        });
};