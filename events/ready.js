module.exports = {
    ready : (client, settings) => {
        client.login(settings.token)
        client.on('ready', async () => {
            await client.user.setActivity(settings.prefix + 'start {minutes}');
            await client.user.setStatus('online');
            console.log(`${client.user.tag} is ready!`);
        });
    }
};