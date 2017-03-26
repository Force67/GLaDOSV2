//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS youtube module. Made by Force67 & MasterZero
//
//////////////////////////////////////////////////////////////////////////
var glados = require('../glados.js');
module.exports = bot => {

    bot.command(glados.main.prefix + 'yt ["search terms"]')
        .action((meta, text) => {
            glados.main.youTube.search(text, 1, function(error, result) {
                if (error) {
                    meta.channel.sendMessage(error);
                } else {
                    try {
                        meta.channel.sendMessage("http://www.youtube.com/watch?v=" + result.items[0].id.videoId);
                    } catch (err) {
                        console.log("Youtube Error: " + err);
                    }
                }
            });
        });
};