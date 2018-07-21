const be = require('../backend/main')
const config = require('../config.json')

exports.run = (client, message, [mention, ...args]) => {
    const adminRole = message.guild.roles.find("name", "Medewerker")

    be.getPermissions(client, message, config.needsPermission)

    if (!message.member.roles.has(adminRole.id)) return message.channel.send({
        "embed": {
            "title": "🔨 Ban",
            "description": `Het spijt me **${message.author.username}**, maar jij mag dit niet doen.`,
            "color": 13632027
        }
    })

    if (message.mentions.members.size === 0) return message.channel.send({
        "embed": {
            "title": "🔨 Ban",
            "description": "Zeg alsjeblieft **wie** ik moet bannen.",
            "color": 13632027
        }
    })

    const banMember = message.mentions.members.first()
    const days = args[0];
    const reason = args.splice(1, args.length - 1).join(" ")

    if (days <= 7) {
        if (!reason) {
            message.channel.send({
                "embed": {
                    "title": "🔨 Ban",
                    "description": "Geef alsjeblieft ook een **reden** waarom ik deze persoon moet bannen.",
                    "color": 13632027
                }
            })
        } else {
            banMember.ban({ days, reason })
            .then(member => {
                message.channel.send({
                    "embed": {
                        "title": "🔨 Ban!",
                        "description": `Een persoon genaamd **${member.user.username}** is gebanned voor **${days}** dag(en) want **${reason}** ! Hoera!`,
                        "color": 8794020
                    }
                })
            })
        }
    } else if (days >= 8) {
        message.channel.send({
            "embed": {
                "title": "🔨 Ban",
                "description": `Het spijt me **${message.author.username}**, maar ik kan alleen maar mensen bannen voor een maximum van **7** dagen.`,
                "color": 13632027
            }
        })
    }
}
