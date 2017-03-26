//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS imgur module. Made by Force67 & MasterZero
//
//////////////////////////////////////////////////////////////////////////
var glados = require('../glados.js');
module.exports = bot => {

    bot.command(glados.main.prefix + 'imgur ["url"]')
        .action((meta, text) => {
            let end = text.substr(text.length - 4);
            glados.SafeDelete(meta, true, 0, function(t) {
                if (t == true)
                    if (end != ".png" && end != ".jpg" && end != ".gif") {
                        meta.reply('You cant upload this file to imgur!');
                        return;
                    }
                if (text.length < 4) {
                    meta.reply('This link is not valid!');
                    return;
                }
                try {
                    glados.main.imgur.upload(text, function(err, res) {
                        meta.channel.sendMessage(res.data.link);
                    });
                } catch (issue) {
                    meta.channel.sendMessage('imgur is offline or a error occured in the bot! (' + issue + ')');
                }
            });
        });
};