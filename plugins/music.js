//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS commands module. (c) Force67 & MasterZero
//
//////////////////////////////////////////////////////////////////////////
var glados = require('../glados.js');

const streamOptions = { seek: 0, volume: 1 };

module.exports = bot => {

    bot.command(glados.main.prefix + 'play ["url"]')
        .action((meta, text) => {
            meta.member.voiceChannel.join()
			.then(connection => {
				const stream = glados.main.ytdl(text, {filter : 'audioonly'});
   				const dispatcher = connection.playStream(stream, streamOptions);
				})
			.catch(console.error);
     });
};
