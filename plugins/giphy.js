//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS giphy module. Made by Force67
//
//////////////////////////////////////////////////////////////////////////

var glados = require('../glados.js');
var giphyapi = require('giphy-api')('dc6zaTOxFJmzC'); //public beta api key.

module.exports = bot => {
    let cmd = bot
        .command(glados.main.prefix + 'giphy')
        .showHelpOnEmpty(false)

    cmd
        .command('search ["searchterm"]')
        .showHelpOnEmpty(false)
        .action((meta, arg) => {
            giphyapi.random(arg, function(err, res) {
                err ? meta.channel.sendMessage('A issue occured with giphy api! (' + err + ')') : meta.channel.sendMessage(res.data.url);
            });
        });

};
