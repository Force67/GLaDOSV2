//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS comics module. Made by Force67 & MasterZero
//
//////////////////////////////////////////////////////////////////////////
var glados = require('../glados.js');

//taken from xkcd-api https://www.npmjs.com/package/xkcd-node
var request_comic = function(cb) {
    glados.main.request('http://xkcd.com/info.0.json', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var max_num = JSON.parse(body)['num'];
            var rand = Math.floor((Math.random() * max_num) + 1);
            if (rand == 404) {
                rand = get_num();
            } // Avoid 404 page ;)
        }

        var xkcd_url = 'http://xkcd.com/' + rand + '/info.0.json';
        glados.main.request(xkcd_url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                comic = JSON.parse(body);
                img_url = comic['img'];
                img_title = comic['alt'];
                return cb(null, {
                    url: img_url,
                    title: img_title
                });
            }

            cb(new Error(error), null);
        });
    });
};

module.exports = bot => {
    bot.command(glados.main.prefix + 'comic')
        .action((meta) => {
            request_comic(function(err, res) {
                if (!err) {
                    meta.channel.sendMessage("", {
                        embed: {
                            color: 16731648,
                            author: {
                                name: meta.client.user.username,
                                icon_url: meta.client.user.avatarURL
                            },
                            thumbnail: {
                                url: ('https://image.freepik.com/vektoren-kostenlos/cloud-im-comic-stil_23-2147510430.jpg')
                            },
                            title: 'Comic',
                            image: {
                                url: res.url
                            },
                            footer: {
                                text: res.title
                            }
                        }
                    });
                }
            });
        });
};
