//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS 80's text fun module.
//
//////////////////////////////////////////////////////////////////////////
var glados = require('../glados.js');
module.exports = bot => {
    bot.command(glados.main.prefix + '80stext ["3arguments"]')
        .action((meta, text) => {
            let args = text.split(" ");
            var settextp1 = args[0],
            settextp2 = args[1],
            settextp3 = args[2];
            
            var url = "photophuniaresponse.gif";


            try {
                glados.main.imgur.upload(url, function(err, res) {
                    meta.channel.sendMessage(res.data.link);
                });
            } catch (issue) {
                meta.channel.sendMessage('imgur is offline or a error occured in the bot! (' + issue + ')');
            }

        });
};