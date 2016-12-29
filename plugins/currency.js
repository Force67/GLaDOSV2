//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS Currency Module. Made by Force67 & MasterZero
//
//////////////////////////////////////////////////////////////////////////

var glados = require('../glados.js');

function getcurrency(text, meta, mp) {
    var text1 = text.substr(0, 3);
    var text2 = text.substr(4, 6);
    let sprite = "";
    glados.main.request('http://api.fixer.io/latest?base=' + text1, function(error, response, html) {
        text1 == "EUR" ? sprite = 'http://i.imgur.com/F4yZlnm.png' : sprite = 'http://i.imgur.com/EDia5bF.png';
        if (!error && response != 404) {
            var content = JSON.parse(html);
            var Fields = "For " + mp + ' '+ text1 + ' you will get : \n' + content.rates[text2] * mp + ' ' + text2;
            meta.channel.sendMessage("", {
                embed: {
                    color: 3093032,
                    author: {
                        name: meta.client.user.username,
                        icon_url: meta.client.user.avatarURL
                    },
                    thumbnail: {
                        url: (sprite)
                    },
                    title: 'Your currency values',
                    description: Fields,
                }
            });

        }
    });
}

module.exports = bot => {
    let cmd = bot
        .command(glados.main.prefix + 'currency')
        .showHelpOnEmpty(false)

    cmd.command('compare')
        .action((meta, text) => {
            if (!text.includes('&')) {
                meta.reply('GLaDOS Expects the following format for this command:\n (Example): EUR&USD');
                return;
            }

            getcurrency(text, meta, 1);

        });

};
