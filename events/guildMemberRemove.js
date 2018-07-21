module.exports = (member, client) => {
    client.guild.channels.get('467765781439053826').send({
        "embed": {
          "title": "👋 Goodbye",
          "description": `Tot ziens **${client.user.username}**`,
          "color": 13580116
        }
    })
}
