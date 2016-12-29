//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS 80's text fun module. Made by Force67 & MasterZero
//
//////////////////////////////////////////////////////////////////////////
var glados = require('../glados.js');
module.exports = bot => {
    bot.command(glados.main.prefix + '80stext ["text1"] ["text2"] ["text3]')
        .action((meta, text1, text2, text3) => {
            try {
                meta.reply("Wait shortly");
                var rnd =  Math.random() * (6 - 1) + 1; //5
                var rndtext = Math.random() * (5 - 1) + 1; //4
                glados.main.request.post('https://photofunia.com/effects/retro-wave&text1=' + text1 + '&text2=' + text2 + '&text3=' + text3, {
                    form: {
                        "current-category": "all_effects",
                        "bcg": Math.ceil(rnd) - 1, //"5" //-1 zum abrunden
                        "txt": Math.ceil(rndtext) - 1,
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
