//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS download module. (c) Force67 & MasterZero
//
//////////////////////////////////////////////////////////////////////////
var glados = require('../glados.js');
var request = require('request');
var fs = require('fs');
module.exports = bot => {
    bot.command(glados.main.prefix + 'download [website] [filename]')
	    .action((meta,text,arg) => {
		glados.isAdmin(meta.author.id, function(t) {
		if(!t) {
			 return meta.reply(glados.main.norights);
		}
		else
		{
			if(text == null || arg == null)
				return meta.reply("You must put some arguments to download.")
			request.get(text,function(err,res,body){
			if(err)
				return meta.reply(err)
			if(res.statusCode == 200  && res.statusCode !== 404)
			{
				var stream = fs.createWriteStream('plugins/' + arg);
				stream.write(new Buffer(body));
				console.log("Loading plugin: " + arg);
				bot.load('plugins/' + arg);
			}
		}).on('error',function(err) { });
	}
});
});
}