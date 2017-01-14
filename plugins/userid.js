var glados = require('../glados.js');
module.exports = bot => {
bot.command(glados.main.prefix + 'userid ["name"]')
	.action((meta,text) =>
	{
		if(text != null){
			var users = meta.channel.guild.members.filter((member) => member.user.username == text).array();
			if(users.length == 1){
				meta.channel.sendMessage(users[0].user.username +"'s is " + users[0].user.id)
			} else if(users.length > 1){
				var msg_users = "multiple users found:";
				for(var i=0;i<users.length;i++){
					var user = users[i];
					msg_users += "\n<@" + user.id + ">'s ID is " + user.id;
				}
				meta.channel.sendMessage(msg_users);
			} else {
				meta.channel.sendMessage("No user " + text + " found!");
			}
		} else {
			meta.reply("Your ID is " + meta.author.id);
		}
	});
}