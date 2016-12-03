//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS 9gag module.
//
//////////////////////////////////////////////////////////////////////////
var glados = require('../glados.js');
module.exports = bot => {
    bot.command(glados.main.prefix + '9gag')
        .action((meta, arg) => {
            meta.delete();
            glados.main.http.get({
                    hostname: '9gag.com',
                    port: 80,
                    path: '/random',
                    agent: false
                },
                (res) => {
                    let imgUrl = glados.main.url.parse(res.headers.location)['path'].split('/').pop()
                    let imgName = imgUrl + '.png';

                    imgUrl = `http://img-9gag-fun.9cache.com/photo/${imgUrl}_700b.png`
                    meta.channel.sendMessage(imgUrl);
                }
            )
        });

};