const config = require('../config.json')

exports.run = (client, message, args) => {
    const guild = message.guild

    config.privechannels++

    var str = "" + parseInt(config.privechannels)
    var pad = "0000"
    var number = pad.substring(0, pad.length - str.length) + str

    guild.createRole({
        name: `role-${number}`,
        permissions: 67492928
    }).then(role => {
        guild.createChannel(`prive-${number}`, 'text', [{
            id: guild.id,
            deny: 67492928
        },{
            id: role.id,
            allow: 67492928
        }])
        .then(channel => {
            message.member.addRole(role).then(() => {
                message.channel.send({
                    "embed": {
                        "title": "🔒 Prive",
                        "description": `Je privegesprek is aangemaakt genaamd **${channel.name}**`,
                        "color": 8750469
                    }
                })
            
                channel.send({
                    "embed": {
                        "title": "🔒 Prive",
                        "description": `Dit prive gesprek is aangemaakt door **${message.author.username}**`,
                        "color": 8750469,
                        "fields": [
                            {
                            "name": "Onderwerp",
                            "value": `*${args.join(' ') || 'niet opgegeven'}*\n\nDe medewerkers van TrusHosting zullen u zo snel mogelijk proberen te helpen, maar ze hebben natuurlijk niet alle tijd van de wereld, dus het kan even duren. Alvast bedankt voor het wachten.`
                            }
                        ]
                    }
                })
            }).catch(error => console.log(error))
        })
        .catch(err => console.error(err))
    })
}
