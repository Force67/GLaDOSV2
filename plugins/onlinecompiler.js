//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS online compiler module. Made by Force67 in 2017
//
//////////////////////////////////////////////////////////////////////////
//> Powered with hackerearth
var glados = require('../glados.js');
var hkearth = require('hackerearth-node');
var hkearth = new hkearth(
    glados.hkearthsecret,
    '' // by default it runs in asnyc mode ! :)
);

module.exports = bot => {
    let cmd = bot
        .command(glados.main.prefix + 'compile')
        .showHelpOnEmpty(false)

    cmd.command('cpp ["code"]')
        .showHelpOnEmpty(false)
        .action((meta, text) => {
            //  var goodtext = text.replace(/(')/g, "");


            var config = {};
            config.time_limit = 1; //your time limit in integer
            config.memory_limit = 323244; //your memory limit in integer
            config.source = text; //your source code for which you want to use hackerEarth api
            config.input = ""; //input against which you have to test your source code
            config.language = "C++"; //optional choose any one of them or none

            //now make a request for compiling online and get the result :)
            hkearth.compile(config)
                .then(result => {
                    meta.reply(result);
                })
                .catch(err => {
                    meta.reply('Something went wrong (' + err + ')');

                });
        });
};