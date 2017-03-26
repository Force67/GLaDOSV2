var glados = require('../glados.js');

function random_select(arg) {
    return String(arguments[Math.floor(Math.random() * arguments.length)]);
}

module.exports = bot => {

    bot.command(glados.main.prefix + '8ball')
        .action((meta) => {
            meta.channel.sendMessage(random_select(':8ball: It is certain', ':8ball: It is decidedly so', ':8ball: Without a doubt', ':8ball: Yes, definitely', ':8ball: Don\'t count on it', ':8ball: My reply is no', ':8ball: Outlook not so good', ':8ball: Very doubtful', ':8ball: Most likely', ':8ball: Reply hazy try again', ':8ball: Better not tell you now', ':8ball: Concentrate and ask again', ':8ball: My sources say no', ':8ball: You may rely on it', ':8ball: Cannot predict now', ':8ball: Concentrate and ask again', ':8ball: Ask again later', ':8ball: As I see it, yes'));
        });
    bot.command(glados.main.prefix + 'catfact')
        .action((meta) => {
            glados.main.request('https://catfacts-api.appspot.com/api/facts', function(error, response, html) {
                meta.reply(html.slice(0, -22).substring(12));
                //var gg = JSON.parse(html.facts);
                //meta.reply(gg);
            });
        });
}