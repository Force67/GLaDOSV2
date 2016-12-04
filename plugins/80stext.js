//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS 80's text fun module.
//
//////////////////////////////////////////////////////////////////////////
var glados = require('../glados.js');
module.exports = bot => {
    bot.command(glados.main.prefix + '80stext ["text1"] ["text2"] ["text3]')
        .action((meta, text1, text2, text3) => {
            try {
                meta.reply("Wait a few seconds!\ntext1: " + text1 + "\ntext2: " + text2 + "\ntext3: " + text3);
                glados.main.request.post('https://photofunia.com/effects/retro-wave&text1=' + text1 + '&text2=' + text2 + '&text3=' + text3, {
                    form: {
                        "current-category": "all_effects",
                        "bcg": "5",
                        "txt": "4",
                        "text1": text1,
                        "text2": text2,
                        "text3": text3
                    },
                    json: true
                }, function(err, res, body) {
                    if (!err) {
                        glados.main.request("https://photofunia.com/" + res.caseless.dict.location, function(error, response, html) {
                            if (!error) {
                                let $ = glados.main.cheerio.load(html);
                                glados.main.imgur.upload($('#result-image').attr('src'), function(err, res) {
                                    meta.channel.sendMessage(res.data.link);
                                });
                            } else {
                                meta.reply("Error: " + err);
                            }
                        });
                    } else {
                        meta.reply("Error: " + err);
                    }
                })
            } catch (issue) {
                meta.channel.sendMessage('error occured in the bot! (' + issue + ')');
            }

        });
};