const Discord = require("discord.js")
const Enmap = require("enmap")
const fs = require('fs')

const client = new Discord.Client()
const config = require("./config.json")
client.config = config

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err)
    files.forEach(file => {
        const event = require(`./events/${file}`)
        var eventName = file.split(".")[0]
        console.log(`Attempting to load event '${eventName}'`)
        client.on(eventName, event.bind(null, client))
    });
});

client.commands = new Enmap()

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err)
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        var props = require(`./commands/${file}`)
        var commandName = file.split(".")[0]
        console.log(`Attempting to load command '${commandName}'`)
        client.commands.set(commandName, props)
    });
});

client.login(config.token)
