//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS cleverbot module. Made by Force67 & MasterZero
//
//////////////////////////////////////////////////////////////////////////
var glados = require('../glados.js');
module.exports = bot => {
    bot.command('<@'+glados.main.client.user.id+'> ["sentence"]')
        //.alias('<@'+glados.main.client.user.id+'>')
        .action((meta, text) => {
            if (text == null)
                return;
            let bot = new glados.main.cleverbot("9jQ1T8im5n65MEgu", "UQS9y9JzrxD4pS2oybrnYsfpugkDkyy2");
            bot.setNick("GLaDOS");
            bot.create(function(err, session) {
                bot.ask(text, function(err, response) {
                    if (err) {
                        meta.reply("Idk!");
                    } else {
                        meta.reply(response);
                    }
                });
            });
        });
};