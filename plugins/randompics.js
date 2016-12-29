//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS random module. Made by Force67 & MasterZero
//
//////////////////////////////////////////////////////////////////////////

var glados = require('../glados.js');

function randompic(handle,type)
{
  glados.main.request('http://random.' + type , function(error,response,html)
  {
    if (!error)
    {
        let $ = glados.main.cheerio.load(html);
        handle.reply('http://random.'+ type + '/' +  $('img').attr('src'));
    }
  });
}

module.exports = bot => {
        let cmd = bot
        .command(glados.main.prefix + 'random')
        .showHelpOnEmpty(false)
        cmd
        .command('dog')
        .action((meta) => {
          randompic(meta,'dog');
        });

};
