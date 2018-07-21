exports.run = (client, message, args) => {

    message.channel.send({
        'embed': {
            "title": "💻 Site",
            "description": "[Dit is onze site.](https://trushosting.nl)",
            "url": "https://trushosting.nl",
            "color": 15709696
        }
    })
}
