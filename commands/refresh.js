const be = require('../backend/main')
const config = require('../config.json')

exports.run = (client, message, args) => {
    const adminRole = message.guild.roles.find("name", "Medewerker")

    be.getPermissions(client, message, config.needsPermission)

    if (!message.member.roles.has(adminRole.id)) return message.channel.send({
        "embed": {
            "title": "`🔄 Refresh",
            "description": `I\'m sorry **${message.author.username}**, but you aren\'t aloud to do that.`,
            "color": 16098851
        }
    })
    
    if(args.length < 1) return message.channel.send({
        "embed": {
            "title": `🔄 Refresh failed`,
            "description": `Please profide a command name to reload.`,
            "color": 16098851
        }
    })

    const commandName = args[0]

    if(!client.commands.has(commandName)) return message.channel.send({
        "embed": {
            "title": `🔄 Refresh failed`,
            "description": `That command doesn't exist.`,
            "color": 16098851
        }
    })

    delete require.cache[require.resolve(`./${commandName}.js`)]

    client.commands.delete(commandName)
    const props = require(`./${commandName}.js`)
    client.commands.set(commandName, props)
    message.channel.send({
        "embed": {
            "title": `🔄 Refresh`,
            "description": `The command **${commandName}** has been refreshed!`,
            "color": 16098851
        }
    })
}
