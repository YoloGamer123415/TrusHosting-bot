exports.run = (client, message, args) => {
    message.channel.send({
        'embed': {
            "title": "💻 Solliciteren",
            "description": "U kunt [hier solliciteren](https://goo.gl/forms/DzgOgKcMUrQfhOry1).",
            "url": "https://goo.gl/forms/DzgOgKcMUrQfhOry1",
            "color": 15709696
        }
    })
}
