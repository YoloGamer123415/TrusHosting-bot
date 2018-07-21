const be = require('../backend/main')
const config = require('../config.json')

exports.run = (client, message, [mention, ...reason]) => {
    const adminRole = message.guild.roles.find("name", "Medewerker")
    if (!adminRole) return console.log(`The role ${adminRole} doesn't exist`)
    
    be.getPermissions(client, message, config.needsPermission)

    if (!message.member.roles.has(adminRole.id)) {
        message.channel.send({
            "embed": {
                "title": "👞 Kick",
                "description": `Het spijt me **${message.author.username}**, maar jij mag dat niet doen.`,
                "color": 13632027
            }
        })
    }

    if (message.mentions.members.size === 0) return message.channel.send({
        "embed": {
            "title": "👞 Kick failed",
            "description": "Zeg alsjeblieft **wie** ik moet kicken.",
            "color": 13632027
        }
    })

    const kickMember = message.mentions.members.first()

    if (reason[0] !== undefined) {
        kickMember.kick(reason.join(" ")).then(member => {
            message.channel.send({
                "embed": {
                    "title": "👞 Kick",
                    "description": `**${member.user.username}** is succesvol gekickt voor **${reason.join(" ")}**.`,
                    "color": 8794020
                }
            })
        })
    } else {
        message.channel.send({
            "embed": {
                "title": "👞 Kick",
                "description": "Geef alsjeblieft een **reden** waarom ik deze persoon moet kicken.",
                "color": 13632027
            }
        })
    }
}
