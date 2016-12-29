//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS Force Module. Made by Force67 & MasterZero
//
//////////////////////////////////////////////////////////////////////////
var glados = require('../glados.js');
module.exports = bot => {

    bot.command(glados.main.prefix + 'this delete')
        .action((meta) => {
          if (glados.isAdmin(id, function(t)
          {
              if (t)
              {
                process.exit(1);
              }
              else
            {
                meta.reply('fuck off!');
            }
            }));
        });
};
