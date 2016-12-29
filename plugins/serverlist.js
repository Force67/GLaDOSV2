//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS ragemp module. Made by Force67 & MasterZero
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
                    for (let i in content) {
                        var line = JSON.parse(JSON.stringify(content[i]));
                        Fields = Fields + line.name + "\n" + 'Players: ' + line.players + '/' + line.slots + "\n" + "\n";
                        //    Fields = '[{ name:' + "'" + line.name + "'," + 'value: ' + "'" + line.players + '/' + line.slots + "'},";
                    }
                    meta.channel.sendMessage("", {
                        embed: {
                            color: 16731648,
                            author: {
                                name: meta.client.user.username,
                                icon_url: meta.client.user.avatarURL
                            },
                            title: 'Ragemp Servers:',
                            url: 'https://rage.mp/',
                            description: Fields,
                        }
                    });
                }
            });

        });
    //broken TODO: fix (serverlimits xd)
    cmd.command('gtan')
    .action((meta) => {
        glados.main.request('https://master.gtanet.work/apiservers', function(error, response, html) {
            if (!error && response != 404) {
                var content = JSON.parse(html);
                let Fields = "";
                for (let i in content) {
                    var line = JSON.parse(JSON.stringify(content[i]));
                    Fields = Fields + line.ServerName + "\n" + 'Players: ' + line.CurrentPlayers + '/' + line.MaxPlayers + "\n" + "\n";
                    //    Fields = '[{ name:' + "'" + line.name + "'," + 'value: ' + "'" + line.players + '/' + line.slots + "'},";
                }
                meta.channel.sendMessage("", {
                    embed: {
                        color: 2559,
                        author: {
                            name: meta.client.user.username,
                            icon_url: meta.client.user.avatarURL
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
