//////////////////////////////////////////////
const Discord = require('discord.js');
const client = new Discord.Client();
const vm = require('vm');
const bot = require('bot-commander');
const fs = require('fs');
const request = require('request');
const split = require('split');
const http = require('http');
const url = require('url');
const cheerio = require('cheerio');
const cleverbot = require('cleverbot.io');
//////////////////////////////////////////////
var prefix = '>',
    imgur = require('imgur-node-api'),
    path = require('path'),
    YouTube = require('youtube-node'),
    youTube = new YouTube(),
    path2 = process.cwd(),
    enabletranslation = false,
    sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('glados.db', sqlite3.OPEN_READWRITE),
    pastebin = "",
    webport = 8080,
    norights = "Insufficient client rights!";

//////////////////////////////////////////////
///XFPARSE 
function GetElemenent(element, callback) {
    fs.createReadStream(path2 + '/data/settings.xf')
        .pipe(split())
        .on('data', function(line) {
            //each chunk now is a seperate line! 
            ///remove spaces.
            if (line.includes(element)) {
                ///remove spaces.
                var process = line.replace(/ /g, "");

                //delete all brakets.
                var removebrakets = process.substring(1, process.length - 1);

                //format it to return our desired values...
                var a = removebrakets.search(":") + 1;
                var b = removebrakets.length - 1;
                //  element = removebrakets.substr(a,b)
                callback(removebrakets.substr(a, b));
                return;
            }
        });
}

//first we setup the discord api
GetElemenent("dtoken", function(eleme) {
    client.login(eleme);
});

////////////////////////////////////////////
client.on('ready', () => {
    console.log('Welcome to GLaDOS 2.0');
    client.user.setGame("Need help? Type >help");
    //init plugins
    fs.readdir('./plugins/', (err, files) => {
        files.forEach(file => {
            console.log("Loading plugin: " + file);
            bot.load('./plugins/' + file);
        });
    });
    console.log("Loading Settings...");
    //now 3rd party stuff
    GetElemenent("imgurtoken", function(eleme) {
        imgur.setClientID(eleme);
    });
    GetElemenent("yttoken", function(eleme) {
        youTube.setKey(eleme);
    });
    GetElemenent("pastebintoken", function(eleme) {
        exports.pastebin = eleme;
    });
    console.log("Finished loading Settings");

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

exports.isAdmin = function(discordid, callback) {
    db.get("SELECT COUNT(*) AS co FROM admins WHERE discordid = ?1", {
        1: discordid
    }, function(err, row) {
        if(err) {
            console.log("ERROR isAdmin: " + err);
            callback(false);
        }
        callback(row.co);
    });
}

exports.main = {
    prefix: prefix,
    imgur: imgur,
    youTube: youTube,
    vm: vm,
    sqlite3: sqlite3,
    db: db,
    request: request,
    http: http,
    url: url,
    webport: webport,
    cheerio: cheerio,
    client: client,
    norights: norights,
    cleverbot: cleverbot
};
