//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS Discord Bot. Developed by Force67 & MasterZero
//
//////////////////////////////////////////////////////////////////////////

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
const ytdl = require('ytdl-core');
const ytinfo = require('youtube-info');
const moment = require("moment");
const momentformat = require("moment-duration-format");
const readline = require('readline');
const humanizeDuration = require('humanize-duration');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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
  invitelink = "",
  hackerearth = "",
  admpw = "",
  admusr = "",
  norights = "Insufficient client rights!",
  voiceC = null;

//////////////////////////////////////////////

function Setupifneeded()
{
  var dir = path2 + '/data/settings/'
  if (!fs.existsSync(dir))
  {
    fs.mkdirSync(dir);
    console.log('Put the example settings file in ' + dir + ' and enter your tokens.\n Then start the bot again!');
    var sleep = require('sleep');
    sleep.sleep(8);
    process.exit(1);
  }
}

Setupifneeded();

function ReadJson(callback)
{
fs.readFile(path2 + '/data/settings/settings.json', 'utf8', function (err, data) {
    if (err) throw err;
    callback(JSON.parse(data));
    });
}

ReadJson( function (t)
{
  client.login(t.dtoken);
});

////////////////////////////////////////////

client.on('ready', () => {
    console.log('Welcome to GLaDOS 2.2');
    //voice connect
  //  var vc = client.channels.get('259776446942150658');
  //  vc.join().catch("Can't connect to voice!");
  //  exports.voiceC = vc;



    console.log("Loading Settings...");

  ReadJson( function (eleme)
  {
      imgur.setClientID(eleme.imgurtoken);
      youTube.setKey(eleme.yttoken);
      exports.pastebin =  eleme.pastebintoken;
      client.user.setGame(eleme.defaultgame);
      webport = eleme.webinterfaceport;
      admpw = eleme.admpw;
      hackerearth = eleme.hackerearth;
      admusr = eleme.admusr;
        if (eleme.rndavatar == true)
        {
          //2 images
          var avartar = Math.random() * (3 - 1) + 1;
          switch (Math.ceil(avartar - 1))
          {
              case 1:
                  client.user.setAvatar('./data/strtup/avatar/glados_1.jpg');
                  break;
              case 2:
                  client.user.setAvatar('./data/strtup/avatar/glados_2.jpg');
                  break;
          }
        }
	  //init plugins
      fs.readdir('./plugins/', (err, files) => {
          files.forEach(file => {
              if (file == "admininterface.js" && eleme.enablewebinterface === 0)
              {
                console.log("Webinterface is disabled!");
              }
              else {
                console.log("Loading plugin: " + file);
                bot.load('./plugins/' + file);
              }
          });
      });
      exports.webpw = admpw;
      exports.webusr= admusr;
      exports.hkearthsecret = hackerearth;

      console.log("Finished loading Settings");
  });
    });
    //our bot invite link
    exports.invitelink = 'https://discordapp.com/oauth2/authorize?client_id=' + client.user.id + '&scope=bot&permissions=0';
    enabletranslation = true;
});

//////////////////////////////////////////////

client.on('message', msg => {
	if(msg.content.startsWith(prefix))
	{
	exports.isBanned(msg.author.id,function (t)	{
		t ? msg.reply('You are banned from using GLaDOS.') : bot.parse(msg.content, msg);
		});
	}
});

//////////////////////////////////////////////

exports.isAdmin = function (discordid, callback) {
    db.get("SELECT COUNT(*) AS co FROM admins WHERE discordid = ?1", {
        1: discordid
    }, function (err, row) {
        if (err) {
            console.log("ERROR isAdmin: " + err);
            callback(false);
        }
        callback(row.co);
    });
}

exports.main = {
    prefix: prefix,
    Discord: Discord,
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
    path2 : path2,
    client: client,
    humanizeDuration: humanizeDuration,
    norights: norights,
    ytdl: ytdl,
    cleverbot: cleverbot,
    ytinfo: ytinfo,
    moment: moment,
    momentformat: momentformat
};
