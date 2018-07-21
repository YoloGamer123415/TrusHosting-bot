const config = require('../config.json')

exports.run = (client, message, args) => {
    const prijzen = config.prices
    var text = {
        'embed': {
            'title': '💰 Prijzen TrusHosting',
            "description": `U kunt ook een kijkje nemen op [de site](https://trushosting.nl/producten.html) als u dat makkelijker vind.`,
            'fields': [],
            "url": "https://trushosting.nl/producten.html",
            'color': 15709696
        }
    }

    if (args[0]) {
        var pakket = args.join(' ')
        var succes = false

        for (var i = 0; i < prijzen.length; i++) {
            if (prijzen[i].name.toLowerCase().indexOf(pakket.toLowerCase()) > -1) {
                text.embed.fields.push({
                    'name': `Pakket '**${prijzen[i].name}**' - *${prijzen[i].price}*`,
                    'value': `${prijzen[i].description}\n`
                })
                succes = true
            }
        }

        if (!succes) {
            var allPackets = []

            for (var i = 0; i < prijzen.length; i++) {
                allPackets.push(prijzen[i].name)
            }

            text.embed.fields.push({
                'name': `Het pakket '**${pakket}**' bestaat niet`,
                'value': `Dit zijn alle pakketten die we op dit moment beschikbaar hebben:\`\`\`\n${allPackets.join('\n')}\`\`\``
            })
        }
    } else {
        text.embed.fields.push({
            'name': 'Dit zijn alle pakketten die we op dit moment beschikbaar hebben.',
            'value': 'Als je wilt zoeken op 1 pakket doe dan:\`\`\`!prijzen <naam pakket>\`\`\`'
        })

        config.prices.forEach(packet => {
            text.embed.fields.push({
                'name': `**${packet.name}** - *${packet.price}*`,
                'value': `${packet.description}\n`
            })
        })
    }

    message.channel.send(text)
}
