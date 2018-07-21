module.exports = {
    getAdminRoles: (client, message, findRole) => {
        findRole.forEach(role => {
            const modRole = message.guild.roles.find('name', role)
            if (!modRole) return client.channels.get('432177673750446096').send({
                'embed': {
                    'title': '❗ ERROR',
                    'description': `The role **${role}** does not exist, please make this role and assign it to the dedicated admins. If you are not an admin, please tell them to make the role **${role}** and assign it to the dedicated admins.`,
                    'color': 16711680
                }
            })
        })
    },

    getPermissions: (client, message, findPermissions) => {
        findPermissions.forEach(permission => {
            if (!message.guild.me.hasPermission(permission)) return client.channels.get('432177673750446096').send({
                'embed': {
                    'title': '❗ ERROR',
                    'description': `I don\'t have the permission **${permission}** so I can\'t do what I\'m supposed to do, please give me the permission **${permission}**. If you are not an admin, please tell them to give me the permission **${permission}**.`,
                    'color': 16711680
                }
            })
        })
    }
}
