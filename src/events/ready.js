module.exports = client => {
  console.log(`${client.user.tag} is online`)
  client.user.setPresence({ activity: { type: 'PLAYING', name: `?help ~ ${client.guilds.cache.size} Guilds` }, status: 'online' })
    .catch(console.error);
}