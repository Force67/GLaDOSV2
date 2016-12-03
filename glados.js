//////////////////////////////////////////////
const Discord = require('discord.js');
const client = new Discord.Client();
const vm = require('vm');
const bot = require('bot-commander');
const fs = require('fs');
const request = require('request');
//////////////////////////////////////////////
var prefix = '>',
    imgur = require('imgur-node-api'),
    path = require('path'),
    YouTube = require('youtube-node'),
    youTube = new YouTube(),
    enabletranslation = false,
    sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('glados.db', sqlite3.OPEN_READWRITE);
//////////////////////////////////////////////
client.on('ready', () => {
    console.log('Welcome to GLaDOS 2.0');
    //init plugins
    fs.readdir('./plugins/', (err, files) => {
        files.forEach(file => {
            console.log("Loading plugin: " + file);
            bot.load('./plugins/' + file);
        });
    })
    //init imgur
    imgur.setClientID("bf01b508a810247");
    //youtube
    youTube.setKey('AIzaSyCVqkO07JjKZyenxdEub4n2RE22a7P3Qhs');
    //youtube.addParam('type', 'video');
    enabletranslation = true;
});

var googleTranslate = require('google-translate')('AIzaSyCVqkO07JjKZyenxdEub4n2RE22a7P3Qhs');


//////////////////////////////////////////////////////////////////////////
//
//  New command system - ZERO LOVE! <3
//
//////////////////////////////////////////////////////////////////////////

client.on('message', msg => {
    bot.parse(msg.content, msg);
});
//https://eslachance.gitbooks.io/discord-js-bot-guide/content/samples/message_reply_array.html

function _implcheckid(id, callback) {
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('IDS.txt')
    });

    lineReader.on('line', function(line) {
        console.log('Verifying id:', line);
        found = false;
        if (line === id) {
            console.log("Found admin ID!");
            callback(true);
        }
    });
}

var md5 = require("md5");

function createHash(myString) {
    return md5(myString);
}

function setgamehandler(msg) {
    _implcheckid(msg.author.id, function(t) {
        if (t) {
            //      let args = msg.content.split(" ").slice(1);
            // args[0]
            let gametext = parameter(7, msg.content);
            client.user.setGame(gametext);
            //!!!!!!!
            msg.channel.sendMessage("it can be that you have to reload the catche (F5) to see the game changed!");
        }
        //uhm wont ever be called ... 'ide' should know lol
        else {
            console.log("missing permission!");
        }
    });
}

client.login('MjM2MjQxODY4ODEwMjIzNjE2.CuGQ6A.KPIZIfTWQAbDXnaQXnOsb2VFV24');
exports.main = {
    prefix: prefix,
    imgur: imgur,
    youTube: youTube,
    vm : vm,
    request: request
};

//////////////////////////////////////////////
/*client.on('message', message => {

    //db.run("INSERT INTO messages (userid) VALUES(?1)", { 1: message.author.id });

/*


    } else if (message.content.startsWith(prefix + 'setgame')) {
        //implement changegame handler
        setgamehandler(message);
    } else if (message.content.startsWith(prefix + 'md5')) {
        let args = message.content.split(' ').split(1);
        try {
            message.reply(createHash(args[0]));
        } catch (err) {
            message.reply("u dun fucked up!");
        }
    } else if (message.content.startsWith(prefix + 'play')) {
        try {
            var connection = client.internal.voiceConnection;
        } catch (err) {
            message.channel.sendMessage(err);
        }

    } else if (message.content.startsWith(prefix + 'trs')) {
        let args = message.content.split(" ").slice(1);
        if (enabletranslation) {
            try {

                googleTranslate.translate(args[0], 'es', function(err, translation) {
                    message.channel.sendMessage(translation.translatedText);
                    // =>  Mi nombre es Brandon
                });
            } catch (err) {
                message.channel.sendMessage('Exeption at @ ' + err);
            }

        } else {
            message.channel.sendMessage('translate module not unlocked yet !');
        }

    /*} else if (message.content === prefix + 'countmessages') {
        db.get("SELECT COUNT(*) AS co FROM messages WHERE userid = ?1", { 1: message.author.id }, function (err, row) {
            message.reply("You have written " + row.co + " times!");
        });*/
/*
    } else if (message.content.startsWith(prefix + 'scc')) {
        let args = message.content.split(" ").slice(1);
        if(args[0] == "add") { //commandname[1], code[2]
            //prüfen ob es diesen command schon für dieser serverid gibt
            db.get("SELECT COUNT(*) AS co FROM scc WHERE command = ?1 AND serverid = ?2", { 1: args[1], 2: message.guild.id  }, function (err, row) {
                if(row.co || args[1] == "add") {
                    message.reply("SCC command " + args[1] + " already exist for this server or is reserved!");
                } else {
                    //we only care about argument 
                    try
                    {
                    var finalinsert = args.join().slice(0);
                    //add time return new Date().getTime();
                    var morefinalinsert = finalinsert.substr(4,finalinsert.length);
                    var veryfinalinsert = morefinalinsert.split(",").join(" ");
                    message.reply(veryfinalinsert);
                    }
                    catch (e)
                    {
                        message.reply("The issue seems to be " + e);
                    }
                                                                                                    // args[2]
                    db.run("INSERT INTO scc (command, code, serverid) VALUES(?1, ?2, ?3)", { 1: args[1], 2: veryfinalinsert, 3: message.guild.id });
                    message.reply("SCC command " + args[1] + " added for this server!");
                }
            });
        } else {
            db.get("SELECT COUNT(*) AS co FROM scc WHERE command = ?1 AND serverid = ?2", { 1: args[0], 2: message.guild.id  }, function (err, row) {
                if(row.co) {
                    db.get("SELECT * FROM scc WHERE command = ?1 AND serverid = ?2", { 1: args[0], 2: message.guild.id  }, function (err, row) {
                        try {
                            const script = new vm.Script(row.code, {
                                filename: 'myfile.vm'
                            });
                            message.channel.sendMessage(script.runInThisContext());
                        } catch (e) {
                            message.channel.sendMessage("exception: " + e.message);
                        }
                    });
                } else {
                    message.reply("SCC command " + args[0] + " not exist!");
                }
            });
        }
        //
    }
});
*/
