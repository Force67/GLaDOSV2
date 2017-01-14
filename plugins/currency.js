//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS Currency Module. Made by Force67 & MasterZero
//
//////////////////////////////////////////////////////////////////////////

var glados = require('../glados.js');

//all valid currencys
let whitelist = ['EUR','AUD','BGN','BRL','CAD','CHF','CNY','CZK','DKK','GBP','HKD','HRK','HUF','IDR','ILS','INR',
                 'JPY','KRW','MXN','MYR','NOK','NZD','PHP','PLN','RON','RUB','SEK','SGD','THB','TRY','USD','ZAR'];

module.exports = bot => {
    let cmd = bot
        .command(glados.main.prefix + 'currency')
        .showHelpOnEmpty(false)

    cmd.command('compare')
        .action((meta, _currency1,_currency2) => {
          if (_currency1 == null || _currency2 == null) {return;}
          if (_currency1.includes('#') || _currency2.includes('#')) {return meta.reply('usage : ' + glados.main.prefix + ' currency anothercurrency')}  //submitted by BlackofWorld (uppercase issue)
          var currency1 = _currency1.toUpperCase();
          var currency2 = _currency2.toUpperCase();
          let sprite = "";
          var mp = 1; //for now
          //it would return false on first attempt... thats why we have the bool.
          var attempts = false;
          for (i = 0; i < whitelist.length;i++)
          {
            if (currency1 === whitelist[i])
            {
                attempts = true;
            }
          }
          if (!attempts)
          {
            meta.reply('This currency is not valid!');
            return;
          }
          glados.main.request('http://api.fixer.io/latest?base=' + currency1, function(error, response, html) {
              currency1 == "EUR" ? sprite = 'http://i.imgur.com/F4yZlnm.png' : sprite = 'http://i.imgur.com/EDia5bF.png';
              if (!error && response != 404) {
                  var content = JSON.parse(html);
                  var Fields = "For " + mp + ' '+ currency1 + ' you will get : \n' + content.rates[currency2] * mp + ' ' + currency2;
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

        });
    cmd.command('list')
      .action(meta => {
          var Fields = "";
          var linebreaks = 10;
          var adder = "";
          //add a new line every 10 entrys
          for (i = 0; i < whitelist.length ;i++)
          {
            i > linebreaks ? adder = '\n' : linebreaks +=10;
            Fields += whitelist[i].toLowerCase() + ' | ' + adder;
          }
          meta.channel.sendMessage("", {
              embed: {
                  color: 3093032,
                  author: {
                      name: meta.client.user.username,
                      icon_url: meta.client.user.avatarURL
                  },
                  thumbnail: {
                      url: ('http://i.imgur.com/F4yZlnm.png')
                  },
                  title: 'All currencies supported : ',
                  description: Fields,
              }
          });
      });

};
