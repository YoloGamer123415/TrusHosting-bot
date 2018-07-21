exports.run = (client, message, args) => {
    message.channel.send({
        "embed": {
            "title": "ℹ Informatie over TrusHosting",
            "color": 15709696,
            "fields": [
                {
                    "name": "Fast support",
                    "value": "Bij onze support kunt uw komen voor al uw vragen over onze producten of diensten."
                },
                {
                    "name": "Powerfull servers",
                    "value": "Onze servers beschikken over zeer krachtige processoren."
                },
                {
                    "name": "DDoS Protection",
                    "value": "Bij onze minecraft servers leveren wij DDOS bescherming van zeer hoge kwaliteit."
                },
                {
                    "name": "Good prices",
                    "value": "Door de krachtige servers en goedkope prijs zult u zo min mogelijk downtime krijgen!"
                }
            ]
        }
    })
}
