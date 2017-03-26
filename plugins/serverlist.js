//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS serverlist module. Made by Force67 & MasterZero
//
//////////////////////////////////////////////////////////////////////////
var glados = require('../glados.js');

module.exports = bot => {
    let cmd = bot
        .command(glados.main.prefix + 'serverlist')
        .showHelpOnEmpty(false)

    cmd.command('ragemp')
        .action((meta) => {
            glados.main.request('http://ml.rage.mp/servers', function(error, response, html) {
                if (!error && response != 404) {
                    var content = JSON.parse(html);
                    let Fields = "";
                    var pcount = 0,
                        scount = 0;
                    for (let i in content) {
                        var line = JSON.parse(JSON.stringify(content[i]));
                        Fields += '``' + line.name + "``\n" + 'Players: ' + line.players + '/' + line.slots + "\n" + "\n";
                        pcount += line.players;
                        scount++;
                    }
                    var FinalFields = '**Total Players Online : ' + pcount + '**\n' + '**Total Servers Online: ' + scount + '**\n\n' + Fields;
                    meta.channel.sendMessage("", {
                        embed: {
                            color: 16731648,
                            author: {
                                name: meta.client.user.username,
                                icon_url: meta.client.user.avatarURL
                            },
                            thumbnail: {
                                url: ('https://rage.mp/uploads/monthly_2016_10/basiclogohd_white.png.1644889db28e6665fc454589b47ae8a9.png')
                            },
                            title: 'Ragemp Servers:',
                            url: 'https://rage.mp/',
                            description: FinalFields,
                        }
                    });
                }
            });

        });
    cmd.command('gtan')
        .action((meta) => {
            glados.main.request('https://master.gtanet.work/apiservers', function(error, response, html) {
                if (!error && response != 404) {
                    var content = JSON.parse(html);
                    var furtherparse = content.list;
                    let Fields = "";
                    //only 20...
                    for (let i = 0; i < 20; i++) {
                        var line = JSON.parse(JSON.stringify(furtherparse[i]));
                        Fields += line.ServerName + "\n" + 'Players: ' + line.CurrentPlayers + '/' + line.MaxPlayers + "\n" + "\n";
                        //    Fields = '[{ name:' + "'" + line.name + "'," + 'value: ' + "'" + line.players + '/' + line.slots + "'},";
                    }
                    meta.channel.sendMessage("", {
                        embed: {
                            color: 2559,
                            author: {
                                name: meta.client.user.username,
                                icon_url: meta.client.user.avatarURL
                            },
                            thumbnail: {
                                url: ('https://wiki.gtanet.work/images/thumb/8/88/gtan_presskit_logo_3.png/85px-gtan_presskit_logo_3.png')
                            },
                            title: 'Gta-Network Servers:',
                            url: 'https://gtanet.work/',
                            description: Fields,
                        }
                    });
                }
            });

        });

};