// This module for GlaDos was made by BlackOfWorld
var glados = require('../glados.js');
function ban(userid) {
	glados.main.db.run("INSERT INTO blockedusers(discordid) VALUES (?1)", { 1: userid
	});
};
function unban(userid) {
	glados.main.db.run('DELETE FROM blockedusers WHERE discordid = ?1', {
		1: userid
	});
};

module.exports = bot => {
bot.command(glados.main.prefix + 'ban ["name"]')
	   .action((meta,text) => {
		   glados.isAdmin(meta.author.id,function(t) { 
		   if(!t)
		   {
			   return meta.reply('You are not allowed to use this command!');
		   }
		   else {
			var users = meta.channel.guild.members.filter((member) => member.user.username == text).array();
			meta.delete();
			if(users.length == 1){
				glados.isBanned(users[0].user.id,function(t) {
				if(t) {
					return meta.reply('User is already banned!');
				}
				else {
					ban(users[0].user.id,meta.author.id);
					return meta.channel.sendMessage('Everybody! <@'+users[0].user.id+'> is now banned from using GLaDOS by <@' + meta.author.id + '>. Lets celebrate!');
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
bot.command(glados.main.prefix + 'unban ["name"]')
   .action((meta,text) => {
		   glados.isAdmin(meta.author.id,function(t) { 
		   if(!t)
		   {
			   return meta.reply('You are not allowed to use this command!');
		   }
		   else {
			var users = meta.channel.guild.members.filter((member) => member.user.username == text).array();
			meta.delete();
			if(users.length == 1){
				glados.isBanned(users[0].user.id,function(t) {
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