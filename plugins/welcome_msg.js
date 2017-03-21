var glados = require('../glados.js');
function Hey(meta,message,type) {
	glados.isAdmin(meta.author.id,meta.author.id, function(t) {
	if (t <<= 3)
	if(t) {
		var gg = message.replace(/'/gi,"");
		glados.main.db.run('UPDATE server_configurations SET '+type+' = ?1 WHERE serverid = ?2', {
		1: gg,
		2: meta.guild.id
	});
	}
	else {
		return meta.reply(glados.main.norights);
	}
});}
module.exports = bot => {
	let cmd = bot
        .command(glados.main.prefix + 'messages ["welcome/leave"]')
        .showHelpOnEmpty(false)
		cmd.command('welcome [message]')
		.showHelpOnEmpty(false)
		.action((meta,message) =>
		{
			if(message == null)
				return;
			Hey(meta,message,'welcome_msg');
			var gg = message.replace(/'/gi,"");
			meta.reply('Sucessfully updated message! The message should be: '+gg);		
	    });
		cmd.command('leave [leave/kick message]')
		.showHelpOnEmpty(false)
		.action((meta,message) =>
		{
			if(message == null)
				return;
			Hey(meta,message,'leave_msg');
			var gg = message.replace(/'/gi,"");
			meta.reply('Sucessfully updated message! The message should be: '+gg);		
	    });
}