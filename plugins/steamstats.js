var glados = require('../glados.js');
module.exports = bot => {

    bot.command(glados.main.prefix + 'steamstats')

        .action((meta) => {

            meta.channel.sendMessage(`**Checking Status of Steam..**`).then(m => {
                glados.main.request('http://steamgaug.es/api/v2', function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var info = JSON.parse(body)
                    } else {
                        m.edit(`API seems to be down, try again soon.`)
                        return;
                    }

                    var empty = "";
                    message = (`\`\`\`ini
[Steam Status]
Steam: ${info.ISteamClient.online} ${empty}
Steam Community: ${info.SteamCommunity.online} (${info.SteamCommunity.time}ms)
Steam Store: ${info.SteamStore.online} (${info.SteamStore.time}ms)
Steam User API: ${info.ISteamUser.online} (${info.ISteamUser.time}ms)
[Dota 2 Status]
API: ${info.IEconItems[570].online} (${info.IEconItems[570].time}ms)
Game Coordinator: ${info.ISteamGameCoordinator[570].online} ${empty}
Players Searching: ${info.ISteamGameCoordinator[570].stats.players_searching}
[CS:GO Status]
API: ${info.IEconItems[730].online} (${info.IEconItems[730].time}ms)
Game Coordinator: ${info.ISteamGameCoordinator[730].online} ${empty}
Players Searching: ${info.ISteamGameCoordinator[730].stats.players_searching}, with an average wait time of ${glados.main.humanizeDuration(info.ISteamGameCoordinator[730].stats.average_wait)}.
[TF2 Status]
API: ${info.IEconItems[440].online} (${info.IEconItems[440].time}ms)
Game Coordinator: ${info.ISteamGameCoordinator[440].online} ${empty}
\`\`\``)
                    message = message.replace(/: 1 /g, ": Online ");
                    message = message.replace(/: 2 /g, ": Offline ");
                    m.edit(message)
                })
            })
        })
};