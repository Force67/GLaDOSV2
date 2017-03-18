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
var prefix = '<',
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
  norights = "Insufficient client rights!",
  voiceC = null;
var bot_perms = [
  "MANAGE_CHANNELS",
  "MANAGE_GUILD",
  "KICK_MEMBERS",
  "EMBED_LINKS",
  "ATTACH_FILES",
  "READ_MESSAGE_HISTORY",
  "READ_MESSAGES",
  "SEND_MESSAGES",
  "SEND_TTS_MESSAGES",
  "MANAGE_MESSAGES",
  "MANAGE_NICKNAMES", // change nicknames of others
  //"MANAGE_ROLES_OR_PERMISSIONS",
  "BAN_MEMBERS"
];
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
    console.log('Welcome to GLaDOS 2.0');
    //voice connect
    var vc = client.channels.get('280351378524602370');
    vc.join().catch("Can't connect to voice!");
    exports.voiceC = vc;
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
          var avartar = Math.random() * (4 - 1) + 1;
          switch (Math.ceil(avartar - 1))
          {
              case 1:
                  client.user.setAvatar('./data/strtup/avatar/glados_1.jpg');
                  break;
              case 2:
                  client.user.setAvatar('./data/strtup/avatar/glados_2.jpg');
                  break;
              case 3:
                  client.user.setAvatar('./data/strtup/avatar/glados_3.jpg');
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
    });
    //our bot invite link
    exports.invitelink = 'https://discordapp.com/oauth2/authorize?client_id=' + client.user.id + '&scope=bot&permissions=0';
    console.log("Finished loading Settings");
    enabletranslation = true;
});

//////////////////////////////////////////////

client.on('message', msg => {
	if(msg.content.includes(prefix) || msg.content.includes('<@'+client.user.id+'>'))
	{
	if(msg.author.id == client.user.id || msg.author.bot)
		return;
	exports.isAdmin(msg.author.id, msg.channel.guild.id,(function(j)
	{
	if(j)
		return bot.parse(msg.content, msg);
	else
	{
	exports.isBanned(msg.author.id,msg.channel.guild.id,function(t)
	{
	if(t == msg.channel.guild.id || t == null)
		return;
	else
	return bot.parse(msg.content, msg);
	});
	}
	}));
	}
});
client.on('guildMemberAdd',(member) => {//WHERE serverid = ?1", { 1: client.guild.id }
	db.get("SELECT welcome_msg AS msg FROM server_configurations WHERE serverid = ?1", {
		1: member.guild.id
	}, function(err, row) {
	var tmp = row.msg.replace('{user}',"<@"+member.user.id +"> ");
	var final_msg = tmp.replace('{help}',prefix+"help");
	member.guild.channels.get(member.guild.id).sendMessage(final_msg); //"<@"+member.user.id +"> " + row.msg
});
});
client.on('guildCreate',(guild) => { // 
	guild.channels.get(guild.defaultChannel.id).sendMessage("Hello @everyone! I was invited to your channel. Thank you for iviting me!");
	guild.channels.get(guild.defaultChannel.id).sendCode("Please give me some permissions I need: \n" + bot_perms);
	db.run("INSERT INTO server_configurations (serverid, welcome_msg, leave_msg) VALUES(?1, ?2, ?3)", {
		1: guild.id,
		2: 'Defalut welcome message',
		3: 'Default leave message'
	});
});
client.on('guildMemberRemove',(member) => {
	db.get("SELECT leave_msg AS msg FROM server_configurations WHERE serverid = ?1", {
		1: member.guild.id
	}, function(err, row) {
	var tmp = row.msg.replace('{user}',"<@"+member.user.id +"> ");
	member.guild.channels.get(member.guild.id).sendMessage(tmp); //"<@"+member.user.id +"> " + row.msg
});
});
client.on('disconnect', (event) => {
	console.log('Disconnected: ' + event.reason + ' (' + event.code + ')');
});
client.on('reconnecting', () => {
	console.log('Trying to reconnect!');
});
client.on('error',(error) => {
	console.error('Error in client! Error: '+error.message);
	application.exit();
//////////////////////////////////////////////
});

exports.isAdmin = function (discordid,serverid,callback) {
    db.get("SELECT serverid AS guildid, rank AS co FROM admins WHERE discordid = ?1", {
        1: discordid
    }, function (err, row) {
        if (err) {
            console.log("ERROR isAdmin: " + err);
            return callback(false);
        }
		if(row == [] || row == null || row == undefined)
		{
			return callback(false);
		}
		if(row.guildid == "GLOBAL")
		{
			return callback(row.co);
		}
		if(row.guildid == serverid)
		{
			return callback(row.co);
		}
		if(row == [] || row == null || row == undefined)
		{
			return callback(false);
		}
		callback(false);
    });
}
exports.isBanned = function (discordid,serverid, callback) {
    db.get("SELECT serverid AS co FROM blockedusers WHERE discordid = ?1", {
        1: discordid
    }, function (err, row) {
        if (err) {
            console.log("ERROR isBanned: " + err);
            return callback(false);
        }
	    if(row == undefined)
		return callback(false);
		if(row.co == serverid)
			return callback(true);
		if(row.co == 'GLOBAL')
			return callback(true);
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
