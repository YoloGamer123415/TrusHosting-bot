module.exports = (client) => {
    const activity = 'commando\'s'

    client.user.setActivity(activity, { type: 'LISTENING'})
        .then(presence => console.log(`Activity set to ${activity}\n`))
        .catch(console.error)

    console.log(`Ready to server in '${client.channels.size}' channel(s) on '${client.guilds.size}' server(s), for a total of '${client.users.size}' user(s).\n`)
}
