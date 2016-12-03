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
            meta.reply('s ID is ' + message.author.id);
        });

    bot.command(glados.main.prefix + 'spam ["multi word argument"] <count>')
        .action((meta, text, count) => {
            var repeatvar = 1;
            repeatvar = parseInt(count);
            meta.channel.sendMessage('spamming now ' + repeatvar + ' times xd');

            for (i = 0; i < repeatvar; i++) {
                meta.channel.sendMessage(text);
            }
        });

    bot.command(glados.main.prefix + 'say ["multi word argument"]')
        .action((meta, text) => {
            meta.channel.sendMessage(text);
        });
    bot.command(glados.main.prefix + 'voice ["multi word argument"]')
        .action((meta, text) => {
            meta.channel.sendTTSMessage(text);
        });
    bot.command(glados.main.prefix + 'status ["multi word argument"]')
        .action((meta, text) => {
            let check = text;
            if (check != 'online' && check != 'dnd' && check != 'idle' && check != 'offline')
            {
                meta.reply('This status does not exist!');
                return;
            }
            else
            {
                meta.client.user.setStatus(check);
            }
        });
    bot.command(glados.main.prefix + 'eval ["multi word argument"]')
        .action((meta, text) => {
            try {
            const script = new vm.Script(text, {
                filename: 'myfile.vm'
            });
            meta.channel.sendMessage(script.runInThisContext());
        } catch (e) {
            meta.channel.sendMessage("exception: " + e.message);
        }
        });
    
};