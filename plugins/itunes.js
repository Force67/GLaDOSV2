//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS itunes module. Made by Force67 & MasterZero
//
//////////////////////////////////////////////////////////////////////////

var glados = require('../glados.js');

module.exports = bot => {
  let cmd = bot
  .command(glados.main.prefix + 'itunes')
  .showHelpOnEmpty(false)

  cmd.command('search ["keyword"]')
  .showHelpOnEmpty(false)
      .action((meta, text) => {
          glados.SafeDelete(meta,function(t) { if(t == true )
			            glados.main.request('https://itunes.apple.com/search?term=' + text, function(error, response, html) {
              if (!error && response != 404)
              {
                 var content = JSON.parse(html);
                 var furthercontent = content.results;
                 var Fields = 'Showing 20/' + content.resultCount + ' results!\n';
                 for(let i=0;i<20;i++)
                 {
                   var line = JSON.parse(JSON.stringify(furthercontent[i]));
                   Fields = Fields + ' ' + line.trackName + ' \n';
                 }
                 meta.channel.sendMessage("", {
                     embed: {
                         color: 16713030,
                         author: {
                             name: meta.client.user.username,
                             icon_url: meta.client.user.avatarURL
                         },
                         thumbnail : {url: ('http://vignette2.wikia.nocookie.net/logopedia/images/6/6c/ITunes12.png/revision/latest?cb=20141129045932') },
                         title: 'Itunes Results',
                         url: 'http://www.apple.com/itunes/',
                         description: Fields,
                     }
                 });

              }
          });
			  });
      });

};
