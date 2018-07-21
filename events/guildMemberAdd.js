module.exports = (client, member) => {
    var gastrole = member.guild.roles.find('name', 'Gast')

    member.addRole(gastrole).catch(err => console.log(err))

    member.guild.channels.get('467765781439053826').send({
        "embed": {
          "title": "👋 Welkom",
          "description": `Welkom **${member.user.username}** op de **TrusHosting** discord! Neem natuurlijk ook even een kijkje op onze site: *https://trushosting.nl*`,
          "color": 13580116
        }
    })
}
