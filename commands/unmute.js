const be = require('../backend/main')
const config = require('../config.json')

exports.run = (client, message, args) => {
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
            "description": "Zeg alsjeblieft **wie** ik moet unmuten.",
            "color": 13632027
        }
    })

    const muteMember = message.mentions.members.first()

    muteMember.removeRole('469203872640925706').then(member => {
        message.channel.send({
            "embed": {
                "title": "🔇 Mute",
                "description": `**${member.user.username}** is succesvol geunmute.`,
                "color": 8794020
            }
        })
    })
}
