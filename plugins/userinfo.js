var glados = require('../glados.js');

function msg(meta, user_text) {
    meta.channel.sendMessage("", {
        embed: {
            color: glados.RandomText(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916),
            author: {
                name: user_text.username,
                icon_url: user_text.avatarURL
            },
            thumbnail: {
                url: (user_text.avatarURL)
            },
            title: '*User info*',
            fields: [{
                name: user_text.username + '#' + user_text.discriminator,
                value: `
**User ID** : ${user_text.id}
**Username**  : ${user_text.username}
**Discrim**  : ${user_text.discriminator}
**Status** : ${user_text.presence.status.charAt(0).toUpperCase() + user_text.presence.status.slice(1)}
**Playing** : ${user_text.presence.game ? user_text.presence.game.name : 'None'}
**Joined at** : ${glados.main.moment.utc(user_text.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss ZZ')}
**Created at** : ${glados.main.moment(user_text.createdAt).utc().format('ddd MMM DD YYYY | kk:mm:ss')} (${glados.main.moment(user_text.createdAt).fromNow()})`
            }],
            timestamp: new Date(),
            footer: {
                icon_url: glados.main.client.user.avatarURL,
                text: 'GLaDOS, better bot than Clank'
            }
        }
    });
}
module.exports = bot => {
    bot.command(glados.main.prefix + 'userinfo ["name"]')
        .action((meta, text) => {
            if (text != null) {
                var users = meta.channel.guild.members.filter((member) => member.user.username == text).array();
                if (users.length == 1) { //users[0].user.username
                    msg(meta, users[0].user);
                } else if (users.length > 1) {
                    var msg_users = "multiple users found:";
                    for (var i = 0; i < users.length; i++) {
                        var user = users[i];
                        msg_users += "\n<@" + user.id + ">'s ID is " + user.id;
                    }
                    meta.channel.sendMessage(msg_users);
                } else {
                    meta.channel.sendMessage("No user " + text + " found!");
                }
            } else {
                msg(meta, meta.author);
            }
        });
}