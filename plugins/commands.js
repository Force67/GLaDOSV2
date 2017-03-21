//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS commands module. (c) Force67 & MasterZero
//
//////////////////////////////////////////////////////////////////////////
var glados = require('../glados.js');
var vm = glados.main.vm;
module.exports = bot => {

    bot.command(glados.main.prefix + 'botinfo')
        .action((meta, arg) => {
            meta.channel.sendMessage("", {
                embed: {
                    color: 4857424, //this are decimal color codes
                    author: {
                        name: meta.client.user.username,
                        icon_url: meta.client.user.avatarURL
                    },
                    title: 'Botinfo:',
                    url: glados.invitelink,
                    fields: [{
                        name: 'Creators',
                        value: 'Developed by <@194151547846787072> & <@195225230908588032> with :heart: '
                    }, {
                        name: 'Stats',
                        value: 'Uptime: ' + glados.main.moment(new Date()).subtract(meta.client.uptime / 1000, 'seconds').format('HH:mm:ss') + '\nServing ' + glados.main.client.guilds.array().length + ' servers'
                    }, {
                        name: 'Invite link:',
                        value: '[Click to invite](' + glados.invitelink + ')'
                    }, ],

                }
            });

        });
	bot.command(glados.main.prefix + 'performance')
	   .action((meta) => {
		   //This idea was from another discord server. I've got this inspiration from them.
		  var msg = 'Testing performance!';
		  meta.channel.sendMessage(msg).then((msg2) => {
				msg2.edit("Speed of <@"+glados.main.client.user.id+"> is "+Math.floor(msg2.createdTimestamp - meta.createdTimestamp)+"ms.");
				return msg2;
	   }).catch(err => console.log(err.stack));
	   });
	bot.command(glados.main.prefix + 'ping')
	   .action((meta) => {
		   meta.channel.sendMessage('Pong! -> '+Math.floor(glados.main.client.ping).toString()+'ms.')
	   });
	   		// EXPERIMENTAL ¡¡ sometimes work sometimes doesn't :( disabled by default
    /*bot.command(glados.main.prefix + 'clearchat [number]')
	   .action((meta,text) =>{
		   var gg = parseInt(text);
		   if(text == null || gg >= 100 || gg <= 1)
		   {
			   gg = 50;
		   }
		  meta.channel.fetchMessages({limit : gg})
			.then(messages => {
            meta.channel.bulkDelete(messages);
            messagesDeleted = messages.array().length; // number of messages deleted

            // Logging the number of messages deleted on both the channel and console.
            meta.channel.sendMessage("Deleteding messages successful. Total messages deleted: "+messagesDeleted);
			});
	   });*/
	/*bot.command(glados.main.prefix + 'cleanall')
	   .action((meta) =>{
		   meta.channel.fetchMessages()
			.then(messages => {
				for (var i = 0, len = messages.array().length; i < len; i++) {
					glados.SafeDelete(meta);
			}
            messagesDeleted = messages.array().length; // number of messages deleted

            // Logging the number of messages deleted on both the channel and console.
            meta.channel.sendMessage("Hiding messages successful. Total messages hided: "+messagesDeleted);
			});
	   });*/
	   // EXPERIMENTAL ^^ sometimes work sometimes doesn't :( disabled by default
    bot.command(glados.main.prefix + 'hi')
        .action((meta, arg) => {
            meta.channel.sendMessage("```lua\n" + "print('hello world!')```");
        });
    bot.command(glados.main.prefix + 'messageid')
        .action((meta, arg) => {
            meta.reply("'s Id is: " + meta.id);
        });
		
	bot.command(glados.main.prefix + 'setusername ["username"]')
        .action((meta, text) => {
            glados.isAdmin(meta.author.id,meta.guild.id, function(t) {
                if (!t) {
                    return meta.reply(glados.main.norights);
                }
				else if(text == null ||text == "")
				{
					return meta.reply("Can't set username to " + text);
				}
				else {
                    meta.client.user.setUsername(text);
					return meta.reply('Succesfully set my username to ' + text);
                }
            });
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
			if (text == null)
            {
              meta.channel.sendMessage('You want me to tell ... nothing ?');
            }
            else {
            glados.SafeDelete(meta,function(t) { if(t == true ) meta.channel.sendMessage(text);});
			}
        });

    bot.command(glados.main.prefix + 'setgame ["gamename"]')
        .action((meta, text) => {
            glados.isAdmin(meta.author.id,meta.guild.id, function(t) {
                if (!t) {
                    return meta.reply(glados.main.norights);
                } else {
                    meta.client.user.setGame(text);
                }
            });
        });
    bot.command(glados.main.prefix + 'voice ["what?"]')
        .action((meta, text) => {
			text == null ? meta.channel.sendMessage('I cant say nothing') : meta.channel.sendTTSMessage(text);
            meta.channel.sendTTSMessage(text);
        });
    bot.command(glados.main.prefix + 'sinfo')
        .action(meta => {
          meta.channel.sendMessage("", {embed: {
            color: 3447003,
            author: {
              name: meta.client.user.username,
              icon_url: meta.client.user.avatarURL
            },
            thumbnail : {url: (meta.channel.guild.splashURL) },
            title: 'Serverinfo for ' + meta.channel.guild.name + '\n',
            fields: [
              {
                name: '\nNumber of Roles:\n',
                value: meta.channel.guild.roles.size
              },
              {
                name: '\nCreation Time:\n',
                value: meta.channel.guild.createdAt
              },
              {
                name: '\nMemberCount:\n',
                value: meta.channel.guild.memberCount
              },
              /*
              {
                name: '\nOwner:\n',
                value: meta.channel.guild.owner
              },*/
            ],
            timestamp: new Date(),
            footer: {
              icon_url: meta.client.user.avatarURL,
              text: 'Updated: '
            }
          }});
        });
    bot.command(glados.main.prefix + 'status ["online|dnd|idle|invisible"]')
        .action((meta, text) => {
            let check = text;
            if (check != 'online' && check != 'dnd' && check != 'idle' && check != 'invisible') {
                meta.reply('This status does not exist!');
                return;
            } else {
                meta.client.user.setStatus(check);
            }
        });
    bot.command(glados.main.prefix + 'eval ["code"]')
        .action((meta, text) => {
            glados.isAdmin(meta.author.id,meta.guild.id, function(t) {
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
    /*
msg.channel.sendMessage("", {embed: {
  color: 3447003,
  author: {
    name: bot.user.username,
    icon_url: bot.user.avatarURL
  },
  title: 'This is an embed',
  url: 'http://google.com',
  description: 'This is a test embed to showcase what they look like and what they can do.',
  fields: [
    {
      name: 'Fields',
      value: 'They can have different fields with small headlines.'
    },
    {
      name: 'Masked links',
      value: 'You can put [masked links](http://google.com) inside of rich embeds.'
    },
    {
      name: 'Markdown',
      value: 'You can put all the usual Markdown inside of them.'
    }
  ],
  timestamp: new Date(),
  footer: {
    icon_url: bot.user.avatarURL,
    text: '© Example'
  }
}});
    */
    //this requires discord.js indev
    bot.command(glados.main.prefix + 'help')
        .action(meta => {
            meta.channel.sendMessage("", {
                embed: {
                    color: 3447003, //this are decimal color codes
                    author: {
                        name: meta.client.user.username,
                        icon_url: meta.client.user.avatarURL
                    },
                    title: 'All commands:',
                    url: glados.invitelink,
                    description: bot.help(),
                }
            });
        });
};