// This module for GlaDos was made by BlackOfWorld
var glados = require('../glados.js');
function ban(userid,serverid) {
	glados.main.db.run("INSERT INTO blockedusers(discordid,serverid) VALUES (?1,?2)", { 1: userid, 2: serverid
	});
};
function unban(userid) {
	glados.main.db.run('DELETE FROM blockedusers WHERE discordid = ?1', {
		1: userid
	});
};

module.exports = bot => {
bot.command(glados.main.prefix + 'block ["name"] ["global"]')
	   .action((meta,text,global) => {
		   glados.isAdmin(meta.author.id,meta.guild.id,function(t) { 
		   if(t != 5)
		   {
			   return meta.reply('You are not allowed to use this command!');
		   }
		   else {
			var users = meta.channel.guild.members.filter((member) => member.user.username == text).array();
			glados.SafeDelete(meta,function(t) { if(t == true )
							if(users.length == 1){
				glados.isBanned(users[0].user.id,meta.guild.id,function(K) {
				if(K) {
					return meta.reply('User is already banned!');
				}
				else {
					if(global == 'yes')
						ban(users[0].user.id,'GLOBAL');
					else
						ban(users[0].user.id,meta.guild.id);
					return meta.channel.sendMessage('Everybody! <@'+users[0].user.id+'> is now banned from using GLaDOS by <@' + meta.author.id + '>. Lets celebrate!');
				}
				});
			} else if(users.length > 1){
				meta.channel.sendMessage('Multiple users found! No action has been made!');
				meta.channel.sendMessage('No action has been made!');
			} else {
				meta.channel.sendMessage("No user " + text + " found!");
			}
				});

		   }
		   });
});
bot.command(glados.main.prefix + 'unblock ["name"]')
   .action((meta,text) => {
		   glados.isAdmin(meta.author.id,meta.guild.id,function(t) { 
		   if(!t)
		   {
			   return meta.reply('You are not allowed to use this command!');
		   }
		   else {
			var users = meta.channel.guild.members.filter((member) => member.user.username == text).array();
			glados.SafeDelete(meta,function(t) { if(t != true ) return;});
			if(users.length == 1){
				glados.isBanned(users[0].user.id,meta.guild.id,function(t) {
				if(!t) {
					return meta.reply('User is not banned!');
				}
				else {
					unban(users[0].user.id);
					return meta.channel.sendMessage('Ahh! <@' + users[0].user.id + '> is now unbanned from using GlaDos by <@' + meta.author.id + '>. So sad that I need to start working for him... Again');
				}
				});
			} else if(users.length > 1){
				meta.channel.sendMessage('Multiple users found! No action has been made!');
				meta.channel.sendMessage('No action has been made!');
			} else {
				meta.channel.sendMessage("No user " + text + " found!");
			}
		   }
		   });
});
}