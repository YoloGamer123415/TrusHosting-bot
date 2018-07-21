const config = require('../config.json')


exports.run = (client, message, args) => {
    function admin(commands) {
        commands.forEach(cmd => {
            text.embed.fields.push({
                'name': `**${cmd.name}**`,
                'value': `${cmd.description} ${cmd.usage}\n`
            })
        })
        message.channel.send(text)
    }

    function gast(commands) {
        commands.forEach(cmd => {
            if (!cmd.isAdminCommand) {
                text.embed.fields.push({
                    'name': `**${cmd.name}**`,
                    'value': `${cmd.description} ${cmd.usage}\n`
                })
            }
        })
        message.channel.send(text)
    }

    function oneCommand(allCommands, cmdName) {
        var text = {
            'embed': {
                'title': ' ❓ Help',
                'description': `Dit zijn alle commando\'s met de naam **${cmdName}** waar **${message.author.username}** toegang tot heeft.`,
                'fields': [],
                'color': 65314,
                'footer': {
                    'text': '<verplicht> [niet verplicht]  |  Bot made by @YoloGamer123415#7440'
                }
            }
        }

        allCommands.forEach(cmd => {
            if (cmd.name.toLowerCase() === cmdName.toLowerCase()) {
                const role = message.guild.roles.find('name', 'Medewerker')
                if (cmd.isAdminCommand === false) {
                    text.embed.fields.push({
                        'name': `**${cmd.name}**`,
                        'value': `${cmd.description} ${cmd.usage}\n`
                    })
                } else if (cmd.isAdminCommand === true && message.member.roles.has(role.id)) {
                    text.embed.fields.push({
                        'name': `**${cmd.name}**`,
                        'value': `${cmd.description} ${cmd.usage}\n`
                    })
                }
            }
        })

        if (typeof text.embed.fields === 'object' && text.embed.fields.length <= 0) {
            message.channel.send({
                'embed': {
                    'title': ' ❓ Help',
                    'description': `Er zijn geen commando\'s genaamd **${cmdName}** gevonden waar **${message.author.username}** toegang tot heeft.`,
                    'color': 65314,
                    'footer': {
                        'text': '<verplicht> [niet verplicht]  |  Bot made by @YoloGamer123415#7440'
                    }
                }
            })
        } else {
            message.channel.send(text)
        }
    }

    const cmds = config.commands
    var text = {
        'embed': {
            'title': ' ❓ Help',
            'description': `Dit zijn alle commando\'s waar **${message.author.username}** toegang tot heeft. Als u problemen heeft kan u **!ticket** doen of naar [onze site](https://de.site/contact.html?discordName=@${message.author.username}) gaan.`,
            'fields': [],
            'color': 65314,
            'footer': {
                'text': '<verplicht> [niet verplicht]  |  Bot made by @YoloGamer123415#7440'
            }
        }
    }

    const adminRole = message.guild.roles.find('name', 'Medewerker')

    if (args[0] !== undefined) {
        oneCommand(cmds, args[0])
    } else {
        if (message.member.roles.has(adminRole.id)) {
            admin(cmds)
        } else {
            gast(cmds)
        }
    }
}
