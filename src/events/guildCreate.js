module.exports = (client, guild) => {
    client.user.setPresence({ activity: { type: 'PLAYING', name: `?help ~ ${client.guilds.cache.size} Guilds` }, status: 'online' })
        .catch(console.error);
}