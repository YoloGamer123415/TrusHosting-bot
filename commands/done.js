exports.run = (client, message, args) => {
    if (message.channel.name.includes('prive-')) {
        const adminRole = message.guild.roles.find("name", "Medewerker")

        if (!message.member.roles.has(adminRole.id)) return message.channel.send({
            "embed": {
                "title": "🔒 Prive",
                "description": `Het spijt me **${message.author.username}**, maar jij mag dit niet doen.`,
                "color": 13632027
            }
        })
        
        message.channel.send({
            "embed": {
                "title": "🔒 Prive",
                "description": `Weet je zeker dat je helemaal klaar bent in **${message.channel.name}** en dat ik hem kan verwijderen?\n\`ja of nee\``,
                "color": 8750469
            }
        }).then(() => {
            message.channel.awaitMessages(res => res.content.toLowerCase() === 'ja' || res.content.toLowerCase() === 'nee', {
                max: 1,
                time: 5000,
                errors: ['time']
            }).then(collected => {
                if (collected.first().content === 'ja') {
                    var number = message.channel.name.split('-')[1]
                    var deleterole = message.guild.roles.find('name', `role-${number}`)

                    message.channel.delete()
                    deleterole.delete()
                } else if (collected.first().content === 'nee') {
                    message.channel.send({
                        "embed": {
                            "title": "🔒 Prive",
                            "description": `Ik ga **${message.channel.name}** niet verwijderen.`,
                            "color": 8750469
                        }
                    })
                }
            }).catch(() => message.channel.send({
                "embed": {
                    "title": "🔒 Prive",
                    "description": `Je was te sloom met antwoorden, jij luilak.`,
                    "color": 8750469
                }
            }))
        })
    }
}
