const be = require('../backend/main')
const config = require('../config.json')

exports.run = (client, message, [mention, ...reason]) => {
    const adminRole = message.guild.roles.find("name", "Medewerker")
    if (!adminRole) return console.log(`The role ${adminRole} doesn't exist`)

    be.getPermissions(client, message, config.needsPermission)

    if (!message.member.roles.has(adminRole.id)) {
        message.channel.send({
            "embed": {
                "title": "🔇 Mute",
                "description": `Het spijt me **${message.author.username}**, maar jij mag dat niet doen.`,
                "color": 13632027
            }
        })
    }

    if (message.mentions.members.size === 0) return message.channel.send({
        "embed": {
            "title": "🔇 Mute",
            "description": "Zeg alsjeblieft **wie** ik moet muten.",
            "color": 13632027
        }
    })

    const muteMember = message.mentions.members.first()

    if (reason[0] !== undefined) {
        muteMember.addRole('469203872640925706').then(member => {
            message.channel.send({
                "embed": {
                    "title": "🔇 Mute",
                    "description": `**${member.user.username}** is succesvol gemute voor **${reason.join(" ")}**.`,
                    "color": 8794020
                }
            })
        })
    } else {
        muteMember.addRole('469203872640925706').then(member => {
            message.channel.send({
                "embed": {
                    "title": "🔇 Mute",
                    "description": `**${member.user.username}** is succesvol gemute.`,
                    "color": 8794020
                }
            })
        })
    }
}
