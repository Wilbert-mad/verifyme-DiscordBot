module.exports = (client, guild) => {
    client.user.setPresence({ activity: { type: 'WATCHING', name: `${client.guilds.cache.size} Guilds` }, status: 'online' })
        .catch(console.error);
}