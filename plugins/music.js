//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS commands module. (c) Force67 & MasterZero
//
//////////////////////////////////////////////////////////////////////////
var glados = require('../glados.js');

const streamOptions = { seek: 0, volume: 1 };

module.exports = bot => {

    //play from stream //not working taken from (https://gist.github.com/meew0/cc4027f17b957fcccb1a)
    bot.command(glados.main.prefix + 'play ["url"]')
        .action((meta, text) => {
            for (var channel of meta.channel.server.channels) {
			// If the channel is a voice channel, ...
			if (channel instanceof glados.main.Discord.VoiceChannel) {
				// ... reply with the channel name and the ID ...
				client.reply(m, meta.channel.name + " - " + channel.id);
				// ... and join the channel
				client.joinVoiceChannel(channel).catch(error);
				// Afterwards, break the loop so the bot doesn't join any other voice
				// channels
				break;
            }}
     });
};
