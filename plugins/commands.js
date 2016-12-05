//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS commands module.
//
//////////////////////////////////////////////////////////////////////////
var glados = require('../glados.js');
var vm = glados.main.vm;
module.exports = bot => {

    bot.command(glados.main.prefix + 'botinfo')
        .action((meta, arg) => {
            meta.reply("how are you?");
        });

    bot.command(glados.main.prefix + 'hi')
        .action((meta, arg) => {
            meta.reply("I am a simple GLaDOS test written in nodejs!");
        });

    bot.command(glados.main.prefix + 'bemyfriend')
        .action((meta, arg) => {
            meta.reply("Send you a friend request!");
            meta.client.user.addFriend();
        });

    bot.command(glados.main.prefix + 'messageid')
        .action((meta, arg) => {
            meta.reply("'s Id is: " + meta.id);
        });

    bot.command(glados.main.prefix + 'myid')
        .action((meta, arg) => {
            meta.reply('s ID is ' + meta.author.id);
        });

    bot.command(glados.main.prefix + 'spam ["string"] [count]')
        .action((meta, text, count) => {
            if (text === null || count === null)
                return;

            if (text.charAt(0) === ">") {
                return meta.reply("You can't spam commands!");
            }

            var repeatvar = 1;
            repeatvar = parseInt(count);
            meta.channel.sendMessage('spamming now ' + repeatvar + ' times xd');

            for (i = 0; i < repeatvar; i++) {
                meta.channel.sendMessage(text);
            }
        });

    bot.command(glados.main.prefix + 'say ["what?"]')
        .action((meta, text) => {
            meta.channel.sendMessage(text);
        });
    bot.command(glados.main.prefix + 'voice ["what?"]')
        .action((meta, text) => {
            meta.channel.sendTTSMessage(text);
        });
    bot.command(glados.main.prefix + 'status ["online|dnd|idle|offline"]')
        .action((meta, text) => {
            let check = text;
            if (check != 'online' && check != 'dnd' && check != 'idle' && check != 'offline') {
                meta.reply('This status does not exist!');
                return;
            } else {
                meta.client.user.setStatus(check);
            }
        });
    bot.command(glados.main.prefix + 'eval ["code"]')
        .action((meta, text) => {
            glados.isAdmin(meta.author.id, function(t) {
                if (!t) {
                    return meta.reply(glados.main.norights);
                } else {
                    try {
                        const script = new vm.Script(text, {
                            filename: 'myfile.vm'
                        });
                        meta.channel.sendMessage(script.runInThisContext());
                    } catch (e) {
                        meta.channel.sendMessage("exception: " + e.message);
                    }
                }
            });
        });
    bot.command(glados.main.prefix + 'help')
        .action(meta => {
            meta.channel.sendMessage("```" + bot.help() + "```");
        });
    bot.command(glados.main.prefix + 'roles')
        .action(meta => {
            console.log(meta.member);
        });

};