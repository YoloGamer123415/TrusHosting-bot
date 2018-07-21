exports.run = (client, message, args) => {
    const adminRole = message.guild.roles.find("name", "Medewerker")

    if (!message.member.roles.has(adminRole.id)) return message.channel.send({
        "embed": {
            "title": "🗑️ Delete",
            "description": `I\'m sorry **${message.author.username}**, but you aren\'t alloud to do that.`,
            "color": 1
        }
    })

    const number = parseInt(args[0])

    if (!number) {
        message.channel.send({
            "embed": {
                "title": "🗑️ Delete",
                "description": `How many messages need I to delete?`,
                "color": 1
            }
        })
    } else {
        message.channel.bulkDelete(number + 1).then(done => {
            message.channel.send({
                "embed": {
                    "title": "🗑️️ Delete",
                    "description": `Deleted **${number}** message(s) for you.`,
                    "color": 1
                }
            })
        })
    }
}
