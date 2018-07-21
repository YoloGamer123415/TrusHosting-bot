const config = require('../config.json')
const be = require('../backend/main')

module.exports = (client, message) => {
    var messagelog = config.messagelog
    var authors = config.authors
    var muted = config.muted
    const maxBuffer = 7
    const maxDuplicatesBan = 7
    const interval = 1000

    function mute(msg, userid) {
        for (var i = 0; i < messagelog.length; i++) {
                if (messagelog[i].author == msg.author.id) {
                    messagelog.splice(i);
                }
            }
      
            muted.push(msg.author.id);
      
            var user = msg.channel.guild.members.find(member => member.user.id === msg.author.id);
            if (user) {
                message.member.addRole('469203872640925706').then(member => {
                message.channel.send({
                    "embed": {
                        "title": "⚙ Auto mute",
                        "description": `Muted **${message.author.username}** for spamming to much, who's next?`,
                        "color": 8756223
                    }
                })

                client.channels.get('469561981939089408').send({
                    "embed": {
                        "title": "⚙ Auto mute",
                        "description": `Muted **${message.author.username}** for spamming.\n\nTime: **${new Date()}**\nText: *${message.content.trim().split(/ +/g).join(' ')}*`,
                        "color": 8756223
                    }
                })
                return true;
           }).catch((error) => {
                message.channel.send(error)
                return false;
           });
        }
    }

    if (message.author.bot) return

    if(message.author.id != client.user.id){
        var now = Math.floor(Date.now());
        authors.push({
            "time": now,
            "author": message.author.id
        });
        messagelog.push({
            "message": message.content,
            "author": message.author.id
        });
  
        var messageMatch = 0;
        for (var i = 0; i < messagelog.length; i++) {
            if (messagelog[i].message == message.content && (messagelog[i].author == message.author.id)) {
                messageMatch++;
            }
        }

        if (messageMatch == maxDuplicatesBan && !muted.includes(message.author.id)) {
            mute(message, message.member.user.id);
        }
  
        matched = 0;
  
        for (var i = 0; i < authors.length; i++) {
            if (authors[i].time > now - interval) {
                matched++;
                if (matched == maxBuffer) {
                    if (!muted.includes(message.author.id)) {
                        mute(message, message.member.user.id);
                    }
                }
            }
            else if (authors[i].time < now - interval) {
                authors.splice(i);
                muted.splice(muted.indexOf(authors[i]));
            }
            if (messagelog.length >= 200) {
                messagelog.shift();
            }
        }
    }

    const swearWords = ['kanker', 'fuck', 'tering', 'tyf', 'jezus', 'kut', 'homo', 'verdomme', 'godverdomme', 'lul', 'discord.gg']

    if (swearWords.some(word => message.content.includes(word))) {
        return message.delete()
    }

    be.getAdminRoles(client, message, config.modroles)

    if (message.content.indexOf(client.config.prefix) !== 0) return

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()

    const cmd = client.commands.get(command)

    if (!cmd) return

    cmd.run(client, message, args)
}
