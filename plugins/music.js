//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS music(bot) module. (c) Force67 & MasterZero
//
//////////////////////////////////////////////////////////////////////////
const glados = require('../glados.js');
const streamOptions = {
    seek: 0,
    volume: 1
};

var playlist = [];
var playlistfrom = [];
var ready = true;
var allowed = true;
var channelid = '256524366928412672';

module.exports = bot => {

    let cmd = bot
        .command(glados.main.prefix + 'music')
        .showHelpOnEmpty(false)

    cmd.command('play ["url"]')
        .action((meta, text) => {
            if (text == null || meta.channel.id != channelid || allowed == false) {
                return;
            }
            meta.delete();
            glados.main.ytinfo(youtube_parser(text), function(err, videoInfo) {
                if (!err) {
                    playlist.push(youtube_parser(text));
                    playlistfrom.push(meta.author.id);
                    meta.reply("your song was added!");
                    playNextSong();
                }
            });
        });

    cmd.command('wishes status')
        .action((meta) => {
            if (meta.channel.id != channelid) {
                return;
            }
            glados.isAdmin(meta.author.id, function(t) {
                if (t) {
                    meta.delete();
                    if (allowed === false) {
                        allowed = true;
                        meta.channel.sendMessage("", {
                            embed: {
                                color: 65297,
                                author: {
                                    name: "GLaDOS Music Service",
                                    icon_url: "https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/volume-24-128.png"
                                },
                                title: 'Wish status:',
                                description: "music wishes enabled!",
                            }
                        });
                    } else {
                        allowed = false;
                        meta.channel.sendMessage("", {
                            embed: {
                                color: 65297,
                                author: {
                                    name: "GLaDOS Music Service",
                                    icon_url: "https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/volume-24-128.png"
                                },
                                title: 'Wish status:',
                                description: "music wishes disabled!",
                            }
                        });
                    }
                }
            });
        });
};

function playNextSong() {
    if (ready === false)
        return;

    if (playlist.length < 1) {
        let chan = glados.main.client.channels.get(channelid);
        return chan.sendMessage("", {
            embed: {
                color: 65297,
                author: {
                    name: "GLaDOS Music Service",
                    icon_url: "https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/volume-24-128.png"
                },
                title: 'Playlist',
                description: "The playlist is empty! Add a new Song: >music play YOUTUBEURL",
            }
        });
    }
    ready = false;
    let stream = glados.main.ytdl("https://www.youtube.com/watch?v=" + playlist[0], {
        filter: 'audioonly'
    });
    let dispatcher = glados.voiceC.connection.playStream(stream, streamOptions);
    glados.main.ytinfo(playlist[0], function(err, videoInfo) {
        let chan = glados.main.client.channels.get(channelid);
        chan.sendMessage("", {
            embed: {
                color: 65297,
                author: {
                    name: "GLaDOS Music Service",
                    icon_url: "https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/volume-24-128.png"
                },
                title: 'Now playing:',
                description: " **" + videoInfo.title + "** requested by <@" + playlistfrom[0] + ">",
            }
        });
    });
    playlist.splice(0, 1);
    playlistfrom.splice(0, 1);
    dispatcher.on('end', () => {
        ready = true;
        playNextSong();
    });
}

function youtube_parser(url) { //from stackovershit
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}