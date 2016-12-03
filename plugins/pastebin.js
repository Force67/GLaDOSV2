//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS pastebin module.
//
//////////////////////////////////////////////////////////////////////////
var glados = require('../glados.js');
module.exports = bot => {
    let cmd = bot
        .command(glados.main.prefix + 'pastebin')
        .showHelpOnEmpty(false)

    cmd
        .command('show [id]')
        .showHelpOnEmpty(false)
        .action((meta, id) => {
            if(id == null)
                return;

            meta.delete();
            if (id.includes("pastebin.com")) {
                meta.reply("Only the pastebin id!")
            } else {
                glados.main.request("http://pastebin.com/raw/" + id, function(error, response, html) {
                    if (!error) {
                        let maxLength = 1990;
                        if (html.length > maxLength) {
                            let needMessages = Math.ceil(html.length / maxLength);
                            if (needMessages > 1) {
                                meta.channel.sendMessage("```\n" + html.substr(0, maxLength) + "\n```");
                                for (i = 0; i < needMessages; i++) {
                                    if (html.substr(maxLength * i, maxLength * i * 2) != "")
                                        meta.channel.sendMessage("```\n" + html.substr(maxLength * i, maxLength * i * 2) + "\n```");
                                }
                            } else {
                                meta.channel.sendMessage("```\n" + html + "\n```");
                            }

                        } else {
                            meta.channel.sendMessage("```\n" + html + "\n```");
                        }

                    } else {
                        meta.reply("Can't show pastebin for you! Issue: " + error);
                    }
                })
            }
        });

    cmd
        .command('upload ["text"]')
        .showHelpOnEmpty(false)
        .action((meta, text) => {
            if(text == null)
                return;
                
            meta.delete();
            meta.reply("Upload to pastebin: " + text);
        });

};