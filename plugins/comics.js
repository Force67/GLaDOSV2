//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS comics module. Made by Force67 & MasterZero
//
//////////////////////////////////////////////////////////////////////////

var glados = require('../glados.js');

module.exports = bot => {
  bot.command(glados.main.prefix + 'comic')
    .action((meta) => {
        glados.main.comics.img(function(err,res)
        {
            if (!err)
            {
               meta.channel.sendMessage(res.url);
            }
        });
    });
};
