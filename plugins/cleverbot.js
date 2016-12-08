//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS cleverbot module.
//
//////////////////////////////////////////////////////////////////////////
var glados = require('../glados.js');
module.exports = bot => {
    bot.command('<@!236241868810223616> ["sentence"]')
        .alias('<@236241868810223616>')
        .action((meta, arg) => {
            if (arg == null)
                return;

            let bot = new glados.main.cleverbot("9jQ1T8im5n65MEgu", "UQS9y9JzrxD4pS2oybrnYsfpugkDkyy2");
            bot.setNick("GLaDOS");
            bot.create(function(err, session) {

                bot.ask(arg, function(err, response) {
                    if (err) {
                        meta.reply("Idk!");
                    } else {
                        meta.reply(response);
                    }
                });
            });
        });
};