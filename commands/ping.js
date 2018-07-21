exports.run = async (client, message, args) => {
    const m = await message.channel.send({
        'embed': {
            'title': `📶 Ping`,
            'description': `***Pinging...***`,
            'color': 16777215
        }
    })

    m.edit({
        'embed': {
            'title': `📶 Ping`,
            'description': `Latency is **__${m.createdTimestamp - message.createdTimestamp}__ms**. API Latency is **__${Math.round(client.ping)}__ms**.`,
            'color': 16777215
        }
    })
}
